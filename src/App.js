import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7d3cff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f2d53c",
    },
    custom: {
      inputBackground: "#FAFCFD",
      inputBorder: "#D9DFE5",
      heading: "#1C1A1A",
      subHeading: "#7C7C7C",
      icon: "#C3C3C3",
      sidebarContent: "#CECECE",
      actionBtn: "#3B86FF",
      content: "#797474",
      tabDefault: "#6B6F06",
      tabContent: "#E9EBB2",
      suspendBtn: "#F05013",
      verifiedStatus: "#C3F4BA",
      notVerifiedStatus: "#F0EC89",
      suspendedStatus: "#FFC3C3",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
