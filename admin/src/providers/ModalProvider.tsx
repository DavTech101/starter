'use client';
import useIsMounted from '@hooks/useIsMounted';
import StoreModal from '@components/modals/StoreModal';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ModalProviderProps = {};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ModalProvider: React.FC<ModalProviderProps> = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
