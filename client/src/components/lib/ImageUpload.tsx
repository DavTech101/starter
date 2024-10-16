'use client';

import Image from 'next/image';
import useIsMounted from '@hooks/useIsMounted';
import { Button } from '@components/ui/Button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

//##########################################################################################
// IMAGE UPLOAD TYPES
//##########################################################################################
type ImageUploadProps = {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
};

//##########################################################################################
// IMAGE UPLOAD COMPONENT
//##########################################################################################
const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onRemove,
}) => {
  const isMounted = useIsMounted();
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
          >
            <div className='absolute right-2 top-2 z-10'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className='size-4' />
              </Button>
            </div>
            <Image
              fill
              src={url}
              alt='Image'
              className='h-full w-full object-cover'
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset={uploadPreset}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type='button'
              onClick={onClick}
              
              disabled={disabled}
              className='bg-slate-400 text-white hover:bg-slate-500'
            >
              <ImagePlus className='mr-2 size-4' />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
