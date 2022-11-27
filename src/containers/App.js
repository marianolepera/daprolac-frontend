import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

import Layout from "../components/layout/Layout";
import PrivateRoute from "../components/layout/PrivateRoute";
import PublicRoute from "../components/layout/PublicRoute";

import LoginContainer from "./registro/LoginContainer";
import RegistroContainer from "./registro/RegistroContainer";
import ProcesosContainer from "./procesos/ProcesosContainer";
import ProcesoDetalleContainer from "./procesos/ProcesoDetalleContainer";
import UsuariosContainer from "./registro/UsuariosContainer";
import DashBoardContainer from "../containers/dashboard/DashBoardContainer";
import OrdenesContainer from "./ordenes/OrdenesContainer";
import OrdenDetalleContainer from "./ordenes/OrdenDetalleContainer";

import { customTheme, customDarkTheme } from "../styles/themeConfig";

const App = () => {
  const [isLight, setIsLight] = useState(true);
  const themeMode = isLight ? customTheme : customDarkTheme;

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            restricted={true}
            component={LoginContainer}
          />
          <PublicRoute
            exact
            path="/registro"
            restricted={true}
            component={RegistroContainer}
          />
          <Layout isLight={isLight} toggleTheme={toggleTheme}>
            <PrivateRoute exact path="/" component={() => null} />
            <PrivateRoute
              exact
              path="/procesos"
              component={props => <ProcesosContainer {...props} />}
            />
            <PrivateRoute
              exact
              path="/procesos/:id"
              component={props => <ProcesoDetalleContainer {...props} />}
            />
            {/*<PrivateRoute exact path="/tareas" component={() => null} />*/}
            {/*<PrivateRoute exact path="/datos" component={() => null} />*/}
            <PrivateRoute
              exact
              path="/usuarios"
              component={props => <UsuariosContainer />}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={props => <DashBoardContainer {...props} />}
            />
            <PrivateRoute
              exact
              path="/ordenes"
              component={props => <OrdenesContainer {...props} />}
            />
            <PrivateRoute
              exact
              path="/ordenes/:id"
              component={props => <OrdenDetalleContainer {...props} />}
            />
            {/* <Route exact path="/registro" component={RegistroContainer} /> */}
          </Layout>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
