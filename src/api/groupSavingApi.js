import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";
import custommBaseQuery from "./customBaseQuery";

export const groupSavingApi = createApi({
    reducerPath: 'groupSavingApi',
    baseQuery: custommBaseQuery,
    endpoints: (builder) => ({
        createGroup: builder.mutation({
            query: (formData, token) => ({
                url: '/GroupSavings/CreateGroupSavings',
                method: 'POST',
                body: formData
            })
        }),
        getActiveGroups: builder.query({
            query: () => ({
                url: `/GroupSavings/ListOfActiveGroups`,
                method: 'GET',
            })
        }),
        getActiveGroupDetails: builder.query({
            query: (groupId) => ({
                url: `/GroupSavings/ActiveGroupDetails/${groupId}`,
                method: 'GET',
                params: { groupId }
            })
        }),
        joinGroup: builder.mutation({
            query: ({userId, groupId}) => ({
                url: `/GroupSavings/JoinGroup`,
                method: 'POST',
                params: { userId, groupId }
            })
        }),
        getNewGroupCount: builder.query({
            query: () => ({
                url: `/GroupSavings/GetNewGroupCount`,
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