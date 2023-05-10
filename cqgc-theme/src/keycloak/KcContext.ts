import { getKcContext } from 'keycloakify/login';

type TInstitution = {
  label: string;
  value: string;
};

type TAdditionalData = {
  institutionOptions: TInstitution[];
  redirectUrl: string;
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
  // mockPageId: "login.ftl",
  // mockPageId: 'register.ftl',
  // mockPageId: 'login-verify-email.ftl',
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
    },
    {
      //NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
      pageId: 'register-user-profile.ftl',
      locale: {
        currentLanguageTag: 'fr',
      },
      profile: {
        attributes: [
          {
            validators: {
              pattern: {
                pattern: '^[a-zA-Z0-9]+$',
                'ignore.empty.value': true,
                // eslint-disable-next-line no-template-curly-in-string
                'error-message': '${alphanumericalCharsOnly}',
              },
            },
            //NOTE: To override the default mock value
            value: undefined,
            name: 'username',
          },
          {
            validators: {
              options: {
                options: [
                  'male',
                  'female',
                  'non-binary',
                  'transgender',
                  'intersex',
                  'non_communicated',
                ],
              },
            },
            // eslint-disable-next-line no-template-curly-in-string
            displayName: '${gender}',
            annotations: {},
            required: true,
            groupAnnotations: {},
            readOnly: false,
            name: 'gender',
          },
        ],
      },
    },
    {
      pageId: 'register.ftl',
      locale: {
        //When we test the login page we do it in french
        currentLanguageTag: 'fr',
      },
      redirectUrl: 'http://localhost:8080/realms/CLIN/account/#/',
      additionalData: {},
      // Simulate we got an error with the email field
      messagesPerField: {
        printIfExists: <T>(fieldName: string, className: T) => {
          // eslint-disable-next-line no-console
          console.log({ fieldName });
          return fieldName === 'email' ? className : undefined;
        },
        existsError: (fieldName: string) => fieldName === 'email',
        get: (fieldName: string) => `Fake error for ${fieldName}`,
        exists: (fieldName: string) => fieldName === 'email',
      },
    },
    {
      pageId: 'login-verify-email.ftl',
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
