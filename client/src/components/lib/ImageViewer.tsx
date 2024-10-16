import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import cn from '@utils/styleMerger';
import LineSkeleton from '@components/skeletons/LineSkeleton';

//##########################################################################################
// IMAGE VIEWER TYPES
//##########################################################################################
type ViewerProps = {
  src: string;
  alt: string;
  h?: string;
};

type ImageViewerProps = {
  alt: string;
  className?: string;
  src: string | null;
  href?: string | null;
};

//##########################################################################################
// VIEWER COMPONENT
//##########################################################################################
const Viewer: React.FC<ViewerProps> = ({ src, alt, h }) => {
  return (
    <Suspense fallback={<LineSkeleton h={h} />}>
      <Image src={src} alt={alt} fill className='object-cover object-center' />
    </Suspense>
  );
};

//##########################################################################################
// IMAGE VIEWER COMPONENT
//##########################################################################################
const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  href = '',
  className = '',
}) => {
  if (!src) return null;

  const defaultClasses = 'relative size-full rounded-md overflow-hidden';
  const viewer = <Viewer src={src} alt={alt} h={defaultClasses} />;

  return (
    <Suspense fallback={<LineSkeleton h={defaultClasses} />}>
      {href ? (
        <Link href={href}>
          <div className={cn('cursor-pointer', defaultClasses, className)}>
            {viewer}
          </div>
        </Link>
      ) : (
        <div className={cn(defaultClasses, className)}>{viewer}</div>
      )}
    </Suspense>
  );
};

export default ImageViewer;
