import { memo } from 'react';
import { Button, Space, Typography } from 'antd';
import { KcContext } from 'keycloak/KcContext';
// import { KcProps, useKcMessage } from "keycloakify";
import SideImageLayout from 'layout/SideImage';

import ErrorIcon from 'assets/ErrorIcon';
import MainSideImage from 'assets/side-img-svg.svg';

import styles from './index.module.scss';

type KcContext_Error = Extract<KcContext, { pageId: 'error.ftl' }>;

const { Title, Text } = Typography;

const ErrorContainer = ({ redirectUrl }: { redirectUrl: string }) => (
  // const { advancedMsg } = useKcMessage();

  <div className={styles.errorContainer}>
    <ErrorIcon className={styles.errorIcon} />
    <Title level={4}>OOPS{/*advancedMsg("error_title")*/}</Title>
    <Text className={styles.errorMessage}>{'OOPS' /*advancedMsg("error_message")*/}</Text>
    <Space>
      <Button type="primary" onClick={() => (window.location.href = redirectUrl)}>
        {'OOPS' /*advancedMsg("try_again")*/}
      </Button>
    </Space>
  </div>
);
// eslint-disable-next-line react/display-name
const Error = memo(({ kcContext }: { kcContext: KcContext_Error } /*& KcProps*/) => {
  const { client } = kcContext;

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.errorPage}>
      <ErrorContainer redirectUrl={client.baseUrl || ''} />
    </SideImageLayout>
  );
});

export { Error, ErrorContainer };
