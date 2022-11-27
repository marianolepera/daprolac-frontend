import React from 'react';

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Typography } from "./Wrappers";
import Widget from "../widget/Widget";
import Dot from "./Dot";

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
}));

const TarjetaEstado = ({datos, ...props}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget title={props.titulo} upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart margin={{ left: theme.spacing(2) }}>
                  <Pie
                    data={datos}
                    innerRadius={45}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {datos.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={theme.palette[entry.color].main}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {
                  datos.map(({ name, value, color }) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap" }}>&nbsp;{name}&nbsp;</Typography>
                      <Typography color="text" colorBrightness="secondary">&nbsp;{value}</Typography>
                    </div>
                  ))
                }
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
  );
}

export default TarjetaEstado;
