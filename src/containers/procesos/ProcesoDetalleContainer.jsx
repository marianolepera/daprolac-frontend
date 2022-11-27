import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ProcesoDetalle from "../../components/procesos/ProcesoDetalle";
import {
  selectTareasByProcesoId,
  selectProcesoById,
  updateProceso } from '../../store/reducers/procesosSlice';
import { updateTarea } from '../../store/reducers/tareasSlice';
import { deleteDatoTarea, deleteTareaProceso } from '../../store/actions/actionsShared';

const ProcesoDetalleContainer = (props) => {
  const dispatch = useDispatch();

  const procesoId = props.match.params.id;
  const proceso = useSelector(state => selectProcesoById(state, procesoId));
  const tareas = useSelector(selectTareasByProcesoId(procesoId));

  const editarProceso = (proceso) => dispatch(updateProceso(proceso));
  const editarTarea = (tarea) => dispatch(updateTarea(tarea));

  const deleteDato = (idDato) => dispatch(deleteDatoTarea(idDato));
  const deleteTarea = (idTarea) => dispatch(deleteTareaProceso(idTarea));

  return (
    <ProcesoDetalle
      proceso = { proceso }
      tareas = { tareas }
      editarProceso = { editarProceso }
      editarTarea = { editarTarea }
      deleteDato = { deleteDato }
      deleteTarea = { deleteTarea }
    />
  );
}

export default ProcesoDetalleContainer;
