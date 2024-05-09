import { NextResponse } from 'next/server';

//##########################################################################################
// GET API
//##########################################################################################
export const GET = async (req: Request) => {
  return new NextResponse(JSON.stringify('Welcome to Store API'), {
    status: 200,
  });
};
