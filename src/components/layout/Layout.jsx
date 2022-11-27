import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  offset: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Layout = ({ isLight, toggleTheme, ...props }) => {
  const classes = useStyles();
  const [ show, setShow ] = useState(false);

  const handleShow = () => {
    setShow(!show);
  }

  return (
    <div className = { classes.root } >
      <Navbar
          handleShow = { handleShow }
          isLight = { isLight }
          toggleTheme = { toggleTheme } />
      <MenuDrawer variant = "permanent" open = { show } />
      <main className = { classes.content } >
        <div className = { classes.offset } />
        { props.children }
      </main>
    </div>
  )
}

export default Layout;
