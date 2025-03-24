import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

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

  const [cart, setCart] = useState([
    {
      id: 1,
      price: 1200,
      name: "Noches de Salón Vinil",
      imageUrl: "https://i.ytimg.com/vi/fyXIezpxFi0/maxresdefault.jpg",
    },
    {
      id: 2,
      price: 250,
      name: "Daltónico",
      imageUrl:
        "https://cdn-images.dzcdn.net/images/cover/f945f5f0a55d01a16fbe8f23c1171297/0x1900-000000-80-0-0.jpg",
    },
    {
      id: 3,
      price: 250,
      name: "Próximos prójimos",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2731e60fc6159664ae2072239fe",
    },
  ]);

  const handleRemove = (id) => {
    const updateCart = cart.filter((item) => item.id !== id);
    setCart(updateCart);
    Toast.show({
      type: "error",
      text1: "Producto eliminado del carrito",
      text2: "Se ha eliminado del carrito",
      visibilityTime: 2000,
      position: "bottom",
    });
  };

  const Total = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return total.toFixed(2);
  };

  const renderCart = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const alert = () => {
    Toast.show({
      type: "info",
      text1: "Compra realizada",
      text2: `Procediendo a la compra`,
      visibilityTime: 2000,
      position: "bottom",
    });
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
          <Text style={styles.totalText}>Total: ${Total()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={alert}>
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
