import '@styles/globals.css';
import cn from '@utils/styleMerger';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { CLIENT_BASE_URL } from '@data/routes';
import Providers from '@shared/providers/Providers';
import Navbar from '@components/core/navbar/Navbar';
import Footer from '@components/core/footer/Footer';

import {
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  GOOGLE_VERIFICATION_ID,
} from '@data/companyData';

//##########################################################################################
// META DATA
//##########################################################################################
const font = Montserrat({
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  metadataBase: new URL(CLIENT_BASE_URL),
  verification: {
    google: GOOGLE_VERIFICATION_ID,
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
