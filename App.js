import React from "react";
import Toast from "react-native-toast-message";
import { CartProvider } from "./src/context/CartContext";
import AuthNavigator from "./src/navigation/AuthNavigator";

export default function App() {
  return (
    <CartProvider>
      <AuthNavigator />
      <Toast />
    </CartProvider>
  );
}