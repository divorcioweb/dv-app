import { Linking } from "react-native";

export const redirectWhatsApp = (number: string) => {
  Linking.openURL(`https://api.whatsapp.com/send/?phone=+55${number}`);
};

export const redirectENotariado = () => {
  Linking.openURL("https://www.e-notariado.org.br/");
};
