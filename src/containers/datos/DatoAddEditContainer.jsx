import React, { Fragment, useState, useRef } from 'react';
import { useDispatch } from "react-redux";

import {
  Button,
  Modal,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  Typography,
  Switch,
  Fab, ListItem, ListItemText, List, IconButton, ListItemSecondaryAction
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";

import { addNewDatoTarea } from '../../store/actions/actionsShared';

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
  formControl: {
    margin: `${theme.spacing(2)}px ${theme.spacing()}px`,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
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
    margin: theme.spacing()
  }
}));

const DatoAddEditContainer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const inputValorOpcion = useRef();

  const [ state, setState ] = useState({
    idDato: props.dato ? props.dato.id : null,
    nombre: props.dato ? props.dato.nombre : '',
    unidadMedida: props.dato ? props.dato.unidadMedida : '',
    tipo: props.dato ? props.dato.tipo : 'numero',
    minimo: props.dato ? props.dato.minimo : 0,
    maximo: props.dato ? props.dato.maximo : 0,
    accionCorrectiva: props.dato ? props.dato.accionCorrectiva : '',
    opciones: props.dato ? props.dato.opciones : [],
    obligatorio: props.dato ? props.dato.tarea_dato.obligatorio : false,
    idTarea: props.dato ? props.dato.tarea_dato.idTarea : props.idTarea,
    valorOpcion: ''
  });

  const handleEditAtributos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
      opciones: name === 'tipo' && value !== 'opcion' ? [] : state.opciones,
    });
  }

  const agregarNuevoDatoTarea = async () => {
    const dato = {
      idDato: state.idDato,
      nombre: state.nombre,
      unidadMedida: state.unidadMedida,
      tipo: state.tipo,
      minimo: parseFloat(state.minimo.toString()),
      maximo: parseFloat(state.maximo.toString()),
      accionCorrectiva: state.accionCorrectiva,
      opciones: state.opciones ? state.opciones : [],
      obligatorio: state.obligatorio,
      idTarea: state.idTarea
    }

    await dispatch(addNewDatoTarea(dato));
    props.handleHabilitaAddDato();
  }

  const habilitaGrabarDato = () => {
    return (
      !!state.nombre.length
      && !!state.unidadMedida.length
      && ((state.tipo === 'opcion' && state.opciones.length)
          || (state.tipo === 'cadena')
          || (state.tipo === 'numero'
              && !!state.minimo.toString().length && !!state.maximo.toString().length
              && parseFloat(state.minimo.toString()) !== 0 && parseFloat(state.maximo.toString()) !== 0
              && parseFloat(state.maximo.toString()) > parseFloat(state.minimo.toString())))
    )
  }

  const handleAgregarOpcion = () => {
    const opciones = state.opciones;
    opciones.push(state.valorOpcion);

    setState({
      ...state,
      opciones: opciones,
      valorOpcion: ''
    })

    inputValorOpcion.current.focus();
  }

  const handleBorrarOpcion = (index) => {
    setState({
      ...state,
      opciones: state.opciones.filter((item, idx) => idx !== index)
    })
  }

  const renderMinMax = () => (
      <Fragment>
        <Grid>
          <FormControlLabel
            label = "Min.:"
            labelPlacement = "start"
            control = {
              <TextField
                autoComplete = "off"
                size = "small"
                margin = "none"
                name = "minimo"
                type = "number"
                className = { classes.controlTime }
                defaultValue = { state.minimo }
                onChange = { handleEditAtributos }
                onFocus = { event => event.target.select() }
              />
            }
          />
          <FormControlLabel
            label = "Max.:"
            labelPlacement = "start"
            control = {
              <TextField
                autoComplete = "off"
                size = "small"
                margin = "none"
                name = "maximo"
                type = "number"
                className = { classes.controlTime }
                defaultValue = { state.maximo }
                onChange = { handleEditAtributos }
                onFocus = { event => event.target.select() }
              />
            }
          />
        </Grid>
      </Fragment>
  );

  const renderOpciones = () => {
    return (
      <Fragment>
        <FormControlLabel
          label = "Valor:"
          labelPlacement = "start"
          control = {
            <TextField
              autoComplete = "off"
              fullWidth
              size = "small"
              margin = "dense"
              name = "valorOpcion"
              className = { classes.controlTime }
              inputRef= { inputValorOpcion }
              value= { state.valorOpcion }
              onChange = { handleEditAtributos }
              onFocus = { event => event.target.select() }
            />
          }
        />
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          style = {{ marginLeft: 32 }}
          disabled = { !state.valorOpcion.length }
          onClick = { handleAgregarOpcion }
        >
          <AddIcon/>Agregar
        </Fab>
        <List component = "div" dense = { true } >
          {
            state.opciones.map((item, index) => (
              <ListItem key = { index } button divider >
                <ListItemText primary = { item } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick = { () => handleBorrarOpcion(index) }>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Fragment>
    );
  }

  return (
    <Modal
      open = { props.open }
      onClose = { props.handleHabilitaAddDato }
      className={ classes.modal }
    >
      <div className = { classes.paper } >
        <Grid>
          <Grid container justify="center" >
            <Typography variant = "h5" className = { classes.title } >
              Agregar Dato
            </Typography>
          </Grid>
          <Grid>
            <TextField
              autoFocus
              fullWidth
              autoComplete = "off"
              margin = "dense"
              size = "small"
              name = "nombre"
              placeholder = "Nombre"
              variant = "outlined"
              className = { classes.controlEditNombre }
              defaultValue = { state.nombre }
              onChange = { handleEditAtributos }
              onFocus = { event => event.target.select() }
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              autoComplete = "off"
              margin = "dense"
              size = "small"
              name = "unidadMedida"
              placeholder = "Unidad de medida"
              variant = "outlined"
              className = { classes.controlEdit }
              defaultValue = { state.unidadMedida }
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
                name = "accionCorrectiva"
                placeholder = "Accion Correctiva"
                variant = "outlined"
                className = { classes.controlEdit }
                defaultValue = { state.accionCorrectiva }
                onChange = { handleEditAtributos }
                onFocus = { event => event.target.select() }
            />
          </Grid>
          <FormControl className = { classes.formControl } >
            <FormControlLabel
              control={<Switch checked={state.obligatorio} onChange={handleEditAtributos} name="obligatorio" />}
              label="Obligatorio"
            />
          </FormControl>
          <Grid>
            <FormControl className = { classes.formControl } >
              <Select
                name = "tipo"
                value = { state.tipo }
                onChange = { handleEditAtributos }
              >
                <MenuItem value = '' disabled >Tipo</MenuItem>
                <MenuItem value = { 'numero' } >Numero</MenuItem>
                <MenuItem value = { 'cadena' } >Texto</MenuItem>
                <MenuItem value = { 'opcion' } >Opciones</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          { state.tipo === 'numero' && renderMinMax() }
          { state.tipo === 'opcion' && renderOpciones() }
          <div>
            <Button
              fullWidth
              variant = "contained"
              color = "primary"
              style = {{ marginTop: 8 }}
              disabled = { !habilitaGrabarDato() }
              onClick = { () => agregarNuevoDatoTarea() }
            >
              Grabar
            </Button>
          </div>
        </Grid>
      </div>
    </Modal>
  )
}

export default DatoAddEditContainer;
