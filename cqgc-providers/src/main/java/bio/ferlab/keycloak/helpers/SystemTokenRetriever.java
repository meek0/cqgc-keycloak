package bio.ferlab.keycloak.helpers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.keycloak.authentication.FormContext;
import org.keycloak.services.Urls;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class SystemTokenRetriever {
    Logger logger = LoggerFactory.getLogger(SystemTokenRetriever.class);
    ObjectMapper objectMapper = new ObjectMapper();
    HttpClient client = HttpClient.newBuilder().build();

    public String getAccessToken(FormContext context) {
        String secret = context.getRealm().getClientByClientId("clin-system").getSecret();
        URI tokenUri = Urls.realmBase(context.getUriInfo().getBaseUri())
                .path("{realm}/protocol/openid-connect/token")
                .build(new Object[]{context.getRealm().getName()});
        String clinSystemToken = getClinSystemToken(tokenUri, secret);
        return getTokenForClinAcl(tokenUri, clinSystemToken);
    }

    private String getClinSystemToken(URI tokenUri, String clientSecret) {
        String urlParameters = "grant_type=client_credentials&client_id=clin-system&client_secret=" + clientSecret;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(tokenUri)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(urlParameters))
                .build();

        try {
            String responseBody = client
                    .sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body).get();

            Map<String, String> jsonBody = objectMapper.readValue(responseBody, new TypeReference<>() {
            });

            String accessToken = jsonBody.get("access_token");

            return accessToken;

        } catch (IOException | InterruptedException | ExecutionException e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String getTokenForClinAcl(URI tokenUri, String clinSystemToken) {
        String urlParameters = "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=clin-acl";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(tokenUri)
                .header("Authorization", "Bearer " + clinSystemToken)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(urlParameters))
                .build();

        try {
            String responseBody = client
                    .sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body).get();
            Map<String, String> jsonBody = objectMapper.readValue(responseBody, new TypeReference<>() {
            });

            String accessToken = jsonBody.get("access_token");

            return accessToken;

        } catch (IOException | InterruptedException | ExecutionException e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
