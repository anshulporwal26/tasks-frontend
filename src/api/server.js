import axios from "axios";

const server = axios.create({
  baseURL: "https://calm-bastion-31992.herokuapp.com",
});

export default server;
