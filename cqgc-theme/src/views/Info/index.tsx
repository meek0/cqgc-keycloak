import { Typography } from 'antd';
import Link from 'antd/lib/typography/Link';
import type { I18n } from 'keycloak/i18n';
import { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';

import InfoIcon from 'assets/InfoIcon';
import MainSideImage from 'assets/side-img-svg.svg';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const Info = (props: PageProps<Extract<KcContext, { pageId: 'info.ftl' }>, I18n>) => {
  const { kcContext, i18n } = props;
  const { url, client } = kcContext;

  window.location.href = client.baseUrl ?? url.loginUrl;
  const { advancedMsgStr } = i18n;

  return (
    <SideImageLayout sideImgSrc={MainSideImage}>
      <div className={styles.infoContainer}>
        <InfoIcon className={styles.infoIcon} />
        <Title level={3}>{advancedMsgStr('activation_title')}</Title>
        <Text className={styles.infoMessage}>{advancedMsgStr('activation_text')}</Text>
        <div className={styles.contact}>
          <Text>{advancedMsgStr('error_contact_name')}</Text>
          <Link href={`mailto:${advancedMsgStr('error_contact_email')}`}>
            {advancedMsgStr('error_contact_email')}
          </Link>
          <Text>{advancedMsgStr('error_contact_phone')}</Text>
        </div>
      </div>
    </SideImageLayout>
  );
};
export default Info;
