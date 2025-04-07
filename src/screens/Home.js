import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const categorias = [
  {
    id: 1,
    title: "Noches de Salón",
    imageUrl: "https://i.ytimg.com/vi/fyXIezpxFi0/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Daltónico",
    imageUrl:
      "https://cdn-images.dzcdn.net/images/cover/f945f5f0a55d01a16fbe8f23c1171297/0x1900-000000-80-0-0.jpg",
  },
  {
    id: 3,
    title: "Próximos prójimos",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2731e60fc6159664ae2072239fe",
  },
  {
    id: 4,
    title: "Imperfecto extraño",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27308b5853acded25e1b5ff5115",
  },
  {
    id: 5,
    title: "Proaño",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27326da2f3b75f84c4c1d10730a",
  },
  {
    id: 6,
    title: "Enjambre y los huéspedes del orbe",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27369d1fb33044a581470cb7758",
  },
  {
    id: 7,
    title: "El segundo es felino",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e0266f128e383614b0aa4df5ebd",
  },
];

const carouselImages = categorias.map((item) => item.imageUrl);

const Home = () => {
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

  const [currentImage, setCurrentImage] = useState(0);

  const goNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const goPrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>¡Bienvenido Enjambre Escucha 🐝!</Text>
        <Text style={styles.subtitle}>¡Explora los álbumes aquí!</Text>
      </View>

      <Text style={styles.sectionTitle}>Explora nuestros álbumes</Text>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <View style={styles.albumItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.albumImage} />
            <Text style={styles.albumTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.albumListContainer}
      />

      <Text style={styles.sectionTitle}>Algunos de nuestros productos</Text>
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={goPrevImage} style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>{"◀"}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: carouselImages[currentImage] }}
          style={styles.carouselImage}
        />
        <TouchableOpacity onPress={goNextImage} style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>{"▶"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  albumListContainer: {
    paddingVertical: 10,
  },
  albumItem: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 10,
    width: 160,
  },
  albumImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 50,
  },
  carouselImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  carouselButton: {
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
