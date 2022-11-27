import React from "react";
import { Link } from "react-router-dom";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withWidth, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
  }
}));

const Ordenes = ({ordenes, ...props}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table} >
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell>Proceso</TableCell>
            <TableCell>Cant. Tareas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Visualizar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenes.map((orden) => (
            <TableRow key={orden.id}>
              <TableCell component="th" scope="row">
                {orden.numero.toString().padStart(8, '0')}
              </TableCell>
              <TableCell>{orden.proceso.producto}</TableCell>
              <TableCell>{orden.tareas.length}</TableCell>
              <TableCell>{orden.finalizada ? 'Finalizada' : 'Pendiente'}</TableCell>
              <TableCell>
                <Link to = {`/ordenes/${orden.id}` } >
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withWidth()(Ordenes);
