// ejected using 'npx eject-keycloak-page'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Radio, Select, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import type { I18n } from 'keycloak/i18n';
import type { KcContext } from 'keycloak/KcContext';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import SideImageLayout from 'layout/SideImage';
import { ErrorContainer } from 'views/Error';

import MainSideImage from 'assets/side-img-svg.svg';
import { useRegistration } from 'store/registration';
import { register } from 'store/registration/thunks';
import { TRegisterForm } from 'store/registration/types';

import { EmailAlreadyExists } from './EmailAlreadyExists';

import styles from './index.module.scss';

enum FORM_FIELDS {
  TITLE = 'user.attributes.title',
  FIRSTNAME = 'firstName',
  LASTNAME = 'lastName',
  LICENSE = 'user.attributes.license',
  LICENSE_CONFIRM = 'user.attributes.license_confirm',
  INSTITUTIONS = 'user.attributes.institutions',
  IS_RESIDENT_DOCTOR = 'user.attributes.is_resident_doctor',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'password-confirm',
}

const specialCharactersRegex = /[!@#$%^&*()_+{}[\]:;<>?~\\|]/;

const hasSpecialCharacters = (inputString: string) => specialCharactersRegex.test(inputString);

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n>,
) {
  const { hasError, errorMessage } = useRegistration();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const resetPasswordUrl = window.location.href.replace('registration', 'reset-credentials');

  const { kcContext, i18n } = props;

  const { advancedMsg, advancedMsgStr, currentLanguageTag } = i18n;

  const { url, additionalData, message } = kcContext;

  const emailRegexPattern = new RegExp(
    '.+((' + additionalData.emailValidationRegexList.join(')|(') + '))',
  );

  // Add an empty title to prevent tooltip on hover
  const institions = additionalData.institutionOptions.map((i) => ({ ...i, title: '' }));

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const fields = [
    {
      name: [FORM_FIELDS.TITLE],
      value: currentLanguageTag === 'en' ? advancedMsgStr('dr_label') : null,
    },
    {
      name: [FORM_FIELDS.FIRSTNAME],
      value: '',
    },
    {
      name: [FORM_FIELDS.LASTNAME],
      value: '',
    },
    {
      name: [FORM_FIELDS.LICENSE],
      value: '',
    },
    {
      name: [FORM_FIELDS.LICENSE_CONFIRM],
      value: '',
    },
    {
      name: [FORM_FIELDS.INSTITUTIONS],
      value: [],
    },
    {
      name: [FORM_FIELDS.IS_RESIDENT_DOCTOR],
      value: false,
    },
    {
      name: [FORM_FIELDS.EMAIL],
      value: '',
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

  const onFinish = (values: TRegisterForm) => {
    setIsLoginButtonDisabled(true);

    dispatch(
      register({
        registerForm: { ...values, username: values.email },
        url: url.registrationAction,
      }),
    );
  };

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.registerPage}>
      <div>
        {!message && !hasError && (
          <div className={styles.registrationContainer}>
            <Title level={2}>{advancedMsg('registration_title')}</Title>
            <Form
              id="kc-register-form"
              name="kc-register-form"
              layout="vertical"
              className={styles.registrationForm}
              onFinish={onFinish}
              form={form}
              fields={fields}
              validateTrigger={'onBlur'}
            >
              <Form.Item
                name={FORM_FIELDS.TITLE}
                className={styles.inline}
                label={advancedMsg('title_label')}
                required={true}
                rules={[{ required: true, message: advancedMsg('required_field_error') }]}
              >
                <Radio.Group>
                  <Radio value={advancedMsgStr('dr_label')} tabIndex={1}>
                    {advancedMsg('dr_label')}
                  </Radio>
                  {currentLanguageTag === 'fr' && (
                    <Radio value={advancedMsgStr('dre_label')} tabIndex={2}>
                      {advancedMsg('dre_label')}
                    </Radio>
                  )}
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.FIRSTNAME}
                label={advancedMsg('firstname_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  { min: 2, message: advancedMsgStr('name_min_error') },
                  {
                    validator: (_, value) => {
                      if (hasSpecialCharacters(value)) {
                        return Promise.reject(advancedMsgStr('name_format_error'));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input tabIndex={3} />
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.LASTNAME}
                label={advancedMsg('lastname_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  { min: 2, message: advancedMsgStr('name_min_error') },
                  {
                    validator: (_, value) => {
                      if (hasSpecialCharacters(value)) {
                        return Promise.reject(advancedMsgStr('name_format_error'));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input tabIndex={4} />
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.LICENSE}
                label={advancedMsg('license_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  {
                    pattern: /^[0-9]{5}$/,
                    message: advancedMsgStr('license_format_error'),
                  },
                ]}
              >
                <Input tabIndex={4} />
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.LICENSE_CONFIRM}
                label={advancedMsg('license_confirm_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue(FORM_FIELDS.LICENSE) === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(advancedMsgStr('license_verification_error')),
                      );
                    },
                  }),
                ]}
              >
                <Input tabIndex={4} />
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.INSTITUTIONS}
                label={advancedMsg('institution_label')}
                required={true}
                rules={[{ required: true, message: advancedMsg('required_field_error') }]}
              >
                <Select tabIndex={5} mode="multiple" options={institions} />
              </Form.Item>

              <Form.Item
                label={advancedMsg('is_resident_doctor_label')}
                className={styles.inline}
                name={FORM_FIELDS.IS_RESIDENT_DOCTOR}
                valuePropName="checked"
              >
                <Checkbox checked={true} tabIndex={6}></Checkbox>
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.EMAIL}
                label={advancedMsg('email_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  {
                    pattern: emailRegexPattern,
                    message: advancedMsgStr('email_format_error'),
                  },
                ]}
              >
                <Input tabIndex={7} suffix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.PASSWORD}
                label={advancedMsg('password_label')}
                required={true}
                rules={[
                  { required: true, message: advancedMsg('required_field_error') },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                ]}
                help={advancedMsg('password_format_hint')}
              >
                <div>
                  <Input.Password tabIndex={8} />
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
                <Button type="primary" htmlType="submit" disabled={isLoginButtonDisabled}>
                  {advancedMsg('submit')}
                </Button>
                <Button onClick={() => (window.location.href = (kcContext.client as any).baseUrl)}>
                  {advancedMsg('cancel')}
                </Button>
              </Space>
            </Form>
          </div>
        )}
        {errorMessage === 'error_email_already_exists' && (
          <EmailAlreadyExists
            loginUrl={url.loginUrl}
            resetPasswordUrl={resetPasswordUrl}
            advancedMsg={advancedMsgStr}
          />
        )}
        {(message?.type === 'error' ||
          (hasError && errorMessage !== 'error_email_already_exists')) && (
          <ErrorContainer redirectUrl={window.location.href} advancedMsg={advancedMsgStr} />
        )}
      </div>
    </SideImageLayout>
  );
}
