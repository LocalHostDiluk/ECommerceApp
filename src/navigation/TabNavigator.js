import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import List from "../screens/ProductList";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1e1e1e",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "#bbb",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Productos"
        component={List}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
