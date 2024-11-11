import { Stack } from "expo-router";
import { Alert, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/context";

export default function Layout() {
  const { isAuth } = useGlobalContext();

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
      {isAuth && (
        <Stack screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="user" options={{ headerShown: false }} />
          <Stack.Screen name="conjuge" options={{ headerShown: false }} />
          <Stack.Screen name="setting" options={{ headerShown: false }} />
          <Stack.Screen name="upload" options={{ headerShown: false }} />
          <Stack.Screen name="calendar" options={{ headerShown: false }} />
          <Stack.Screen name="payment" options={{ headerShown: false }} />
          <Stack.Screen
            name="payment-conjuge"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="explicativo" options={{ headerShown: false }} />
          <Stack.Screen
            name="change-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="bug" options={{ headerShown: false }} />
          <Stack.Screen
            name="provision-of-services"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="escritura" options={{ headerShown: false }} />
          <Stack.Screen name="minuta" options={{ headerShown: false }} />
          <Stack.Screen name="agendamento" options={{ headerShown: false }} />
        </Stack>
      )}
    </>
  );
}
