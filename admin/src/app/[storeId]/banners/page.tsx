import { getBanners } from '@server/db/banners';
import BannerClient from '@components/banners/BannerClient';
import { TBannerColumn } from '@components/banners/BannerColumn';

//##########################################################################################
// BANNER PAGE TYPES
//##########################################################################################
type BannerPageProps = {
  params: {
    storeId: string;
  };
};

//##########################################################################################
// BANNER PAGE COMPONENT
//##########################################################################################
const BannerPage: React.FC<BannerPageProps> = async ({ params }) => {
  const banners = await getBanners(params.storeId);

  const formattedBanners: TBannerColumn[] = banners.map((banner) => ({
    id: banner.id,
    name: banner.name,
    imageUrl: banner.imageUrl,
    createdAt: banner.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BannerClient data={formattedBanners} />
      </div>
    </div>
  );
};

export default BannerPage;
