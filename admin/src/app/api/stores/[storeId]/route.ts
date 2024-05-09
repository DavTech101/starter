import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// PATCH STORE BY ID API
//##########################################################################################
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Missing name', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Missing storeId', { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error: any) {
    console.log('[STORE_PATCH] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

//##########################################################################################
// DELETE STORE BY ID API
//##########################################################################################
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Missing storeId', { status: 400 });
    }

    const store = await prisma.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error: any) {
    console.log('[STORE_DELETE] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
