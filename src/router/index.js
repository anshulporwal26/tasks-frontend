import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Tasks from "../pages/TaskScreen";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("auth:token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

const MainRouter = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Tasks} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/tasks" component={Tasks} />
    </Switch>
  );
};

export default MainRouter;
