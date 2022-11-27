import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { addNewUsuario } from "../../store/reducers/usuariosSlice";

import Registro from '../../components/registro/Registro';
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import { Button } from "@material-ui/core";

const RegistroContainer = props => {
  const dispatch = useDispatch();
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const postStatus = useSelector((state) => state.usuarios.status);
  const error = useSelector((state) => state.usuarios.error);

  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    clave: '',
    tipo:''
  });

  const schema = {
    nombre:Yup.string().required("ingresar nombre"),
    apellido:Yup.string().required("ingresar apellido"),
    email: Yup.string()
        .email('Correo electronico invalido')
        .required('Ingresar email'),
    clave: Yup.string()
        .required('Ingresar contraseña'),
    tipo:Yup.string().required("debe seleccionar el rol del usuario")
  };

  const handleInput = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   await dispatch(addNewUsuario(form));
  // }

  const handleSubmit = async (credentials) => {
    setIsSubmitted(true);
    await dispatch(addNewUsuario(credentials));
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
          <Registro
            formik = { formik }
            error = { (isSubmitted) }
          />
        )
      }
    </Formik>
      // <div>
      //   <h2>Registrate</h2>
      //   <form>
      //     <input
      //         name="nombre"
      //         type="text"
      //         placeholder="nombre"
      //         onChange={handleInput}
      //     />
      //     <input
      //         name="apellido"
      //         type="text"
      //         placeholder="apellido"
      //         onChange={handleInput}
      //     />
      //     <input
      //         name="email"
      //         type="email"
      //         placeholder="example@example.com"
      //         onChange={handleInput}
      //     />
      //     <input
      //         name="remail"
      //         type="email"
      //         placeholder="Repetir email"
      //         onChange={handleInput}
      //     />
      //     <input
      //         name="password"
      //         type="password"
      //         minLength="8"
      //         onChange={handleInput}
      //     />
      //     <input
      //         name="rpassword"
      //         type="password"
      //         minLength="8"
      //         onChange={handleInput}
      //     />
      //     <Button color="primary" variant="contained" onClick = { handleSubmit } >
      //       Registrarse
      //     </Button>

      //   </form>
      // </div>
  );
}

export default RegistroContainer;
