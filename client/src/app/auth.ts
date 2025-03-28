import { User } from '@prisma/client';
import { api } from './services/api';

export type TUserData = Omit<User, 'id'>;
type TResponseData = User & { accessToken: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TResponseData, TUserData>({
      query: (userData) => ({
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
    }),
    registration: builder.mutation<TResponseData, TUserData>({
      query: (userData) => ({
        url: '/users/registration',
        method: 'POST',
        body: userData,
      }),
    }),
    currentUser: builder.query<TResponseData, void>({
      query: () => ({
        url: '/users/current',
        method: 'GET'
      })
    })
  }),
});

export const {useLoginMutation, useRegistrationMutation, useCurrentUserQuery} = authApi;
export const {endpoints: {login, registration, currentUser}} = authApi;
