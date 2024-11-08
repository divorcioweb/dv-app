import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Heading,
  Select,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import { ScrollView } from "react-native";
import { useGlobalContext } from "../../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import { screens } from "../../../mock/screens";
import { parcelas } from "../../../mock/parcelas";
import React, { useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import { User, UserData } from "../../../utils/user";
import Toast from "react-native-toast-message";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";

export default function PaymentScreenConjuge() {
  const [service, setService] = React.useState("");
  const { navigation, setIsLoading, isLoading } = useGlobalContext();

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
          text2: "É preciso aguardar o cônjuge finalizar sua etapa de pagamento",
          type: "info",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(user.conjuge?.pagamento)

  return (
    <>
      {isLoading && <LoadingTransparent />}
      <ScrollView style={{ backgroundColor: colors.background }}>
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
                SUA PARTE DO {"\n"}PAGAMENTO É DE {user.pagamento?.porcentagem}%
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
                <FormControl.Label>Parcelamento</FormControl.Label>
                <Select
                  h={52}
                  selectedValue={service}
                  minWidth="200"
                  _selectedItem={{
                    bg: colors.greenDarkOpacity,
                    endIcon: <CheckIcon size="4" />,
                  }}
                  backgroundColor={"white"}
                  onValueChange={(itemValue) => setService(itemValue)}
                >
                  {parcelas.map((item) => (
                    <Select.Item
                      shadow={2}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Select>
              </FormControl>

              <Box alignItems="flex-end" w="100%" mt={10}>
                <Button
                  onPress={() => navigation(screens.upload)}
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
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
