import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getBanners } from '@server/db/banners';

//##########################################################################################
// GET BANNERS BY STORE ID
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

    //##### Get banners
    const banners = await getBanners(params.storeId);

    //##### Return store
    return new NextResponse(JSON.stringify(banners), { status: 200 });
  } catch (error: any) {
    console.log('[BANNERS_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

//##########################################################################################
// CREATE BANNER
//##########################################################################################
export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const { name, imageUrl } = await req.json();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if name is provided
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    //##### Check if imageUrl is provided
    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
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

    //##### Create banner
    const banner = await prisma.banner.create({
      data: {
        name,
        imageUrl,
        storeId: params.storeId,
      },
    });

    //##### Return store
    return new NextResponse(JSON.stringify(banner), { status: 200 });
  } catch (error: any) {
    console.log('[BANNERS_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
