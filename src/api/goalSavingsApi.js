import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";

export const goalSavingApi = createApi({
    reducerPath: 'savingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://sincere-reasonably-mouse.ngrok-free.app/api/Savings', 
        // prepareHeaders:  (headers) => () => {
        //     const token = getToken();
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // }
    }),
    endpoints: (builder) => ({
        setGoal: builder.mutation({
            query: (formData) => ({
                url: '/SetGoal',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ["Goals"],
        }),
        getGoals: builder.query({
            query: (userId) => ({
                url: `/listAllGoals/${userId}`,
                method: 'GET',
            }),
            providesTags: ["Goals"],
        }),
        getGoal: builder.query({
            query: (SavingsId) => ({
                url: `/getPersonalSavings/${SavingsId}`,
                method: 'GET',
            })
        }),
        getTotalGoalAmount: builder.query({
            query: (userId) => ({
                url: `/totalGoalAmount/${userId}`,
                method: 'GET',
            })
        }),
        getGoalFundCount: builder.query({
            query: () => ({
                url: `/totalPersonalFundCount`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useSetGoalMutation,
    useGetGoalsQuery,
    useGetGoalQuery,
    useGetTotalGoalAmountQuery,
    useGetGoalFundCountQuery
} = goalSavingApi