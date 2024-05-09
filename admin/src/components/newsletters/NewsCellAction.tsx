'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@components/ui/Button';
import copyToClipboard from '@utils/copyToClipboard';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@components/modals/AlertModal';
import { TNewsColumn } from '@components/newsletters/NewsColumn';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type CellActionProps = {
  data: TNewsColumn;
};

//##########################################################################################
// COMPONENT
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
      await axios.delete(`/api/${storeId}/newsletters/${data.id}`);
      router.refresh();
      toast.success('News deleted.');
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
          <Button variant='ghost' className='size-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy()}>
            <Copy className='size-4 mr-2' />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${storeId}/newsletters/${data.id}`)}
          >
            <Edit className='size-4 mr-2' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='size-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
