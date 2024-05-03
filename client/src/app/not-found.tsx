import { SubTitle } from '@styles/coreStyles';
import Container from '@components/ui/Container';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NotFoundProps = {};

//##########################################################################################
// COMPONENT
//##########################################################################################
const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <Container className='min-h-[60vh] h-full'>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <h2 className={SubTitle}>THIS PAGE DOES NOT EXIST</h2>
      </div>
    </Container>
  );
};

export default NotFound;
