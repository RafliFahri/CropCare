import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const UserRef = firestore.collection('users');

/**
 *
 * @author Rafli Fahri
 * @description Created a new user in the Firestore database, need userData parameter to use this function
 * @param userData
 * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>}
 */
export async function createdUser (userData) {
  try {
    return await UserRef.add(userData);
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

export async function getUserRefreshToken (userId) {
  try {
    const userSnapshot = await UserRef.doc(userId).get();
    if (!userSnapshot.exists) {
      return null;
    }
    return userSnapshot.data();
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

/**
 * Checks if a user is registered with the given email and password.
 * @param userEmail
 * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>}
 */
export async function checkUserIsRegistered (userEmail) {
  try {
    return await UserRef.where('email', '==', userEmail).get();
    // .docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

export async function deleteUser (userID) {
  try {
    const userRef = UserRef.doc(userID);
    await userRef.delete();
    return { message: 'User deleted successfully' };
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

export async function updateUser(userID, data) {
  try{
    return await UserRef.doc(userID).update(data);
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

//create a function to check if the user already exists by the email
export async function checkUserExistsByEmail (email) {
  try {
    const snapshot = await UserRef.where('email', '==', email).get();
    return !snapshot.empty;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}