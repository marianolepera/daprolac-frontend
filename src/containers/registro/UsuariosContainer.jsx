import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsuarios, selectAllUsarios } from '../../store/reducers/usuariosSlice';

import Spinner from '../../components/utils/Spinner';
import Error from '../../components/utils/Error'
import Usuarios from '../../components/registro/Usuarios';

const UsuariosContainer = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(selectAllUsarios);

  const postStatus = useSelector((state) => state.usuarios.status);
  const error = useSelector((state) => state.usuarios.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchUsuarios());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  return <Usuarios usuarios = { usuarios } />;
};

export default UsuariosContainer;
