import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { addNewDatoTarea, deleteDatoTarea, deleteTareaProceso } from "../actions/actionsShared";

import { fetchProcesos } from "./procesosSlice";
import { logoutUsuario } from "./usuariosSlice";

const tareasDatosAdapter = createEntityAdapter({
  selectId: (tareaDato) => `${tareaDato.idTarea}-${tareaDato.idDato}`
});

export const slice = createSlice({
  name: "tareasDatos",
  initialState: tareasDatosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const tareasDatos = action.payload.tareasDatos ? action.payload.tareasDatos: {}
      tareasDatosAdapter.upsertMany(state, tareasDatos);
    },
    [addNewDatoTarea.fulfilled]: (state, action) => {
      const idTareaDato = `${action.payload.idTarea}-${action.payload.id}`;
      const tareaDatoExistente = state.entities[idTareaDato];

      if (tareaDatoExistente){
        tareasDatosAdapter.updateOne(state, {
          id: idTareaDato,
          changes: { obligatorio: action.payload.obligatorio
          }});
      } else {
        const tareaDato = {
          idTarea: action.payload.idTarea,
          idDato: action.payload.id,
          obligatorio: action.payload.obligatorio
        }
        tareasDatosAdapter.upsertOne(state, tareaDato);
      }
    },
    [deleteDatoTarea.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().endsWith(`-${action.payload.id}`));
      tareasDatosAdapter.removeMany(state, idsDelete);
    },
    [deleteTareaProceso.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().startsWith(`${action.payload.id}-`));
      tareasDatosAdapter.removeMany(state, idsDelete);
    },
    [logoutUsuario]: () => tareasDatosAdapter.getInitialState()
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
} = tareasDatosAdapter.getSelectors((state) => state.procesosTareas);
