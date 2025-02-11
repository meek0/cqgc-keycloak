import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import type { I18n } from 'keycloak/i18n';
import { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';
import { ErrorContainer } from 'views/Error';

import MainSideImage from 'assets/side-img-svg.svg';
import { useResetPassword } from 'store/resetPassword';
import { resetPassword } from 'store/resetPassword/thunks';
import { TResetPasswordForm } from 'store/resetPassword/types';

import { ResetPasswordConfirmation } from './Confirmation';

import styles from './index.module.scss';

enum FORM_FIELDS {
  EMAIL = 'username',
}

const ResetPassword = (
  props: PageProps<Extract<KcContext, { pageId: 'login-reset-password.ftl' }>, I18n>,
) => {
  const { hasError, pending, showConfirmationScreen } = useResetPassword();

  const { kcContext, i18n } = props;

  const { url, client } = kcContext;

  const { advancedMsg, advancedMsgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(pending);
  const [email, setEmail] = useState('');
  const [resetPasswordDispatched, setResetPasswordDispatched] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fields = [
    {
      name: [FORM_FIELDS.EMAIL],
      value: '',
    },
  ];

  const onFinish = (values: TResetPasswordForm) => {
    setIsLoginButtonDisabled(true);
    setEmail(values.username || '');

    if (resetPasswordDispatched) return;

    dispatch(
      resetPassword({
        resetPasswordForm: values,
        url: url.loginAction,
      }),
    );

    setResetPasswordDispatched(true);
  };

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.resetPassword}>
      <div>
        {!showConfirmationScreen && !hasError && (
          <div className={styles.resetPasswordContainer}>
            <Title level={2} className={styles.resetPasswordTitle}>
              {advancedMsg('reset_password_title')}
            </Title>
            <Text>{advancedMsg('reset_password_text')}</Text>
            <Form
              className={styles.resetPasswordForm}
              id="kc-reset-password-form"
              name="kc-reset-password-form"
              layout="vertical"
              onFinish={onFinish}
              form={form}
              fields={fields}
            >
              <Form.Item
                name={FORM_FIELDS.EMAIL}
                label={
                  client.clientId === 'clin-prescription-client'
                    ? advancedMsg('username_label_prescription')
                    : advancedMsg('username_label')
                }
                required={true}
                rules={[{ required: true, message: advancedMsg('required_field_error') }]}
              >
                <Input tabIndex={7} suffix={<MailOutlined />} />
              </Form.Item>

              <Space size={'middle'}>
                <Button type="primary" htmlType="submit" disabled={isLoginButtonDisabled}>
                  {advancedMsg('submit')}
                </Button>
                <Button
                  type="default"
                  onClick={() => (window.location.href = (client as any).baseUrl)}
                >
                  {advancedMsg('cancel')}
                </Button>
              </Space>
            </Form>
          </div>
        )}
        {!showConfirmationScreen && hasError && (
          <ErrorContainer advancedMsg={advancedMsgStr} redirectUrl={url.loginResetCredentialsUrl} />
        )}
        {showConfirmationScreen && (
          <ResetPasswordConfirmation email={email} advancedMsg={advancedMsgStr} />
        )}
      </div>
    </SideImageLayout>
  );
};
export default ResetPassword;
