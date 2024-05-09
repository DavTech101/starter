import { create } from 'zustand';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type StoreModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

//##########################################################################################
// DEFAULT VALUES
//##########################################################################################
const useStoreModal = create<StoreModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStoreModal;
