import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import custommBaseQuery from "./customBaseQuery";

export const walletApi = createApi({
    reducerPath: 'walleApi',
    baseQuery: custommBaseQuery,
    endpoints: (builder) => ({
        fundWallet: builder.mutation({
            query: (data) => ({
                url: '/Wallet/FundWallet',
                method: 'POST',
                body: data
            })
        }),
        getWallets: builder.query({
            query: () => ({
                url: '/Wallet/getAllWallets',
                method: 'GET',
            })
        }),
        getWallet: builder.query({
            query: (walletId) => ({
                url: `/Wallet/${walletId}`,
                method: 'GET',
            })
        }),
        getWalletByNumber: builder.query({
            query: (number) => ({
                url: `/Wallet/getWalletByNumber`,
                method: 'GET',
                params: number
            })
        }),
        getBalance: builder.query({
            query: () => ({
                url: `/Wallet/totalbalance`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useFundWalletMutation,
    useGetWalletsQuery,
    useGetWalletQuery,
    useGetWalletByNumberQuery,
    useGetBalanceQuery
} = walletApi