import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEXT_PUBLIC_API_URL } from "@env";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/app/esb/user/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Respuesta del servidor:", response.data);

    const data = response.data?.data;

    if (!data?.token || !data?.rol) {
      throw new Error("El servidor no devolvió un token o rol válido.");
    }

    // Guardar el token y el rol como string
    await AsyncStorage.setItem("authData", JSON.stringify(data));

    return data; // contiene { token, rol  , id }
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};
