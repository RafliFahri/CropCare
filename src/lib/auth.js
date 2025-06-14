import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const accessSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
const encodeAccessSecretKey = new TextEncoder().encode(accessSecretKey);
const encodeRefreshSecretKey = new TextEncoder().encode(refreshSecretKey);

/**
 * Generates a JWT access token with the given payload.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string} The generated JWT access token.
 * FIXME: Edit the expiration time to 10 minutes or as needed
 */
// export async function generateAccessToken (payload) {
//   // return jwt.sign(payload, accessSecretKey, { expiresIn: "1m" });
//   return await new SignJWT(payload).setProtectedHeader({ alg: 'H256' }).setExpirationTime('1m').sign(accessSecretKey);
// }
export async function generateAccessToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('10m')
    .sign(encodeAccessSecretKey);
}
/**
 * Verifies a JWT access token and returns the decoded payload.
 * @param {string} token - The JWT access token to verify.
 * @returns {Object|null} The decoded payload if the token is valid, null otherwise.
 */
export async function verifyAccessToken (token) {
  try {
    // return jwt.verify(token, accessSecretKey);
    const { payload } = await jwtVerify(token, encodeAccessSecretKey);
    return payload;
  } catch (error) {
    console.error('Access token verification failed:', error.message);
    return null;
  }

}
/**
 * Generates a JWT refresh token with the given payload.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string} The generated JWT refresh token.
 * FIXME: Edit the expiration time to 7 days or as needed
*/
// export async function generateRefreshToken (payload) {
//   // return jwt.sign(payload, refreshSecretKey, { expiresIn: "5m" });
//   return await new SignJWT(payload).setProtectedHeader({ alg: 'H256' }).setExpirationTime('5m').sign(refreshSecretKey);
// }
export async function generateRefreshToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(encodeRefreshSecretKey);
}
/**
 * Verifies a JWT refresh token and returns the decoded payload.
 * @param token
 * @returns {null}
 * TODO: Edit this error handling if verification fails
 */
export async function verifyRefreshToken (token) {
  try {
    // return jwt.verify(token, refreshSecretKey);
    const { payload } = await jwtVerify(token, encodeRefreshSecretKey);
    return payload;
  } catch (error) {
    console.error('Refresh token verification failed:', error.message);
    return null;
  }
}

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
export async function hashPassword (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a password with a hashed password.
 * @param {string} password - The password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
export async function comparePassword (password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}