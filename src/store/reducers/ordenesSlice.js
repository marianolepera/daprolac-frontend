import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";

import { ordenEntity } from "../schemas";

import { logoutUsuario } from "./usuariosSlice";

const ordenesAdapter = createEntityAdapter();

const initialState = ordenesAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchOrdenes = createAsyncThunk(
  "ordenes/fetchOrdenes",
  async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/ordenes?eager=1`
    );
    const normalized = normalize(response.data.payload, [ordenEntity]);
    return normalized.entities;
  }
);

export const addNewOrden = createAsyncThunk(
  "ordenes/addNewOrden",
  async orden => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ordenes`,
      orden
    );
    const normalized = normalize(response.data.payload, ordenEntity);
    return normalized.entities;
  }
);

export const deleteOrden = createAsyncThunk(
  "ordenes/deleteOrden",
  async idOrden => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ordenes/${idOrden}`
    );
    return response.data.payload;
  }
);

const slice = createSlice({
  name: "ordenes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrdenes.pending]: state => { state.status = "loading"; },
    [fetchOrdenes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const ordenes = action.payload.ordenes ? action.payload.ordenes : {}
      ordenesAdapter.upsertMany(state, ordenes);
    },
    [fetchOrdenes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewOrden.fulfilled]: (state, action) => {
      const ordenes = action.payload.ordenes ? action.payload.ordenes : {}
      ordenesAdapter.upsertMany(state, ordenes);
    },
    [addNewOrden.rejected]: (state, action) => { state.error = action.error.message; },
    [logoutUsuario]: () => initialState
  }
});

export const {
  selectAll: selectAllOrdenes,
  selectById: selectOrdenById,
  selectIds: selectOrdenIds
} = ordenesAdapter.getSelectors(state => state.ordenes);

export const selectOrdenesWithNested = createSelector(
    [
      selectAllOrdenes,
      (state) => state.procesos.ids.map((id) => state.procesos.entities[id]),
      (state) => state.tareasOrdenes.ids.map((id) => state.tareasOrdenes.entities[id]),
      (state) => state.usuarios.ids.map((id) => state.usuarios.entities[id]),
      (state) => state.tareas.ids.map((id) => state.tareas.entities[id]),
    ],
    (ordenes, procesos, tareasOrdenes, usuarios, tareas) => {
      return ordenes.map(orden => {
        let tareasOrden = tareasOrdenes.filter(tarea => parseInt(tarea.idOrden) === parseInt(orden.id));
        let tOrden = tareasOrden.sort((tA, tB) => new Date(tA.fechaIniciaProp) - new Date(tB.fechaIniciaProp));

        tOrden = tOrden.map( tarea => {
          return {
            ...tarea,
            nombre: tareas.filter( ta => ta.id == tarea.idTarea ).pop().nombre,
            usuario: tarea.idUsuario
                ? usuarios.filter( u => parseInt(u.id) === parseInt(tarea.idUsuario)).pop()
                : null
          }
        });

        return {
          ...orden,
          proceso: procesos.filter( proceso => parseInt(proceso.id) === parseInt(orden.idProceso)).pop(),
          tareas: tOrden,
        }
      });
    }
)

export const selectOrdenesWithNestedwithDatos = createSelector(
  [
    selectAllOrdenes,
    (state) => state.procesos.ids.map((id) => state.procesos.entities[id]),
    (state) => state.tareasOrdenes.ids.map((id) => state.tareasOrdenes.entities[id]),
    (state) => state.usuarios.ids.map((id) => state.usuarios.entities[id]),
    (state) => state.tareas.ids.map((id) => state.tareas.entities[id]),
    (state) => state.datos.ids.map((id) => state.datos.entities[id]),
  ],
  (ordenes, procesos, tareasOrdenes, usuarios, tareas,datos) => {
    return ordenes.map(orden => {
      let tareasOrden = tareasOrdenes.filter(tarea => parseInt(tarea.idOrden) === parseInt(orden.id));
      let tOrden = tareasOrden.sort((tA, tB) => new Date(tA.fechaIniciaProp) - new Date(tB.fechaIniciaProp));

      const datosOrden = []
        tOrden.forEach( tarea => {
            const tareaOrden = {
              ...tarea,
              tarea: tareas.filter(t => parseInt(t.id) === parseInt(tarea.idTarea)).pop(),
              usuario: tarea.idUsuario
                  ? usuarios.filter( u => parseInt(u.id) === parseInt(tarea.idUsuario)).pop()
                  : null
            };

           
            if (tareaOrden.datos && tareaOrden.datos.length) {
              tareaOrden.datos.forEach( datoO => {
                const dato = datos.filter( d => parseInt(d.id) === parseInt(datoO.idDato)).pop();
                const datoOrden = {
                  ...datoO,
                  nombre: dato.nombre,
                  unidadMedida: dato.unidadMedida,
                  minimo: dato.minimo,
                  maximo: dato.maximo,
                }
                datosOrden.push(datoOrden);
              });
            }

            tareaOrden.datos = datosOrden;
          });

      return {
        ...orden,
        datos:datosOrden
      }
    });
  }
)

export const selectOrdenesSinComenzar = createSelector(
    [
      (state) => state.ordenes.ids.map((id) => state.ordenes.entities[id]),
      (state) => state.tareasOrdenes.ids.map((id) => state.tareasOrdenes.entities[id])
    ],
    (ordenes, tareasOrdenes) => {
      const ordenesSinComenzar = [];
      ordenes.forEach(orden => {
        let tareasOrden = tareasOrdenes.filter(tarea => parseInt(tarea.idOrden) === parseInt(orden.id));
        let tareas = tareasOrden.sort((tA, tB) => new Date(tA.fechaIniciaProp) - new Date(tB.fechaIniciaProp));

        if (tareas[0].fechaInicia == null) {
          ordenesSinComenzar.push({
            ...orden,
            tareas: tareas
          });
        }
      });

      return ordenesSinComenzar;
    }
);

export const selectOrdenesFinalizadas = createSelector(
  [selectAllOrdenes],
  (ordenes) => ordenes.filter(orden => orden.finalizada)
);


export default slice.reducer;
