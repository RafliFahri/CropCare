import { checkUserExistsByEmail, createdUser, deleteUser, getUser } from '@/lib/firestore';
import { NextResponse } from 'next/server';
import { generateAccessToken, generateRefreshToken, hashPassword } from '@/lib/auth';

/**
 * Handles the POST request to create a new user.
 * @param request
 * @returns {Promise<NextResponse<{result: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>}>|NextResponse<{error}>>}
 * @constructor
 * FIXME: Please edit after adding bcrypt or other cryptographer library, edit the hashPassword function, and the data object.
 */
export async function POST (request) {
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
    const password = await hashPassword(userPassword);
    // await deleteUser('dvyYS0OsrwAjgVYQ3DGQ'); NOTE: This is for testing purposes, please remove it after testing.
    const checkUser = await checkUserExistsByEmail(userEmail);
    if (checkUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    const data = {
      email: userEmail,
      password: password,
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString()
    };
    const uploadData = await createdUser(data);

    const accessToken = await generateAccessToken({ userID: uploadData.id, email: userEmail });

    const refreshToken = await generateRefreshToken({ userID: uploadData.id, email: userEmail });

    (await uploadData.update({ refresh_token: refreshToken }));
    console.log('Updated Data ID:', uploadData.id);
    console.log('Updated Data:', (await uploadData.get()).data());
    // const userData = {
    //   id: uploadData.id,
    //   ...(await uploadData.get()).data(),
    //   access_token: accessToken,
    //   refresh_token: refreshToken
    // };
    return NextResponse.json({ accessToken: accessToken, refreshToken: refreshToken }, { status: 201 })
    // return Response.json({message: 'Create User is Successful', data: dumpData});
  } catch (e) {
    console.error(e);
    // return Response.json({error: 'Failed to create user', message: e.message});
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

