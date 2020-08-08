import React, { Component } from "react";
import server from "./api/server";

class App extends Component {
  state = {
    tasks: [],
    task: "",
    isEditing: false,
    editId: "",
  };

  componentDidMount = () => {
    this._getAllTasks();
  };

  handleTaskChange = (event) => {
    this.setState({
      task: event.target.value,
    });
  };

  _getAllTasks = () => {
    server
      .get("/api/v1/tasks")
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  _addTask = (event) => {
    event.preventDefault();

    const body = {
      task: {
        name: this.state.task,
      },
    };

    server
      .post("/api/v1/tasks", body)
      .then((res) => {
        this.setState((prevState) => {
          return {
            tasks: [...prevState.tasks, res.data],
            task: "",
          };
        });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  _setEditTask = (id) => {
    const task = this.state.tasks.find((task) => task.id === id);
    this.setState({
      task: task.name,
      isEditing: true,
      editId: id,
    });
  };

  cancelEditing = () => {
    this.setState({
      isEditing: false,
      editId: false,
      task: "",
    });
  };

  _editTask = (event) => {
    event.preventDefault();

    const body = {
      task: {
        name: this.state.task,
      },
    };

    server
      .put(`/api/v1/tasks/${this.state.editId}`, body)
      .then((res) => {
        const tasks = this.state.tasks;
        const index = tasks.findIndex((task) => task.id === this.state.editId);
        tasks[index] = res.data;
        this.setState({
          tasks,
          isEditing: false,
          editId: "",
          task: "",
        });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  _deleteTask = (id) => {
    server
      .delete(`/api/v1/tasks/${id}`)
      .then((res) => {
        const tasks = this.state.tasks.filter((task) => task.id !== id);
        this.setState({
          tasks,
        });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  render() {
    const { tasks, task, isEditing } = this.state;
    return (
      <div>
        <h1>{isEditing ? "Edit" : "Add a new"} task</h1>
        <form onSubmit={isEditing ? this._editTask : this._addTask}>
          <input
            type="text"
            value={task}
            onChange={this.handleTaskChange}
            placeholder="Enter task here"
            required
          />
          <button type="submit">{isEditing ? "Edit" : "Add"} task</button>
          {isEditing ? (
            <button onClick={this.cancelEditing}>Cancel</button>
          ) : null}
        </form>

        <h1>Existing Tasks</h1>
        <ul>
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "16px",
                }}
              >
                <li>{task.name}</li>
                <button
                  style={{ margin: "0 8px" }}
                  onClick={() => this._setEditTask(task.id)}
                >
                  Edit
                </button>
                <button onClick={() => this._deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;