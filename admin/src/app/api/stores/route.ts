import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

//##########################################################################################
// CREATE STORE POST API
//##########################################################################################
export const POST = async (req: Request) => {
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

    //##### Create store
    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    //##### Return store
    return new NextResponse(JSON.stringify(store), { status: 200 });
  } catch (error: any) {
    console.log('[STORES_POST] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
