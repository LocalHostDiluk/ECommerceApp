import axiosInstance from "./config";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/app/esb/producto");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
