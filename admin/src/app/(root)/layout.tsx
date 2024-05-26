import prisma from '@utils/prisma';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// METADATA
//##########################################################################################
export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

//##########################################################################################
// SETUP LAYOUT
//##########################################################################################
const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  );
};

export default SetupLayout;
