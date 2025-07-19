import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, DEV_BASE_URL } from "./customBaseQuery";

const baseUrl = process.env.NODE_ENV !== 'development' ? DEV_BASE_URL : BASE_URL
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/Authentication` }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (user) => ({
                url: '/Register',
                method: 'POST',
                body: user
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
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