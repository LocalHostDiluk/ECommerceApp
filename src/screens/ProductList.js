import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import Toast from "react-native-toast-message";

const productos = [
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
  {
    id: 4,
    price: 200,
    name: "Imperfecto extraño",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27308b5853acded25e1b5ff5115",
  },
  {
    id: 5,
    price: 140,
    name: "Proaño",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27326da2f3b75f84c4c1d10730a",
  },
  {
    id: 6,
    price: 180,
    name: "Enjambre y los huéspedes del orbe",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27369d1fb33044a581470cb7758",
  },
  {
    id: 7,
    price: 175,
    name: "El segundo es felino",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e0266f128e383614b0aa4df5ebd",
  },
  {
    id: 8,
    price: 350,
    name: "Playera - Daltónico",
    imageUrl:
      "https://www.enjambremusica.com/cdn/shop/products/daltonico.png?v=1659567898&width=493",
  },
  {
    id: 9,
    price: 300,
    name: "Tote bag Daltónico",
    imageUrl:
      "https://www.enjambremusica.com/cdn/shop/files/totedaltonico.png?v=1727141441&width=493",
  },
  {
    id: 10,
    price: 350,
    name: "Playera - No me mires con esos ojos",
    imageUrl:
      "https://www.enjambremusica.com/cdn/shop/files/38.png?v=1741800661&width=493",
  },
];

const ProductList = () => {
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

  const [cart, setCart] = useState([]);
  const [modalVisible, setModal] = useState(false);
  const [selectedProduct, setProduct] = useState(null);

  const anadirCarro = (producto) => {
    setCart([...cart, producto]);
    Toast.show({
      type: "success",
      text1: "Producto añadido al carrito",
      text2: `${producto.name} se ha añadido al carrito`,
      visibilityTime: 2000,
      position: "bottom",
    });
  };

  const MostrarDetalle = (producto) => {
    setProduct(producto);
    setModal(true);
  };

  const renderProductoItem = ({ item }) => (
    <TouchableOpacity onPress={() => MostrarDetalle(item)}>
      <ProductCard product={item} onAddToCart={anadirCarro} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Disponibles</Text>
      <FlatList
        data={productos}
        renderItem={renderProductoItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{selectedProduct.name}</Text>
              <Text style={styles.productPrice}> ${selectedProduct.price}</Text>
              <Text style={styles.productDescripcion}>
                Texto de ejemplo para mostrar detalles
              </Text>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  anadirCarro(selectedProduct);
                  setModal(false);
                }}
              >
                <Text style={styles.addToCartButtonText}>
                  Agregar al carrito
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#ff6600",
    marginBottom: 10,
  },
  productDescripcion: {
    color: "#bbb",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },

  // **Estilos agregados para los botones**
  addToCartButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductList;
