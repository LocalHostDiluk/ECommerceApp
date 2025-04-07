import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import Toast from "react-native-toast-message";
import { getProducts } from "../api/products";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

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

  const [modalVisible, setModal] = useState(false);
  const [selectedProduct, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al cargar productos",
        text2: "No se pudieron obtener los productos",
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const { addToCart } = useContext(CartContext);

  const anadirCarro = (producto) => {

    addToCart(producto);
    Toast.show({
      type: "success",
      text1: `${producto.nombre} se ha añadido al carrito`,
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
      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductoItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          refreshing={refreshing}
          onRefresh={fetchProducts}
        />
      )}
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
                source={{ uri: selectedProduct.imagen }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{selectedProduct.nombre}</Text>
              <Text style={styles.productPrice}>
                {" "}
                ${selectedProduct.precio}{" "}
              </Text>
              <Text style={styles.descripcion}>
                {selectedProduct.descripcion}
              </Text>
              <Text style={styles.productPrice}>
                Stock: {selectedProduct.stock}
              </Text>
              <Text style={styles.descripcion}>
                Categoria: {selectedProduct.categoria}
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
  descripcion: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
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
