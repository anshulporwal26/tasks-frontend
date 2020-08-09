import axios from "axios";

const defaultOptions = {
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://calm-bastion-31992.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

let server = axios.create(defaultOptions);

server.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth:token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default server;
