import React from 'react';

import { Grid, Avatar, Box, Card, CardContent } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { Typography } from "./Wrappers";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: color => color[600],
    height: 56,
    width: 56
  },
  card: {
    height: '100%'
  },
  gridContainer: {
    justifyContent: 'space-between'
  }
}));

const Tarjeta = ({icon, color, ...props}) => {
  const classes = useStyles(color);

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card className={classes.card} >
        <CardContent>
          <Grid
            container
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                { props.titulo }
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                { props.cantidad }
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar} >
                { icon }
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowDownwardIcon sx={{ color: red[900] }} />
            <Typography sx={{ color: red[900], mr: 1 }} variant="body2" >
              12%
            </Typography>
            <Typography
                color="textSecondary"
                variant="caption"
            >
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Tarjeta;
