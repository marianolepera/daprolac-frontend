import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import { AppBar, Menu, MenuItem, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { logoutUsuario } from '../../store/reducers/usuariosSlice';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Navbar = ({ isLight, toggleTheme, ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleLogouot = () => { dispatch(logoutUsuario()); };

  return (
    <Fragment>
      <AppBar className = { classes.appBar } >
        <Toolbar>
          <IconButton
            color = "inherit"
            aria-label = "menu-icon"
            edge = "start"
            className = { classes.menuButton }
            onClick = { props.handleShow }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant = "h6" className = { classes.title } >
            Daprolac
          </Typography>
          <IconButton
            color = "inherit"
            aria-label = "switch-mode"
            edge = "start"
            onClick = { toggleTheme }
          >
            { isLight ? <Brightness5Icon /> : <NightsStayIcon /> }
          </IconButton>
          <IconButton
            id = "user-button"
            color = "inherit"
            aria-controls = "user-menu"
            aria-haspopup = "true"
            aria-expanded = { open ? "true" : undefined }
            onClick = { handleClick }
          >
            <AccountBoxRoundedIcon fontSize = "large"/>
          </IconButton>
          <Menu
            id = "user-menu"
            anchorEl = { anchorEl }
            getContentAnchorEl = { null }
            open = { open }
            onClose = { handleClose }
            MenuListProps = {{'aria-labelledby': 'user-button',}}
            anchorOrigin = {{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin = {{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick = { handleLogouot } >Cerrar Sesion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar;
