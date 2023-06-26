import { lazy, Suspense } from 'react';
import Fallback from 'keycloakify/login';
import { Error } from 'views/Error';

import { useI18n } from './i18n';
import type { KcContext } from './KcContext';

const DefaultTemplate = lazy(() => import('keycloakify/login/Template'));

const Login = lazy(() => import('views/Login'));
const Register = lazy(() => import('views/Registration'));
const ResetPassword = lazy(() => import('views/ResetPassword'));
const LoginVerifyEmail = lazy(() => import('views/VerifyEmail'));
const UpdatePassword = lazy(() => import('views/UpdatePassword'));

export default function App(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    return null;
  }

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case 'login.ftl':
            return (
              <Login {...{ kcContext, i18n }} Template={DefaultTemplate} doUseDefaultCss={true} />
            );
          case 'register.ftl':
            return (
              <Register
                {...{ kcContext, i18n }}
                Template={DefaultTemplate}
                doUseDefaultCss={true}
              />
            );
          case 'login-verify-email.ftl':
            return (
              <LoginVerifyEmail
                {...{ kcContext, i18n }}
                Template={DefaultTemplate}
                doUseDefaultCss={true}
              />
            );
          case 'login-reset-password.ftl':
            return (
              <ResetPassword
                {...{ kcContext, i18n }}
                Template={DefaultTemplate}
                doUseDefaultCss={true}
              />
            );
          case 'login-update-password.ftl':
            return (
              <UpdatePassword
                {...{ kcContext, i18n }}
                Template={DefaultTemplate}
                doUseDefaultCss={true}
              />
            );
          case 'error.ftl':
            return (
              <Error {...{ kcContext, i18n }} Template={DefaultTemplate} doUseDefaultCss={true} />
            );
          default:
            return (
              <Fallback
                {...{ kcContext, i18n }}
                Template={DefaultTemplate}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
