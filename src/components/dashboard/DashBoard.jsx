import React,{useState} from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "../sytles";
import {
    ResponsiveContainer,
    YAxis,
    XAxis,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";

import Widget from "../widget/Widget"
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { red, yellow } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Tarjeta from './Tarjeta.jsx'
import TarjetaEstado from './TarjetaEstado.jsx'
import TarjetaOrden from "./TarjetaOrden";
import TarjetaDatosComparativos from "./TarjetaDatosComparativos";
import Calendar from "./CalendarTasks"
import Autocomplete from '@material-ui/lab/Autocomplete';




const DashBoard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [search, setSearch] = useState(``);
  const [datoSelected, setDatoSelected] = useState("");
  const [dato, setDato] = useState("");
  let datosFiltrados=[]
  let nuevoObjeto={}

  // const filterOptions = () =>{
  //   let nuevoObjeto={}
  //   setDato(dato)
  //   props.ordenesWithDatos.map(ord =>{
  //     ord.datos.map(dat =>{
  //       if(dat.nombre == dato.nombre){
  //         nuevoObjeto={
  //           nombreOrden: "orden" + ord.numero,
  //           nombreDato: dat.nombre,
  //           maximo: dat.maximo,
  //           minimo: dat.minimo,
  //           valor: dat.valor
  //         }
  //         datosFiltrados.push(nuevoObjeto)
  //       }
  //     })
  //   })
  // }

  return (
    <div>
      <Grid container spacing={3}>
        <Tarjeta titulo = "Total de ordenes" icon = { <AssignmentIcon /> } color = { red } cantidad = { props.cantOrdenes } />
        <TarjetaEstado titulo = "Total de ordenes" datos = { props.ordenesPorEstado } />
        <Tarjeta titulo = "Total de tareas" icon = { <ListAltIcon /> } color = { yellow } cantidad = { props.cantTareas } />
        <TarjetaEstado titulo = "Total de tareas" datos = { props.tareasPorEstado } />
      </Grid>

      <Grid container spacing={4}>
        {/* <Grid item lg={6} md={6} sm={6} xs={12}>
          <Widget title="Control de ordenes" upperTitle className={classes.card}>
              <TextField
                style={{width:"100%"}}
                placeholder="  Buscar orden..."
                variant="outlined"
                color="secondary"
                onChange={e => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            {
              props.analisisOrdenes.filter(orden => orden.nombre.toLowerCase().includes(search.toLowerCase())
                || orden.estado.toLowerCase().includes(search.toLowerCase())
                || orden.tareas == search
                || orden.porcentaje == search).map((row) => (
                  <TarjetaOrden orden = { row } key = { row.nombre } />
                ))
            }
          </Widget>
        </Grid> */}

        <Grid item lg={12} md={12} sm={12} xs={12}>
        <Widget title="Control de tareas" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid  item lg={12} xs={6}>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                layout="vertical"
                width="100%"
                height="60%"
                data={props.usuarioTareasComponente}
                margin={{ left: theme.spacing(2) }}
              >
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="completadas" fill="#00b33c" />
                <Bar dataKey="pendientes" fill="#e60000" />
                <Bar name="sin empezar" dataKey="sinEmpezar" fill="#ffcc00" />
              </BarChart>
          </ResponsiveContainer>
            </Grid>

          </Grid>
        </Widget>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Widget title="Control de datos comparativos" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid  item lg={12} xs={12}>
              <Grid item lg={3} xs={3}>
              <Autocomplete
                id="combo-box-demo"
                options={props.datosSinRepetir}
                getOptionLabel={(dato) => dato.nombre}
                getOptionSelected={(dato) => dato.nombre}
                value={dato}
                onChange={(event, newValue) => {
                  setDato(newValue);
                }}
                inputValue={datoSelected}
                onInputChange={(event, newInputValue) => {
                  setDatoSelected(newInputValue);
                }} 
                style={{ width: 300 }}
                renderInput={(params) => 
                  <TextField 
                    {...params}  
                    label="Seleccione un dato" 
                    variant="outlined" />}
              />
              </Grid>
              {dato !== null && props.ordenesWithDatos.map(ord =>{
                  ord.datos.map(dat =>{
                    if(dat.nombre == dato.nombre){
                      nuevoObjeto={
                        nombreOrden: "orden" + ord.numero,
                        nombreDato: dat.nombre,
                        maximo: dat.maximo,
                        minimo: dat.minimo,
                        valor: dat.valor
                      }
                      datosFiltrados.push(nuevoObjeto)
                    }
                  })
                })}
              <TarjetaDatosComparativos datosFiltrados={datosFiltrados}></TarjetaDatosComparativos>
            </Grid>

          </Grid>
        </Widget>
      </Grid>
      </Grid>

      <div style={{marginTop:10}}>
        <Calendar ordenesTareasCalendario={props.ordenesTareasCalendario}  resources={props.resources}/>
      </div>



  </div>
  )
}

export default DashBoard
