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
