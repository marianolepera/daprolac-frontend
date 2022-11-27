import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { addNewDatoTarea, addNewTareaProceso, deleteTareaProceso, deleteDatoTarea } from "../actions/actionsShared";

import { fetchProcesos } from "./procesosSlice";
import { logoutUsuario } from "./usuariosSlice";

const tareasAdapter = createEntityAdapter();

export const updateTarea = createAsyncThunk("tareas/updateTarea",async (tarea) => {
  const { id, nombre, observaciones } = tarea;
  const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tareas/${id}`, { nombre, observaciones });
  return response.data.payload;
});

export const slice = createSlice({
  name: "tareas",
  initialState: tareasAdapter.getInitialState(),
  reducers: {
    tareaActualizada(state, action) {
      const { id, producto } = action.payload;
      const procesoExistente = state.entities[id];
      if (procesoExistente) {
        procesoExistente.producto = producto;
      }
    }
  },
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const tareas = action.payload.tareas ? action.payload.tareas : {};
      tareasAdapter.upsertMany(state, tareas);
    },
    [updateTarea.fulfilled]: (state, action) => {
      const { id, nombre, observaciones } = action.payload;
      tareasAdapter.updateOne(state, { id, changes: { nombre, observaciones }});
    },
    [addNewTareaProceso.fulfilled]: (state, action) => {
      const { id, nombre, observaciones } = action.payload;
      const tareaExistente = state.entities[id];

      if (tareaExistente) {
        tareasAdapter.updateOne(state, { id, changes: { nombre, observaciones }});
      } else {
        tareasAdapter.addOne(state, { id, nombre, observaciones, datos: [] });
      }
    },
    [addNewTareaProceso.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [addNewDatoTarea.fulfilled]: (state, action) => {
      const { id, idTarea } = action.payload;
      if (!state.entities[idTarea].datos.includes(id)) {
        state.entities[idTarea].datos.push(id);
      }
    },
    [deleteTareaProceso.fulfilled]: (state, action) => {
      tareasAdapter.removeOne(state, action.payload.id);
    },
    [deleteDatoTarea.fulfilled]: (state, action) => {
      const idDato = action.payload.id;
      Object.keys(state.entities).forEach( idTarea => {
        const datos = state.entities[idTarea].datos;
        state.entities[idTarea].datos = datos.filter(idD => parseInt(idD) !== parseInt(idDato));
      })
    },
    [logoutUsuario]: () => tareasAdapter.getInitialState()
  }
});

export const { tareaActualizada } = slice.actions;

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectTareaById,
  selectIds: selectTareaIds,
  selectEntities: selectTareaEntities,
  selectAll: selectAllTareas,
  selectTotal: selectTotalTareas
} = tareasAdapter.getSelectors((state) => state.tareas);
