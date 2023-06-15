package bio.ferlab.keycloak.fhir;

import java.util.ArrayList;
import java.util.List;

public class PostBundleBody {
    public String resourceType = "Bundle";
    public String type = "transaction";
    public List<Resource> entry;

    public PostBundleBody(Practitioner practitioner, List<PractitionerRole> roles){
        this.entry = new ArrayList<>();
        entry.add(practitioner);
        entry.addAll(roles);
    }

    public PostBundleBody(List<PractitionerRole> roles){
        this.entry = new ArrayList<>();
        entry.addAll(roles);
    }
}
