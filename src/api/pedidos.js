import axiosInstance from "./config";

export const CrearPedido = async (pedido) => {
  try {
    const response = await axiosInstance.post("/app/esb/pedido", pedido);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}