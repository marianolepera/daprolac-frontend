import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { addNewOrden, fetchOrdenes } from "./ordenesSlice";
import { logoutUsuario } from "./usuariosSlice";

const tareasOrdenesAdaptar = createEntityAdapter({
  selectId: tareaOrden => `${tareaOrden.idOrden}-${tareaOrden.idTarea}`
});

export const updateTareaOrden = createAsyncThunk("tareas/updateTareaOrden",async (tarea) => {
  const { idOrden, idTarea, idUsuario } = tarea;
  const tareasOrdenPost = {
    tareas: [
      {
        idTarea,
        idUsuario
      }
    ]
  }
  const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ordenes/${idOrden}`, tareasOrdenPost);

  return {
    idOrden: response.data.payload.id,
    idTarea,
    idUsuario
  }
});

export const slice = createSlice({
  name: "tareasOrdenes",
  initialState: tareasOrdenesAdaptar.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchOrdenes.fulfilled]: (state, action) => {
      const tareasOrdenes = action.payload.tareasOrdenes
        ? action.payload.tareasOrdenes
        : {};
      tareasOrdenesAdaptar.upsertMany(state, tareasOrdenes);
    },
    [updateTareaOrden.fulfilled]: (state, action) => {
      const idTareaOrden = `${action.payload.idOrden}-${action.payload.idTarea}`;
      tareasOrdenesAdaptar.updateOne(state, {id: idTareaOrden, changes: { idUsuario: action.payload.idUsuario }});
    },
    [updateTareaOrden.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [addNewOrden.fulfilled]: (state, action) => {
      const tareasOrdenes = action.payload.tareasOrdenes
          ? action.payload.tareasOrdenes
          : {};
      tareasOrdenesAdaptar.upsertMany(state, tareasOrdenes);
    },
    [logoutUsuario]: () => tareasOrdenesAdaptar.getInitialState()
  }
});

export const {
  selectById: selectTareasOrdenesById,
  selectIds: selectTareasOrdenesIds,
  selectEntities: selectTareasOrdenesEntities,
  selectAll: selectAllTareasOrdenes,
  selectTotal: selectTotalTareasOrdenes
} = tareasOrdenesAdaptar.getSelectors(state => state.tareasOrdenes);

export const selectTareasByOrdenId = (idOrden) =>
    createSelector(
        [
          (state) => state.tareasOrdenes.ids.map((id) => state.tareasOrdenes.entities[id]),
          (state) => state.tareas.ids.map((id) => state.tareas.entities[id]),
          (state) => state.datos.ids.map((id) => state.datos.entities[id]),
          (state) => state.usuarios.ids.map((id) => state.usuarios.entities[id]),
        ],
        (tareasOrdenes, tareas, datos, usuarios) => {
          let tareasOrden = tareasOrdenes.filter(tarea => parseInt(tarea.idOrden) === parseInt(idOrden));
          tareasOrden = tareasOrden.sort((tA, tB) => new Date(tA.fechaIniciaProp) - new Date(tB.fechaIniciaProp));

          const tareasComplete = [];
          tareasOrden.forEach( tarea => {
            const tareaOrden = {
              ...tarea,
              tarea: tareas.filter(t => parseInt(t.id) === parseInt(tarea.idTarea)).pop(),
              usuario: tarea.idUsuario
                  ? usuarios.filter( u => parseInt(u.id) === parseInt(tarea.idUsuario)).pop()
                  : null
            };

            const datosOrden = []
            if (tareaOrden.datos && tareaOrden.datos.length) {
              tareaOrden.datos.forEach( datoO => {
                const dato = datos.filter( d => parseInt(d.id) === parseInt(datoO.idDato)).pop();
                const datoOrden = {
                  ...datoO,
                  nombre: dato.nombre,
                  unidadMedida: dato.unidadMedida
                }
                datosOrden.push(datoOrden);
              });
            }

            tareaOrden.datos = datosOrden;
            tareasComplete.push(tareaOrden);
          });

          return tareasComplete;
        }
    );

export const selectTareasOrdenesSinComenzar = createSelector(
  [ selectAllTareasOrdenes],
  (tareasOrdenes) => tareasOrdenes.filter(tarea => tarea.fechaInicia == null)
);

export const selectTareasOrdenesFinalizadas = createSelector(
  [ selectAllTareasOrdenes ],
  (tareasOrdenes) => tareasOrdenes.filter(tarea => tarea.fechaFin !== null)
);

export default slice.reducer;
