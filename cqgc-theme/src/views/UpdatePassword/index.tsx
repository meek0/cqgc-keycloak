// ejected using 'npx eject-keycloak-page'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import type { I18n } from 'keycloak/i18n';
import type { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';
import { ErrorContainer } from 'views/Error';

import MainSideImage from 'assets/side-img-svg.svg';
import { useUpdatePassword } from 'store/updatePassword';
import { updatePassword } from 'store/updatePassword/thunks';
import { TUpdatePasswordForm } from 'store/updatePassword/types';

import styles from './index.module.scss';

enum FORM_FIELDS {
  USERNAME = 'username',
  PASSWORD = 'password-new',
  PASSWORD_CONFIRM = 'password-confirm',
}

export default function UpdatePassword(
  props: PageProps<Extract<KcContext, { pageId: 'login-update-password.ftl' }>, I18n>,
) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { hasError, pending } = useUpdatePassword();

  const { kcContext, i18n } = props;

  const { advancedMsg, advancedMsgStr } = i18n;

  const { message, url, username } = kcContext;

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(pending);

  const fields = [
    {
      name: [FORM_FIELDS.USERNAME],
      value: username,
    },
    {
      name: [FORM_FIELDS.PASSWORD],
      value: null,
    },
    {
      name: [FORM_FIELDS.PASSWORD_CONFIRM],
      value: null,
    },
  ];

  const onFinish = (values: TUpdatePasswordForm) => {
    setIsSubmitButtonDisabled(true);

    dispatch(
      updatePassword({
        updatePasswordForm: values,
        url: url.loginAction,
        redirectUrl: (kcContext.client as any).baseUrl,
      }),
    );
  };

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.updatePasswordPage}>
      <div>
        {(!message || message.type !== 'error') && !hasError && (
          <div className={styles.updatePasswordContainer}>
            <Title level={2}>{advancedMsg('update_password_title')}</Title>
            <Form
              id="kc-passwd-update-form"
              name="kc-passwd-update-form"
              layout="vertical"
              className={styles.updatePasswordForm}
              onFinish={onFinish}
              form={form}
              fields={fields}
            >
              <Form.Item
                name={FORM_FIELDS.PASSWORD}
                label={advancedMsg('new_password_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: advancedMsgStr('password_format_error'),
                  },
                ]}
              >
                <div>
                  <Input.Password tabIndex={8} />
                  <Text type="secondary">{advancedMsg('password_format_hint')}</Text>
                </div>
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.PASSWORD_CONFIRM}
                label={advancedMsg('confirm_password_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue(FORM_FIELDS.PASSWORD) === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(advancedMsgStr('password_verification_error')),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password tabIndex={9} />
              </Form.Item>

              <Space size={'middle'}>
                <Button type="primary" htmlType="submit" disabled={isSubmitButtonDisabled}>
                  {advancedMsg('submit')}
                </Button>
              </Space>
            </Form>
          </div>
        )}
        {(hasError || message?.type === 'error') && (
          <ErrorContainer redirectUrl={window.location.href} advancedMsg={advancedMsgStr} />
        )}
      </div>
    </SideImageLayout>
  );
}
