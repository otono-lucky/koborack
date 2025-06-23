import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { walletApi } from "./walletApi";
import { userApi } from "./userApi";
import { goalSavingApi } from "./goalSavingsApi";
import { groupSavingApi } from "./groupSavingApi";
import { transactionApi } from "./transactionAPi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [goalSavingApi.reducerPath]: goalSavingApi.reducer,
    [groupSavingApi.reducerPath]: groupSavingApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      walletApi.middleware,
      goalSavingApi.middleware,
      groupSavingApi.middleware,
      transactionApi.middleware
    ),
});
