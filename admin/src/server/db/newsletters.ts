import isUUID from '@utils/isUUID';
import prisma from '@utils/prisma';

//##########################################################################################
// GET NEWSLETTERS
//##########################################################################################
export const getNews = async (storeId: string) => {
  try {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return newsletters;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//##########################################################################################
// GET NEWSLETTER BY ID
//##########################################################################################
export const getNewsById = async (newsId: string) => {
  try {
    if (!isUUID(newsId)) return null;

    const news = await prisma.newsletter.findUnique({
      where: {
        id: newsId,
      },
    });

    return news;
  } catch (error) {
    console.error(error);
    return null;
  }
};
