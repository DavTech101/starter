'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@components/ui/Button';
import copyToClipboard from '@utils/copyToClipboard';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@components/modals/AlertModal';
import { TBannerColumn } from '@components/banners/BannerColumn';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@components/ui/DropdownMenu';

//##########################################################################################
// BANNER CELL ACTION TYPES
//##########################################################################################
type CellActionProps = {
  data: TBannerColumn;
};

//##########################################################################################
// BANNER CELL ACTION COMPONENT
//##########################################################################################
const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = () => {
    copyToClipboard(data.id);
    toast.success('Copied ID to clipboard');
  };

  //###### HANDLE DELETE
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/banners/${data.id}`);
      router.refresh();
      toast.success('Banner deleted.');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy()}>
            <Copy className='w-4 h-4 mr-2' />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/banners/${data.id}`)}
          >
            <Edit className='w-4 h-4 mr-2' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='w-4 h-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
