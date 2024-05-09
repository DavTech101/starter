import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET TAGS API
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

    //##### Get sized
    const tags = await prisma.tag.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    //##### Return tags
    return new NextResponse(JSON.stringify(tags), { status: 200 });
  } catch (error: any) {
    console.log('[TAGS_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

//##########################################################################################
// CREATE TAGS POST API
//##########################################################################################
export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if name is provided
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
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

    //##### Create Tag
    const tag = await prisma.tag.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });

    //##### Return tag
    return new NextResponse(JSON.stringify(tag), { status: 200 });
  } catch (error: any) {
    console.log('[TAGS_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
