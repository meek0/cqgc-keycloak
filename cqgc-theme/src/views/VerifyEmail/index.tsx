import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import type { I18n } from 'keycloak/i18n';
import { KcContext } from 'keycloak/KcContext';
import { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';

import MainSideImage from 'assets/side-img-svg.svg';
import SuccessIcon from 'assets/SuccessIcon';

import styles from './index.module.scss';

export default function LoginVerifyEmail(
  props: PageProps<Extract<KcContext, { pageId: 'login-verify-email.ftl' }>, I18n>,
) {
  const { i18n } = props;

  const { advancedMsg } = i18n;

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.loginPage}>
      <div className={styles.verifyEmailContainer}>
        <SuccessIcon />
        <Title level={4}>{advancedMsg('verify_email_title')}</Title>
        <Text>{advancedMsg('verify_email_message')}</Text>
      </div>
    </SideImageLayout>
  );
}
