import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import Toast from 'react-native-toast-message'; // Importar Toast correctamente

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
      <Toast />
    </NavigationContainer>
  );
}
