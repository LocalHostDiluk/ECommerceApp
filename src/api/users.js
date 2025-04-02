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
