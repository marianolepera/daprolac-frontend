import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {Button, Modal, Grid, Typography, InputLabel, Select, MenuItem, FormControl} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectAllUsarios } from '../../store/reducers/usuariosSlice';
import { updateTareaOrden } from '../../store/reducers/tareasOrdenesSlice';

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
    minWidth: 350,
  },
}));

const TareaOrdenEditContainer = ({tareaOrden, ...props}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const usuarios = useSelector(selectAllUsarios);

  const [ idUsuario, setIdUsuario ] = useState(tareaOrden.idUsuario ? tareaOrden.idUsuario : undefined);

  const handleUsuarioChange = (idUsuario) => setIdUsuario(idUsuario);

  const setUsuarioTareaOrden = async () => {
    const tarea = {
      idOrden: tareaOrden.idOrden,
      idTarea: tareaOrden.idTarea,
      idUsuario: idUsuario
    }

    await dispatch(updateTareaOrden(tarea));
    props.handleHabilitaEditTarea();
  }

  return (
    <Modal
      open = { props.open }
      onClose = { props.handleHabilitaEditTarea }
      className={ classes.modal }
    >
      <div className = { classes.paper } >
        <Grid>
          <Grid container justify="center" >
            <Typography variant = "h5" className = { classes.title } >
              Seleccionar Usuario
            </Typography>
          </Grid>
          <Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="usuario-label">Usuario</InputLabel>
              <Select
                autoWidth
                labelId = "usuario-label"
                name = "idUsuario"
                value = { idUsuario ? idUsuario : "" }
                onChange = { (event) => handleUsuarioChange(event.target.value) }
              >
                {
                  usuarios.map( usuario => {
                    return (<MenuItem key = { usuario.id } value = { usuario.id } >{`${usuario.apellido}, ${usuario.nombre}`}</MenuItem>)
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              fullWidth
              variant = "contained"
              color = "primary"
              style = {{ marginTop: 8 }}
              disabled ={ !idUsuario }
              onClick = { () => setUsuarioTareaOrden() }
            >
              Grabar
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

export default TareaOrdenEditContainer;
