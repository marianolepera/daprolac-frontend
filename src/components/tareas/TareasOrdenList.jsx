import React, {Fragment, useState, useRef} from "react";

import { Divider, Typography } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardActionArea } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";

import CheckIcon from '@material-ui/icons/Check';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import TareaOrdenEditContainer from '../../containers/tareas/TareaOrdenEditContainer';

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
  }
}));

const TareasOrdenList = ({ tareaOrden, ...props }) => {
  const classes = useStyles();
  const cardRef = useRef();

  const [ state, setState ] = useState({
    elevation: INITIAL_ELEVATION,
    editarTarea: false,
  })

  const handleHabilitaEditTarea = () => {
    setState({
      ...state,
      elevation: INITIAL_ELEVATION,
      editarTarea: !state.editarTarea,
    });
  }

  const handleMouseOver = () => setState({ ...state, elevation: state.elevation * TOGGLE_ELEVATION });
  const handleMouseOut = () => setState({ ...state, elevation: state.elevation / TOGGLE_ELEVATION });

  const renderDatosOrden = () => {
    if (!tareaOrden.datos.length) return null;

    return (
      <Fragment>
        <List dense>
          {
            tareaOrden.datos.map(dato => (
              <ListItem key = { dato.idDato } button >
                <CheckIcon fontSize="small" style={{ marginRight: 8 }}/>
                <ListItemText
                  primary = { dato.valor ? ` ${dato.nombre}: ${dato.valor} ${dato.unidadMedida}` : ` ${dato.nombre}:` }
                />
              </ListItem>
            ))
          }
        </List>
      </Fragment>
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
        <CardActionArea onClick = { handleHabilitaEditTarea } >
          <CardHeader
            title = {
              <Typography gutterBottom variant = "h6">
                { tareaOrden.tarea.nombre }
              </Typography>
            }
            subheader = {
              <Fragment>
                <div style = {{ marginTop: 20, marginBottom: 10 }} >
                  <ScheduleIcon color = "primary" style = {{ float: 'left', marginRight: 6}} />
                  <Typography variant="subtitle2" color="textSecondary" style = {{ paddingTop: 2 }} >
                    { <b>Propuesta: {new Date(tareaOrden.fechaIniciaProp).toLocaleString()}</b> }
                  </Typography>
                </div>
                <div style = {{ marginTop: 10, marginBottom: 10 }} >
                  <AssignmentIndIcon color = { tareaOrden.usuario ? 'primary' : 'inherit' } style = {{ float: 'left', marginRight: 6}} />
                  <Typography variant="subtitle2" color="textSecondary" style = {{ paddingTop: 2 }} >
                    { <b>Usuario: { tareaOrden.usuario
                        ? `${tareaOrden.usuario.apellido}, ${tareaOrden.usuario.nombre}`
                        : ''}
                    </b>
                    }
                  </Typography>
                </div>
                <Divider variant = "middle" light />
                <div style = {{ marginTop: 10 }} >
                  <ScheduleIcon color = { tareaOrden.fechaInicia ? 'secondary' : 'inherit' } style = {{ float: 'left', marginRight: 6 }} />
                  <Typography variant="subtitle2" color="textSecondary" style = {{ paddingTop: 2 }} >
                    Inició: { tareaOrden.fechaInicia
                      ? new Date(tareaOrden.fechaInicia).toLocaleString()
                      : ''
                    }
                  </Typography>
                </div>
                <div style = {{ marginTop: 5 }} >
                  <ScheduleIcon color = { tareaOrden.fechaFin ? 'secondary' : 'inherit' } style = {{ float: 'left', marginRight: 6 }} />
                  <Typography variant="subtitle2" color="textSecondary" style = {{ paddingTop: 2 }} >
                    Finalizó: { tareaOrden.fechaFin
                      ? new Date(tareaOrden.fechaFin).toLocaleString()
                      : ''
                    }
                  </Typography>
                </div>
              </Fragment>
            }
          />
        </CardActionArea>
        <Divider variant = "middle" light />
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" style = {{ paddingTop: 2, textAlign: 'center' }} >
            <b><u>Datos</u></b>
          </Typography>
          { tareaOrden.datos && renderDatosOrden() }
        </CardContent>
      </Card>
      { state.editarTarea && !tareaOrden.fechaInicia &&
        <TareaOrdenEditContainer
          open = { state.editarTarea }
          handleHabilitaEditTarea = { handleHabilitaEditTarea }
          tareaOrden = { tareaOrden }
        />
      }
    </Fragment>
  )
}

export default withTheme(TareasOrdenList);
