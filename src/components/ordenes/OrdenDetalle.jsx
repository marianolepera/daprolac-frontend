import React, { Fragment } from "react";

import { Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TareasOrdenList from "../tareas/TareasOrdenList";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    marginTop: theme.spacing()
  }
}));

const OrdenDetalle = ({ orden, proceso, tareas, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const renderTitle = () => {
    return (
      <Fragment>
        <div style = {{ display: 'block' }}>
          <Typography variant="h4" style={{ marginBottom: theme.spacing(1)}}>
            Nro. Orden: {orden.numero.toString().padStart(8,'0')}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(2) }}>
            Proceso: { proceso.producto }
          </Typography>
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      <div className={classes.root}>
        {renderTitle()}
      </div>

      <div className={classes.root}>
        {tareas.map(tarea => (
          <TareasOrdenList
            key = { tarea.idTarea }
            tareaOrden = { tarea }
            editarTarea={props.editarTarea}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdenDetalle;
