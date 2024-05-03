//##########################################################################################
// IMAGE SKELETONTYPES
//##########################################################################################
type ImageSkeletonProps = {
  className?: string;
};

//##########################################################################################
// IMAGE SKELETONCOMPONENT
//##########################################################################################
const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`${className} w-full aspect-square rounded-xl bg-gray-300`}
    />
  );
};

export default ImageSkeleton;
