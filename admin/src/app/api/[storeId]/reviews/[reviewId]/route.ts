import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET REVIEW BY ID API
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    //##### Check if review exists
    if (!params.reviewId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const review = await prisma.review.findUnique({
      where: {
        id: params.reviewId,
      },
    });

    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error: any) {
    console.log('[SIZE_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
//##########################################################################################
// PATCH REVIEW BY ID API
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; reviewId: string } }
) {
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

    //##### Check if review exists
    if (!params.reviewId) {
      return new NextResponse('Size ID is required', { status: 400 });
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

    const review = await prisma.review.updateMany({
      where: {
        id: params.reviewId,
      },
      data: {
        show,
        title,
        rating,
        author,
        imgURL,
        content,
        storeId: params.storeId,
        productName: productName || '',
      },
    });

    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error: any) {
    console.log('[SIZE_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE REVIEW BY ID API
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; reviewId: string } }
) {
  try {
    const { userId } = auth();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if review exists
    if (!params.reviewId) {
      return new NextResponse('Review ID is required', { status: 400 });
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

    const review = await prisma.review.deleteMany({
      where: {
        id: params.reviewId,
      },
    });

    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error: any) {
    console.log('[SIZE_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
