import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "../utils/token"

export const BASE_URL = 'https://koborack.onrender.com/api';
export const DEV_BASE_URL = 'https://sincere-reasonably-mouse.ngrok-free.app/api';

const custommBaseQuery = async (args, api, extraOptions) => {
  const tokent = await getToken();
  
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV !== 'development' ? DEV_BASE_URL : BASE_URL,
    prepareHeaders: (headers) => {
      if (tokent) {
        headers.set('Authorization', `Bearer ${tokent}`);
      }
      return headers;
    }
  })
  
  return baseQuery(args, api, extraOptions);
}

export default custommBaseQuery;