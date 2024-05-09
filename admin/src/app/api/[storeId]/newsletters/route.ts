import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server' ;

//##########################################################################################
// GET SIZES API
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

    //##### Get newsletters
    const news = await prisma.newsletter.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    //##### Return newsletters
    return new NextResponse(JSON.stringify(news), { status: 200 });
  } catch (error: any) {
    console.log('[NEWSLETTERS_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

//##########################################################################################
// CREATE SIZES POST API
//##########################################################################################
export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
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

    //##### Create newsletter
    const newsletter = await prisma.newsletter.create({
      data: {
        email,
        storeId: params.storeId,
      },
    });

    //##### Return newsletter
    return new NextResponse(JSON.stringify(newsletter), { status: 200 });
  } catch (error: any) {
    console.log('[NEWSLETTERS_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
