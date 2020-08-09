import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainRouter from "./router/index";
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
