/* eslint-disable complexity */
// ejected using 'npx eject-keycloak-page'
import { useState } from 'react';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import Link from 'antd/lib/typography/Link';
import Title from 'antd/lib/typography/Title';
import cx from 'classnames';
import type { I18n } from 'keycloak/i18n';
import type { KcContext } from 'keycloak/KcContext';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import { assert } from 'keycloakify/tools/assert';
import SideImageLayout from 'layout/SideImage';
import { ExpiryErrorContainer } from 'views/Error';

import CQGCIcon from 'assets/CGQCIcon';
import CQGCLogo from 'assets/CQGCLogo';
import Divider from 'assets/Divider';
import MSSSIcon from 'assets/MSSSIcon';
import MainSideImage from 'assets/side-img-svg.svg';

import styles from './index.module.scss';

const expiryMessages = ['Action expired', 'Action expirée'];
const invalidCredentialsMessages = [
  'Invalid username or password.',
  "Nom d'utilisateur ou mot de passe invalide.",
];

const { Text } = Typography;

export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { realm, url, locale, message, client, social } = kcContext;

  const { currentLanguageTag, changeLocale, advancedMsg, advancedMsgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [showLoginForm, toggleShowLoginForm] = useState(false);

  const isTokenExpired = message
    ? expiryMessages.filter((m) => message.summary.includes(m)).length > 0
    : false;

  const isInvalidCredentials = message
    ? invalidCredentialsMessages.filter((m) => message.summary === m).length > 0
    : false;

  const onFinish = () => {
    setIsLoginButtonDisabled(true);

    const formElement = document.getElementById('kc-form-login') as HTMLFormElement;

    formElement.submit();
  };

  const socialImageMapping: any = {
    microsoft: <MSSSIcon />,
    cqgc: <CQGCIcon />,
  };

  const socialProviders = social.providers || [];

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.loginPage}>
      <div>
        {!isTokenExpired && (
          <div className={styles.loginContainer}>
            <div className={styles.switchLang}>
              {realm.internationalizationEnabled &&
                client.clientId !== 'clin-prescription-client' &&
                (assert(locale !== undefined), true) &&
                locale.supported.length > 1 && (
                  <div id="kc-locale-wrapper" className={getClassName('kcLocaleWrapperClass')}>
                    <div className="kc-dropdown" id="kc-locale-dropdown">
                      {locale.supported.map(({ languageTag }) => (
                        <Button
                          id={languageTag}
                          key={languageTag}
                          hidden={languageTag === currentLanguageTag}
                          onClick={() => {
                            changeLocale(languageTag);
                          }}
                          type="primary"
                        >
                          {languageTag.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className={styles.loginCard}>
              <div className={styles.logoContainer}>
                <CQGCLogo />
                <Divider />
                <Title level={3} className={styles.loginTitle}>
                  {client.clientId === 'clin-prescription-client'
                    ? advancedMsg('login_title_prescription')
                    : advancedMsg('login_title')}
                </Title>
              </div>
              {!showLoginForm && (
                <div className={styles.loginFormContent}>
                  <Title level={4} className={styles.loginOptions}>
                    {advancedMsg('login_options')}
                  </Title>
                  <div
                    id="kc-form"
                    className={cx(realm.password && getClassName('kcLocaleWrapperClass'))}
                  >
                    {realm.password && (
                      <Space
                        id="kc-social-providers"
                        className={styles.socialProviders}
                        direction="vertical"
                        size={16}
                      >
                        {socialProviders.map((p) => (
                          <a
                            href={p.loginUrl}
                            id={`social-${p.alias}`}
                            className={cx(styles.socialLoginBtn, p.providerId)}
                            key={p.providerId}
                          >
                            <div className={styles.socialIcon}>{socialImageMapping[p.alias]}</div>
                            <span className="sr-only">{advancedMsg('login_title')}</span>
                            <Text>{p.displayName}</Text>
                          </a>
                        ))}
                        <a
                          id={`social-CQGC`}
                          className={cx(styles.socialLoginBtn)}
                          key={'CQGC'}
                          onClick={() => {
                            toggleShowLoginForm(true);
                          }}
                        >
                          <div className={styles.socialIcon}>{socialImageMapping['cqgc']}</div>
                          <span className="sr-only">{advancedMsg('login_title')}</span>
                          <Text>CQGC</Text>
                        </a>
                      </Space>
                    )}
                  </div>
                </div>
              )}
              {isInvalidCredentials && true && (
                <Alert
                  message={advancedMsg('login_failed_title')}
                  description={advancedMsg('login_failed_message')}
                  type={'error'}
                  showIcon
                  icon={<WarningOutlined />}
                />
              )}

              {showLoginForm && (
                <Form
                  className={styles.loginForm}
                  id="kc-form-login"
                  name="kc-form-login"
                  layout="vertical"
                  onFinish={onFinish}
                  action={url.loginAction}
                  method="post"
                >
                  <Form.Item
                    label={
                      client.clientId === 'clin-prescription-client'
                        ? advancedMsg('username_label_prescription')
                        : advancedMsg('username_label')
                    }
                    required={true}
                    rules={[{ required: true, message: advancedMsg('required_field_error') }]}
                  >
                    <Input id="username" name="username" tabIndex={1} suffix={<MailOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label={advancedMsg('password_label')}
                    required={true}
                    rules={[{ required: true, message: advancedMsg('required_field_error') }]}
                  >
                    <div>
                      <Input.Password id="password" name="password" tabIndex={2} />
                      <Link href={url.loginResetCredentialsUrl}>
                        {advancedMsg('forgot_password')}
                      </Link>
                    </div>
                  </Form.Item>

                  <Space size={'middle'}>
                    <Button type="primary" htmlType="submit" disabled={isLoginButtonDisabled}>
                      {advancedMsg('submit')}
                    </Button>
                    <Button
                      type="default"
                      onClick={() => (window.location.href = (kcContext.client as any).baseUrl)}
                    >
                      {advancedMsg('cancel')}
                    </Button>
                  </Space>
                </Form>
              )}
            </div>
          </div>
        )}
        {isTokenExpired && (
          <ExpiryErrorContainer
            advancedMsg={advancedMsgStr}
            redirectUrl={url.loginResetCredentialsUrl}
          />
        )}
      </div>
    </SideImageLayout>
  );
}
