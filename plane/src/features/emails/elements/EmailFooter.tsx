import { Text, Link } from '@react-email/components';
import { TPoweredBy } from '../validation/email.schemas';

//##########################################################################################
// EMAIL FOOTER TYPES
//##########################################################################################
type EmailFooterProps = {
  poweredBy: TPoweredBy;
};

//##########################################################################################
// EMAIL FOOTER COMPONENT
//##########################################################################################
const EmailFooter: React.FC<EmailFooterProps> = ({ poweredBy }) => {
  return (
    <Text className='text-center text-xs text-gray-500'>
      Powered by{' '}
      <Link
        target='_blank'
        href={poweredBy.link}
        title={poweredBy.title}
        rel='noopener noreferrer'
        aria-label={poweredBy.title}
        className='text-blue-500 underline'
      >
        {poweredBy.name}
      </Link>
    </Text>
  );
};

export default EmailFooter;
