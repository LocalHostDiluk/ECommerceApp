import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEXT_PUBLIC_API_URL } from "@env";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/app/esb/user/login`,
      { phone, username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta del servidor:", response.data);

    const token = response.data?.data;

    if (!token) {
      throw new Error("El servidor no devolvió un token válido.");
    }

    await AsyncStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};
