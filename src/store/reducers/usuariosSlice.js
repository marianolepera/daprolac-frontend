import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';
import axios from 'axios';
import { usuarioEntity } from '../schemas';
import { normalize } from 'normalizr';

const usuariosAdapter = createEntityAdapter();

const initialState = usuariosAdapter.getInitialState({
  auth: false,
  usuario: {},
  status: "idle",
  error: null
});

export const fetchUsuarios = createAsyncThunk("usuarios/fetchUsuarios", async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/usuarios?eager=1`);
  const normalized = normalize(response.data.payload, [usuarioEntity]);
  return normalized.entities;
});

export const loginUsuario = createAsyncThunk("usuarios/loginUsuario",async (credenciales) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/usuarios/login`, credenciales);
  return response.data.payload;
});

export const addNewUsuario = createAsyncThunk("usuarios/addNewUsuario",async (usuario) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/usuarios`, usuario);
  return response.data.payload;
});

export const deleteUsuario = createAsyncThunk("usuarios/deleteUsuario",async (idUsuario) => {
  const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/procesos/${idUsuario}`);
  return response.data.payload;
});

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    usuarioActualizado(state, action) {
      const { id, producto } = action.payload;
      const procesoExistente = state.entities[id];
      if (procesoExistente) {
        procesoExistente.producto = producto;
      }
    },
    logoutUsuario: () => initialState
  },
  extraReducers: builder => {
    const isPendingAction = (action) => { return (action.type.startsWith('usuarios/') && action.type.endsWith('/pending')) };
    const isRejectedAction = (action) => { return (action.type.startsWith('usuarios/') && action.type.endsWith('/rejected')) };

    const loading = (state) => { state.status = 'loading' }
    const error = (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }

    builder
      .addCase(loginUsuario.fulfilled, (state, action) => {
          const { auth, ...usuario } = action.payload;
          state.status = 'idle';

          if (usuario.tipo === 0) {
            state.auth = auth;
            state.usuario = usuario;
            state.error = ( auth ? null : "Email o clave invalida");
          } else {
            state.auth = false;
            state.usuario = {};
            state.error = "Solo los usuarios administradores pueden ingresar al panel";
          }
        })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
          state.status = 'succeeded';
          usuariosAdapter.upsertMany(state, action.payload.usuarios);
        })
      .addCase(addNewUsuario.fulfilled, usuariosAdapter.addOne)
      .addCase(deleteUsuario.fulfilled, (state, action) => {
          usuariosAdapter.removeOne(state, action.payload.id);
        })
      .addMatcher(isPendingAction, loading)
      .addMatcher(isRejectedAction, error)
      .addDefaultCase((state, action) => state);
  }
});

export const { usuarioActualizado, logoutUsuario } = usuariosSlice.actions;

export const {
  selectAll: selectAllUsarios,
  selectById: selectUsuarioById,
  selectIds: selectUsuarioIds
} = usuariosAdapter.getSelectors((state) => state.usuarios);

export default usuariosSlice.reducer;
