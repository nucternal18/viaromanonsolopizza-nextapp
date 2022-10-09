import {
  AnyAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { setError, setImage } from "@features/users/userSlice";
import { UserInfoProps } from "@lib/types";
import { userApiSlice } from "@app/apiSlice";

export const usersAdapter = createEntityAdapter<UserInfoProps>({});

const initialState = usersAdapter.getInitialState();

export const usersApi = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserInfoProps[], void>({
      query: () => ({
        url: "/users",
        validateStatus: (response: any, result: any) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.map((user) => ({ type: "User", id: user.id }))
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query<UserInfoProps, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: result?.id }],
    }),
    registerUser: builder.mutation<
      { success: boolean; message: string },
      Partial<UserInfoProps>
    >({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    createAdmin: builder.mutation<
      { success: boolean; message: string },
      Partial<UserInfoProps>
    >({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<
      { success: boolean; message: string },
      Partial<UserInfoProps>
    >({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg?.id }],
    }),
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [{ type: "User", id: arg }],
      }
    ),
    resetCredentialsWithToken: builder.mutation<
      { success: true; message: true },
      { token: string; password: string }
    >({
      query: ({ token, password }) => ({
        url: `/auth/reset-password`,
        method: "PUT",
        body: { token, password },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "List" }],
    }),
    resetCredentials: builder.mutation<
      { success: true; message: true },
      { password: string; newPassword: string }
    >({
      query: ({ password, newPassword }) => ({
        url: `/auth/reset-password`,
        method: "PUT",
        body: { password, newPassword },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "List" }],
    }),
    requestPasswordReset: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (email) => ({
        url: `/auth/request-reset`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    uploadUserImage: builder.mutation<
      { image: string },
      string | ArrayBuffer | null
    >({
      query: (base64EncodedImage) => ({
        url: `/upload`,
        method: "POST",
        body: { data: base64EncodedImage },
      }),
      invalidatesTags: [{ type: "User", id: "List" }],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setImage(data.image));
        } catch (error: any) {
          if (error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError(error.message));
          }
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useCreateAdminMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useResetCredentialsMutation,
  useResetCredentialsWithTokenMutation,
  useRequestPasswordResetMutation,
  useUploadUserImageMutation,
} = usersApi;
