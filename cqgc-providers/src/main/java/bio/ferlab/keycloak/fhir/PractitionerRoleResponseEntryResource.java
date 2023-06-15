package bio.ferlab.keycloak.fhir;

import java.util.List;

public class PractitionerRoleResponseEntryResource {
    public String resourceType = "PractitionerRole";
    public String id;
    public Object meta;
    public boolean active;
    public Reference practitioner;
    public Reference organization;
    public List<PractitionerRoleCode> code;
    public List<Telecom> telecom;

    public boolean isPractitioner() {
        return this.code.stream()
                .map(c -> c.coding)
                .flatMap(List::stream)
                .map(c -> c.code)
                .anyMatch(code -> "doctor".equals(code) || "405277009".equals(code));
    }
}
