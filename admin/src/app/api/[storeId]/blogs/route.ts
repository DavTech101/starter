import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET BLOGS API
//##########################################################################################
export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    //##### Check if store exists
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    //##### GET BLOGS
    const blogs = await prisma.blog.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        images: true,
        tags: true,
      },
    });

    const orderedCats = blogs;
    //##### Return blogs
    return new NextResponse(JSON.stringify(orderedCats), { status: 200 });
  } catch (error: any) {
    console.log('[BLOGS_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

//##########################################################################################
// CREATE BLOGS POST API
//##########################################################################################
export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const {
      tags,
      slug,
      title,
      intro,
      author,
      content,
      readTime,
      images,
      metaTitle,
      metaKeywords,
      metaDescription,
      isArchived,
      isFeatured,
    } = await req.json();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if title is provided
    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    //##### Check if slug is provided
    if (!slug) {
      return new NextResponse('Slug is required', { status: 400 });
    }
    //##### Check if intro is provided
    if (!intro) {
      return new NextResponse('Intro is required', { status: 400 });
    }

    //##### Check if content is provided
    if (!content) {
      return new NextResponse('Content is required', { status: 400 });
    }

    //##### Check if author is provided
    if (!author) {
      return new NextResponse('Author is required', { status: 400 });
    }

    //##### Check if store exists
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    //##### Check if store belongs to user
    const storeByUserId = await prisma.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unathorized', { status: 403 });
    }

    //##### Create blog
    const blog = await prisma.blog.create({
      data: {
        slug,
        title,
        intro,
        author,
        content,
        readTime,
        metaTitle,
        isArchived,
        isFeatured,
        metaKeywords,
        metaDescription,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        tags: {
          createMany: {
            data: [
              ...tags.map((tag: { name: string; value: string | number }) => ({
                tagId: tag.value,
              })),
            ],
          },
        },
      },
    });

    // //##### Return blog
    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error: any) {
    console.log('[BLOGS_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
