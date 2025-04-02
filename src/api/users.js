import axiosInstance from "./config";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/app/esb/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const loginUser = async (username, password,phone) => {
    try {
      const response = await axiosInstance.post("/app/esb/user/login", {
        username,
        password,
        phone
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error en la solicitud";
    }
  };