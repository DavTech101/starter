import prisma from '@utils/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import SettingsForm from '@components/forms/SettingsForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type SettingsPageProps = {
  params: {
    storeId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect('/login');
  }

  const store = await prisma.store.findFirst({
    where: {
      userId,
      id: storeId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-8 pb-8 pt-6'>
        <SettingsForm store={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
