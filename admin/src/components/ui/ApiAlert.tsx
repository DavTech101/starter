'use client';

import { toast } from 'react-hot-toast';
import { Copy, Server } from 'lucide-react';
import { Button } from '@components/ui/Button';
import copyToClipboard from '@utils/copyToClipboard';
import { Badge, BadgeProps } from '@components/ui/Badge';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ApiAlertProps = {
  title: string;
  description: string;
  variant: 'public' | 'admin';
};

//##########################################################################################
// MAPPINGS
//##########################################################################################
const textMap: Record<ApiAlertProps['variant'], string> = {
  admin: 'Admin',
  public: 'Public',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  const onCopy = () => {
    copyToClipboard(description);
    toast.success('Copied to clipboard');
  };

  return (
    <Alert>
      <Server className='size-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='flex items-center justify-between mt-4'>
        <code className='relative px-[0.3rem] py-[0.2rem] rounded bg-muted font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant='outline' size='icon' onClick={onCopy}>
          <Copy className='size-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
