import React from "react";
import server from "../api/server";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _login = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const body = {
      user: {
        user_name: this.state.username,
        password: this.state.password,
      },
    };

    server
      .post("/login", body)
      .then((res) => {
        this.setState({ loading: false });
        const { user, token } = res.data;
        if (token) {
          localStorage.setItem("auth:user", user.user_name);
          localStorage.setItem("auth:token", token);
          this.props.history.push("/tasks");
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log("error", err.response);
      });
  };

  render() {
    const { username, password, loading } = this.state;
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Log in</h1>
        <form
          onSubmit={this._login}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={this.handleChange}
            required
            style={{ marginTop: "16px" }}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={this.handleChange}
            required
            style={{ marginTop: "16px" }}
          />
          <button type="submit" style={{ marginTop: "16px" }}>
            {loading ? "Logging you in..." : "Log in"}
          </button>
        </form>

        <div style={{ marginTop: "16px" }}>
          <Link to="/signup">New to us? Create an account</Link>
        </div>
      </div>
    );
  }
}

export default Login;
