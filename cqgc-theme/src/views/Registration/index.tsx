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

import MainSideImage from 'assets/side-img-svg.svg';
import { register } from 'store/registration/thunks';
import { TRegisterForm } from 'store/registration/types';

import styles from './index.module.scss';

enum FORM_FIELDS {
  TITLE = 'user.attributes.title',
  FIRSTNAME = 'firstName',
  LASTNAME = 'lastName',
  INSTITUTIONS = 'user.attributes.institutions',
  IS_RESIDENT_DOCTOR = 'user.attributes.is_resident_doctor',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'password-confirm',
}

enum TITLES {
  DR = 'dr',
  DRE = 'dre',
}

const fields = [
  {
    name: [FORM_FIELDS.TITLE],
    value: TITLES.DR,
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

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n>,
) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { kcContext, i18n } = props;

  const { advancedMsg, currentLanguageTag } = i18n;

  const { url, additionalData } = kcContext;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onFinish = (values: TRegisterForm) => {
    setIsLoginButtonDisabled(true);

    dispatch(
      register({
        registerForm: values,
        url: url.registrationAction,
        redirectUrl: additionalData.redirectUrl,
      }),
    );
  };

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.registerPage}>
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
        >
          <Form.Item
            name={FORM_FIELDS.TITLE}
            className={styles.inline}
            label={advancedMsg('title_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Radio.Group>
              <Radio value={TITLES.DR} tabIndex={1}>
                {advancedMsg('dr_label')}
              </Radio>
              {currentLanguageTag === 'fr' && (
                <Radio value={TITLES.DRE} tabIndex={2}>
                  {advancedMsg('dre_label')}
                </Radio>
              )}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.FIRSTNAME}
            label={advancedMsg('firstname_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Input tabIndex={3} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.LASTNAME}
            label={advancedMsg('lastname_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Input tabIndex={4} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.INSTITUTIONS}
            label={advancedMsg('institution_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Select
              tabIndex={5}
              mode="multiple"
              // onChange={handleChange}
              options={additionalData.institutionOptions}
            />
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
            label={advancedMsg('username_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Input tabIndex={7} suffix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.PASSWORD}
            label={advancedMsg('password_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Input.Password tabIndex={8} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.PASSWORD_CONFIRM}
            label={advancedMsg('confirm_password_label')}
            required={true}
            rules={[{ required: true, message: advancedMsg('required_field_error') }]}
          >
            <Input.Password tabIndex={9} />
          </Form.Item>

          <Space size={'middle'}>
            <Button type="primary" htmlType="submit" disabled={isLoginButtonDisabled}>
              {advancedMsg('submit')}
            </Button>
            <Button onClick={() => {}}>{advancedMsg('cancel')}</Button>
          </Space>
        </Form>
      </div>
    </SideImageLayout>
  );
}
