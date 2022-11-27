import React from 'react';
import { Link } from "react-router-dom";

import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const ProcesosList = ({ proceso, borrar, ...props }) => {

  return (
    <GridListTile { ...props } >
      <Link to = {`/procesos/${proceso.id}` } >
        <GridListTileBar
          title = { proceso.producto }
          titlePosition = "top"
        />
      </Link>
      <div style = {{ textAlign: 'right' }} >
        <IconButton
          aria-label = { `info about ${proceso.producto}` }
          onClick = { () => borrar(proceso.id) }
        >
          <DeleteIcon size="big" />
        </IconButton>
      </div>
    </GridListTile>
  );
}

export default ProcesosList;
