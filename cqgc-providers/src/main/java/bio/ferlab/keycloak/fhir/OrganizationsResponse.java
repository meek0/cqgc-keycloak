package bio.ferlab.keycloak.fhir;

import java.util.List;

public class OrganizationsResponse {

    public String resourceType;
    public String id;
    public Object meta;
    public String type;
    public List<Object> link;
    public List<Organization> entry;
}
