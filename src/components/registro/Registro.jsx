import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Box, Checkbox, Grid, TextField, InputAdornment } from '@material-ui/core';
import { CssBaseline, Container, FormControlLabel, Typography, IconButton, Paper } from '@material-ui/core';
import { Link } from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © Daprolac '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
    error: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      marginTop: theme.spacing(1),
      minWidth: "100%",
    },
      // selectEmpty: {
      //   marginTop: theme.spacing(2),
      // },
  }));


const Registro = ({ formik, error }) => {
    const classes = useStyles();
    const [ showPassword, setShowPassword ] = React.useState(false);
    const [ rol, setRol ] = React.useState('');

    const handleClickShowPassword = () => { setShowPassword(!showPassword); };
    const handleChangeTipo = (event) => { setRol(event.target.value); };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className = { classes.paper }>
          <Avatar className = { classes.avatar } >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component = "h1" variant = "h5" >
            Registrarse
          </Typography>
          {
            error && <Grid container>
              <Grid item xs={12}>
                <Paper className = { classes.error }>Email o clave invalida</Paper>
              </Grid>
            </Grid>
          }
          <form className = { classes.form } onSubmit = { formik.handleSubmit } noValidate >
          <TextField
              margin = "normal"
              id = "nombre"
              label = "Nombre"
              name = "nombre"
              type = "nombre"
              color = "secondary"
              InputProps = {{
                startAdornment: (
                    <InputAdornment position = "start">
                      <EmailIcon />
                    </InputAdornment>
                )
              }}
              { ...formik.getFieldProps('nombre') }
              error = { !!(formik.touched.nombre && formik.errors.nombre) }
              helperText = { formik.touched.nombre && formik.errors.nombre ? formik.errors.nombre : '' }
              required
              fullWidth
              //autoFocus
            />
            <TextField
              margin = "normal"
              id = "apellido"
              label = "Apellido"
              name = "apellido"
              type = "apellido"
              color = "secondary"
              InputProps = {{
                startAdornment: (
                    <InputAdornment position = "start">
                      <EmailIcon />
                    </InputAdornment>
                )
              }}
              { ...formik.getFieldProps('apellido') }
              error = { !!(formik.touched.apellido && formik.errors.apellido) }
              helperText = { formik.touched.apellido && formik.errors.apellido ? formik.errors.apellido : '' }
              required
              fullWidth
              //autoFocus
            />
            <TextField
              margin = "normal"
              id = "email"
              label = "Correo Electronico"
              name = "email"
              type = "email"
              color = "secondary"
              InputProps = {{
                startAdornment: (
                    <InputAdornment position = "start">
                      <EmailIcon />
                    </InputAdornment>
                )
              }}
              { ...formik.getFieldProps('email') }
              error = { !!(formik.touched.email && formik.errors.email) }
              helperText = { formik.touched.email && formik.errors.email ? formik.errors.email : '' }
              required
              fullWidth
              //autoFocus
            />
            <TextField
              margin = "normal"
              name = "clave"
              label = "Contraseña"
              type = { showPassword ? "text" : "password"}
              id = "clave"
              color = "secondary"
              InputProps = {{
                startAdornment: (
                    <InputAdornment position = "start">
                      <VpnKeyIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position = "end">
                    <IconButton
                      aria-label = "toggle password visibility"
                      onClick = { handleClickShowPassword }
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              { ...formik.getFieldProps('clave') }
              error = { !!(formik.touched.clave && formik.errors.clave) }
              helperText = { formik.touched.clave && formik.errors.clave ? formik.errors.clave : '' }
              required
              fullWidth
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rol}
                onChange={handleChangeTipo}
                { ...formik.getFieldProps('tipo') }
                error = { !!(formik.touched.tipo && formik.errors.tipo) }
                helperText = { formik.touched.tipo && formik.errors.tipo ? formik.errors.tipo : '' }
                required
                fullWidth
                >
                <MenuItem value={0}>Administrador</MenuItem>
                <MenuItem value={1}>Operario</MenuItem>
                </Select>
            </FormControl>
            {/* <FormControlLabel
              control = { <Checkbox value = "remember" color = "primary" /> }
              label = "Recuerdame"
            /> */}
            <Button
              type = "submit"
              variant = "contained"
              color = "primary"
              className = { classes.submit }
              fullWidth
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login"  style={{textDecorationLine:"none", textDecorationColor:"none"}}variant="body2">
                    <Typography color="primary"> Ya tienes una cuenta? Inicia Sesion.</Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )


}

export default Registro;
