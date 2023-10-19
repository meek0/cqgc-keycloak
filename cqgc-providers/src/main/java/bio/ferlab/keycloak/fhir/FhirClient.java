package bio.ferlab.keycloak.fhir;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.ws.rs.core.MultivaluedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

public class FhirClient {

    Logger logger = LoggerFactory.getLogger(FhirClient.class);
    ObjectMapper objectMapper = new ObjectMapper();
    HttpClient client = HttpClient.newBuilder().build();

    public List<OrganizationResource> getOrganizations(String accessToken, String fhirUrl) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fhirUrl + "/Organization?_count=100"))
                .header("Authorization", "Bearer " + accessToken)
                .GET()
                .build();

        try {
            String responseBody = client
                    .sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body).get();

            OrganizationsResponse organizationsResponse = objectMapper.readValue(responseBody, OrganizationsResponse.class);

            return organizationsResponse.entry.stream()
                    .filter(e -> "prov".equals(e.resource.type.get(0).coding.get(0).code))
                    .map(e -> e.resource)
                    .collect(Collectors.toList());

        } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public boolean doesPractitionerExist(String accessToken, String fhirUrl, String email) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fhirUrl + "/PractitionerRole?_count=100&email=" + email.trim()))
                .header("Authorization", "Bearer " + accessToken)
                .GET()
                .build();

        try {
            String responseBody = client
                    .sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body).get();

            Map<String, Object> jsonBody = objectMapper.readValue(responseBody, new TypeReference<>() {
            });

            return jsonBody.containsKey("entry");

        } catch (InterruptedException | ExecutionException | JsonProcessingException e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String createUserInFhir(String accessToken, String fhirUrl, MultivaluedMap<String, String> formData) {
        Practitioner practitioner = new Practitioner(
                formData.getFirst("firstName"),
                formData.getFirst("lastName"),
                formData.getFirst("user.attributes.title"),
                formData.getFirst("user.attributes.license"));

        List<String> organizations = Arrays.asList(formData.getFirst("user.attributes.institutions").split(","));
        List<PractitionerRole> practitionerRoles = organizations.stream()
                .map(org -> new PractitionerRole(practitioner.fullUrl, org, formData.getFirst("email"), Boolean.parseBoolean(formData.getFirst("user.attributes.is_resident_doctor"))))
                .collect(Collectors.toList());

        PostBundleBody bundle = new PostBundleBody(practitioner, practitionerRoles);
        try {
            String body = objectMapper.writeValueAsString(bundle);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fhirUrl))
                    .header("Authorization", "Bearer " + accessToken)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            String responseBody = client
                    .sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body).get();

            PostBundleResponse postBundleResponse = objectMapper.readValue(responseBody, PostBundleResponse.class);

            return postBundleResponse.entry.stream()
                    .filter(e -> e.response.location.startsWith("Practitioner/"))
                    .map(this::extractFhirIdFromEntry)
                    .findFirst()
                    .get();
        } catch (JsonProcessingException | InterruptedException | ExecutionException e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String extractFhirIdFromEntry(PostBundleResponseEntry entry) {
        String[] locationSplit = entry.response.location.split("/");
        return locationSplit[1];
    }
}
