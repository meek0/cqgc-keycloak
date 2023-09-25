FROM node:18-alpine3.15 as builder-theme
WORKDIR /app
COPY . /app
RUN cd cqgc-theme/ && npm install && npm run keycloak

FROM maven:3-adoptopenjdk-16 as builder-providers
WORKDIR /app
COPY . /app
RUN cd cqgc-providers/ && mvn clean package -DskipTests

# FROM alpine/curl:8.2.0 as builder-jgroup
# ENV JGROUPS_KUBERNETES_VERSION=2.0.1.Final
# RUN curl -L -o jgroups-kubernetes-$JGROUPS_KUBERNETES_VERSION.jar \
#   https://repo1.maven.org/maven2/org/jgroups/kubernetes/jgroups-kubernetes/$JGROUPS_KUBERNETES_VERSION/jgroups-kubernetes-$JGROUPS_KUBERNETES_VERSION.jar


FROM quay.io/keycloak/keycloak:21.1.1

ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_DEBUG=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_CACHE=ispn
ENV KC_CACHE_STACK=kubernetes
ENV JAVA_OPTS_APPEND=-Djgroups.dns.query=keycloak-headless
# ENV JGROUPS_KUBERNETES_VERSION 2.0.1.Final

WORKDIR /opt/keycloak

COPY clin-blacklist.txt /opt/keycloak/data/password-blacklists/clin-blacklist.txt 
COPY --from=builder-providers /app/cqgc-providers/target/bio.ferlab.keycloak.cqgc-keycloak-ext.jar /opt/keycloak/providers
COPY --from=builder-theme /app/cqgc-theme/build_keycloak/src/main/resources/theme/keycloakify-cqgc-app /opt/keycloak/themes/keycloakify-cqgc-app

# COPY --from=builder-jgroup jgroups-kubernetes-$JGROUPS_KUBERNETES_VERSION.jar /opt/keycloak/providers/
# COPY cache-ispn-k8s.xml /opt/keycloak/conf/cache-ispn-k8s.xml

# RUN /opt/keycloak/bin/kc.sh build --cache-config-file="cache-ispn-k8s.xml"
RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]