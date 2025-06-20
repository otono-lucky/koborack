import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/token";

export const personalSavingApi = createApi({
    reducerPath: 'savingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://sincere-reasonably-mouse.ngrok-free.app/api/Savings', 
        prepareHeaders:  (headers) => async() => {
            const token = await getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        setGoal: builder.mutation({
            query: (formData, token) => ({
                url: '/SetGoal',
                method: 'POST',
                body: formData
            })
        }),
        getGoals: builder.query({
            query: () => ({
                url: '/listAllGoals',
                method: 'GET',
            })
        }),
        getGoal: builder.query({
            query: (SavingsId) => ({
                url: `/getPersonalSavings${SavingsId}`,
                method: 'GET',
            })
        }),
        getGoalAmount: builder.query({
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
    useGetGoalAmountQuery,
    useGetGoalFundCountQuery
} = personalSavingApi