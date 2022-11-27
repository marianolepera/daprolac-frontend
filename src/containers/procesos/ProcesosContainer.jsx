import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProcesos,
  addNewProceso,
  deleteProceso,
  selectAllProcesos
} from "../../store/reducers/procesosSlice";

import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { withTheme } from "@material-ui/core/styles";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import Procesos from "../../components/procesos/Procesos";

const ProcesosContainer = (props) => {
  const dispatch = useDispatch();
  const procesos = useSelector(selectAllProcesos);

  const postStatus = useSelector((state) => state.procesos.status);
  const error = useSelector((state) => state.procesos.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchProcesos());
    }
  }, [postStatus, dispatch]);

  const crearProceso = async (proceso, {resetForm}) => {
    dispatch(addNewProceso(proceso));

    if (!error) {
      await Swal.fire('Se agregó el proceso', '', 'success');
      resetForm({values: ''});
    } else {
      await Swal.fire('Hubo un error', this.props.error, 'error');
    }
  }

  const borrarProceso = async (idProceso) => {

    const result = await Swal.fire({
      title: "¿Seguro desea eliminar el proceso?",
      text: "No hay vuelta atras!",
      icon: 'question',
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
      showCancelButton: true,
      confirmButtonColor: props.theme.palette.secondary.dark,
      cancelButtonColor: props.theme.palette.error.dark
    });

    if (result.value) {
      await dispatch(deleteProceso(idProceso));

      if (!error) {
        await Swal.fire('Proceso eliminado', '', 'success');
      } else {
        await Swal.fire('Hubo un error', error, 'error');
      }
    }
  }

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  return (
    <React.Fragment>
      <Formik
        initialValues = {{ producto: '' }}
        validationSchema = { Yup.object({
          producto: Yup.string().required('Debe ingresar el nombre del proceso')
        })}
        onSubmit = { crearProceso }
      >
        {
          formik => (
            <Procesos
              formik = { formik }
              procesos = { procesos }
              borrarProceso = { borrarProceso }
            />
          )
        }
      </Formik>
    </React.Fragment>
  );
}

export default withTheme(ProcesosContainer);
