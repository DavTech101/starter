import isUUID from '@utils/isUUID';
import prisma from '@utils/prisma';

//##########################################################################################
// GET SIZES
//##########################################################################################
export const getReviews = async (storeId: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//##########################################################################################
// GET SIZE BY ID
//##########################################################################################
export const getReviewById = async (reviewId: string) => {
  try {
    if (!isUUID(reviewId)) return null;

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    return review;
  } catch (error) {
    console.error(error);
    return null;
  }
};
