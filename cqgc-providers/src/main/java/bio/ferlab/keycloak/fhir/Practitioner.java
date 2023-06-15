package bio.ferlab.keycloak.fhir;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class Practitioner extends Resource{
    public PractitionerResource resource;

    public Practitioner(String firstName, String lastName, String prefix, String license){
        this.resource = new PractitionerResource(firstName, lastName, prefix, license);
        this.request = new ResourceRequest("POST", "Practitioner");
        this.fullUrl = "urn:uuid:" + UUID.randomUUID();
    }
}

class PractitionerResource {
    public String resourceType = "Practitioner";
    public List<PractitionerIdentifier> identifier;
    public List<PractitionerName> name;

    public PractitionerResource(String firstName, String lastName, String prefix, String license) {
        this.name = Collections.singletonList(new PractitionerName(firstName, lastName, prefix));
        this.identifier = Collections.singletonList(new PractitionerIdentifier(license));
    }
}

class PractitionerIdentifier {
    public String use;
    public PractitionerIdentifierType type;
    public String value;

    public PractitionerIdentifier(String license){
        this.use = "official";
        this.type = new PractitionerIdentifierType();
        this.value = license;
    }
}

class PractitionerIdentifierType {
    public List<PractitionerCoding> coding;
    public String text;

    public PractitionerIdentifierType() {
        this.coding = Collections.singletonList(new PractitionerCoding("http://terminology.hl7.org/CodeSystem/v2-0203", "MD"));
        this.text = "Numéro de License Médicale du Québec";
    }
}

class PractitionerName {
    public String family;
    public List<String> given;
    public List<String> prefix;

    public PractitionerName(String firstName, String lastName, String prefix){
        this.family = lastName;
        this.given = Collections.singletonList(firstName);
        this.prefix = Collections.singletonList(prefix);
    }
}