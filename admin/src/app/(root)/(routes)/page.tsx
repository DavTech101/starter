'use client';

import { useEffect } from 'react';
import useStoreModal from '@hooks/useStoreModal';

//##########################################################################################
// SETUP PAGE COMPONENT TYPES
//##########################################################################################

//##########################################################################################
// SETUP PAGE COMPONENT
//##########################################################################################
const SetupPage = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
