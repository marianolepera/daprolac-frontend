import React from 'react';

import {Box, Card, CardContent, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "./Wrappers";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
    ComposedChart,
    Line,
    LineChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  

  
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


const TarjetaDatosComparativos = ({datos, ...props}) => {
  const classes = useStyles(datos);
  

  const RenderLineChart = () =>{
    
    return(
       
         <ResponsiveContainer width="100%" height={600}>
            <LineChart 
                width={500}
                height={400}
                data={props.datosFiltrados}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
                >
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="nombreOrden"  padding={{ left: 30, right: 30 }}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valor"  stroke="#413ea0" />
            <Line type="monotone" dataKey="minimo"  stroke="#e60000" />
            <Line type="monotone" dataKey="maximo" stroke="#00b33c" />
        </LineChart>
     </ResponsiveContainer>
        
    )

  }
   

  return (
    <Card style = {{marginTop: 10, marginBottom: 10}}>
      <CardContent>
        <Grid
          container
          spacing={2}
          className={classes.grid}
        >
          <Grid item lg={12}  md={12}  xs={12}>
            <RenderLineChart></RenderLineChart>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
}

export default TarjetaDatosComparativos;