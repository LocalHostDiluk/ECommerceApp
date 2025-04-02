import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
      <Toast />
    </NavigationContainer>
  );
}
