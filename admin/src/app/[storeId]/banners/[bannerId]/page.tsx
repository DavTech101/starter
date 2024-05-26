import { getBannerById } from '@server/db/banners';
import BannerForm from '@components/banners/BannerForm';

//##########################################################################################
// BANNER TYPE
//##########################################################################################
type PageProps = {
  params: {
    bannerId: string;
  };
};

//##########################################################################################
// BANNER PAGE
//##########################################################################################
const BannerPage: React.FC<PageProps> = async ({ params }) => {
  const banner = await getBannerById(params.bannerId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BannerForm initialData={banner} />
      </div>
    </div>
  );
};

export default BannerPage;
