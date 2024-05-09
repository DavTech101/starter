import { ClerkProvider } from '@clerk/nextjs';
import ThemeProvider from '@providers/ThemeProvider';
import ModalProvider from '@providers/ModalProvider';
import ToasterProvider from '@providers/ToasterProvider';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ProvidersProps = {
  children: React.ReactNode;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ClerkProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default Providers;
