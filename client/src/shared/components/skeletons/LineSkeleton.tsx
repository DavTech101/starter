//##########################################################################################
// LINE SKELETON TYPES
//##########################################################################################
type LineSkeletonProps = {
  w?: string;
  h?: string;
};

//##########################################################################################
// LINE SKELETON COMPONENT
//##########################################################################################
const LineSkeleton: React.FC<LineSkeletonProps> = ({ w, h }) => {
  const width = w || 'w-full';
  const height = h || 'h-6';

  return (
    <div className='animate-pulse flex flex-col'>
      <div className={`${width} ${height} bg-gray-300 rounded`} />
    </div>
  );
};

export default LineSkeleton;
