import 'date-fns';
import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { Button, FormControl, Grid, MenuItem, Select, InputLabel } from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";

import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { addNewOrden } from '../../store/reducers/ordenesSlice';
import { selectProcesosWithTareas } from '../../store/reducers/procesosSlice';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(),
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: `${theme.spacing(2)}px ${theme.spacing()}px`,
    minWidth: 200,
  },
}));

const NuevaOrdenContainer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const procesos = useSelector(selectProcesosWithTareas);

  const [ idProceso, setIdProceso ] = useState(undefined);
  const [ fecha, setFecha] = useState(new Date());

  const handleProcesoChange = (idProceso) => setIdProceso(idProceso);
  const handleFechaChange = (fecha) => setFecha(fecha);

  const crearNuevoProceso = async () => {
    const result = await Swal.fire({
      title: `¿Seguro desea crear la orden con los datos seleccionados?`,
      text: "No hay vuelta atras!",
      icon: 'question',
      confirmButtonText: "Si, Crear",
      cancelButtonText: "No, Cancelar",
      showCancelButton: true,
      confirmButtonColor: props.theme.palette.secondary.dark,
      cancelButtonColor: props.theme.palette.error.dark
    });

    if (result.value) {
      await dispatch(addNewOrden({
        idProceso,
        fechaIniciaProp: fecha
      }));
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing = {4}>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="proceso-label">Proceso</InputLabel>
              <Select
                autoWidth
                labelId = "proceso-label"
                name = "idProceso"
                value = { idProceso ? idProceso : "" }
                onChange = { (event) => handleProcesoChange(event.target.value) }
              >
                {
                  procesos.map( proceso => {
                    return (<MenuItem key = { proceso.id } value = { proceso.id } >{proceso.producto}</MenuItem>)
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
              <KeyboardDateTimePicker
                disablePast
                margin="normal"
                id="date-picker-dialog"
                label="Inicio Propuesto"
                format="dd/MM/yyyy HH:mm"
                ampm = {false}
                value={fecha}
                invalidLabel="Fecha Invalida"
                minDateMessage="Fecha mayor o igual a la actual"
                onChange={handleFechaChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Button
                variant = "contained"
                color = "primary"
                size = "large"
                disabled = { !idProceso }
                startIcon = { <SaveAltIcon /> }
                onClick = { crearNuevoProceso }
              >
                Crear Orden de Produccion
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTheme(NuevaOrdenContainer);
