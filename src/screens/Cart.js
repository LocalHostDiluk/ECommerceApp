import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CrearPedido } from "../api/pedidos";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#1e1e1e",
      },
      headerTintColor: "#ff6600",
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
      },
      headerTitleAlign: "left",
    });
  }, [navigation]);

  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemove = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);

    removeFromCart(id);

    Toast.show({
      type: "error",
      text1: `${itemToRemove?.nombre} eliminado del carrito`,
      visibilityTime: 2000,
      position: "bottom",
    });
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.precio), 0).toFixed(2);
  };

  const renderCart = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imagen }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productPrice}>
          ${Number(item.precio).toFixed(2)}
        </Text>
        <Text style={styles.productQuantity}>Cantidad: {item.cantidad}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const alertPurchase = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            "No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.",
          visibilityTime: 3000,
          position: "bottom",
        });
        return;
      }

      // Asegurarse de que cada producto tenga id y cantidad
      const productosParaPedido = cart.map((item) => ({
        productoId: Number(item.id),
        cantidad: Number(item.cantidad),
      }));

      const pedido = {
        clienteId: parseInt(userId, 10),
        productos: productosParaPedido,
      };

      console.log("Pedido a enviar:", JSON.stringify(pedido, null, 2));

      const response = await CrearPedido(pedido);
      console.log("Pedido creado:", response);

      Toast.show({
        type: "success",
        text1: "Compra realizada",
        text2: "Gracias por tu compra",
        visibilityTime: 2000,
        position: "bottom",
      });
      clearCart();
    } catch (error) {
      console.error("Error creando pedido:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Hubo un problema al procesar la compra.",
        visibilityTime: 2000,
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de compras</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${getTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={alertPurchase}
          >
            <Text style={styles.checkoutButtonText}>Proceder a la compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    color: "#bbb",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  productQuantity: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 5,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#bbb",
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginTop: 10,
  },
  totalText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
