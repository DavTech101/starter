import {
  Html,
  Body,
  Head,
  Section,
  Preview,
  Tailwind,
  Container,
} from '@react-email/components';

//##########################################################################################
// EMAIL LAYOUT TYPES
//##########################################################################################
type EmailLayoutProps = {
  previewText: string;
  children: React.ReactNode;
};

//##########################################################################################
// FONTS
//##########################################################################################
const fontFamily = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
};

//##########################################################################################
// EMAIL LAYOUT COMPONENT
//##########################################################################################
const EmailLayout: React.FC<EmailLayoutProps> = ({ children, previewText }) => {
  return (
    <Html className='h-full w-full'>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white text-black' style={fontFamily}>
          <Container className='mx-auto bg-gray-200 p-5 shadow-lg'>
            <Section className='flex justify-center gap-5 bg-white'>
              {children}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
