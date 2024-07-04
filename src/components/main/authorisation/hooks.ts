import {UseBaseMutationResult, useMutation} from 'react-query';
import axios, {AxiosError} from 'axios';
import {LoginData, PasswordResetData, RegisterData} from './types';
import apiUrls from "../../../apiUrls";

export function useLogin(): UseBaseMutationResult<any, AxiosError, LoginData> {
  return useMutation((data: LoginData) => authFetcher(data, apiUrls.login));
}

export function useRegister(): UseBaseMutationResult<any, AxiosError, RegisterData> {
  return useMutation((data: RegisterData) => authFetcher(data, apiUrls.register));
}

export function usePasswordReset(): UseBaseMutationResult<any, AxiosError, string> {
    return useMutation((email: string) => passwordResetFetcher(email));
}

export function usePasswordResetConfirm(): UseBaseMutationResult<any, AxiosError, PasswordResetData> {
    return useMutation((resetData: PasswordResetData) => passwordResetConfirmFetcher(resetData));
}

const authFetcher = async <T>(authData: T, url: string) => {
  const response = await axios.post(
    url,
    authData,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
}

const passwordResetFetcher = async (email: string) => {
    const response = await axios.post(
        apiUrls.passwordReset,
        {email},
        {
            headers: {
            'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}

const passwordResetConfirmFetcher = async (resetData: PasswordResetData) => {
    const response = await axios.post(
        apiUrls.passwordResetConfirm,
        resetData,
        {
            headers: {
            'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}