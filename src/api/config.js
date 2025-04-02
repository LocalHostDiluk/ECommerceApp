import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@env";

const apiURL = NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
