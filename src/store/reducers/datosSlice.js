import { createSlice, createEntityAdapter,createSelector } from "@reduxjs/toolkit";

import { addNewDatoTarea, deleteDatoTarea } from "../actions/actionsShared";

import { fetchProcesos } from "./procesosSlice";
import { logoutUsuario } from "./usuariosSlice";

const datosAdapter = createEntityAdapter();

export const slice = createSlice({
  name: "datos",
  initialState: datosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const datos = action.payload.datos ? action.payload.datos: {}
      datosAdapter.upsertMany(state, datos);
    },
    [addNewDatoTarea.fulfilled]: (state, action) => {
      const { id, nombre, unidadMedida, accionCorrectiva, tipo, minimo, maximo, opciones } = action.payload;
      const datoExistente = state.entities[id];
      if (datoExistente) {
        datosAdapter.updateOne(state, { id, changes: { nombre, unidadMedida, accionCorrectiva, tipo, minimo, maximo, opciones }});
      } else {
        datosAdapter.addOne(state, { id, nombre, unidadMedida, accionCorrectiva, tipo, minimo, maximo, opciones });
      }
    },
    [deleteDatoTarea.fulfilled]: (state, action) => { datosAdapter.removeOne(state, action.payload.id); },
    [logoutUsuario]: () => datosAdapter.getInitialState()
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectDatoById,
  selectIds: selectDatoIds,
  selectEntities: selectDatoEntities,
  selectAll: selectAllDatos,
  selectTotal: selectTotalDatos
} = datosAdapter.getSelectors((state) => state.datos);

export const selectDatosSinRepetir = createSelector(
  [selectAllDatos],
  (datos) => datos.filter((dato1,i,a)=>a.findIndex(dato2=>(dato2.nombre.toLowerCase()===dato1.nombre.toLowerCase() && dato1.tipo=="numero"))===i)
  
);

