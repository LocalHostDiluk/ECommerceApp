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

export const ObtenerPedidos = async (userId) => {
  try {
    const response = await axiosInstance.get(`/app/esb/pedido/cliente/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}