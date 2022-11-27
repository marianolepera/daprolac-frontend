import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Divider } from "@material-ui/core";

import ListMenu from "./ListMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  offset: theme.mixins.toolbar,
}));

const MenuDrawer = (props) => {
  const classes = useStyles();

  return (
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
        variant = { props.variant }
      >
        <div className = { classes.offset } />
        <Divider />
        <ListMenu />
      </Drawer>
  )
}

export default MenuDrawer;
