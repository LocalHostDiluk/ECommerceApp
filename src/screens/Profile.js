import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { UserUpdate } from "../api/users";
import { useEffect } from "react";

const Profile = ({ navigation, setUserToken }) => {
  const nav = useNavigation();

  useLayoutEffect(() => {
    nav.setOptions({
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
  }, [nav]);

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [userphonePlaceholder, setUserphonePlaceholder] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      const phone = await AsyncStorage.getItem("phone");
      if (phone) setUserphonePlaceholder(`${phone}`);
    };
    fetchUserId();
  }, []);

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handlePhone = (text) => {
    setPhone(text);
  };

  const handleImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Se necesita permiso para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      Toast.show({
        type: "success",
        text1: "Imagen actualizada",
        visibilityTime: 1500,
        position: "bottom",
      });
    }
  };

  const handleChanges = async () => {
    if (!password.trim() && !phone.trim()) {
      Toast.show({
        type: "error",
        text1: "Llena un campo al menos para actualizar.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    if (phone.trim() && phone.length !== 10) {
      Toast.show({
        type: "error",
        text1: "El teléfono debe tener 10 dígitos.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    if (password.trim() && password.length < 8) {
      Toast.show({
        type: "error",
        text1: "La contraseña debe tener al menos 8 caracteres.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");
      await UserUpdate(userId, { phone, password });

      Toast.show({
        type: "success",
        text1: "Cambios guardados correctamente.",
        visibilityTime: 1500,
        position: "bottom",
      });

      setPassword("");
      setPhone("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al guardar cambios.",
        text2: error?.response?.data?.message || "Inténtalo de nuevo.",
        visibilityTime: 2000,
        position: "bottom",
      });
    }
  };

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: async () => {
          await AsyncStorage.removeItem("authToken");
          setUserToken(null); // 👈 esto te lleva automáticamente al Login
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleImage} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Cambiar Imagen</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={handlePassword}
        style={styles.input}
        placeholder="Ingrese su Password"
        keyboardType="default"
        placeholderTextColor="#515a5a"
      />

      <Text style={styles.label}>Telefono:</Text>
      <TextInput
        value={phone}
        onChangeText={handlePhone}
        style={styles.input}
        placeholder= {userphonePlaceholder || "Ingrese su teléfono"}
        keyboardType="phone-pad"
        placeholderTextColor="#515a5a"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleChanges}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ff6600",
  },
  imageButton: {
    marginTop: 10,
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
