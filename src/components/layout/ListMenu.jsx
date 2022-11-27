import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

export const items = [
  { id: 1, label: "Dashboard", link: "/dashboard", icon: AssessmentIcon },
  { id: 2, label: "Usuarios", link: "/usuarios", icon: PersonIcon },
  { id: 3, label: "Procesos", link: "/procesos", icon: DynamicFeedIcon },
  { id: 4, label: "Ordenes", link: "/ordenes", icon: DeveloperBoardIcon },
  // { id: 2, label: "Tareas", link: "/tareas", icon: ListAltIcon },
  // { id: 3, label: "Datos", link: "/datos", icon: CodeIcon },
];

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

const ListMenu = () => {
  const classes = useStyles();

  return (
    <Fragment >
      <List component = "nav" >
        { items.map( item => (
            <Link to = { item.link } key = { item.id } className = { classes.link } >
              <Tooltip title = { item.label } placement = "right-end" arrow >
                <ListItem button >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary = { item.label } />
                </ListItem>
              </Tooltip>
            </Link>
        )) }
      </List>
    </Fragment>
  )
}

export default ListMenu;
