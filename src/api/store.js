import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { walletApi } from "./walletApi";
import { personalSavingApi } from "./personalSavingApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [userApi.reducerPath]: userApi.reducer,  
    [walletApi.reducerPath]: walletApi.reducer,  
    [personalSavingApi.reducerPath]: personalSavingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      walletApi.middleware,
      personalSavingApi.middleware
    ),
});
