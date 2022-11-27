import React from 'react';

import {Box, Card, CardContent, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "./Wrappers";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  card: {
    mt: "10",
    mb: "10"
  },
  grid: {
    justifyContent: 'space-between'
  },
  chip: {
    color: 'white',
    backgroundColor: orden => orden.color,
  },
  typography: {
    marginLeft: '20'
  }
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {props.value.toFixed(2)} %
        </Typography>
      </Box>
    </Box>
  );
}

const TarjetaOrden = ({orden, ...props}) => {
  const classes = useStyles(orden);

  return (
    <Card style = {{marginTop: 10, marginBottom: 10}}>
      <CardContent>
        <Grid
          container
          spacing={2}
          className={classes.grid}
        >
          <Grid item lg={10} item md={8} item xs={6}>
            <Typography variant="h6"> {orden.nombre}</Typography>
          </Grid>
          <Grid item lg={2} item md={4} item xs={4}>
            <Chip className={classes.chip} label={orden.estado} />
          </Grid>
        </Grid>
        <LinearProgressWithLabel value={orden.porcentaje} />
        <Grid
          container
          spacing={10}
          className={classes.grid}
        >
          <Grid item lg={4}>
            <Typography variant="h6">{orden.porcentaje.toFixed(2)} %</Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography variant="h6">{orden.tareas}</Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography variant="h6">{orden.fecha_estimada}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={4} item xs={4}>
            <Typography color="textSecondary" variant="h6">completado</Typography>
          </Grid>
          <Grid item lg={4} item xs={4}>
            <Typography color="textSecondary" className={classes.typography} variant="h6">tareas</Typography>
          </Grid>
          <Grid item lg={4} item xs={4}>
            <Typography variant="h6">fecha estimada</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TarjetaOrden;
