import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const saveToken = async (token) => {
  await SecureStore.setItemAsync('jwt_token', token);
}

export const getToken = async () => {
  return await SecureStore.getItemAsync('jwt_token');
}

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('jwt_token');
}

export const decodeToken = (token) => {
  try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded JWT payload:', decodedToken);
        return decodedToken;
        // You can now access properties from decodedToken, e.g., decodedToken.userId
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
}

export const decodeUserToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded JWT payload:', decoded);

    const expiresAt = decoded.exp * 1000;
    const now = Date.now();

    return {
      userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || decoded.email,
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      phoneNumber: decoded.phoneNumber,
      emailConfirmed: decoded.emailConfirmed === 'True',
      isExpired: expiresAt < now, // Convert to milliseconds for comparison
      expiresAt, // Still helpful for comparing in ms
      jti: decoded.jti,
      exp: decoded.exp, // original UNIX timestamp
      iss: decoded.iss,
      raw: decoded, // optional: keep full payload for fallback or logging
    };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// import * as LocalAuthentication from 'expo-local-authentication';

// async function authenticateUser() {
//   const hasHardware = await LocalAuthentication.hasHardwareAsync();
//   const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
//   const isEnrolled = await LocalAuthentication.isEnrolledAsync();

//   if (!hasHardware || supportedTypes.length === 0 || !isEnrolled) {
//     console.log('Biometric authentication not available');
//     return false;
//   }

//   const result = await LocalAuthentication.authenticateAsync({
//     promptMessage: 'Authenticate to unlock savings app',
//     fallbackLabel: 'Enter passcode',
//   });

//   if (result.success) {
//     console.log('Authenticated successfully!');
//     return true;
//   } else {
//     console.log('Authentication failed');
//     return false;
//   }
// }
