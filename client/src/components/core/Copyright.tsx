import cn from '@utils/styleMerger';

//##########################################################################################
// COPYRIGHT TYPES
//##########################################################################################
type CopyrightProps = {};

//##########################################################################################
// COPYRIGHT COMPONENT
//##########################################################################################
const Copyright: React.FC<CopyrightProps> = () => {
  return (
    <span
      className={cn(
        `absolute w-full text-center text-xs`,
        `left-1/2 transform sm:whitespace-nowrap`,
        `-translate-x-1/2 text-gray-800`,
        'bottom-2'
      )}
    >
      &copy; 2023-{new Date().getFullYear()} ASubToGo, developed by DavTech. All
      rights reserved.
    </span>
  );
};

export default Copyright;
