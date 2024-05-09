import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Navbar from '@components/navbar/Navbar';
import { getStoreByUserId } from '@server/stores';

//##########################################################################################
// LAYOUT
//##########################################################################################
const StoreDashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  const store = await getStoreByUserId(params.storeId, userId);

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
      <div className='mb-20' />
    </>
  );
};

export default StoreDashboardLayout;
