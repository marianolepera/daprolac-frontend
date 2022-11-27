import { combineReducers } from "redux";

import usuariosReducer from "./usuariosSlice";
import procesosReducer from "./procesosSlice";
import tareasReducer from "./tareasSlice";
import datosReducer from "./datosSlice";
import procesosTareasReducer from "./procesosTareasSlice";
import tareasDatosReducer from "./tareasDatosSlice";
import ordenesReducer from "./ordenesSlice";
import tareasOrdenesReducer from "./tareasOrdenesSlice";

export default combineReducers({
  usuarios: usuariosReducer,
  ordenes: ordenesReducer,
  procesos: procesosReducer,
  tareas: tareasReducer,
  datos: datosReducer,
  procesosTareas: procesosTareasReducer,
  tareasDatos: tareasDatosReducer,
  tareasOrdenes: tareasOrdenesReducer
});
