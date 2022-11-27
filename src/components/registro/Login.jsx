import React from 'react';

import { Avatar, Button, Box, Checkbox, Grid,  TextField, InputAdornment } from '@material-ui/core';
import { CssBaseline, Container, FormControlLabel, Typography, IconButton, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { Link } from "react-router-dom";

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
}));

const Login = ({ formik, error, mensaje }) => {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className = { classes.paper }>
        <Avatar className = { classes.avatar } >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component = "h1" variant = "h5" >
          Iniciar Sesion
        </Typography>
        {
          error && <Grid container>
            <Grid item xs={12}>
              <Paper className = { classes.error }>{ mensaje }</Paper>
            </Grid>
          </Grid>
        }
        <form className = { classes.form } onSubmit = { formik.handleSubmit } noValidate >
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
          <FormControlLabel
            control = { <Checkbox value = "remember" color = "primary" /> }
            label = "Recuerdame"
          />
          <Button
            type = "submit"
            variant = "contained"
            color = "primary"
            className = { classes.submit }
            fullWidth
          >
            Ingresar
          </Button>
          {/*<Grid container>*/}
          {/*  <Grid item xs>*/}
          {/*    /!* <Link href="#" variant="body2">*/}
          {/*      Olvidaste la contraseña?*/}
          {/*    </Link> *!/*/}
          {/*    <Link to="/registro"  style={{textDecorationLine:"none", textDecorationColor:"none"}}variant="body2">*/}
          {/*      <Typography color="primary"> No tienes una cuenta? Registrate.</Typography> */}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
