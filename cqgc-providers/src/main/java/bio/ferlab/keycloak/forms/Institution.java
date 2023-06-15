package bio.ferlab.keycloak.forms;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Institution implements Serializable {
    public String label;
    public String value;

    public Institution(String label, String alias, String value) {
        this.label = label + " (" + alias + ")";
        this.value = value;
    }

    public Map asMap(){
        Map result = new HashMap();
        result.put("label", this.label);
        result.put("value", this.value);
        return result;
    }
}
