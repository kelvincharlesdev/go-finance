import {
  FormRegisterTypes,
  initialValuesRegister
} from '../../utils/structure';
import { FormInput } from '../FormInput';
import { Formik, Form, Field } from 'formik';
import { errosMessages } from '../../utils/message';
import './style.css';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage';
import { postRegisterRequest } from '../../services/postRegister';

export const FormRegister = () => {
  const navigate = useNavigate();
  const onSubmitForm = async (values: FormRegisterTypes) => {
    try {
      await postRegisterRequest(values);

      navigate('/');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const schemaValidationRegister = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+\s[A-Za-z]+$/, errosMessages.name.required)
      .required(errosMessages.name.required),
    email: Yup.string()
      .test('email', errosMessages.email.invalid, value => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || '');
      })
      .required('Campo obrigatório'),
    password: Yup.string()
      .required(errosMessages.password.required)
      .min(8, errosMessages.password.min)
      .matches(/[A-Z]/, errosMessages.password.matchesInvalidUppercase)
      .matches(/\W+/gm, errosMessages.password.matchesInvalidCharacters),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], errosMessages.confirPassword.ref)
      .required(errosMessages.confirPassword.required),
    checkbox: Yup.boolean().oneOf([true], errosMessages.checkbox.required)
  });

  return (
    <Formik<FormRegisterTypes>
      initialValues={initialValuesRegister}
      onSubmit={onSubmitForm}
      validationSchema={schemaValidationRegister}
    >
      {({ errors, touched, isSubmitting, isValid, initialValues, values }) => (
        <Form className="form-register">
          <div className="info-form">
            <h2 className="title-register">Cadastro</h2>
            <p className="info-register">para iniciar</p>
          </div>

          <div className="content-input">
            <FormInput
              src="src/assets/profile.svg"
              alt="Imagem de perfil"
              className="input name"
              type="text"
              name="name"
              placeholder="Nome e Sobrenome"
            />
            <ErrorMessage message={touched.name && errors.name} />
          </div>

          <div className="content-input">
            <FormInput
              src="src/assets/svg-email.svg"
              alt="Imagem de cadeado"
              className="input email"
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage message={touched.email && errors.email} />
          </div>

          <div className="content-input">
            <FormInput
              src="src/assets/svg-password.svg"
              alt="Imagem de cadeado"
              className="input password"
              type="password"
              name="password"
              placeholder="Senha"
            />
            <ErrorMessage message={touched.password && errors.password} />
          </div>

          <div className="content-input">
            <FormInput
              src="src/assets/svg-password.svg"
              alt="Imagem de cadeado"
              className="input confirm-password"
              type="password"
              name="password_confirmation"
              placeholder="Confirma senha"
            />

            <ErrorMessage
              message={
                touched.password_confirmation && errors.password_confirmation
              }
            />
          </div>

          <div className="content-checkbox">
            <Field id="checkbox" type="checkbox" name="checkbox" />
            <span className="text-checkbox">
              Declaro que li e concordo com os termos e condições de uso.
            </span>
          </div>
          <ErrorMessage message={touched.checkbox && errors.checkbox} />

          <div className="btn-register">
            <button
              className="btn-form"
              type="submit"
              disabled={
                !isValid ||
                isSubmitting ||
                JSON.stringify(initialValues) === JSON.stringify(values)
              }
            >
              Cadastrar
            </button>

            <Link className="info-goback" to="/">
              Voltar
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
