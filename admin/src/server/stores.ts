import prisma from '@utils/prisma';

//##########################################################################################
// GET STORE BY ID
//##########################################################################################
export const getStoreByUserId = async (storeId: string, userId: string) => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId: userId,
        // userIds: {
        //   has: userId,
        // },
      },
    });

    return store;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//##########################################################################################
// GET ALL STORES BY USERID
//##########################################################################################
export const getAllStoresByUserId = async (userId: string) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        userId: userId,
        // userIds: {
        //   has: userId,
        // },
      },
    });

    return stores;
  } catch (error) {
    console.error(error);
    return [];
  }
};
