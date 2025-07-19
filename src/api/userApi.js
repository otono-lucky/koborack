import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import custommBaseQuery from "./customBaseQuery";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: custommBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: 'User/UpdateUser',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => 
                result ? [{ type: 'User', id }] : [],
        }),
        getUsers: builder.query({
            query: () => ({
                url: `User/`,
                method: 'GET',
            }),
            providesTags: (result) => 
                result ? 
                    [...result.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'LIST' }] : 
                    [{ type: 'User', id: 'LIST' }],
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `User/${userId}`,
                method: 'GET',
            }),
            providesTags: (result, error, userId) => 
                result ? [{ type: 'User', id: userId }] : [],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `User/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        getNewUserCount: builder.query({
            query: () => ({
                url: `User/NewRegisteredUserCount`,
                method: 'GET',
            }),
            invalidatesTags: [{ type: 'User', id: 'STAT' }],
        }),
    })
})

export const {
    useUpdateUserMutation,
    useGetUserQuery
} = userApi