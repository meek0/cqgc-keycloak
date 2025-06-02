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

public class RedirectToPageAuthenticatorFactory implements AuthenticatorFactory {
  private static final RedirectToPageAuthenticator SINGLETON = new RedirectToPageAuthenticator();

  @Override
  public String getDisplayType() {
    return "Redirect to page authenticator";
  }

  @Override
  public String getReferenceCategory() {
    return "Redirect to page authenticator";
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
    return "Redirect to a custom page based on settings.";
  }

  @Override
  public List<ProviderConfigProperty> getConfigProperties() {
    return configProperties;
  }

  private static final List<ProviderConfigProperty> configProperties = new ArrayList<ProviderConfigProperty>();

  static {
    ProviderConfigProperty property;
    property = new ProviderConfigProperty();
    property.setName("page");
    property.setLabel("Name of the page to redirect to");
    property.setType(ProviderConfigProperty.TEXT_TYPE);
    property.setHelpText("Can be prepend with '/' or not");
    configProperties.add(property);
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
    return "redirect-to-page-authenticator";
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
