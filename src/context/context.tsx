import { router } from "expo-router";
import React, { useEffect } from "react";
import { User } from "../utils/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { screens } from "../mock/screens";

interface IContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;

  navigation: (path: string, alterFooter?: boolean) => void;
  logout: () => void;
}

export const Context = React.createContext<IContext>({} as IContext);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState("setting");

  const navigation = (path: string, alterFooter?: boolean) => {
    router.navigate("/" + path);
    if (alterFooter) {
      setSelected(path);
    }
  };

  useEffect(() => {
    setIsAuth(true);
    navigation(screens.payment, true);
  }, []);

  const logout = async () => {
    Alert.alert(
      "Desejar sair?",
      "Você tem certeza que desejar sair da sua conta?",
      [
        {
          text: "Não",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              User.clearUser();
              await AsyncStorage.removeItem("email");
              await AsyncStorage.removeItem("senha");
              setIsAuth(false);
              router.navigate("/");
            } catch (error) {
              console.error("Error removing item from AsyncStorage:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Context.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
        setIsLoading,
        selected,
        navigation,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useMyContext deve ser usado dentro de um MyContextProvider"
    );
  }
  return context;
};
