//##########################################################################################
// LOADER TYPES
//##########################################################################################
type LoaderProps = {
  color?: string;
  width?: string;
  height?: string;
};

//##########################################################################################
// LOADER COMPONENT
//##########################################################################################
const Loader: React.FC<LoaderProps> = ({ color, width, height }) => {
  const w = width ? width : 'w-5';
  const h = height ? height : 'h-5';
  const c = color ? color : 'text-gray-300';

  return (
    <div className={c}>
      <svg
        fill='none'
        viewBox='0 0 24 24'
        className={`mx-auto animate-spin ${w} ${h}`}
      >
        <circle
          r='10'
          cx='12'
          cy='12'
          strokeWidth='4'
          stroke='currentColor'
          className='opacity-25'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0
                    12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                    3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  );
};

export default Loader;

//##########################################################################################
// LOADER2 COMPONENT
//##########################################################################################
export const Loader2: React.FC<LoaderProps> = ({ color, width, height }) => {
  return (
    <div
      className='text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
};
