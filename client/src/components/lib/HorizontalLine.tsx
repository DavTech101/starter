import cn from '@utils/styleMerger';

//##########################################################################################
// HORIZONTAL LINE TYPES
//##########################################################################################
type HorizontalLineProps = {
  className?: string;
};

//##########################################################################################
// HORIZONTAL LINE COMPONENT
//##########################################################################################
const HorizontalLine: React.FC<HorizontalLineProps> = ({ className }) => {
  return (
    <hr className={cn('border-[1.5px] border-t border-stone-800', className)} />
  );
};

export default HorizontalLine;
