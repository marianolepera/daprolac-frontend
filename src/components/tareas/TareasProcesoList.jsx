import React, {Fragment, useState, useRef} from "react";
import clsx from "clsx";
import Swal from "sweetalert2";

import { Avatar, Button, Divider, IconButton, Modal, TextField, Typography } from "@material-ui/core";
import { Card, CardHeader, CardActions, CardActionArea, Collapse, Menu, MenuItem, Fade } from "@material-ui/core";
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CodeIcon from '@material-ui/icons/Code';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DatoAddEditContainer from "../../containers/datos/DatoAddEditContainer";
import TareaAddEditContainer from "../../containers/tareas/TareaAddEditContainer";

const INITIAL_ELEVATION = 4;
const TOGGLE_ELEVATION = 4;

const WIDTH_TAREA = 300;

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: theme.spacing(),
    marginRight: 24,
    width: WIDTH_TAREA,
    height: '100%',
    minHeight: 100,
  },
  paper: {
    position: 'absolute',
    width: WIDTH_TAREA,
    backgroundColor: theme.palette.background,
    borderRadius: theme.spacing(),
    outline: 'none'
  },
  controlEdit: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing()
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const TareasProcesoList = ({ tarea, ...props }) => {
  const classes = useStyles();
  const cardRef = useRef();
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const [ state, setState ] = useState({
    elevation: INITIAL_ELEVATION,
    expanded: tarea.datos ? !!tarea.datos.length : false,
    editarTarea: false,
    nombre: tarea.nombre,
    observaciones: tarea.observaciones,
    editarTareaCompleta: false,
    agregarDato: false,
    editarDato: false,
    dato: null
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

  const handleHabilitaEditTarea = () => {
    setState({
      ...state,
      elevation: INITIAL_ELEVATION,
      editarTarea: !state.editarTarea,
    });
  }

  const handleEditarTarea = async (idTarea) => {
    await props.editarTarea({
      id: idTarea,
      nombre: state.nombre,
      observaciones: state.observaciones
        ? state.observaciones
        : ''
    });
    handleHabilitaEditTarea();
  }

  const handleHabilitaEditTareaCompleta = () => {
    handleCloseMenu();

    setState({
      ...state,
      elevation: INITIAL_ELEVATION,
      editarTareaCompleta: !state.editarTareaCompleta,
    });
  }

  const handleHabilitaAddDato = () => {
    setState({
      ...state,
      agregarDato: !state.agregarDato,
      expanded: tarea.datos ? !!tarea.datos.length : false
    });
  }

  const handleHabilitaEditDato = (dato) => {
    setState({
      ...state,
      editarDato: !state.editarDato,
      dato: dato
    });
  }

  const deleteDatoTarea = async (dato) => {
    const result = await Swal.fire({
      title: `¿Seguro desea eliminar ${dato.nombre} de ${tarea.nombre} ?`,
      text: "No hay vuelta atras!",
      icon: 'question',
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
      showCancelButton: true,
      confirmButtonColor: props.theme.palette.secondary.dark,
      cancelButtonColor: props.theme.palette.error.dark
    });

    if (result.value) {
      await props.deleteDato(dato.id);
    }
  }

  const deleteTareaProceso = async () => {
    handleCloseMenu();

    const result = await Swal.fire({
      title: `¿Seguro desea eliminar la tarea ${tarea.nombre} ?`,
      text: "No hay vuelta atras!",
      icon: 'question',
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
      showCancelButton: true,
      confirmButtonColor: props.theme.palette.secondary.dark,
      cancelButtonColor: props.theme.palette.error.dark
    });

    if (result.value) {
      await props.deleteTarea(tarea.id);
    }
  }

  const handleOpenMenu = (event) => {
    handleMouseOut();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleMouseOver = () => setState({ ...state, elevation: state.elevation * TOGGLE_ELEVATION });
  const handleMouseOut = () => setState({ ...state, elevation: state.elevation / TOGGLE_ELEVATION });
  const handleExpandClick = () => { setState({ ...state, expanded: !state.expanded }); }

  const renderEditTarea = () => {
    return (
      <Modal
        open = { state.editarTarea }
        onClose = { handleHabilitaEditTarea }
        style = { cardRef.current
            ? {
              left: cardRef.current.getBoundingClientRect().left,
              top: cardRef.current.getBoundingClientRect().top
            } : null }
      >
        <div className = { classes.paper } >
          <TextField
            autoFocus
            fullWidth
            autoComplete = "off"
            margin = "none"
            name = "nombre"
            variant = "outlined"
            className = { classes.controlEdit }
            defaultValue = { state.nombre }
            onChange = { handleEditAtributos }
            onFocus = { event => event.target.select() }
          />
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
          <div>
            <Button
              variant = "contained"
              color = "primary"
              style = {{ marginTop: 8 }}
              onClick = { state.nombre.length ? () => handleEditarTarea(tarea.id) : null }
            >
              Grabar
            </Button>
          </div>
        </div>
      </Modal>
    )};

  const renderDatosTarea = () => {
    if (!tarea.datos.length) return null;

    return (
      <List dense>
        {
          tarea.datos.map(dato => (
            <ListItem key = { dato.id } button onClick = { () => handleHabilitaEditDato(dato) } >
              <ListItemAvatar>
                <Avatar>
                  <CodeIcon fontSize="small"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary = { dato.tarea_dato.obligatorio ? `${dato.nombre} *` : `${dato.nombre}` }
                secondary = {`Tipo: ${dato.tipo}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge = "end" onClick = { () => deleteDatoTarea(dato) } >
                  <DeleteIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    )
  }

  return (
    <Fragment>
      <Card
        className = { classes.container }
        elevation = { state.elevation }
        onMouseOver = { handleMouseOver }
        onMouseOut = { handleMouseOut }
        ref = { cardRef }
      >
        <CardHeader
          action = {
            <Fragment>
              <IconButton onClick = { handleOpenMenu } >
                <MoreVertIcon color = "primary"  />
              </IconButton>
              <Menu
                id = "long-menu"
                anchorEl = { anchorEl }
                keepMounted
                open = { !!anchorEl }
                onClose = { handleCloseMenu }
                TransitionComponent = { Fade }
              >
                <MenuItem selected onClick = { handleHabilitaEditTareaCompleta } >Editar</MenuItem>
                { props.ultimaTarea && <MenuItem onClick = { deleteTareaProceso } >Borrar</MenuItem> }
              </Menu>
            </Fragment>
          }
          title = {
            <CardActionArea onClick = { handleHabilitaEditTarea } >
              <Typography gutterBottom variant = "h6">
                { tarea.nombre }
              </Typography>
            </CardActionArea>
          }
          subheader = {
            <Fragment>
              <CardActionArea onClick = { handleHabilitaEditTarea } >
                <Typography variant = "body2" color = "textSecondary" >
                  { tarea.observaciones }
                </Typography>
                { tarea.proceso_tarea.idTareaAntecesora &&
                  <div style = {{ marginTop: 15 }} >
                    <ScheduleIcon color = "secondary" style = {{ float: 'left', marginRight: 6 }} />
                    <Typography variant="subtitle2" color="textSecondary" style = {{ paddingTop: 2 }} >
                      {
                        `${tarea.proceso_tarea.diasAntecesora} Dias 
                        ${tarea.proceso_tarea.horasAntecesora} Horas 
                        ${tarea.proceso_tarea.minutosAntecesora} Minutos`
                      }
                    </Typography>
                  </div>
                }
              </CardActionArea>
            </Fragment>
          }
        />
        <Divider variant = "middle" light />
        <CardActions disableSpacing >
          <Button
            size = "small"
            color = "secondary"
            variant = "outlined"
            onClick = { handleHabilitaAddDato }
          >
            + Agregar dato
          </Button>
          <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: state.expanded,
              })}
              onClick = { handleExpandClick }
              aria-expanded = { state.expanded }
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in = { state.expanded } timeout="auto" unmountOnExit >
          { tarea.datos && renderDatosTarea() }
        </Collapse>
      </Card>

      { state.editarTarea && renderEditTarea() }
      { state.editarTareaCompleta &&
        <TareaAddEditContainer
            open = { state.editarTareaCompleta }
            handleHabilitaAddTarea = { handleHabilitaEditTareaCompleta }
            tarea = { tarea }
        />
      }
      { state.agregarDato &&
        <DatoAddEditContainer
          open = { state.agregarDato }
          handleHabilitaAddDato = { handleHabilitaAddDato }
          idTarea = { tarea.id }
        />
      }
      { state.editarDato &&
        <DatoAddEditContainer
          open = { state.editarDato }
          handleHabilitaAddDato = { handleHabilitaEditDato }
          dato = { state.dato }
        />
      }
    </Fragment>
  )
}

export default withTheme(TareasProcesoList);
