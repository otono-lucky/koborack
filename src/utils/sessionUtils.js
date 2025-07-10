import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getToken, decodeToken, decodeUserToken } from "./token";
import { Alert } from "react-native";

export const validateSession = async (onInvalidSession) => {
  const token = await getToken();
  if (!token) {
    console.log("No token found");
    onInvalidSession?.(); // e.g. navigate to login
    return null;
  }

  const userInfo = decodeUserToken(token);  
  if (!userInfo || userInfo?.isExpired) {
    console.log("Token expired or invalid");
    Alert.alert("Session expired", "Please log in again.");
    onInvalidSession?.();
    return null;
  }

  const userId = userInfo.userId;
  if (!userId) {
    console.log("User ID not found in token");
    onInvalidSession?.();
    return null;
  }

  return { token, userInfo, userId };
};

const useSessionRedirect = async (navigation) => {
  console.log("Checking user session...")
   
      try {
        const token = await getToken();
        if (!token) {
          console.log("User token not found")
          return;
        }

        const user = decodeUserToken(token);
        if (!user) {
          console.log("User information not found in token")
          return;
        }
        const { isExpired, emailConfirmed, userId, name } = user;

        if (emailConfirmed) {                       
          console.log("Email not confirmed");
          Alert.alert("Email not confirmed", "Please click on resend email to receive your verification otp.");
          navigation.navigate('ConfirmEmail', { id: userId });
        } else if (isExpired) {                
          console.log("Token expired or invalid");
          Alert.alert("Session expired", "Please log in again.");
          navigation.navigate('Login');
        } else {
          navigation.navigate('Dashboard', { id: userId });
        }

        // Future upgrade: add `role`-based redirect if needed
        // if (user.role === 'Admin') navigation.navigate('AdminDashboard');

      } catch (error) {
        console.error('Session redirect error:', error);
      }
    };

export default useSessionRedirect;
