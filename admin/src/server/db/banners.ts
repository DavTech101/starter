import prisma from '@utils/prisma';
import isUUID from '@utils/isUUID';

//##########################################################################################
// GET ALL BANNERS BY STORE ID
//##########################################################################################
export const getBanners = async (storeId: string) => {
  try {
    const banners = await prisma.banner.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return banners;
  } catch (error) {
    throw new Error(error as any);
  }
};

//##########################################################################################
// GET BANNER BY ID
//##########################################################################################
export const getBannerById = async (bannerId: string) => {
  try {
    if (!isUUID(bannerId)) return null;

    const banner = await prisma.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    return banner;
  } catch (error) {
    throw new Error(error as any);
  }
};


