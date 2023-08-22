import { FormLoginTypes } from '../utils/structure';
import { api } from './api';

export const postLoginRequest = async ({
  email,
  password
}: FormLoginTypes) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password
    });
    console.log(response);

    const { data } = response;
    console.log(data);

    return data;
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
  }
};

export const authLogin = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await api.get(`/users/${id}`, config);
 
  return response.data
};
