import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery"; // corrected name if needed

export const walletApi = createApi({
    reducerPath: 'walletApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Wallet', 'WalletList', 'Balance'],
    endpoints: (builder) => ({
        fundWallet: builder.mutation({
            query: (data) => ({
                url: '/Wallet/FundWallet',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['WalletList', 'Balance']
        }),
       verifyFunding: builder.mutation({
            query: (referenceCode) => ({
                url: `/Wallet/paystack/verify/${referenceCode}`,
                method: 'POST'
            }),
            providesTags: (result) =>
                result?.result?.id
                    ? [{ type: 'Wallet', id: result.result.id }]
                    : []
        }),
        getWallets: builder.query({
            query: () => ({
                url: '/Wallet/getAllWallets',
                method: 'GET',
            }),
            providesTags: ['WalletList']
        }),
        getWallet: builder.query({
            query: (walletId) => ({
                url: `/Wallet/${walletId}`,
                method: 'GET',
            }),
            providesTags: (result, error, walletId) => [
                { type: 'Wallet', id: walletId }
            ]
        }),
        getWalletByNumber: builder.query({
            query: (number) => ({
                url: `/Wallet/getWalletByNumber`,
                method: 'GET',
                params: number
            }),
            providesTags: (result) =>
                result?.result?.id
                    ? [{ type: 'Wallet', id: result.result.id }]
                    : []
        }),
        getBalance: builder.query({
            query: () => ({
                url: `/Wallet/totalbalance`,
                method: 'GET',
            }),
            providesTags: ['Balance']
        }),
    })
});

export const {
    useFundWalletMutation,
    useVerifyFundingMutation,
    useGetWalletsQuery,
    useGetWalletQuery,
    useGetWalletByNumberQuery,
    useGetBalanceQuery
} = walletApi;