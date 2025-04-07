import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEXT_PUBLIC_API_URL } from "@env";

const apiURL = NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
