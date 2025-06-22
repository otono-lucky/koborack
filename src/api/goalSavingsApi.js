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
    tagTypes: ["Goals"],
    endpoints: (builder) => ({
        setGoal: builder.mutation({
            query: (formData) => ({
                url: '/SetGoal',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [{type: "Goals"}],
        }),
        getGoals: builder.query({
            query: (userId) => ({
                url: `/listAllGoals/${userId}`,
                method: 'GET',
            }),
            providesTags: [{type: "Goals"}],
        }),
        getGoal: builder.query({
            query: (SavingsId) => ({
                url: `/getPersonalSavings/${SavingsId}`,
                method: 'GET',
            })
        }),
        updateGoal: builder.mutation({
            query: (formData, goalId) => ({
                url: `/${goalId}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: [{type: "Goals"}],
        }),
        delteGoal: builder.mutation({
            query: (goalId) => ({
                url: `/${goalId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: "Goals"}],
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
    useUpdateGoalMutation,
    useDelteGoalMutation,
    useGetTotalGoalAmountQuery,
    useGetGoalFundCountQuery
} = goalSavingApi