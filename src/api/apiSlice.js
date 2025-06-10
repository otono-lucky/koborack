import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://2b33-102-90-82-83.ngrok-free.app/api' }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (user) => ({
                url: '/Authentication/Register',
                method: 'POST',
                body: user
            })
        }),
        Login: builder.mutation({
            query: (data) => ({
                url: '/Authentication/Login',
                method: 'POST',
                body: data
            })
        }),
        ConfirmEmail: builder.mutation({
            query: (data) => ({
                url: '/Authentication/ConfirmEmail',
                method: 'POST',
                body: data
            })
        }),
        ResendVerificationEmail: builder.mutation({
            query: (data) => ({
                url: '/Authentication/resend-verification-email',
                method: 'POST',
                body: data
            })
        }),
        ForgotPassword: builder.mutation({
            query: (data) => ({
                url: '/Authentication/forgot-password',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useConfirmEmailMutation,
    useResendVerificationEmailMutation,
    useForgotPasswordMutation,
} = apiSlice