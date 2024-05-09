import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// GET TAG BY ID API
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    //##### Check if tag exists
    if (!params.tagId) {
      return new NextResponse('Tag ID is required', { status: 400 });
    }

    const tag = await prisma.tag.findUnique({
      where: {
        id: params.tagId,
      },
    });

    return new NextResponse(JSON.stringify(tag), { status: 200 });
  } catch (error: any) {
    console.log('[TAG_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// PATCH TAG BY ID API
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; tagId: string } }
) {
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

    //##### Check if tag exists
    if (!params.tagId) {
      return new NextResponse('Tag ID is required', { status: 400 });
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

    const tag = await prisma.tag.updateMany({
      where: {
        id: params.tagId,
      },
      data: {
        name,
      },
    });

    return new NextResponse(JSON.stringify(tag), { status: 200 });
  } catch (error: any) {
    console.log('[TAG_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE TAG BY ID API
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; tagId: string } }
) {
  try {
    const { userId } = auth();

    //##### Check if user is logged in
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    //##### Check if size exists
    if (!params.tagId) {
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

    const tag = await prisma.tag.deleteMany({
      where: {
        id: params.tagId,
      },
    });

    return new NextResponse(JSON.stringify(tag), { status: 200 });
  } catch (error: any) {
    console.log('[TAG_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
