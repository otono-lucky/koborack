import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://2b33-102-90-82-83.ngrok-free.app/api/Authentication' }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (user) => ({
                url: '/Register',
                method: 'POST',
                body: user
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/Login',
                method: 'POST',
                body: data
            })
        }),
        confirmEmail: builder.mutation({
            query: (data) => ({
                url: '/ConfirmEmail',
                method: 'POST',
                body: data
            })
        }),
        resendVerificationEmail: builder.mutation({
            query: (data) => ({
                url: '/resend-verification-email',
                method: 'POST',
                body: data
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/forgot-password',
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
} = authApi