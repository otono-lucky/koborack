import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";
import custommBaseQuery from "./customBaseQuery";

// const baseUrl = process.env.NODE_ENV === 'development' ? DEV_BASE_URL : BASE_URL

export const goalSavingApi = createApi({
    reducerPath: 'savingApi',
    baseQuery: custommBaseQuery,
    tagTypes: ["Goals"],
    endpoints: (builder) => ({
        setGoal: builder.mutation({
            query: (formData) => ({
                url: '/Savings/SetGoal',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [{type: "Goals"}],
        }),
        getGoals: builder.query({
            query: (userId) => ({
                url: `/Savings/listAllGoals/${userId}`,
                method: 'GET',
            }),
            providesTags: [{type: "Goals"}],
        }),
        getGoal: builder.query({
            query: (SavingsId) => ({
                url: `/Savings/getPersonalSavings/${SavingsId}`,
                method: 'GET',
            })
        }),
        updateGoal: builder.mutation({
            query: (formData, goalId) => ({
                url: `/Savings/${goalId}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: [{type: "Goals"}],
        }),
        delteGoal: builder.mutation({
            query: (goalId) => ({
                url: `/Savings/${goalId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: "Goals"}],
        }),
        getTotalGoalAmount: builder.query({
            query: (userId) => ({
                url: `/Savings/totalGoalAmount/${userId}`,
                method: 'GET',
            })
        }),
        getGoalFundCount: builder.query({
            query: () => ({
                url: `/Savings/totalPersonalFundCount`,
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