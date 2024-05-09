'use client';

import Image from 'next/image';
import useIsMounted from '@hooks/useIsMounted';
import { Button } from '@components/ui/Button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ImageUploadProps = {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
};

//##########################################################################################
// COMPONENT
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
      <div className='flex items-center mb-4 gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
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
              className='object-cover w-full h-full'
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
              variant='secondary'
              disabled={disabled}
            >
              <ImagePlus className='size-4 mr-2' />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
