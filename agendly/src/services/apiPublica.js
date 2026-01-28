import axios from "axios";

const apiPublica = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default apiPublica;
