import '@styles/globals.css';
import cn from '@utils/styleMerger';
import type { Metadata } from 'next';
import Providers from '@providers/Providers';
import { Montserrat } from 'next/font/google';
import { CLIENT_BASE_URL } from '@data/routes';
import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';

//##########################################################################################
// META DATA
//##########################################################################################
const font = Montserrat({
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: {
    default: 'New app',
    template: `%s | New App`,
  },
  description: `
    Example description`,
  metadataBase: new URL(CLIENT_BASE_URL),
  verification: {
    google: '',
  },
};

//##########################################################################################
// ROOT LAYOUT
//##########################################################################################
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Providers>
        <body
          className={cn(
            `relative text-cs-blue`,
            `grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]`,
            `lg:text-lg`,
            font.className
          )}
        >
          {/* Header */}
          <header>
            <Navbar />
          </header>

          {/* Main */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
          {/* Cookies, Analytics etc. */}
        </body>
      </Providers>
    </html>
  );
}
