import { FormLoginTypes, initialValues } from '../../utils/structure';
import { FormInput } from '../FormInput';
import { Formik, Form } from 'formik';
import { errosMessages } from '../../utils/message';
import './style.css';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage';
import { authLogin, postLoginRequest } from '../../services/postLogin';

export const FormLogin = () => {
  const navigate = useNavigate();
  const onSubmitFormLogin = async (values: FormLoginTypes) => {
    try {
      const responsePostLogin = await postLoginRequest(values);

      const { id, token } = responsePostLogin;

      const getLogin = await authLogin(id, token);

      localStorage.setItem('user', JSON.stringify({ getLogin }));

      navigate('/loggedUser');
    } catch (error) {
      alert('Email ou senha inválida ou sem cadastro');
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const schemaValidationLogin = Yup.object().shape({
    email: Yup.string()
      .test('email', errosMessages.email.invalid, value => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value || '');
      })
      .required(errosMessages.email.required),
    password: Yup.string().required(errosMessages.password.required)
  });

  return (
    <Formik<FormLoginTypes>
      initialValues={initialValues}
      onSubmit={onSubmitFormLogin}
      validationSchema={schemaValidationLogin}
      validateOnChange={false}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="form-login">
          <div className="info-form">
            <h2 className="title-login">Login</h2>
            <p className="info-login">
              Entre ou
              <Link className="span" to="/register">
                faça seu cadastro
              </Link>
            </p>
          </div>

          <div className="content-input-form">
            <FormInput
              src="src/assets/svg-email.svg"
              alt="Imagem de e-mail"
              className="input email"
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage message={touched.email && errors.email} />
          </div>

          <div className="content-input-form">
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
          <div className="form-submit">
            <button className="btn-form" type="submit" disabled={isSubmitting}>
              Entrar
            </button>

            <a href="#" className="info-senha">
              Esqueceu sua senha
            </a>
          </div>
        </Form>
      )}
    </Formik>
  );
};
