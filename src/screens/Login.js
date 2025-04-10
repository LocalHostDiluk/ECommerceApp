import { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/users";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = ({ setUserToken }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (username) => {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(username);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!username || !password) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Por favor, completa todos los campos",
        });
        return;
      }

      if (!validateEmail(username)) {
        Toast.show({
          type: "error",
          text1: "El correo electrónico no es válido.",
          visibilityTime: 1500,
          position: "bottom",
        });
        return;
      }

      if (password.length < 6) {
        Toast.show({
          type: "error",
          text1: "La contraseña debe tener al menos 6 caracteres.",
          visibilityTime: 1500,
          position: "bottom",
        });
        return;
      }

      const { token, rol, userId, phone } = await login({ username, password }); // 👈 destructuración directa
      console.log("Token:", token);
      console.log("Rol:", rol);
      console.log("ID:", userId);
      console.log("Teléfono:", phone);

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      setUserToken(token);

      // Guardar el id en AsyncStorage
      await AsyncStorage.setItem("userId", userId.toString());

      //Guardar el phone en AsyncStorage
      await AsyncStorage.setItem("phone", phone.toString());

      // Navegar a Home o pantalla principal
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Inicio" }],
        })
      );

      Toast.show({
        type: "success",
        text1: "Inicio de sesión exitoso",
      });
    } catch (error) {
      console.log("Error en el login:", error.message);
      Toast.show({
        type: "error",
        text1: "Error de inicio de sesión",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido 🐝</Text>
      <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#bbb"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#ff6600",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
