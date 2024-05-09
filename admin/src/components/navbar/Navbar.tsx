import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import NavMenu from '@components/navbar/NavMenu';
import ThemeToggle from '@components/theme/ThemeToggle';
import { getAllStoresByUserId } from '@server/stores';
import StoreSwitcher from '@components/theme/StoreSwitcher';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NavbarProps = {};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Navbar: React.FC<NavbarProps> = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  const stores = await getAllStoresByUserId(userId);

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <NavMenu className='mx-2' />
        <div className='flex items-center space-x-4 ml-auto'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
