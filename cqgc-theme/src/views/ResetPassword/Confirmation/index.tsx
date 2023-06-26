import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';

import styles from './index.module.scss';

const ResetPasswordConfirmation = ({ email, advancedMsg }: { email: string; advancedMsg: any }) => (
  <div className={styles.resetPasswordConfirmationContainer}>
    <Title level={4}>{advancedMsg('reset_password_confirmation_title')}</Title>
    <Text className={styles.message}>
      {advancedMsg('reset_password_confirmation_message_1')} {email}
    </Text>
    <Text>{advancedMsg('reset_password_confirmation_message_2')}</Text>
    <div className={styles.contact}>
      <Text>{advancedMsg('error_contact_name')}</Text>
      <Link href={`mailto:${advancedMsg('error_contact_email')}`}>
        {advancedMsg('error_contact_email')}
      </Link>
      <Text>{advancedMsg('error_contact_phone')}</Text>
    </div>
  </div>
);

export { ResetPasswordConfirmation };
