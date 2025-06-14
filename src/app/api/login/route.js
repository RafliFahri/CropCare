import { comparePassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { checkUserIsRegistered, updateUser } from '@/lib/firestore';
import { NextResponse } from 'next/server';

/**
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} A response indicating the result of the login attempt.
 * @constructor
 */

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let userEmail, userPassword;
    if (contentType.includes('application/json')) {
      const { email, password } = await request.json();
      userEmail = email;
      userPassword = password;
    } else if (contentType.includes('multipart/form-data')) {
      const data = await request.formData();
      userEmail = data.get('email');
      userPassword = data.get('password');
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    if (!userEmail || !userPassword) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const checkUser = await checkUserIsRegistered(userEmail);
    if (checkUser.empty) {
      return NextResponse.json({ error: 'Invalid email', data: checkUser }, { status: 400 });
    }

    if (!await comparePassword(userPassword, checkUser.docs[0].data().password)) {
      return NextResponse.json({ error: 'Invalid email or password', data: checkUser.docs[0].data().password }, { status: 400 });
    }
    const accessToken = await generateAccessToken({ userID: checkUser.docs[0].id, email: checkUser.docs[0].data().email });
    const refreshToken = await generateRefreshToken({ userID: checkUser.docs[0].id, email: checkUser.docs[0].data().email });
    await updateUser(
      checkUser.docs[0].id,
      {
        update_at: new Date().toISOString(),
        refresh_token: refreshToken
      }
    );

    const temp = checkUser.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ message: 'Login successful', accessToken: accessToken , refreshToken: refreshToken}, { status: 200 });
  } catch (e) {
    console.error('Error during login:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}