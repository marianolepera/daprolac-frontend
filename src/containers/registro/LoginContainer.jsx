import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { loginUsuario } from '../../store/reducers/usuariosSlice';

import Login from '../../components/registro/Login';
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const postStatus = useSelector((state) => state.usuarios.status);
  const error = useSelector((state) => state.usuarios.error);
  const auth = useSelector((state) => state.usuarios.auth);

  const values = {
    email: '',
    clave: '',
  };

  const schema = {
    email: Yup.string()
        .email('Correo electronico invalido')
        .required('Ingresar email'),
    clave: Yup.string()
        .required('Ingresar contraseña'),
  };

  const handleSubmit = async (credentials) => {
    setIsSubmitted(true);
    await dispatch(loginUsuario(credentials));
  }

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  return (
    <Formik
      initialValues = { values }
      validationSchema = { Yup.object(schema) }
      onSubmit = { handleSubmit }
    >
      {
        formik => (
          <Login
            formik = { formik }
            error = { (isSubmitted && !auth) }
            mensaje = { error }
          />
        )
      }
    </Formik>
  );
}

export default LoginContainer;
