import React from "react";
import server from "../api/server";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _signup = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const body = {
      user: {
        user_name: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    };

    server
      .post("/signup", body)
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
    const { username, email, password, loading } = this.state;
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Sign up</h1>
        <form
          onSubmit={this._signup}
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
            placeholder="Choose a username"
            onChange={this.handleChange}
            required
            style={{ marginTop: "16px" }}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
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
            {loading ? "Signing you up..." : "Sign up"}
          </button>
        </form>

        <div style={{ marginTop: "16px" }}>
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
