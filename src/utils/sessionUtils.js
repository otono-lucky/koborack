// sessionUtils.js
import { getToken, decodeToken } from './token';
import { Alert } from 'react-native';

export const validateSession = async (onInvalidSession) => {
  const token = await getToken();

  if (!token) {
    console.log('No token found');
    onInvalidSession?.(); // e.g. navigate to login
    return null;
  }

  const userInfo = decodeToken(token);

  if (!userInfo || !userInfo?.exp || userInfo.exp * 1000 < Date.now()) {
    console.log('Token expired or invalid');
    Alert.alert('Session expired', 'Please log in again.');
    onInvalidSession?.();
    return null;
  }

  const userId = userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
  if (!userId) {
    console.log('User ID not found in token');
    onInvalidSession?.();
    return null;
  }

  return { token, userInfo, userId };
};
