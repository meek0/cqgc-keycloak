import { Typography } from 'antd';
import Link from 'antd/lib/typography/Link';
import type { I18n } from 'keycloak/i18n';
import { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';

import ErrorIcon from 'assets/ErrorIcon';
import MainSideImage from 'assets/side-img-svg.svg';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const expiryMessages = ['Action expired', 'Action expirée'];

const ErrorContainer = ({
  redirectUrl,
  advancedMsg,
}: {
  redirectUrl: string;
  advancedMsg: any;
}) => (
  <div className={styles.errorContainer}>
    <ErrorIcon className={styles.errorIcon} />
    <Title level={4}>{advancedMsg('error_title')}</Title>
    <Text className={styles.errorMessage}>
      {advancedMsg('error_message')} <Link href={redirectUrl}>{advancedMsg('try_again')}</Link>
    </Text>
    <div className={styles.contact}>
      <Text>{advancedMsg('error_contact_text')}</Text>
      <Text>{advancedMsg('error_contact_name')}</Text>
      <Link href={`mailto:${advancedMsg('error_contact_email')}`}>
        {advancedMsg('error_contact_email')}
      </Link>
      <Text>{advancedMsg('error_contact_phone')}</Text>
    </div>
  </div>
);

const ExpiryErrorContainer = ({
  redirectUrl,
  advancedMsg,
}: {
  redirectUrl: string;
  advancedMsg: any;
}) => (
  <div className={styles.expiryErrorContainer}>
    <ErrorIcon className={styles.errorIcon} />
    <Title level={4}>{advancedMsg('expiry_error_title')}</Title>
    <Text className={styles.errorMessage}>{advancedMsg('expiry_error_message_1')}</Text>
    <Text className={styles.errorMessage}>
      {advancedMsg('expiry_error_message_2')}{' '}
      <Link href={redirectUrl}>{advancedMsg('expiry_error_try_again')}</Link>
      {'.'}
    </Text>
  </div>
);

const Error = (props: PageProps<Extract<KcContext, { pageId: 'error.ftl' }>, I18n>) => {
  const { kcContext, i18n } = props;

  const { message, url } = kcContext;

  const { advancedMsgStr } = i18n;

  const isTokenExpired = expiryMessages.filter((m) => message.summary.includes(m)).length > 0;

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.errorPage}>
      <div>
        {isTokenExpired && (
          <ExpiryErrorContainer redirectUrl={url.loginUrl} advancedMsg={advancedMsgStr} />
        )}
        {!isTokenExpired && (
          <ErrorContainer redirectUrl={url.loginUrl} advancedMsg={advancedMsgStr} />
        )}
      </div>
    </SideImageLayout>
  );
};

export { Error, ErrorContainer, ExpiryErrorContainer };
