FROM node:18-alpine3.15 as builder-theme
WORKDIR /app
COPY . /app
RUN cd cqgc-theme/ && npm install && npm run keycloak

FROM maven:3-adoptopenjdk-11 as builder-providers
WORKDIR /app
COPY . /app
RUN cd cqgc-providers/ && mvn clean package -DskipTests


FROM quay.io/keycloak/keycloak:21.0.2

ENV KC_DB=postgres

WORKDIR /opt/keycloak

COPY --from=builder-providers /app/cqgc-providers/target/bio.ferlab.keycloak.cqgc-keycloak-ext.jar /opt/keycloak/providers
COPY --from=builder-theme /app/cqgc-theme/build_keycloak/src/main/resources/theme/keycloakify-cqgc-app /opt/keycloak/themes/keycloakify-cqgc-app

RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]