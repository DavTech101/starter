import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET BANNER BY ID
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    //##### Check if banner exists
    if (!params.bannerId) {
      return new NextResponse('Banner ID is required', { status: 400 });
    }

    const banner = await prisma.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    return new NextResponse(JSON.stringify(banner), { status: 200 });
  } catch (error: any) {
    console.log('[BANNER_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// PATCH BANNER BY ID
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; bannerId: string } }
) {
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

    //##### Check if banner exists
    if (!params.bannerId) {
      return new NextResponse('Banner ID is required', { status: 400 });
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

    const banner = await prisma.banner.updateMany({
      where: {
        id: params.bannerId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(banner), { status: 200 });
  } catch (error: any) {
    console.log('[BANNER_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE BANNER BY ID
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; bannerId: string } }
) {
  try {
    const { userId } = auth();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if banner exists
    if (!params.bannerId) {
      return new NextResponse('Banner ID is required', { status: 400 });
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

    const banner = await prisma.banner.deleteMany({
      where: {
        id: params.bannerId,
      },
    });

    return new NextResponse(JSON.stringify(banner), { status: 200 });
  } catch (error: any) {
    console.log('[BANNER_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
