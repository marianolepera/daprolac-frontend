import React, { Fragment } from "react";

import { Button, GridList, TextField, Typography } from "@material-ui/core";
import { useTheme, withWidth } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ProcesosList from "./ProcesosList";

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%'
  },
  control: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  lista: {
    margin: theme.spacing(3, 'auto', 3)
  }
}));

const getColumnsResponsive = (props) => {
  const { width } = props;

  switch (width) {
    case 'xs':
    case 'sm': return 1;
    case 'md': return 2;
    case 'lg':
    case 'xl': return 4;
    default: return 2
  }
}

const Procesos = ({ formik, ...props }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className = { classes.control } >
        <Typography variant = "h6" >
          Ingrese el nombre del proceso
        </Typography>
        <form onSubmit = { formik.handleSubmit } noValidate >
          <div className = { classes.control } >
            <TextField
              className = { classes.root }
              label = "Proceso"
              type = "text"
              required
              name = "producto"
              id = "producto"
              variant = "outlined"
              value = { formik.values.producto }
              onChange = { formik.handleChange }
              error = { !!(formik.errors.producto) }
              helperText = { formik.errors.producto ? formik.errors.producto : '' }
              autoFocus
            />

            <div className = { classes.control } >
              <Button size = "large" variant = "contained" color = "primary" type = "submit">
                Crear Proceso!
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Typography variant = "h6" className = { classes.lista } >
        Lista de Procesos
      </Typography>
      <GridList
          cols = { getColumnsResponsive(props) }
          cellHeight = { 'auto' }
          spacing = { useTheme().spacing(2) } >
        {
          props.procesos.map( proceso =>
            <ProcesosList
              key = { proceso.id }
              proceso = { proceso }
              borrar = { props.borrarProceso }
            />
          )
        }
      </GridList>
    </Fragment>
  )
}

export default withWidth()(Procesos);
