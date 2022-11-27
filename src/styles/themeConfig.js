import { createMuiTheme } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700],
    },
    secondary: {
      main: '#0288d1',
    }
  }
});

const customDarkTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700],
    },
    secondary: {
      main: '#0288d1',
    },
    type: "dark"
  }
});

export {
  customTheme,
  customDarkTheme
}
