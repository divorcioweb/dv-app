import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { ContextProvider } from "../context/context";
import { Box, Image, NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    PathwayRegular: require("../../assets/fonts/PathwayExtreme_120pt-Regular.ttf"),
    PathwayBold: require("../../assets/fonts/PathwayExtreme_120pt-Bold.ttf"),
  });

  useEffect(() => {
    const loadingFonts = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };
    loadingFonts();
  }, []);

  return (
    <>
      <ContextProvider>
        <NativeBaseProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="second" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="forgot" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)"
              options={{
                headerBackVisible: false,
                headerTitle: "",
                headerLeft: () => (
                  <Box paddingBottom={5}>
                    <Image source={require("../assets/logo-min.png")} />
                  </Box>
                ),
                headerRight: () => (
                  <Box>
                    <Image source={require("../assets/name.png")} />
                  </Box>
                ),
              }}
            />
          </Stack>
          <Toast />
        </NativeBaseProvider>
      </ContextProvider>
    </>
  );
}
