import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://sincere-reasonably-mouse.ngrok-free.app/api/Transaction', 
        // prepareHeaders:  (headers) => () => {
        //     const token = getToken();
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // }
    }),
    endpoints: (builder) => ({        
        getUserTransaction: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET',
            })
        }),
        getGroupTransaction: builder.query({
            query: (groupId) => ({
                url: `/group/${groupId}`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useGetUserTransactionQuery,
    useGetGroupTransactionQuery
} = transactionApi