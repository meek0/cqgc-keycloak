package bio.ferlab.keycloak.fhir;

import java.util.List;

public class OrganizationResource {
    public String resourceType;
    public String id;
    public Object meta;
    public List<OrganizationResourceType> type;
    public String name;
    public List<String> alias;
    public List<Object> contact;
}

class OrganizationResourceType {
    public List<OrganizationCoding> coding;
}
