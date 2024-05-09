import prisma from '@utils/prisma';
import { NextResponse } from 'next/server';

//##########################################################################################
// PATCH CATEGORY META BY ID API
//##########################################################################################
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    //##### Check if category exists
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    const categoryMeta = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
      select: {
        metaTitle: true,
        metaKeywords: true,
        metaDescription: true,
      },
    });

    return new NextResponse(JSON.stringify(categoryMeta), { status: 200 });
  } catch (error: any) {
    console.log('[CATEGORY_META_GET] error:', error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
