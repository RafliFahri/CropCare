'use server';
import { NextResponse } from "next/server";
import { verifyAccessToken } from '@/lib/auth';

export const config = {
  matcher: '/api/predict',
};

export async function middleware(request) {
  try {
    // console.log(request.headers.get('authorization'));
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Credential Token is required' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const verifyingToken = await verifyAccessToken(token);
    console.log(verifyingToken);
    if (!verifyingToken) {
      return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
    }
    return NextResponse.next(); // Allow the request to proceed

  } catch (e) {
    return NextResponse.json({ error: e.message, message: 'Internal Server Error' }, { status: 500 });
  }
}
