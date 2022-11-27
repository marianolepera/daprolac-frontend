import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withTheme } from "@material-ui/core/styles";

import {
  fetchOrdenes,
  selectOrdenesWithNested
} from "../../store/reducers/ordenesSlice";
import {fetchUsuarios} from "../../store/reducers/usuariosSlice";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import Ordenes from "../../components/ordenes/Ordenes";
import NuevaOrdenContainer from "./NuevaOrdenContainer";

const OrdenesContainer = () => {
  const dispatch = useDispatch();
  const ordenes = useSelector(selectOrdenesWithNested);

  const postStatusOrdenes = useSelector(state => state.ordenes.status);
  const postStatusUsuarios = useSelector(state => state.usuarios.status);
  const error = useSelector(state => state.ordenes.error);
  const errorUsuarios = useSelector(state => state.usuarios.error);

  useEffect(() => { if (postStatusOrdenes === "idle") { dispatch(fetchOrdenes()); }}, [postStatusOrdenes, dispatch]);
  useEffect(() => { if (postStatusUsuarios === "idle") { dispatch(fetchUsuarios()); }}, [postStatusUsuarios, dispatch]);

  if (postStatusOrdenes === "loading" || postStatusUsuarios === "loading") { return <Spinner />; }
  if (postStatusOrdenes === "failed") { return <Error mensaje={error} />; }
  if (postStatusUsuarios === "failed") { return <Error mensaje={errorUsuarios} />; }

  return (
    <Fragment>
      <NuevaOrdenContainer />
      <Ordenes ordenes={ordenes} />
    </Fragment>
  );
};

export default withTheme(OrdenesContainer);
