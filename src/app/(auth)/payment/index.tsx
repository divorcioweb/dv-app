import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Radio,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import { Alert, ScrollView } from "react-native";
import { useGlobalContext } from "../../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@react-native-assets/slider";

import React, { useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import {
  CardField,
  confirmPayment,
  StripeProvider,
} from "@stripe/stripe-react-native";
import usePayment from "../../../hooks/usePayment";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function PaymentScreen() {
  const { intentPayment } = usePayment();
  const { isLoading, setIsLoading } = useGlobalContext();

  const [selectedValue, setSelectedValue] = React.useState(2);
  const [isPaymentAll, setIsPaymentAll] = React.useState(true);

  const percentages = [10, 50, 100];

  useEffect(() => {
    if (selectedValue === 2) {
      setIsPaymentAll(true);
    } else {
      setIsPaymentAll(false);
    }
  }, [selectedValue]);

  return (
    <>
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
                O processo iniciará mediante quitação integral {"\n"}do valor de{" "}
                <Heading fontFamily="PathwayBold" fontSize={16}>
                  R$ 4.000,00.
                </Heading>
              </Text>

              <HStack
                mt={7}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Heading
                  fontFamily="PathwayBold"
                  fontSize={18}
                  textTransform={"uppercase"}
                >
                  O pagamento será dividido {"\n"}entre as partes?
                </Heading>
              </HStack>
              <HStack mt={2}>
                <FormControl w={"25%"}>
                  <Radio.Group
                    defaultValue="sim"
                    name="myRadioGroup"
                    space={2}
                    value={isPaymentAll ? "sim" : "nao"}
                    onChange={(e) =>
                      setIsPaymentAll(e === "sim" ? true : false)
                    }
                  >
                    <Radio value="sim" my={1}>
                      Sim
                    </Radio>
                    <Radio value="nao" my={1}>
                      Não
                    </Radio>
                  </Radio.Group>
                </FormControl>

                <Box w={"75%"} justifyContent={"space-between"}>
                  <Text fontFamily="PathwayRegular" fontSize={18}>
                    Quanto você pagará?
                  </Text>
                  <HStack justifyContent={"space-between"} mb={"-8px"}>
                    <Text fontFamily="PathwayBold">10%</Text>
                    <Text fontFamily="PathwayBold">50%</Text>
                    <Text fontFamily="PathwayBold">100%</Text>
                  </HStack>
                  <Slider
                    minimumValue={0}
                    maximumValue={2}
                    value={selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                    step={1}
                    maximumTrackTintColor="#ffff"
                    thumbTintColor="#283C45"
                    thumbSize={20}
                    trackStyle={{
                      height: 8,
                      borderRadius: 10,
                    }}
                  />
                </Box>
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
                      const { paymentIntent: intentKey } = await intentPayment(
                        percentages[selectedValue]
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
      {isLoading && <LoadingTransparent />}
    </>
  );
}
