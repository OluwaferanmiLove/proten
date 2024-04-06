import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithTokenCheck} from '../redux.util';
import {LoginResponse, LoginParams} from './Auth';

//Reminder for types
//<ResponseType, BodyType>

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithTokenCheck,
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: data => {
        return {
          url: '/login',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation} = authApi;
