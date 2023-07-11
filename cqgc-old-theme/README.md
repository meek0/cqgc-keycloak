# CLIN Keycloak Theme

### Development Set-up

* Clone the devops repository
```
  git clone git@github.com:Ferlab-Ste-Justine/devops.git
```
* Go into the "Keycloak" folder and initialize the submodules
```
  git submodule init
  git submodule sync
  git submodule update
```
* Generate self signed certificates according to the documentation you can find here:
```
https://github.com/Ferlab-Ste-Justine/devops/tree/dev/certificates#generating-self-signed-certificates
```
* Initialize swarm
```
  docker swarm init --advertise-addr [YOUR_IP_ADDRESS]

  docker node update --label-add app_role=generic $(docker node ls -q)
  docker node update --label-add state_anchor=true $(docker node ls -q)
```
* To launch Keycloak with the theme
```
  ./launchLocalLatest.sh
```
* To stop Keycloak
```
  ./tearDownLocal.sh
```
* If the scripts are not executable, run the following:
```
chmod a+x launchLocalLatest.sh tearDownLocal.sh
```

### Notes
* The ftl templates came from the following repository:
https://github.com/keycloak/keycloak/tree/10.0.2/themes/src/main/resources/theme/base
  * Make sure to use templates that match the Keycloak version installed (at the moment this was written, it was Keycloak 10.0.2)
* The git devops/Keycloak git submodules point on the master branch of the clin-keycloak-theme repository
* According to: https://www.keycloak.org/docs/latest/server_development/

> While creating a theme it’s a good idea to disable caching as this makes it possible to edit theme 
resources directly from the themes directory without restarting Keycloak. To do this edit standalone.xml. 

> For theme set staticMaxAge to -1 and both cacheTemplates and cacheThemes to false:
```
<theme>
    <staticMaxAge>-1</staticMaxAge>
    <cacheThemes>false</cacheThemes>
    <cacheTemplates>false</cacheTemplates>
    ...
</theme>
```
* To test the theme, you can call the following url:
https://dev.chusj-clin-dev.org:8443/auth/realms/clin/protocol/openid-connect/auth?client_id=clin-proxy-api-acf&response_mode=fragment&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Fwww.google.ca
  * The above url assumes that:
     * You have a mapping in your hosts file for 127.0.0.1 -> dev.chusj-clin-dev.org
     * Your local Keycloak instance is configured to allow redirect to any url.