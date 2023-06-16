import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';

import WarnIcon from 'assets/WarnIcon';

import styles from './index.module.scss';

const EmailAlreadyExists = ({
  loginUrl,
  resetPasswordUrl,
  advancedMsg,
}: {
  loginUrl: string;
  resetPasswordUrl: string;
  advancedMsg: any;
}) => (
  <div className={styles.emailAlreadyExistsContainer}>
    <WarnIcon className={styles.warnIcon} />
    <Title level={4}>{advancedMsg('email_already_exists_title')}</Title>
    <Text className={styles.message}>
      {advancedMsg('email_already_exists_message_1')}{' '}
      <Link href={loginUrl}>{advancedMsg('email_already_exists_login')}</Link>{' '}
      {advancedMsg('email_already_exists_message_2')}{' '}
      <Link href={resetPasswordUrl}>{advancedMsg('email_already_exists_reset_password')}</Link>.
    </Text>
    <div className={styles.contact}>
      <Text>{advancedMsg('email_already_exists_contact_text')}</Text>
      <Text>{advancedMsg('error_contact_name')}</Text>
      <Link href={`mailto:${advancedMsg('error_contact_email')}`}>
        {advancedMsg('error_contact_email')}
      </Link>
      <Text>{advancedMsg('error_contact_phone')}</Text>
    </div>
  </div>
);

export { EmailAlreadyExists };
