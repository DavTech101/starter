import '@styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@providers/Providers';

//##########################################################################################
// METADATA
//##########################################################################################
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'New Admin',
    template: '%s | New Admin',
  },
  description: 'New Admin Dashboard',
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
