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

const Profile = () => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(
    "data:image/jpeg;base64,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"
  );

  const validateEmail = (email) => {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleName = (text) => {
    setName(text);
  };

  const handleEmail = (text) => {
    setEmail(text);
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

  const handleChanges = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Toast.show({
        type: "error",
        text1: "Todos los campos son obligatorios.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "El correo electrónico no es válido.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    if (phone.length < 10 || phone.length > 10) {
      Toast.show({
        type: "error",
        text1: "El teléfono debe tener 10 dígitos.",
        visibilityTime: 1500,
        position: "bottom",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Cambios guardados correctamente.",
      visibilityTime: 1500,
      position: "bottom",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleImage} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Cambiar Imagen</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        value={name}
        onChangeText={handleName}
        style={styles.input}
        placeholder="Ingrese su nombre"
        placeholderTextColor="#515a5a"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={handleEmail}
        style={styles.input}
        placeholder="Ingrese su email"
        keyboardType="email-address"
        placeholderTextColor="#515a5a"
      />

      <Text style={styles.label}>Telefono:</Text>
      <TextInput
        value={phone}
        onChangeText={handlePhone}
        style={styles.input}
        placeholder="Ingrese su telefono"
        keyboardType="phone-pad"
        placeholderTextColor="#515a5a"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleChanges}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
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
});

export default Profile;
