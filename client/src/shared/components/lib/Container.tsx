import cn from '@/shared/utils/styleMerger';

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
    <div className={cn('mx-auto px-6 lg:px-8 xl:max-w-7xl', className)}>
      {children}
    </div>
  );
};

export default Container;
