import React, { Fragment, useState } from "react";

import { Button, TextField, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TareasProcesoList from "../tareas/TareasProcesoList";
import TareaAddEditContainer from "../../containers/tareas/TareaAddEditContainer";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing()
  },
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    padding: 8,
    height: "100%",
    marginRight: 8
  },
  cardContainer1: {
    backgroundColor: "white",
    borderRadius: 3,
    width: 220,
    padding: 8,
    height: "100%",
    marginRight: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  agregarTarea: {
    minHeight: 250,
    width: 250,
    borderRadius: 6
  }
}));

const ProcesoDetalle = ({ proceso, tareas, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [ state, setState ] = useState({
    agregarTarea: false,
    editarProceso: false,
    producto: proceso.producto
  })

  const handleEditAtributos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    });
  }

  const handleHabilitaEditProceso = () => {
    setState({
      ...state,
      editarProceso: !state.editarProceso,
      producto: state.producto === ''
          ? proceso.producto
          : state.producto
    });
  }

  const handleEditarProceso = async (idProceso, event) => {
    if (event.type === 'keypress' && event.charCode !== 13) {
      return
    }

    await props.editarProceso({
      id: idProceso,
      producto: state.producto
    });
    handleHabilitaEditProceso();
  }

  const handleHabilitaAddTarea = () => {
    setState({
      ...state,
      agregarTarea: !state.agregarTarea
    });
  }

  const renderTitleProceso = () => {
    return (
      state.editarProceso ? (
        <TextField
          autoFocus
          fullWidth
          name = "producto"
          margin = "dense"
          helperText = { !state.producto.length ? 'Debe ingresar el producto' : null }
          error = { !state.producto.length }
          defaultValue = { state.producto }
          inputProps = {{ style: { fontSize: theme.typography.fontSize * 2 } }}
          onChange = { handleEditAtributos }
          onKeyPress = { state.producto.length ? event => handleEditarProceso(proceso.id, event) : handleHabilitaEditProceso }
          onBlur = { state.producto.length ? event => handleEditarProceso(proceso.id, event) : handleHabilitaEditProceso }
          onFocus = { event => event.target.select() }
        />
      ) : (
        <Fragment>
          <Typography variant = "h4" style = {{ marginBottom: theme.spacing(2) }} >
            { proceso.producto }
          </Typography>
          <div>
            <IconButton
              color = "secondary"
              style = {{ marginLeft: theme.spacing()/2, marginTop: - theme.spacing()/2 }}
              onClick = { handleHabilitaEditProceso }
            >
              <EditIcon />
            </IconButton>
          </div>
        </Fragment>
      )
    )
  }

  return (
    <div>
      <div className = { classes.root } >
        { renderTitleProceso() }
      </div>

      <div className = { classes.root } >
        {
          tareas.map( tarea =>
            <TareasProcesoList
              key = { tarea.id }
              tarea = { tarea }
              editarTarea = { props.editarTarea }
              ultimaTarea = { parseInt(tarea.id) === tareas[tareas.length - 1].id }
              deleteDato = { props.deleteDato }
              deleteTarea = { props.deleteTarea }
            />
          )
        }

        <Button className= { classes.agregarTarea } onClick = { handleHabilitaAddTarea } >
          <AddCircleIcon style = {{ marginRight: theme.spacing() }} />Agregar Tarea
        </Button>

        { state.agregarTarea &&
          <TareaAddEditContainer
            open = { state.agregarTarea }
            handleHabilitaAddTarea = { handleHabilitaAddTarea }
            idProceso = { proceso.id }
            idTareaAntecesora = { !!(tareas && tareas.length) ? tareas[tareas.length - 1].id : null }
          />
        }
      </div>
      {/* <div style={{ marginTop: "10px" }}>
        <Button
          variant = "contained"
          color = "primary"
          size = "large"
          disabled = { !proceso.tareas.length }
        >
          Crear Orden de Produccion
        </Button>
      </div> */}
    </div>
  );
}

export default ProcesoDetalle;
