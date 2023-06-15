package bio.ferlab.keycloak.fhir;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Resource {
    public String fullUrl;
    public ResourceRequest request;
}

class ResourceRequest {
    public String method;
    public String url;

    public ResourceRequest(String method, String url) {
        this.method = method;
        this.url = url;
    }
}

class PractitionerCoding {
    public String system;
    public String code;

    @JsonIgnore
    public String display;

    @JsonCreator
    public PractitionerCoding(@JsonProperty("system") String system, @JsonProperty("code") String code) {
        this.system = system;
        this.code = code;
    }
}