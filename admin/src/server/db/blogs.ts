import isUUID from '@utils/isUUID';
import prisma from '@utils/prisma';

//##########################################################################################
// GET BLOGS
//##########################################################################################
export const getBlogs = async (storeId: string) => {
  if (!isUUID(storeId)) return [];

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        storeId,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        images: true,
      },
    });

    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//##########################################################################################
// GET BLOGS BY ID
//##########################################################################################
export const getBlogById = async (blogId: string) => {
  if (!isUUID(blogId)) return null;

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        images: true,
      },
    });

    return blog;
  } catch (error) {
    console.error(error);
    return null;
  }
};
