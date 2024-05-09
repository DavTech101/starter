import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET BLOG BY ID API
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    //##### Check if blog exists
    if (!params.blogId) {
      return new NextResponse('Blog ID is required', { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: params.blogId,
      },
      include: {
        images: true,
      },
    });

    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error: any) {
    console.log('[BLOG_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// PATCH BLOG BY ID API
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; blogId: string } }
) {
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

    const blog = await prisma.blog.update({
      where: {
        id: params.blogId,
      },
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
          deleteMany: {},
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        tags: {
          deleteMany: {},
          createMany: {
            data: tags.map((tag: { name: string; value: string | number }) => ({
              tagId: tag.value,
            })),
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error: any) {
    console.log('[BLOG_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE BLOG BY ID API
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; blogId: string } }
) {
  try {
    const { userId } = auth();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if blog exists
    if (!params.blogId) {
      return new NextResponse('Blog ID is required', { status: 400 });
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

    await prisma.blogTag.deleteMany({
      where: {
        blogId: params.blogId,
      },
    });

    const blog = await prisma.blog.deleteMany({
      where: {
        id: params.blogId,
      },
    });

    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error: any) {
    console.log('[BLOG_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
