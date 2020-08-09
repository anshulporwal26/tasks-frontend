import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tasks from "./pages/TaskScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/tasks" component={Tasks} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
