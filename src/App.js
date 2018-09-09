import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import YourLocation from "./YourLocation";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ec7b50",
      main: "#E85B25",
      dark: "#a23f19",
      contrastText: "#fff"
    },
    secondary: {
      light: "#b3c748",
      main: "#A1BA1B",
      dark: "#708212",
      contrastText: "#000"
    }
  }
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ overflowY: "hidden" }}>
          <YourLocation />
        </div>
      </MuiThemeProvider>
    );
    // }
  }
}

export default App;
