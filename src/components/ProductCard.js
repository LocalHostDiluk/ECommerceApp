import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.imagen }} style={styles.productImage} />
      <Text style={styles.productName}>{product.nombre}</Text>
      <Text style={styles.productPrice}>${product.precio}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: "center",
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    color: "#bbb",
    fontSize: 13,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductCard;