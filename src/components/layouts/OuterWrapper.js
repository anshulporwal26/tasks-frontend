import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "linear-gradient(to right, #747572 , #383A35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    height: "60%",
    width: "80%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontWeight: "700",
    fontSize: "48px",
    color: theme.palette.custom.heading,
  },
  subHeading: {
    color: theme.palette.custom.subHeading,
  },
}));

const OuterWrapper = (props) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={6} className={classes.image}>
        <img
          src={require("../../assets/outer-wrapper-image.png")}
          className={classes.brand}
          alt="Brand"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={4}
        square
        container
        alignItems="center"
      >
        <Grid item xs={12}>
          <div className={classes.paper}>
            <Typography
              component="h3"
              variant="h3"
              gutterBottom
              className={classes.heading}
            >
              {props.heading}
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              gutterBottom
              className={classes.subHeading}
            >
              {props.subHeading}
            </Typography>
            {props.children}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OuterWrapper;
