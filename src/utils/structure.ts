export const initialValues = {
    email: '',
    password: ''
  };

export interface FormLoginTypes {
    email: string;
    password: string;
  }

  export const initialValuesRegister = {
    name: '',
    email: '',
    password:'',
    password_confirmation: '',
    checkbox: false
  };

export interface FormRegisterTypes{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  checkbox?: boolean
}