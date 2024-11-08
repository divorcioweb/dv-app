import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  Checkbox,
} from "native-base";
import { Alert, ScrollView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/context";
import { colors } from "../../../theme/colors";
import { screens } from "../../../mock/screens";
import Footer from "../../../components/Footer/Footer";
import useEvents from "../../../hooks/useEvents";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";

export default function ProvisionOfServices() {
  const { navigation } = useGlobalContext();
  const scrollViewRef = useRef<any>(null);
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 100;

  const scrollDown = () => {
    if (scrollViewRef.current) {
      const newPosition = scrollPosition + scrollAmount;
      scrollViewRef.current.scrollTo({ y: newPosition, animated: true });
      setScrollPosition(newPosition);
    }
  };

  const scrollUp = () => {
    if (scrollViewRef.current) {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      scrollViewRef.current.scrollTo({ y: newPosition, animated: true });
      setScrollPosition(newPosition);
    }
  };

  const { acceptContractEvent } = useEvents();

  return (
    <>
      {isLoading && <LoadingTransparent />}
      <ScrollView style={{ backgroundColor: colors.background }}>
        <Center
          w="100%"
          h="100%"
          style={{ backgroundColor: colors.background }}
          pb={"16"}
        >
          <VStack
            backgroundColor={colors.background}
            w="full"
            maxW={350}
            mt={8}
          >
            <Heading fontFamily="PathwayBold" fontSize={32}>
              Contrato {"\n"}de serviço
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={1} mb={5}>
              Por favor, leia com atenção o contrato
            </Text>

            <VStack w={"100%"} bg={"white"} h={"450px"} rounded={"md"} p={4}>
              <Heading fontFamily="PathwayBold" fontSize={16}>
                Contrato de serviço
              </Heading>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
                  Contrato de serviço Lorem ipsum dolor sit amet consectetur.
                  Magna rutrum habitasse sit nulla id. Velit quis dolor
                  imperdiet laoreet adipiscing. Nunc aliquam libero tincidunt
                  tellus. Quis bibendum id condimentum dignissim dictum odio
                  morbi. Quis tempor mi venenatis dignissim volutpat turpis at.
                  Molestie faucibus platea commodo et maecenas in orci sapien.
                  Placerat etiam nisi mi neque amet. Pellentesque diam risus
                  tempus eu imperdiet. Et a nullam mi aenean nisi eu enim.
                  Suscipit ultrices congue vitae magna purus mattis cras
                  senectus ante. Malesuada purus amet velit duis diam. Ultrices
                  sit varius senectus viverra nam luctus sed vel augue. Ac morbi
                  tincidunt enim dapibus aenean faucibus proin nulla. Odio dui
                  adipiscing at malesuada tellus amet diam in posuere. Dignissim
                  aliquam mi porta aliquet ut ornare. Ac eget faucibus amet
                  integer dignissim. Ac sed malesuada fames egestas suspendisse
                  sagittis. Sed velit dapibus senectus et in. Hac vel ut sapien
                  sed. Aenean mattis porttitor mauris porttitor mi tortor. Sed
                  id volutpat sed quis egestas massa. Purus nulla in aliquam
                  quis vulputate euismod mauris integer tempus. Fermentum
                  gravida posuere faucibus vulputate aliquam hac id. Magna diam
                  volutpat risus feugiat accumsan suspendisse dolor nisi sed. Ut
                  orci posuere ipsum sit orci nisi semper mattis vitae. Blandit
                  magna aenean ullamcorper sodales. Tincidunt cursus ut
                  malesuada ultrices pulvinar consequat commodo. Eu in massa
                  dignissim risus tellus. Ipsum nibh arcu nullam mi. Vitae at
                  eget tempor purus dolor egestas ipsum faucibus. Nunc tortor
                  consectetur suscipit in phasellus sed. Eleifend tincidunt
                  feugiat mauris consectetur. Nulla ipsum elementum massa ac
                  nunc morbi. Gravida donec mauris suscipit condimentum morbi
                  risus cursus molestie eget. Id nisl neque pharetra eget
                  posuere eget. Mollis ultrices diam sed eu integer blandit et
                  sit odio. Diam euismod blandit sollicitudin ullamcorper et.
                  Aenean in vitae leo quis egestas ut. Nulla porttitor egestas
                  tortor tincidunt turpis nulla maecenas erat sed.
                </Text>
              </ScrollView>
            </VStack>

            <VStack
              space={2}
              mt={"130px"}
              position={"absolute"}
              h={"430px"}
              justifyContent={"space-between"}
              right={2}
              zIndex={"100px"}
            >
              <Entypo
                name="chevron-with-circle-up"
                size={28}
                color="black"
                onPress={scrollUp}
              />
              <Entypo
                onPress={scrollDown}
                name="chevron-with-circle-down"
                size={28}
                color="black"
              />
            </VStack>

            <Checkbox
              value="true"
              color="info.600"
              mt={2}
              onChange={(value) => setConfirm(value)}
            >
              <Text fontFamily="PathwayRegular" fontSize={16}>
                Confirmo que li e estou de acordo {"\n"}com o contrato
              </Text>
            </Checkbox>

            <HStack mb={10} mt={4} justifyContent={"space-between"}>
              <Button
                onPress={() => {
                  Alert.alert(
                    "Para seguir você precisa ler e aceitar o contrato de serviço"
                  );
                }}
                backgroundColor={"white"}
                h={52}
                px={"8"}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
              >
                <AntDesign name="close" size={24} color="black" />
              </Button>
              <Button
                onPress={async () => {
                  if (confirm) {
                    try {
                      setIsLoading(true);
                      const response = await acceptContractEvent({
                        data: new Date().toISOString(),
                        titulo: "Contrato de serviço aceito",
                        status: "Aguardando confirmação de pagamento",
                      });
                      if (
                        response.status === "Aguardando envio de documentos"
                      ) {
                        navigation(screens.upload, true);
                      } else {
                        if (response.type === 1) {
                          navigation(screens.payment, true);
                        } else {
                          navigation(screens.paymentConjuge, true);
                        }
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  } else {
                    Alert.alert(
                      "Para seguir você precisa ler e aceitar o contrato de serviço"
                    );
                  }
                }}
                backgroundColor={colors.yellow}
                h={52}
                px={"8"}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={<AntDesign name="check" size={24} color="black" />}
              >
                <Text fontSize={16} fontFamily="PathwayBold">
                  Aceito
                </Text>
              </Button>
            </HStack>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
