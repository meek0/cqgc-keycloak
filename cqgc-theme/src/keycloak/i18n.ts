import { createUseI18n } from 'keycloakify/login';

export const { useI18n } = createUseI18n({
  // NOTE: Here you can override the default i18n messages
  // or define new ones that, for example, you would have
  // defined in the Keycloak admin UI for UserProfile
  // https://user-images.githubusercontent.com/6702424/182050652-522b6fe6-8ee5-49df-aca3-dba2d33f24a5.png
  en: {
    login_title: 'Prescriptions and analyzes',
    username_label: 'Email (.med@sss.gouv.qc.ca)',
    password_label: 'Password',
    forgot_password: 'Forgot password',
    submit: 'Submit',
    cancel: 'Cancel',
    required_field_error: 'This field is required',
    registration_title: 'Create Your Account',
    title_label: 'Title',
    dr_label: 'Dr.',
    dre_label: 'dre_label',
    firstname_label: 'First Name',
    lastname_label: 'Last Name',
    institution_label: 'Prescribing Institution',
    is_resident_doctor_label: 'I am a resident doctor',
    confirm_password_label: 'Password Confirmation',
  },
  fr: {
    /* spell-checker: disable */
    login_title: 'Prescriptions et analyses',
    username_label: 'Courriel (.med@sss.gouv.qc.ca)',
    password_label: 'Mot de passe',
    forgot_password: 'Mot de passe oublié?',
    submit: 'Soumettre',
    cancel: 'Annuler',
    required_field_error: 'Ce champ est obligatoire',
    registration_title: 'Création de compte',
    title_label: 'Titre',
    dr_label: 'Dr',
    dre_label: 'Dre',
    firstname_label: 'Prénom',
    lastname_label: 'Nom',
    institution_label: 'Sélectionnez vos établissements prescripteurs',
    is_resident_doctor_label: 'Je suis un médecin résident',
    confirm_password_label: 'Confirmation du mot de passe',
    /* spell-checker: enable */
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
