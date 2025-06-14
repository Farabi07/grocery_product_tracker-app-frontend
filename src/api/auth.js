import baseApi from './baseApi';

export const signIn = (email, password) =>
  baseApi.post('djoser/auth/jwt/create/', { email, password });