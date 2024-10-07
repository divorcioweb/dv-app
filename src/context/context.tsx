import { router } from "expo-router";
import React from "react";

interface IContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;

  navigation: (path: string, alterFooter?: boolean) => void;
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

  return (
    <Context.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
        setIsLoading,
        selected,
        navigation,
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
