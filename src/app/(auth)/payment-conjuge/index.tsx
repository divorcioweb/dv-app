import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import { Alert, ScrollView } from "react-native";
import { useGlobalContext } from "../../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import { User } from "../../../utils/user";
import Toast from "react-native-toast-message";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";
import usePayment from "../../../hooks/usePayment";
import {
  CardField,
  confirmPayment,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { router } from "expo-router";

export default function PaymentScreenConjuge() {
  const { navigation, setIsLoading, isLoading } = useGlobalContext();

  const { intentPayment } = usePayment();

  const user = User.getUser();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      setIsLoading(true);

      if (!user.conjuge?.pagamento.pago) {
        navigation("calendar", true);
        Toast.show({
          text1: "Aguarde o cônjuge iniciar o pagamento!",
          text2:
            "É preciso aguardar o cônjuge finalizar sua etapa de pagamento",
          type: "info",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingTransparent />}
      <ScrollView style={{ backgroundColor: colors.background }}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY_PUBLISH as string}
        >
          <Center
            w="100%"
            h="100%"
            pb={100}
            style={{ backgroundColor: colors.background }}
          >
            <VStack
              backgroundColor={colors.background}
              h="full"
              w="full"
              maxW={350}
            >
              <Box mt={7}>
                <Heading fontFamily="PathwayBold" fontSize={32}>
                  Validação de {"\n"}pagamento
                </Heading>
              </Box>
              <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
                Ao fim do processo será cobrado o valor de R$ 4.000,00
              </Text>

              <HStack
                mt={7}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Heading fontFamily="PathwayBold" fontSize={18}>
                  SUA PARTE DO {"\n"}PAGAMENTO É DE{" "}
                  {user.pagamento?.porcentagem}%
                </Heading>
                <Heading fontFamily="PathwayBold" fontSize={24}>
                  {user.pagamento?.valor_pago &&
                    user.pagamento?.valor_pago.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "brl",
                    })}
                </Heading>
              </HStack>

              <VStack mt={4} space={2}>
                <FormControl>
                  <FormControl.Label>Cartão</FormControl.Label>
                  <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                      number: "4242 4242 4242 4242",
                    }}
                    cardStyle={{
                      backgroundColor: "#FFFFFF",
                      textColor: "#1f1c1c",
                      borderWidth: 1,
                      borderColor: "#BECDCF",
                      borderRadius: 8,
                    }}
                    style={{
                      width: "100%",
                      height: 50,
                      marginVertical: 4,
                    }}
                  />
                </FormControl>
              </VStack>
              <Box alignItems="flex-end" w="100%" mt={10}>
                <Button
                  onPress={async () => {
                    try {
                      setIsLoading(true);
                      console.log(process.env.STRIPE_KEY_PUBLISH as string)
                      const { paymentIntent: intentKey } = await intentPayment(
                        Number(user.pagamento?.porcentagem)
                      );

                      const { paymentIntent, error } = await confirmPayment(
                        intentKey,
                        {
                          paymentMethodType: "Card",
                        }
                      );
                      if (paymentIntent) {
                        Toast.show({
                          text1: "Pagamento confirmado!",
                        });
                        router.push("/upload");
                      }
                      if (error) {
                        Alert.alert(
                          "Verifique as informações e tente novamente!"
                        );
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  backgroundColor={colors.yellow}
                  h={52}
                  px={"4"}
                  rounded="2xl"
                  textDecorationColor="black"
                  flexDirection="row"
                  endIcon={
                    <MaterialIcons
                      name="navigate-next"
                      size={24}
                      color="black"
                    />
                  }
                >
                  <Text fontSize={16} fontFamily="PathwayBold">
                    Salvar e Proximo
                  </Text>
                </Button>
              </Box>
            </VStack>
          </Center>
        </StripeProvider>
      </ScrollView>
      <Footer />
    </>
  );
}
