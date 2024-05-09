'use client';

import Modal from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import useIsMounted from '@hooks/useIsMounted';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type AlertModalProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  loading,
  onConfirm,
}) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Are you sure?'
      description='This action cannot be undone.'
    >
      <div className='flex items-center justify-end w-full pt-6 space-x-2'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
