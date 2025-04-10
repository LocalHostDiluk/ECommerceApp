import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ObtenerPedidos } from "../api/pedidos";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const PedidosScreen = () => {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      setRefreshing(true);
      // Obtener el userId almacenado en AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        // Llamar la función para obtener los pedidos
        const data = await ObtenerPedidos(userId);
        setPedidos(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const renderPedidoItem = ({ item }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.pedidoId}>Num. Pedido: {item.id}</Text>
      <Text style={styles.pedidoDate}>Fecha: {item.fecha_creacion}</Text>
      <Text style={styles.pedidoTotal}>Total: ${item.total}</Text>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text style={styles.noPedidosText}>No tienes pedidos registrados.</Text>
      ) : (
        <FlatList
          data={pedidos}
          renderItem={renderPedidoItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.pedidoList}
          refreshing={refreshing}
          onRefresh={fetchPedidos}
        />
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
  pedidoList: {
    paddingVertical: 10,
  },
  pedidoItem: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pedidoId: {
    color: "#ff6600",
    fontSize: 16,
    fontWeight: "bold",
  },
  pedidoDate: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 5,
  },
  pedidoTotal: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 50,
  },
  noPedidosText: {
    color: "#bbb",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PedidosScreen;
