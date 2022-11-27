import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Box,
  Grid, FormControl, InputLabel, Select, MenuItem, Button, TextField
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import EditIcon from '@material-ui/icons/Edit';
import PersonAddAltIcon from '@material-ui/icons/PersonAddOutlined';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
  },
  formControl: {
    margin: `${theme.spacing(2)}px ${theme.spacing()}px`,
    minWidth: 200,
  },
}));

const Usuarios = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const cargarFilas = () => props.usuarios.map((usuario) => (
      <TableRow key = {usuario.id}>
        <TableCell component="th" scope="row">
          {usuario.nombre}
        </TableCell>
        <TableCell>{usuario.apellido}</TableCell>
        <TableCell>{usuario.email}</TableCell>
        <TableCell>{parseInt(usuario.tipo.toString()) === 0 ? 'Administrador' : 'Operario'}</TableCell>
        <TableCell>
          {/*<Link to = {`/ordenes/${orden.id}` } >*/}
          <IconButton>
            <EditIcon />
          </IconButton>
          {/*</Link>*/}
        </TableCell>
      </TableRow>
  ));

  return (
    <Fragment>
      <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing = {4}>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <TextField
                        label = "Nombre"
                        type = "text"
                        required
                        name = "Nombre"
                        id = "nombre"
                        variant="standard"
                        autoFocus
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <TextField
                        label = "Apellido"
                        type = "text"
                        required
                        name = "apellido"
                        id = "apellido"
                        variant="standard"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <TextField
                        label = "Email"
                        type = "text"
                        required
                        name = "email"
                        id = "email"
                        variant="standard"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <TextField
                        label = "Password"
                        type = "password"
                        required
                        name = "password"
                        id = "password"
                        variant="standard"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="proceso-label">Tipo de Usuario</InputLabel>
                    <Select
                        autoWidth
                        labelId = "tipo-label"
                        name = "tipo"
                        value = ""
                    >
                      <MenuItem key = "0" value = "0" >Administrador</MenuItem>
                      <MenuItem key = "1" value = "1" >Operario</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <Button
                        variant = "contained"
                        color = "primary"
                        size = "large"
                        startIcon = { <PersonAddAltIcon /> }
                    >
                      Crear Usuario
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

      <TableContainer component={Paper} className={classes.table} >
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { cargarFilas() }
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default Usuarios;
