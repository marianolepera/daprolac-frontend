import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux";

import { Button, Modal, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { addNewTareaProceso } from '../../store/actions/actionsShared';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 12,
    justifyContent: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(),
    padding: theme.spacing(2, 4, 3),
  },
  controlEditNombre: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(),
    minWidth: 480
  },
  controlEdit: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing()
  },
  controlTime: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(),
    width: 150,
    margin: 5
  }
}));

const TareaAddEditContainer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [ state, setState ] = useState({
    agregarTarea: false,
    idTarea: props.tarea ? props.tarea.id : null,
    nombre: props.tarea ? props.tarea.nombre : '',
    observaciones: props.tarea ? props.tarea.observaciones : '',
    idProceso: props.tarea ? props.tarea.proceso_tarea.idProceso : props.idProceso,
    idTareaAntecesora: props.tarea ? props.tarea.proceso_tarea.idTareaAntecesora : props.idTareaAntecesora,
    diasAntecesora: props.tarea ? props.tarea.proceso_tarea.diasAntecesora : 0,
    horasAntecesora: props.tarea ? props.tarea.proceso_tarea.horasAntecesora : 0,
    minutosAntecesora: props.tarea ? props.tarea.proceso_tarea.minutosAntecesora : 0
  });

  const handleEditAtributos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    });
  }

  const agregarNuevaTareaProceso = async () => {
    const tarea = {
      idTarea: state.idTarea,
      nombre: state.nombre,
      observaciones: state.observaciones,
      idProceso: state.idProceso,
      idTareaAntecesora: state.idTareaAntecesora,
      diasAntecesora: parseInt(state.diasAntecesora.toString()),
      horasAntecesora: parseInt(state.horasAntecesora.toString()),
      minutosAntecesora: parseInt(state.minutosAntecesora.toString())
    }

    await dispatch(addNewTareaProceso(tarea));
    props.handleHabilitaAddTarea();
  }

  const habilitaGrabarTarea = () => {
    return (
      !!state.nombre.length
      && ((!state.idTareaAntecesora) || ((state.diasAntecesora + state.minutosAntecesora + state.horasAntecesora) > 0))
    );
  }

  const renderTiempo = () => (
    <Fragment>
      <Grid>
        <Typography variant = "subtitle2" className = { classes.title } >
          Dias / Horas / Minutos Antecesora
        </Typography>
      </Grid>
      <Grid>
        <TextField
          autoComplete = "off"
          size = "small"
          margin = "none"
          name = "diasAntecesora"
          variant = "outlined"
          type = "number"
          className = { classes.controlTime }
          defaultValue = { state.diasAntecesora }
          onChange = { handleEditAtributos }
          onFocus = { event => event.target.select() }
        />
        <TextField
          autoComplete = "off"
          size = "small"
          margin = "none"
          name = "horasAntecesora"
          variant = "outlined"
          type = "number"
          InputProps={{ inputProps: { min: 0, max: 59 } }}
          className = { classes.controlTime }
          defaultValue = { state.horasAntecesora }
          onChange = { handleEditAtributos }
          onFocus = { event => event.target.select() }
        />
        <TextField
          autoComplete = "off"
          size = "small"
          margin = "none"
          name = "minutosAntecesora"
          variant = "outlined"
          type = "number"
          InputProps={{ inputProps: { min: 0, max: 59 } }}
          className = { classes.controlTime }
          defaultValue = { state.minutosAntecesora }
          onChange = { handleEditAtributos }
          onFocus = { event => event.target.select() }
        />
      </Grid>
    </Fragment>
  );

  return (
    <Modal
      open = { props.open }
      onClose = { props.handleHabilitaAddTarea }
      className={ classes.modal }
    >
      <div className = { classes.paper } >
        <Grid>
          <Grid container justify="center" >
            <Typography variant = "h5" className = { classes.title } >
              Agregar Tarea
            </Typography>
          </Grid>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              autoComplete = "off"
              margin = "none"
              size = "small"
              name = "nombre"
              placeholder = "nombre"
              variant = "outlined"
              className = { classes.controlEditNombre }
              defaultValue = { state.nombre }
              onChange = { handleEditAtributos }
              onFocus = { event => event.target.select() }
            />
          </Grid>
          <Grid>
            <TextField
              multiline
              fullWidth
              rows = {5}
              autoComplete = "off"
              margin = "normal"
              name = "observaciones"
              placeholder = "Observaciones"
              variant = "outlined"
              className = { classes.controlEdit }
              defaultValue = { state.observaciones }
              onChange = { handleEditAtributos }
              onFocus = { event => event.target.select() }
            />
          </Grid>
          { state.idTareaAntecesora && renderTiempo() }
          <div>
            <Button
              fullWidth
              variant = "contained"
              color = "primary"
              style = {{ marginTop: 8 }}
              disabled ={ !habilitaGrabarTarea() }
              onClick = { () => agregarNuevaTareaProceso() }
            >
              Grabar
            </Button>
          </div>
        </Grid>
      </div>
    </Modal>
  )
}

export default TareaAddEditContainer;
