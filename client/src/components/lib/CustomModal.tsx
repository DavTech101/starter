'use client';

import { X } from 'lucide-react';
import cn from '@utils/styleMerger';
import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

//##########################################################################################
// CUSTOM MODAL TYPES
//##########################################################################################
type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

//##########################################################################################
// CUSTOM MODAL COMPONENT
//##########################################################################################
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [handleEscapeKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && children && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 z-40 overflow-hidden bg-black/50'
          />

          {/* MODAL */}
          <motion.div
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', x: '-50%', scale: 1 }}
            initial={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={cn(
              'max-h-[40rem] w-[30rem] max-w-[90%]',
              'fixed left-1/2 top-1/2 z-50 p-6',
              'overflow-y-auto rounded-lg bg-white shadow-xl'
            )}
          >
            <button
              onClick={onClose}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
