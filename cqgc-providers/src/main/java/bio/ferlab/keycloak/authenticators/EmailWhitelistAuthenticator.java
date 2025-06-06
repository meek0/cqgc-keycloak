package bio.ferlab.keycloak.authenticators;

import org.apache.commons.lang3.StringUtils;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.forms.login.LoginFormsProvider;
import org.keycloak.models.*;
import org.keycloak.services.managers.AuthenticationManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class EmailWhitelistAuthenticator implements Authenticator {

    Logger logger = LoggerFactory.getLogger(EmailWhitelistAuthenticator.class);

    @Override
    public void authenticate(AuthenticationFlowContext context) {
        AuthenticatorConfigModel config = context.getAuthenticatorConfig();
        List<String> emails = Arrays.asList(config.getConfig().get("emailWhitelist").split("\n"));
        String email = context.getUser().getEmail();
        if (email != null && emails.contains(email)) {
            context.success();
        } else {
            logger.warn("User email not in whitelist");
            if (Boolean.parseBoolean(StringUtils.lowerCase(config.getConfig().get("showWhiteListInfoPage")))) {
                logger.warn("Redirecting user to info page");
                Response response = context.form()
                  .setAttribute("showWhiteListInfoPage", true)
                  .createErrorPage(Response.Status.BAD_REQUEST);

                context.failure(AuthenticationFlowError.ACCESS_DENIED, response);
            } else {
                context.failure(AuthenticationFlowError.ACCESS_DENIED);
            }
        }
    }

    @Override
    public void action(AuthenticationFlowContext context) {

    }

    @Override
    public boolean requiresUser() {
        return true;
    }

    @Override
    public boolean configuredFor(KeycloakSession session, RealmModel realm, UserModel user) {
        return true;
    }

    @Override
    public void setRequiredActions(KeycloakSession session, RealmModel realm, UserModel user) {

    }

    @Override
    public void close() {

    }
}