import cn from '@utils/styleMerger';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default Container;
