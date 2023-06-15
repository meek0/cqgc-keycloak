package bio.ferlab.keycloak.fhir;

import java.util.List;

public class PostBundleResponse {
    public String resourceType;
    public String id;
    public String type;
    public List<Link> link;
    public List<PostBundleResponseEntry> entry;
}

class Link {
    public String relation;
    public String url;
}

class PostBundleResponseEntry{
    public PostBundleResponseEntryResponse response;
}

class PostBundleResponseEntryResponse {
    public String status;
    public String location;
    public String etag;
    public String lastModified;
}
