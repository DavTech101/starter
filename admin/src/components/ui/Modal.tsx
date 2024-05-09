'use client';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@components/ui/Dialog';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ModalProps = {
  title: string;
  isOpen: boolean;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  description,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
