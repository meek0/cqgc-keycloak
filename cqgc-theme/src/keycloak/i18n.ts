import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
    // NOTE: Here you can override the default i18n messages
    // or define new ones that, for example, you would have
    // defined in the Keycloak admin UI for UserProfile
    // https://user-images.githubusercontent.com/6702424/182050652-522b6fe6-8ee5-49df-aca3-dba2d33f24a5.png
    en: {
        login_title: "login_title",
        username_label: "username_label",
        password_label: "password_label",
        forgot_password: "forgot_password",
        submit: "Submit",
        cancel: "Cancel",
        required_field_error: "This field is required"
    },
    fr: {
        /* spell-checker: disable */
        login_title: "Prescriptions et analyses",
        username_label: "Courriel (.med@sss.gouv.qc.ca)",
        password_label: "Mot de passe",
        forgot_password: "Mot de passe oublié?",
        submit: "Soumettre",
        cancel: "Annuler",
        required_field_error: "Ce champ est obligatoire"
        /* spell-checker: enable */
    }
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
