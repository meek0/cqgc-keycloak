package bio.ferlab.keycloak.authenticators;

import org.apache.commons.lang3.StringUtils;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.models.AuthenticatorConfigModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;

public class RedirectToPageAuthenticator implements Authenticator {

  Logger logger = LoggerFactory.getLogger(RedirectToPageAuthenticator.class);

  @Override
  public void authenticate(AuthenticationFlowContext context) {
    AuthenticatorConfigModel config = context.getAuthenticatorConfig();
    String page = config.getConfig().get("page");
    if (StringUtils.isBlank(page)) {
      logger.error("page is not configured.");
      context.failureChallenge(AuthenticationFlowError.INTERNAL_ERROR, Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("page is not configured.").build());
    } else {
      String redirectUrl = "/realms/" + context.getRealm().getName() + StringUtils.prependIfMissing(page, "/");
      Response response = Response.seeOther(java.net.URI.create(redirectUrl)).build();
      context.challenge(response);
    }
  }

  @Override
  public void action(AuthenticationFlowContext authenticationFlowContext) {

  }

  @Override
  public boolean requiresUser() {
    return false;
  }

  @Override
  public boolean configuredFor(KeycloakSession keycloakSession, RealmModel realmModel, UserModel userModel) {
    return false;
  }

  @Override
  public void setRequiredActions(KeycloakSession keycloakSession, RealmModel realmModel, UserModel userModel) {

  }

  @Override
  public void close() {

  }
}
