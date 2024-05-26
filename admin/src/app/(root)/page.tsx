'use client';

import { useEffect } from 'react';
import useStoreModal from '@hooks/useStoreModal';

//##########################################################################################
// SETUP PAGE PROPS
//##########################################################################################
type SetupPageProps = {};

//##########################################################################################
// SETUP PAGE COMPONENT
//##########################################################################################
const SetupPage: React.FC<SetupPageProps> = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
