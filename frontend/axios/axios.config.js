import axios from "axios";
import { BACKEND_URL } from "../src/common/baseUrl";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL, //  apne backend ka URL daalna
  withCredentials: true, //  Important: allows sending cookies (JWT token)
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
