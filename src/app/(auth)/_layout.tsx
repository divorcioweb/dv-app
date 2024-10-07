import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function Layout() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Deseja sair?", "Gostaria de sair do app?", [
        {
          text: "Cancelar",
          onPress: () => null,
        },
        { text: "Fechar", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Stack screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="user" options={{ headerShown: false }} />
        <Stack.Screen name="conjuge" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
        <Stack.Screen name="upload" options={{ headerShown: false }} />
        <Stack.Screen name="calendar" options={{ headerShown: false }} />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
        <Stack.Screen name="payment-conjuge" options={{ headerShown: false }} />
        <Stack.Screen name="certificate" options={{ headerShown: false }} />
        <Stack.Screen name="change-password" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
