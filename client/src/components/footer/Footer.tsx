import cn from '@utils/styleMerger';
import Logo from '@components/core/Logo';
import Container from '@components/lib/Container';
import Copyright from '@components/core/Copyright';

//##########################################################################################
// FOOTER TYPES
//##########################################################################################
type FooterProps = {};

//##########################################################################################
// FOOTER COMPONENT
//##########################################################################################
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      className={cn('relative mt-5 pb-10 pt-5', 'shadow-2xl shadow-gray-200')}
    >
      <Container>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex justify-center text-teal-600 sm:justify-start'>
            <Logo className='size-24' />
          </div>

          <Copyright />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
