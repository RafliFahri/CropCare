/**
 * TODO: Implement the Refresh API route to handle generating a new access token using a valid refresh token.
 * NOTE: This route should return a new access token
 */

import { verifyRefreshToken, generateAccessToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();
    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    // Verify the refresh token by Decode the token
    const userData = await verifyRefreshToken(refreshToken);
    if (!userData) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
    console.log(userData);
    // Generate a new access token
    const accessToken = await generateAccessToken({ userID: userData.userID, email: userData.email });

    return NextResponse.json({ accessToken: accessToken }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}