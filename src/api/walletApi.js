import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
    reducerPath: 'walleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://koborack.onrender.com/api/Wallet' }),
    endpoints: (builder) => ({
        fundWallet: builder.mutation({
            query: (data) => ({
                url: '/FundWallet',
                method: 'POST',
                body: data
            })
        }),
        getWallets: builder.query({
            query: () => ({
                url: '/getAllWallets',
                method: 'GET',
            })
        }),
        getWallet: builder.query({
            query: (walletId) => ({
                url: `/${walletId}`,
                method: 'GET',
            })
        }),
        getWalletByNumber: builder.query({
            query: (number) => ({
                url: `/getWalletByNumber`,
                method: 'GET',
                params: number
            })
        }),
        getBalance: builder.query({
            query: () => ({
                url: `/totalbalance`,
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