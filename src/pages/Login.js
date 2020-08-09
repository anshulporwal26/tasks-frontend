import React, { useState } from "react";
import server from "../api/server";
import { Link } from "react-router-dom";
import OuterWrapper from "../components/layouts/OuterWrapper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontWeight: "400",
    color: theme.palette.custom.heading,
  },
  link: {
    color: theme.palette.custom.subHeading,
  },
  notchedOutline: {
    borderColor: `${theme.palette.custom.inputBorder} !important`,
  },
  icon: {
    color: theme.palette.custom.icon,
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    padding: theme.spacing(1, 2),
    width: "40%",
    backgroundColor: theme.palette.primary.main_secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.main_secondary,
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const _login = (event) => {
    event.preventDefault();
    setLoading(true);
    const body = {
      user: {
        user_name: username,
        password: password,
      },
    };

    server
      .post("/login", body)
      .then((res) => {
        setLoading(false);
        const { user, token } = res.data;
        if (token) {
          localStorage.setItem("auth:user", user.user_name);
          localStorage.setItem("auth:token", token);
          props.history.push("/tasks");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error", err.response);
      });
  };

  return (
    <OuterWrapper
      heading="Welcome Back 👋"
      subHeading={`Walk the talk with engaging task management 👊`}
    >
      <form onSubmit={_login} className={classes.form}>
        <div className={classes.formControl}>
          <Typography variant="body2" className={classes.label}>
            Your username
          </Typography>
          <TextField
            required
            variant="outlined"
            margin="dense"
            fullWidth
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={classes.inputField}
            InputProps={{
              classes: { notchedOutline: classes.notchedOutline },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" className={classes.icon} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={classes.formControl}>
          <Typography variant="body2" className={classes.label}>
            Your Password
          </Typography>
          <TextField
            required
            variant="outlined"
            margin="dense"
            fullWidth
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={classes.inputField}
            InputProps={{
              classes: { notchedOutline: classes.notchedOutline },
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" className={classes.icon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((prevValue) => !prevValue)}
                  >
                    {showPassword ? (
                      <VisibilityOff
                        fontSize="small"
                        className={classes.icon}
                      />
                    ) : (
                      <Visibility fontSize="small" className={classes.icon} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Grid container item justify="center">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress size={23} color="secondary" />
            ) : (
              "Log in"
            )}
          </Button>
        </Grid>
      </form>

      <Grid container item justify="center" style={{ marginTop: "8px" }}>
        <Link to="/signup" variant="body2" className={classes.link}>
          New to us? Create an account
        </Link>
      </Grid>
    </OuterWrapper>
  );
};

export default Login;
