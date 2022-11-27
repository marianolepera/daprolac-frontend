import React from "react";
import { useSelector } from "react-redux";

import OrdenDetalle from "../../components/ordenes/OrdenDetalle";

import { selectOrdenById } from "../../store/reducers/ordenesSlice";
import { selectProcesoById } from "../../store/reducers/procesosSlice";
import { selectTareasByOrdenId } from "../../store/reducers/tareasOrdenesSlice";

const OrdenDetalleContainer = props => {
  const ordenId = props.match.params.id;
  const orden = useSelector(state => selectOrdenById(state, ordenId));
  const proceso = useSelector(state => selectProcesoById(state, orden.idProceso));
  const tareas = useSelector(selectTareasByOrdenId(orden.id));

  return (
    <OrdenDetalle
      orden = { orden }
      proceso = { proceso }
      tareas = { tareas }
    />
  );
};

export default OrdenDetalleContainer;
