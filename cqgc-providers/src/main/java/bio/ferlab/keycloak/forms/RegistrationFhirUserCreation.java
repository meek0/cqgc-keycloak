package bio.ferlab.keycloak.forms;

import bio.ferlab.keycloak.fhir.FhirClient;
import bio.ferlab.keycloak.fhir.OrganizationResource;
import bio.ferlab.keycloak.helpers.SystemTokenRetriever;
import javax.ws.rs.core.MultivaluedMap;
import org.apache.commons.lang3.StringUtils;
import org.keycloak.Config;
import org.keycloak.authentication.FormAction;
import org.keycloak.authentication.FormActionFactory;
import org.keycloak.authentication.FormContext;
import org.keycloak.authentication.ValidationContext;
import org.keycloak.events.Details;
import org.keycloak.events.Errors;
import org.keycloak.events.EventType;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.*;
import org.keycloak.models.utils.FormMessage;
import org.keycloak.protocol.oidc.OIDCLoginProtocol;
import org.keycloak.provider.ProviderConfigProperty;
import org.keycloak.services.messages.Messages;
import org.keycloak.services.validation.Validation;
import org.keycloak.userprofile.UserProfile;
import org.keycloak.userprofile.UserProfileContext;
import org.keycloak.userprofile.UserProfileProvider;
import org.keycloak.userprofile.ValidationException;
import org.keycloak.validate.ValidationError;

import java.util.*;
import java.util.stream.Collectors;

public class RegistrationFhirUserCreation implements FormAction, FormActionFactory {
    public static final String PROVIDER_ID = "registration-fhir-user-creation";

    SystemTokenRetriever tokenRetriever = new SystemTokenRetriever();
    FhirClient fhirClient = new FhirClient();

    private static final List<ProviderConfigProperty> configProperties = new ArrayList<>();

    static {
        ProviderConfigProperty property;
        property = new ProviderConfigProperty();
        property.setName("fhirUrl");
        property.setLabel("FHIR URL");
        property.setType(ProviderConfigProperty.TEXT_TYPE);
        configProperties.add(property);

        property = new ProviderConfigProperty();
        property.setName("emailValidationRegexList");
        property.setLabel("Email validation regex list");
        property.setHelpText("Separated by comma");
        property.setType(ProviderConfigProperty.MULTIVALUED_STRING_TYPE);
        configProperties.add(property);
    }

    @Override
    public String getHelpText() {
        return "To create user in FHIR";
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return configProperties;
    }

    @Override
    public void validate(ValidationContext context) {
        MultivaluedMap<String, String> formData = context.getHttpRequest().getDecodedFormParameters();
        context.getEvent().detail(Details.REGISTER_METHOD, "form");

        KeycloakSession session = context.getSession();
        UserProfileProvider profileProvider = session.getProvider(UserProfileProvider.class);
        UserProfile profile = profileProvider.create(UserProfileContext.REGISTRATION_USER_CREATION, formData);

        String email = profile.getAttributes().getFirstValue(UserModel.EMAIL);
        String firstName = profile.getAttributes().getFirstValue(UserModel.FIRST_NAME);
        String lastName = profile.getAttributes().getFirstValue(UserModel.LAST_NAME);

        context.getEvent().detail(Details.EMAIL, email);
        context.getEvent().detail(Details.USERNAME, email);
        context.getEvent().detail(Details.FIRST_NAME, firstName);
        context.getEvent().detail(Details.LAST_NAME, lastName);

        try {
            UserCreationValidator.validate(profile, getEmailValidationRegexList(context));
            String accessToken = tokenRetriever.getAccessToken(context);
            if(fhirClient.doesPractitionerExist(accessToken, getFhirUrl(context), email)) {
                ValidationException exception = new ValidationException();
                exception.accept(new ValidationError("validateEmail", "email", "error_email_already_exists"));
                throw exception;
            }
            profile.validate();
        } catch (ValidationException pve) {
            List<FormMessage> errors = Validation.getFormErrorsFromValidation(pve.getErrors());

            if (pve.hasError(Messages.EMAIL_EXISTS)) {
                context.error(Errors.EMAIL_IN_USE);
            } else if (pve.hasError(Messages.MISSING_EMAIL, Messages.MISSING_USERNAME, Messages.INVALID_EMAIL)) {
                context.error(Errors.INVALID_REGISTRATION);
            } else if (pve.hasError(Messages.USERNAME_EXISTS)) {
                context.error(Errors.USERNAME_IN_USE);
            }

            context.validationError(formData, errors);
            return;
        }
        context.success();
    }

    @Override
    public void buildPage(FormContext context, LoginFormsProvider form) {
        String accessToken = tokenRetriever.getAccessToken(context);
        List<OrganizationResource> organizations = fhirClient.getOrganizations(accessToken, getFhirUrl(context));
        List<Map> institutionOptions = organizations.stream()
                .map(org -> new Institution(org.name, org.alias.get(0), org.id).asMap())
                .collect(Collectors.toList());

        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("institutionOptions", institutionOptions);
        additionalData.put("redirectUrl", context.getAuthenticationSession().getRedirectUri());
        additionalData.put("emailValidationRegexList", getEmailValidationRegexList(context));

        form.setAttribute("additionalData", additionalData);
    }

    @Override
    public void success(FormContext context) {
        MultivaluedMap<String, String> formData = context.getHttpRequest().getDecodedFormParameters();

        String email = formData.getFirst(UserModel.EMAIL);

        context.getEvent()
                .detail(Details.REGISTER_METHOD, "form")
                .detail(Details.EMAIL, email);

        KeycloakSession session = context.getSession();
        UserProfileProvider profileProvider = session.getProvider(UserProfileProvider.class);

        String accessToken = tokenRetriever.getAccessToken(context);
        UserModel user;

        String fhirId = fhirClient.createUserInFhir(accessToken, getFhirUrl(context), formData);
        formData.put("user.attributes.fhir_practitioner_id", Collections.singletonList(fhirId));
        formData.remove("user.attributes.license_confirm");

        UserProfile profile = profileProvider.create(UserProfileContext.REGISTRATION_USER_CREATION, formData);
        user = profile.create();

        RoleModel rolePractitioner = context.getRealm().getRole("clin_practitioner");
        RoleModel rolePrescriber = context.getRealm().getRole("clin_prescriber");
        user.grantRole(rolePractitioner);
        user.grantRole(rolePrescriber);

        user.setEnabled(true);

        joinGroupsForEachOrganization(context, user, formData.get("user.attributes.institutions").get(0));

        context.setUser(user);

        context.getAuthenticationSession().setClientNote(OIDCLoginProtocol.LOGIN_HINT_PARAM, email);

        context.getEvent().user(user);
        context.getEvent().success();
        context.newEvent().event(EventType.LOGIN);
        context.getEvent().client(context.getAuthenticationSession().getClient().getClientId())
                .detail(Details.REDIRECT_URI, context.getAuthenticationSession().getRedirectUri())
                .detail(Details.AUTH_METHOD, context.getAuthenticationSession().getProtocol());
        String authType = context.getAuthenticationSession().getAuthNote(Details.AUTH_TYPE);
        if (authType != null) {
            context.getEvent().detail(Details.AUTH_TYPE, authType);
        }
    }

    private void joinGroupsForEachOrganization(FormContext context, UserModel user, String organizationsAsString) {
        String[] organizations = organizationsAsString.split(",");
        for (String org : organizations) {
            Optional<GroupModel> group = context.getRealm().getGroupsStream().filter(g -> g.getName().equals(org)).findFirst();
            if (group.isPresent()) {
                user.joinGroup(group.get());
            } else {
                GroupModel newGroup = context.getRealm().createGroup(org);
                newGroup.setAttribute("fhir_organization_id", Collections.singletonList(org));
                user.joinGroup(newGroup);
            }
        }
    }

    @Override
    public boolean requiresUser() {
        return false;
    }

    @Override
    public boolean configuredFor(KeycloakSession session, RealmModel realm, UserModel user) {
        return true;
    }

    @Override
    public void setRequiredActions(KeycloakSession session, RealmModel realm, UserModel user) {

    }

    @Override
    public boolean isUserSetupAllowed() {
        return false;
    }


    @Override
    public void close() {

    }

    @Override
    public String getDisplayType() {
        return "Registration FHIR User Creation";
    }

    @Override
    public String getReferenceCategory() {
        return null;
    }

    @Override
    public boolean isConfigurable() {
        return true;
    }

    private static AuthenticationExecutionModel.Requirement[] REQUIREMENT_CHOICES = {
            AuthenticationExecutionModel.Requirement.REQUIRED,
            AuthenticationExecutionModel.Requirement.DISABLED
    };

    @Override
    public AuthenticationExecutionModel.Requirement[] getRequirementChoices() {
        return REQUIREMENT_CHOICES;
    }

    @Override
    public FormAction create(KeycloakSession session) {
        return this;
    }

    @Override
    public void init(Config.Scope config) {

    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {

    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    private String getFhirUrl(FormContext context) {
        return context.getAuthenticatorConfig().getConfig().get("fhirUrl") + "/fhir";
    }

    private List<String> getEmailValidationRegexList(FormContext context) {
        if(StringUtils.isNotBlank(context.getAuthenticatorConfig().getConfig().get("emailValidationRegexList"))){
            return Arrays.asList(context.getAuthenticatorConfig().getConfig().get("emailValidationRegexList").split("##"));
        }
        return Collections.EMPTY_LIST;
    }
}
