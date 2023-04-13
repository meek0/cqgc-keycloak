# Keycloak for CQGC

## Prerequisites

- Docker
- Maven
- Java 11+
- Node 18+

---

## Local testing

Build docker image: 

``` docker build -t cqgc-keycloak .```

Run docker image:

``` docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin cqgc-keycloak:latest start-dev ```

Then access to admin console here: http://localhost:8080/admin

Login with admin/admin

In realm settings -> Theme -> login theme, choose `keycloakify-cqgc-app`

Logout and try to login -> you will see the login page defined in cqgc-theme

---

## Add a new provider

- Add the provider and its factory in authenticators package

- Add the new factory in resources/META-INFO/services

- Re-build docker image and run it

- In admin console go to master realm > Provider info and make sure your new provider is available

---

## Theme development

In cqgc-theme directory: 

- Run `npm install`

- Run `npm run keycloak`

- Run `npm run start`

You can change the current page in kcContext.ts > mockData > pageId