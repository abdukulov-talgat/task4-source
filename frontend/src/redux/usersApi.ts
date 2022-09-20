import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../types";
import {RootState} from "./store";

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, {getState}) => {
      const state = getState() as RootState;
      if (state.auth.token) {
        headers.set('x-token', state.auth.token)
      }
      return headers;
    }
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAll: builder.query<User[], void>({
      query: () => `users/`,
      providesTags: ['Users'],
    }),
    blockUsers: builder.mutation<boolean, { usersId: string[] }>({
      query: ({usersId}) => ({
        url: `users/`,
        method: 'PATCH',
        body: {isBlock: true, usersId},
      }),
      invalidatesTags: ['Users'],
    }),
    unblockUsers: builder.mutation({
      query: ({usersId}) => ({
        url: `users/`,
        method: 'PATCH',
        body: {isBlock: false, usersId},
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUsers: builder.mutation({
      query: ({usersId}) => ({
        url: `users/`,
        method: 'DELETE',
        body: {usersId},
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export {usersApi}
export const {useGetAllQuery, useBlockUsersMutation, useUnblockUsersMutation, useDeleteUsersMutation} = usersApi
