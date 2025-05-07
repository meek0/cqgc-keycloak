import { getKcContext } from 'keycloakify/login';

type TInstitution = {
  label: string;
  value: string;
};

type TAdditionalData = {
  institutionOptions: TInstitution[];
  redirectUrl: string;
  emailValidationRegexList: string[];
};

export type KcContextExtension =
  // NOTE: A 'keycloakify' field must be added
  // in the package.json to generate theses extra pages
  // https://docs.keycloakify.dev/build-options#keycloakify.extrapages
  // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
  // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
  // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
  { pageId: 'register.ftl'; redirectUrl: string; additionalData: TAdditionalData };

//NOTE: In most of the cases you do not need to overload the KcContext, you can
// just call getKcContext(...) without type arguments.
// You want to overload the KcContext only if:
// - You have custom plugins that add some values to the context (like https://github.com/micedre/keycloak-mail-whitelisting that adds authorizedMailDomains)
// - You want to add support for extra pages that are not yey featured by default, see: https://docs.keycloakify.dev/contributing#adding-support-for-a-new-page
export const { kcContext } = getKcContext<KcContextExtension>({
  // Uncomment to test the login page for development.
  mockPageId: 'login.ftl',
  // mockPageId: 'register.ftl',
  // mockPageId: 'login-verify-email.ftl',
  // mockPageId: 'error.ftl',
  // mockPageId: 'info.ftl',
  // mockPageId: 'login-reset-password.ftl',
  // mockPageId: 'login-update-password.ftl',
  mockData: [
    {
      pageId: 'login.ftl',
      locale: {
        //When we test the login page we do it in french
        currentLanguageTag: 'fr',
      },
      //Uncomment the following line for hiding the Alert message
      //"message": undefined
      //Uncomment the following line for showing an Error message
      //message: { type: "error", summary: "This is an error" }
      social: {
        providers: [
          {
            providerId: 'msss',
            alias: 'msss',
            displayName: 'ssss.gouv.qc.ca',
            loginUrl: 'http://localhost:8080/realms/master/broker/microsoft/endpoint',
          },
        ],
      },
      registrationDisabled: true,
    },
    {
      pageId: 'register.ftl',
      locale: {
        //When we test the login page we do it in french
        currentLanguageTag: 'fr',
      },
      additionalData: {
        institutionOptions: [
          { label: 'Etab A', value: 'A' },
          { label: 'Etab B', value: 'B' },
          { label: 'Etab C', value: 'C' },
        ],
        redirectUrl: 'http://host.docker.internal:8081/realms/CLIN/account/#/',
        emailValidationRegexList: ['.med@ssss.gouv.qc.ca', '@ssss.gouv.qc.ca', '@ferlab.bio'],
      },
      message: undefined,
    },
    {
      pageId: 'login-verify-email.ftl',
    },
    {
      pageId: 'error.ftl',
      locale: {
        currentLanguageTag: 'fr',
      },
    },
    {
      pageId: 'login-reset-password.ftl',
      locale: {
        currentLanguageTag: 'fr',
      },
    },
    {
      pageId: 'login-update-password.ftl',
      username: 'johndoe.med@ssss.gouv.qc.ca',
      locale: {
        currentLanguageTag: 'en',
      },
      message: undefined,
    },
    {
      pageId: 'info.ftl',
      client: {
        baseUrl: 'https://prescription.qa.cqgc.hsj.rtss.qc.ca/',
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
