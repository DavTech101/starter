//##########################################################################################
// BUTTON SKELETON TYPES
//##########################################################################################
type ButtonSkeletonProps = {
  className?: string;
};

//##########################################################################################
// BUTTON SKELETON COMPONENT
//##########################################################################################
const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`${className} w-auto px-5 py-3 rounded-full 
            bg-gray-300 border-transparent`}
    />
  );
};

export default ButtonSkeleton;
