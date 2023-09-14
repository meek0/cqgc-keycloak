import { Spin } from 'antd';
import type { I18n } from 'keycloak/i18n';
import { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';

import MainSideImage from 'assets/side-img-svg.svg';

const Info = (props: PageProps<Extract<KcContext, { pageId: 'info.ftl' }>, I18n>) => {
  const { kcContext } = props;

  const { url, client } = kcContext;

  window.location.href = client.baseUrl ?? url.loginUrl;

  return (
    <SideImageLayout sideImgSrc={MainSideImage}>
      <Spin />
    </SideImageLayout>
  );
};
export default Info;
