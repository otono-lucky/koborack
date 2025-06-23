import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";

export const groupSavingApi = createApi({
    reducerPath: 'groupSavingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://koborack.onrender.com/api/GroupSavings', 
        // prepareHeaders:  (headers) => () => {
        //     const token = getToken();
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // }
    }),
    endpoints: (builder) => ({
        createGroup: builder.mutation({
            query: (formData, token) => ({
                url: '/CreateGroupSavings',
                method: 'POST',
                body: formData
            })
        }),
        getActiveGroups: builder.query({
            query: () => ({
                url: `/ListOfActiveGroups`,
                method: 'GET',
            })
        }),
        getActiveGroupDetails: builder.query({
            query: (groupId) => ({
                url: `/ActiveGroupDetails/${groupId}`,
                method: 'GET',
                params: { groupId }
            })
        }),
        joinGroup: builder.mutation({
            query: ({userId, groupId}) => ({
                url: `/JoinGroup`,
                method: 'POST',
                params: { userId, groupId }
            })
        }),
        getNewGroupCount: builder.query({
            query: () => ({
                url: `/GetNewGroupCount`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useCreateGroupMutation,
    useGetActiveGroupsQuery,
    useGetActiveGroupDetailsQuery,
    useJoinGroupMutation,
    useGetNewGroupCountQuery
} = groupSavingApi