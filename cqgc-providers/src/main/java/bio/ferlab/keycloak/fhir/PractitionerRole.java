package bio.ferlab.keycloak.fhir;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class PractitionerRole extends Resource {
    public PractitionerRoleResource resource;

    public PractitionerRole(String practitionerFullUrl, String organization, String email, boolean isResident) {
        this.resource = new PractitionerRoleResource(practitionerFullUrl, organization, email, isResident);
        this.request = new ResourceRequest("POST", "PractitionerRole");
        this.fullUrl = "urn:uuid:" + UUID.randomUUID();
    }
}

class PractitionerRoleResource {
    public String resourceType = "PractitionerRole";
    public boolean active;
    public Reference practitioner;
    public Reference organization;
    public List<PractitionerRoleCode> code;
    public List<Telecom> telecom;

    public PractitionerRoleResource(String practitionerFullUrl, String organization, String email, boolean isResident) {
        this.active = true;
        this.practitioner = new Reference(practitionerFullUrl);
        this.organization = new Reference("Organization/" + organization);
        this.code = Collections.singletonList(new PractitionerRoleCode(isResident));
        this.telecom = Collections.singletonList(new Telecom("email", email));
    }
}

class Reference {
    public String reference;

    @JsonCreator
    public Reference(@JsonProperty("reference") String reference) {
        this.reference = reference;
    }
}

class PractitionerRoleCode {
    public List<PractitionerCoding> coding;

    @JsonCreator
    public PractitionerRoleCode(@JsonProperty("coding") List<PractitionerCoding> coding) {
        this.coding = coding;
    }

    public PractitionerRoleCode(boolean isResident) {
        String code = isResident ? "405277009" : "doctor";
        String system = isResident ? "http://snomed.info/sct" : "http://terminology.hl7.org/CodeSystem/practitioner-role";
        this.coding = Collections.singletonList(new PractitionerCoding(system, code));
    }
}

class Telecom {
    public String system;
    public String value;

    @JsonCreator
    public Telecom(@JsonProperty("system") String system, @JsonProperty("value") String value) {
        this.system = system;
        this.value = value;
    }
}