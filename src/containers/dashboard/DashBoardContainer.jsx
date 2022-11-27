import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashBoard from "../../components/dashboard/DashBoard";
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import {
  fetchOrdenes,
  selectAllOrdenes,
  selectOrdenesSinComenzar,
  selectOrdenesFinalizadas,
  selectOrdenesWithNested,
  selectOrdenesWithNestedwithDatos
} from "../../store/reducers/ordenesSlice";


import {
  selectDatosSinRepetir
} from "../../store/reducers/datosSlice"

import {
  selectAllTareasOrdenes,
  selectTareasOrdenesSinComenzar,
  selectTareasOrdenesFinalizadas
} from "../../store/reducers/tareasOrdenesSlice";

import {
  fetchUsuarios,
  selectAllUsarios
} from "../../store/reducers/usuariosSlice";

import { fetchProcesos } from "../../store/reducers/procesosSlice";


const DashBoardContainer = props => {
  const dispatch = useDispatch();
  const cantOrdenes = useSelector(selectAllOrdenes).length;
  const ordenesFinalizadas = useSelector(selectOrdenesFinalizadas)
  const cantOrdenesFinalizadas = ordenesFinalizadas.length;
  const ordenesSinComenzar = useSelector(selectOrdenesSinComenzar)
  const cantOrdenesSinComenzar = ordenesSinComenzar.length;
  const ordenes = useSelector(selectOrdenesWithNested);
  const ordenesWithDatos = useSelector(selectOrdenesWithNestedwithDatos);
  const usuarios = useSelector(selectAllUsarios);
  const datosSinRepetir = useSelector(selectDatosSinRepetir)

  console.log("DATOS",datosSinRepetir)

  const ordenesPorEstado = [
    { name: "Terminadas", value: cantOrdenesFinalizadas, color: "success" },
    { name: "Pendientes", value: cantOrdenes - cantOrdenesFinalizadas - cantOrdenesSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantOrdenesSinComenzar, color: "warning" },
  ];

  const cantTareas = useSelector(selectAllTareasOrdenes).length;
  const cantTareasFinalizadas = useSelector(selectTareasOrdenesFinalizadas).length;
  const cantTareasSinComenzar = useSelector(selectTareasOrdenesSinComenzar).length;

  const tareasPorEstado = [
    { name: "Terminadas", value: cantTareasFinalizadas, color: "success" },
    { name: "Pendientes", value: cantTareas - cantTareasFinalizadas - cantTareasSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantTareasSinComenzar, color: "warning" },
  ];

  console.log("ordenes",ordenesWithDatos)

 


  const analisisDeOrdenes = (() => {
    let controlOrdenes = [];

    ordenes.map(orden => {
      let estado="";
      let color="";
      let cantTareasSinComenzarPorOrden=0;
      let cantTareasFinalizadasPorOrden=0;
      let cantTareasPendientesPorOrden=0;

      ordenesSinComenzar.map(ordenSinComenzar => {
        ordenesFinalizadas.map(ordenfinalizada => {
          if(orden.id === ordenSinComenzar.id) {
            estado="sin comenzar"
            color="#ffcc00"
            cantTareasSinComenzarPorOrden++
          }
          if (orden.id === ordenfinalizada.id) {
            estado="completado"
            color="#00b33c"
            cantTareasFinalizadasPorOrden++
          }
        })
      });

      let fechaEstimada;
      // Como fecha estimada, le asgine el ultimo fecha inicia prop del array de tareas, como para tener un estimativo
      orden.tareas.map(tarea => {
        if (tarea.fechaInicia != null && tarea.fechaFin == null) {
          estado="pendiente"
          color="#e60000"
          cantTareasPendientesPorOrden++
        }
        fechaEstimada = tarea.fechaIniciaProp.substring(0,10)
      });

      let cantTareasPorOrden = orden.tareas.length;
      let porcentaje = 0;
      if (cantTareasPorOrden !== 0) {
        let diferencial = cantTareasPorOrden - cantTareasPendientesPorOrden + cantTareasSinComenzarPorOrden;

        porcentaje = ((diferencial * 100) / cantTareasPorOrden);
        if( estado === "sin comenzar") porcentaje = 0;
        if (cantTareasPorOrden === cantTareasFinalizadasPorOrden) porcentaje = 100;
      }

      if (estado !== "completado" && porcentaje != 100) {
        controlOrdenes.push({
          nombre: "Orden " + orden.numero,
          idDeLaOrden: orden.id,
          tareas: cantTareasPorOrden,
          estado: estado,
          color:color,
          porcentaje:porcentaje,
          fecha_estimada:fechaEstimada
        });
      }
    });

    return controlOrdenes;
  })();
  const tareasPorUsuario = (() => {
    const usuarioTareas = [];

    ordenes.map(orden => {
      orden.tareas.map(tarea => {
        let tCompletadas = 0
        let tPendientes = 0
        let tSinEmpezar = 0

        if (tarea.fechaInicia != null && tarea.fechaFin != null) tCompletadas++;
        if (tarea.fechaInicia != null && tarea.fechaFin == null) tPendientes++;
        if (tarea.fechaInicia == null && tarea.fechaFin == null) tSinEmpezar++;

        let indice = tarea.usuario ?
            usuarioTareas.findIndex( uTarea => uTarea.idUsuario == tarea.idUsuario) :
            usuarioTareas.findIndex( uTarea => uTarea.idUsuario == 0)

        if (indice != -1) {
          if (tarea.fechaInicia != null && tarea.fechaFin != null) usuarioTareas[indice].completadas++;
          if (tarea.fechaInicia != null && tarea.fechaFin == null) usuarioTareas[indice].pendientes++;
          if (tarea.fechaInicia == null && tarea.fechaFin == null) usuarioTareas[indice].sinEmpezar++;
        } else {
          usuarioTareas.push({
            name: tarea.usuario ? tarea.usuario.nombre + " " + tarea.usuario.apellido : "Sin Asignar",
            idUsuario: tarea.usuario ? tarea.idUsuario : 0,
            completadas: tCompletadas,
            pendientes: tPendientes,
            sinEmpezar: tSinEmpezar
          });
        }
      });
    });

    return usuarioTareas;
  })();
  const tareasCalendario = (() => {
    const tareasCalendario = [];
    let id = 0;

    ordenes.map(orden => {
      orden.tareas.map(tarea => {
        if (tarea.fechaInicia != null && tarea.fechaFin == null) {
          tareasCalendario.push({
            id: id++,
            idTarea: tarea.idTarea,
            idUsuario: tarea.idUsuario,
            title: tarea.nombre + " - Fecha Inicial Propuesta: " +
                tarea.fechaIniciaProp.substring(0,4) + "-" + tarea.fechaIniciaProp.substring(5,7) + "-" + tarea.fechaIniciaProp.substring(8,10),
            startDate: new Date(tarea.fechaInicia.substring(0,4), tarea.fechaInicia.substring(5,7) - 1, tarea.fechaInicia.substring(8,10),
                tarea.fechaInicia.substring(11,13), tarea.fechaInicia.substring(14,16)),
            members: [tarea.idUsuario]
          });
        }
      });
    });

    return tareasCalendario
  })();
  const usuariosCalendario = (() => {
    let usuariosResources = [];

    usuarios.map(usuario => {
      usuariosResources.push({
        id: usuario.id,
        text: usuario.nombre + " " + usuario.apellido
      });
    });

    return [
      {
        //se debe respetar este formato para que se visualicen los miembros
        fieldName: 'members',
        title: 'Members',
        allowMultiple: true,
        instances: usuariosResources
      },
    ];
  })();

  const statusUsuarios = useSelector(state => state.usuarios.status);
  const statusProcesos = useSelector((state) => state.procesos.status);
  const statusOrdenes = useSelector((state) => state.ordenes.status);
  const errorUsuarios = useSelector((state) => state.usuarios.error);
  const errorProcesos = useSelector((state) => state.procesos.error);
  const errorOrdenes = useSelector((state) => state.ordenes.error);

  useEffect(() => { if (statusUsuarios === "idle") { dispatch(fetchUsuarios()); }}, [statusUsuarios, dispatch]);
  useEffect(() => { if (statusProcesos === "idle") { dispatch(fetchProcesos()); }}, [statusProcesos, dispatch]);
  useEffect(() => { if (statusOrdenes === "idle") { dispatch(fetchOrdenes()); }}, [statusOrdenes, dispatch]);

  if (statusUsuarios === 'loading' || statusProcesos === 'loading' || statusOrdenes === 'loading') { return <Spinner />; }
  if (statusUsuarios === 'failed') { return <Error mensaje = { errorUsuarios } />; }
  if (statusProcesos === 'failed') { return <Error mensaje = { errorProcesos } />; }
  if (statusOrdenes === 'failed') { return <Error mensaje = { errorOrdenes } />; }

  return (
    <DashBoard
        cantOrdenes = { cantOrdenes }
        ordenesWithDatos={ordenesWithDatos}
        cantTareas = { cantTareas }
        datosSinRepetir={datosSinRepetir}
        ordenesPorEstado = { ordenesPorEstado }
        tareasPorEstado = { tareasPorEstado }
        analisisOrdenes = { analisisDeOrdenes }
        ordenesTareasCalendario = { tareasCalendario }
        resources = { usuariosCalendario }
        usuarioTareasComponente = { tareasPorUsuario }
    />
  );
};

export default DashBoardContainer;
