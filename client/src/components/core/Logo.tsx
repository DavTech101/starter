import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import cn from '@utils/styleMerger';
import LineSkeleton from '@components/skeletons/LineSkeleton';

//##########################################################################################
// LOGO TYPES
//##########################################################################################
type LogoProps = {
  className?: string;
};

//##########################################################################################
// LOGO COMPONENT
//##########################################################################################
const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href='/'>
      <div
        className={cn(
          `w-44 h-7 sm:w-[21rem] sm:h-14`,
          `relative overflow-hidden my-auto`,
          className
        )}
      >
        <Suspense fallback={<LineSkeleton h='h-14' />}>
          <Image
            fill
            alt={''}
            src={''}
            className='object-cover object-center'
          />
        </Suspense>
      </div>
    </Link>
  );
};

export default Logo;
