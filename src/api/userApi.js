import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sincere-reasonably-mouse.ngrok-free.app/api/User' }),
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/UpdateUser',
                method: 'POST',
                body: data
            })
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            })
        }),
        getNewUserCount: builder.query({
            query: () => ({
                url: `/NewRegisteredUserCount`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useUpdateUserMutation,
    useGetUserQuery
} = userApi