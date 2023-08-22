import { FormRegisterTypes } from '../utils/structure';
import { api } from './api';

export const postRegisterRequest = async ({
  password_confirmation,
  email,
  name,
  password
}: FormRegisterTypes) => {
  try {
    const response = await api.post(`/users`, {
      email,
      password_confirmation,
      name,
      password
    });

    const { status } = response;

    return status

  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
  }
};
