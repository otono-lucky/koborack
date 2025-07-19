import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";
import custommBaseQuery from "./customBaseQuery";

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: custommBaseQuery,
    endpoints: (builder) => ({        
        getUserTransaction: builder.query({
            query: (userId) => ({
                url: `/Transaction/user/${userId}`,
                method: 'GET',
            })
        }),
        getGroupTransaction: builder.query({
            query: (groupId) => ({
                url: `/Transaction/group/${groupId}`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useGetUserTransactionQuery,
    useGetGroupTransactionQuery
} = transactionApi