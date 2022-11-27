import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { addNewTareaProceso, deleteTareaProceso } from "../actions/actionsShared";

import { deleteProceso, fetchProcesos } from "./procesosSlice";
import { logoutUsuario } from "./usuariosSlice";

const procesosTareasAdapter = createEntityAdapter({
  selectId: (procesoTarea) => `${procesoTarea.idProceso}-${procesoTarea.idTarea}`
});

export const slice = createSlice({
  name: "procesosTareas",
  initialState: procesosTareasAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const procesosTareas = action.payload.procesosTareas ? action.payload.procesosTareas: {}
      procesosTareasAdapter.upsertMany(state, procesosTareas);
    },
    [addNewTareaProceso.fulfilled]: (state, action) => {
      const idProcesoTarea = `${action.payload.idProceso}-${action.payload.id}`;
      const procesoTareaExistente = state.entities[idProcesoTarea];

      if (procesoTareaExistente) {
        procesosTareasAdapter.updateOne(state, {
          id: idProcesoTarea,
          changes: {
            diasAntecesora: action.payload.diasAntecesora,
            horasAntecesora: action.payload.horasAntecesora,
            minutosAntecesora: action.payload.minutosAntecesora
          }
        });
      } else {
        const procesoTarea = {
          idProceso: action.payload.idProceso,
          idTarea: action.payload.id,
          idTareaAntecesora: action.payload.idTareaAntecesora,
          diasAntecesora: action.payload.diasAntecesora,
          horasAntecesora: action.payload.horasAntecesora,
          minutosAntecesora: action.payload.minutosAntecesora
        }
        procesosTareasAdapter.upsertOne(state, procesoTarea);
      }
    },
    [deleteTareaProceso.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().endsWith(`-${action.payload.id}`));
      procesosTareasAdapter.removeMany(state, idsDelete);
    },
    [deleteProceso.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().startsWith(`${action.payload.id}-`));
      procesosTareasAdapter.removeMany(state, idsDelete);
    },
    [logoutUsuario]: () => procesosTareasAdapter.getInitialState()
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectProcesoTareaById,
  selectIds: selectProcesoTareaIds,
  selectEntities: selectProcesoTareaEntities,
  selectAll: selectAllProcesosTareas,
  selectTotal: selectTotalProcesosTareas
} = procesosTareasAdapter.getSelectors((state) => state.procesosTareas);
