import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { HOME_ROUTE } from '@data/routes';
import cn from '@/shared/utils/styleMerger';
import { COMPANY_LOGO } from '@data/constants';
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
    <Link href={HOME_ROUTE}>
      <div
        className={cn('size-20', 'relative my-auto overflow-hidden', className)}
      >
        <Suspense fallback={<LineSkeleton h='h-20' />}>
          <Image
            fill
            alt={COMPANY_LOGO.alt}
            src={COMPANY_LOGO.link}
            className='object-cover object-center'
          />
        </Suspense>
      </div>
    </Link>
  );
};

export default Logo;
