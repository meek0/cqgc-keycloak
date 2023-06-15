package bio.ferlab.keycloak.fhir;

import java.util.List;

public class PractitionerRoleResponse {
    public String resourceType;
    public String id;
    public Object meta;
    public String type;
    public List<Link> link;
    public List<PractitionerRoleResponseEntry> entry;
}

class PractitionerRoleResponseEntry {
    public String fullUrl;
    public PractitionerRoleResponseEntryResource resource;
    public Object search;
}

