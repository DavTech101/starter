import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET REVIEW BY ID API
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

    //##### Get sizes
    const sizes = await prisma.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    //##### Return sizes
    return new NextResponse(JSON.stringify(sizes), { status: 200 });
  } catch (error: any) {
    console.log('[SIZES_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

//##########################################################################################
// CREATE REVIEW API
//##########################################################################################
export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { rating, title, author, content, show, imgURL, productName } =
      await req.json();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if title is provided
    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    //##### Check if rating is provided
    if (!rating) {
      return new NextResponse('Rating is required', { status: 400 });
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

    //##### Create review
    const review = await prisma.review.create({
      data: {
        show,
        title,
        rating,
        imgURL,
        author,
        content,
        storeId: params.storeId,
        productName: productName || '',
      },
    });

    //##### Return size
    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error: any) {
    console.log('[SIZES_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
