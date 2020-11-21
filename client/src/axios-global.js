import axios from "axios";
import { BASE_URL } from "./environment";

// axios.defaults.baseURL = BASE_URL;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  axios.defaults.headers.get = { "Content-type": "application/json" };
}

export default axios;
