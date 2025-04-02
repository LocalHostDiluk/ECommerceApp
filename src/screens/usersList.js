import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Importamos useFocusEffect
import { getUsers } from "../api/users"; // Asegúrate de importar correctamente

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      console.log("📌 Usuarios obtenidos:", data);
      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch (error) {
      console.error("❌ Error cargando usuarios:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Se ejecuta cada vez que el usuario regresa a la pestaña
    }, [fetchData])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.userName}>
                {item.name || item.username || "Usuario"}
              </Text>
              <Text>{item.password || "Sin password"}</Text>
              <Text>{item.phone || "Sin teléfono"}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.emptyMessage}>No hay usuarios disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default UserList;
