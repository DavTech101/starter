import { X } from 'lucide-react';
import cn from '@utils/styleMerger';

//##########################################################################################
// CUSTOM MODAL TYPES
//##########################################################################################
type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

//##########################################################################################
// CUSTOM MODAL COMPONENT
//##########################################################################################
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center',
        'z-40 h-[100vh] w-screen overflow-scroll',
        'bg-black bg-opacity-50'
      )}
    >
      <div
        className={cn(
          'relative z-[80] max-h-[90%] max-w-[90%]',
          'overflow-scroll rounded-lg bg-neutral-50 p-4'
        )}
      >
        {children}
        <button
          onClick={onClose}
          className={cn(
            'absolute right-5 top-0 mt-4 rounded',
            'bg-red-500 px-4 py-2 text-white',
            'transition-colors hover:bg-red-600'
          )}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
