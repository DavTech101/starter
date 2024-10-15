//##########################################################################################
// TEXTAREA SKELETON TYPES
//##########################################################################################
type TextareaSkeletonProps = {};

//##########################################################################################
// TEXTAREA SKELETON COMPONENT
//##########################################################################################
const TextareaSkeleton: React.FC<TextareaSkeletonProps> = () => {
  return (
    <div className='flex flex-col animate-pulse'>
      <div className='h-4 bg-gray-200 mb-2 rounded w-1/2'></div>
      <div className='w-full h-40 bg-gray-200 rounded'></div>
    </div>
  );
};

export default TextareaSkeleton;
