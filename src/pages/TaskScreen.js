import React, { useEffect, useState } from "react";
import server from "../api/server";
import {
  TextField,
  makeStyles,
  Typography,
  InputAdornment,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontWeight: "500",
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
    marginTop: theme.spacing(1),
    textAlign: "center",
    padding: theme.spacing(1, 2),
    minWidth: "30%",
    backgroundColor: theme.palette.primary.main_secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.main_secondary,
    },
  },
  title: {
    fontWeight: 500,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "85%",
    },
  },
}));

const TasksScreen = (props) => {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _getAllTasks();
  }, []);

  const _getAllTasks = () => {
    server
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log("error", err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const _addTask = (event) => {
    event.preventDefault();

    const body = {
      task: {
        name: task,
      },
    };

    server
      .post("/tasks", body)
      .then((res) => {
        setTasks((prevState) => [...prevState, res.data]);
        setTask("");
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  const _setEditTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTask(task.name);
    setIsEditing(true);
    setEditId(id);
  };

  const cancelEditing = () => {
    setTask("");
    setIsEditing(false);
    setEditId("");
  };

  const _editTask = (event) => {
    event.preventDefault();

    const body = {
      task: {
        name: task,
      },
    };

    server
      .put(`/tasks/${editId}`, body)
      .then((res) => {
        const tempTasks = tasks;
        const index = tempTasks.findIndex((task) => task.id === editId);
        tempTasks[index] = res.data;
        setTasks(tempTasks);
        setTask("");
        setIsEditing(false);
        setEditId("");
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  const _deleteTask = (id) => {
    server
      .delete(`/tasks/${id}`)
      .then((res) => {
        const tempTasks = tasks.filter((task) => task.id !== id);
        setTasks(tempTasks);
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={6} style={{ margin: "16px" }}>
        <form
          className={classes.form}
          onSubmit={isEditing ? _editTask : _addTask}
        >
          <div className={classes.formControl}>
            <Typography variant="h6" className={classes.label}>
              {isEditing
                ? "Edit this task 📝"
                : "What do you want to accomplish today? 🚀"}{" "}
            </Typography>
            <TextField
              required
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Enter task here"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              className={classes.inputField}
              InputProps={{
                classes: { notchedOutline: classes.notchedOutline },
                startAdornment: (
                  <InputAdornment position="start">
                    <CheckCircleIcon
                      fontSize="small"
                      className={classes.icon}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isEditing ? (
              <Button
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={cancelEditing}
                style={{ marginRight: "16px" }}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isEditing ? "Edit" : "Add"} task
            </Button>
          </div>
        </form>

        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                marginTop: "32px",
              }}
            >
              <CircularProgress color="primary" size={32} />
            </div>
          ) : (
            tasks.map((task) => {
              return (
                <Card
                  key={task.id}
                  elevation={2}
                  className={classes.root}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "16px",
                    marginTop: "32px",
                  }}
                >
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    📌 {task.name}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="edit"
                      onClick={() => _setEditTask(task.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => _deleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default TasksScreen;
