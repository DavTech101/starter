import cn from '@utils/styleMerger';

//##########################################################################################
// CONTAINER TYPES
//##########################################################################################
type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

//##########################################################################################
// CONTAINER COMPONENT
//##########################################################################################
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default Container;
