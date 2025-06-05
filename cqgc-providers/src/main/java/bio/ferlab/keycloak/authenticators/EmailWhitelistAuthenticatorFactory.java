package bio.ferlab.keycloak.authenticators;

import org.keycloak.Config;
import org.keycloak.authentication.Authenticator;
import org.keycloak.authentication.AuthenticatorFactory;
import org.keycloak.models.AuthenticationExecutionModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderConfigProperty;

import java.util.ArrayList;
import java.util.List;

public class EmailWhitelistAuthenticatorFactory implements AuthenticatorFactory {

    private static final EmailWhitelistAuthenticator SINGLETON = new EmailWhitelistAuthenticator();

    @Override
    public String getDisplayType() {
        return "Email whitelist authenticator";
    }

    @Override
    public String getReferenceCategory() {
        return "Email whitelist authenticator";
    }

    @Override
    public boolean isConfigurable() {
        return true;
    }

    @Override
    public boolean isUserSetupAllowed() {
        return false;
    }

    @Override
    public String getHelpText() {
        return "Define which email are allowed to connect.";
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return configProperties;
    }

    private static final List<ProviderConfigProperty> configProperties = new ArrayList<ProviderConfigProperty>();

    static {
        ProviderConfigProperty property;
        property = new ProviderConfigProperty();
        property.setName("emailWhitelist");
        property.setLabel("List of whitelisted emails");
        property.setType(ProviderConfigProperty.TEXT_TYPE);
        property.setHelpText("One item per line");
        configProperties.add(property);

        ProviderConfigProperty property2;
        property2 = new ProviderConfigProperty();
        property2.setName("showWhiteListInfoPage");
        property2.setLabel("If whitelist check failed, display info contact instead of error page");
        property2.setType(ProviderConfigProperty.BOOLEAN_TYPE);
        property2.setHelpText("Un-checked by default");
        property2.setDefaultValue(Boolean.FALSE);
        configProperties.add(property2);
    }

    @Override
    public Authenticator create(KeycloakSession keycloakSession) {
        return SINGLETON;
    }

    @Override
    public void init(Config.Scope scope) {

    }

    @Override
    public void postInit(KeycloakSessionFactory keycloakSessionFactory) {

    }

    @Override
    public void close() {

    }

    @Override
    public String getId() {
        return "email-whitelist-authenticator";
    }

    private static AuthenticationExecutionModel.Requirement[] REQUIREMENT_CHOICES = {
            AuthenticationExecutionModel.Requirement.REQUIRED,
            AuthenticationExecutionModel.Requirement.ALTERNATIVE,
            AuthenticationExecutionModel.Requirement.DISABLED
    };
    @Override
    public AuthenticationExecutionModel.Requirement[] getRequirementChoices() {
        return REQUIREMENT_CHOICES;
    }
}