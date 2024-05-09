import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET NEWSLETTER BY ID API
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { newsId: string } }
) {
  try {
    //##### Check if news exists
    if (!params.newsId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const news = await prisma.newsletter.findUnique({
      where: {
        id: params.newsId,
      },
    });

    return new NextResponse(JSON.stringify(news), { status: 200 });
  } catch (error: any) {
    console.log('[NEWSLETTER_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// PATCH NEWSLETTER BY ID API
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; newsId: string } }
) {
  try {
    const { userId } = auth();
    const { email } = await req.json();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if email is provided
    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    //##### Check if news exists
    if (!params.newsId) {
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

    const news = await prisma.newsletter.updateMany({
      where: {
        id: params.newsId,
      },
      data: {
        email,
      },
    });

    return new NextResponse(JSON.stringify(news), { status: 200 });
  } catch (error: any) {
    console.log('[NEWSLETTER_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE NEWSLETTER BY ID API
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; newsId: string } }
) {
  try {
    const { userId } = auth();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if news exists
    if (!params.newsId) {
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

    const news = await prisma.newsletter.deleteMany({
      where: {
        id: params.newsId,
      },
    });

    return new NextResponse(JSON.stringify(news), { status: 200 });
  } catch (error: any) {
    console.log('[NEWSLETTER_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
