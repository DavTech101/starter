import cn from '@utils/styleMerger';

//##########################################################################################
// RESPONSE SHOW TYPES
//##########################################################################################
type ResponseShowProps = {
  success: boolean;
  message: string;
};

//##########################################################################################
// RESPONSE SHOW COMPONENT
//##########################################################################################
const ResponseShow: React.FC<ResponseShowProps> = ({ success, message }) => {
  return success ? (
    <h1 className={cn('text-2xl font-bold', 'text-green-500')}>{message}</h1>
  ) : (
    <h1 className={cn('text-2xl font-bold', 'text-red-500')}>{message}</h1>
  );
};

export default ResponseShow;
