import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  Radio,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/context";

import Footer from "../../../components/Footer/Footer";
import WebView from "react-native-webview";
import useEvents from "../../../hooks/useEvents";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";
import { router } from "expo-router";

export default function Certificate() {
  const [confirm, setConfirm] = useState<boolean | null>(null);

  const { saveEvent } = useEvents();
  const { setIsLoading, isLoading } = useGlobalContext();

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
            mt={20}
          >
            <Heading fontFamily="PathwayBold" fontSize={32}>
              Vídeo explicativo
            </Heading>
            <Box
              w={"full"}
              h={"240px"}
              backgroundColor={"white"}
              borderWidth={2}
              rounded={"2xl"}
              borderColor={"gray.300"}
              mt={5}
            >
              <WebView
                style={{ borderRadius: 20, border: "none" }}
                source={{
                  html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/-UEsSh73xco" frameborder="0" allowfullscreen></iframe>',
                }}
              />
            </Box>

            <Box
              w={"full"}
              backgroundColor={"white"}
              rounded={"lg"}
              mt={5}
              paddingX={2}
              paddingY={2}
            >
              <Text fontFamily={"PathwayBold"}>Assistiu todo o vídeo?</Text>
              <Text fontFamily={"PathwayRegular"} fontSize={"xs"}>
                Agora confirme abaixo a sua preferência
              </Text>
              <FormControl mt={2}>
                <Radio.Group
                  name="myRadioGroup"
                  onChange={(e) => setConfirm(e === "sim" ? true : false)}
                >
                  <Radio value="sim" my={1} colorScheme={"black"}>
                    <Text fontFamily={"PathwayRegular"}>
                      Renuncio aos alimentos
                    </Text>
                  </Radio>
                  <Radio value="nao" my={1} colorScheme={"black"}>
                    <Text fontFamily={"PathwayRegular"}>
                      Não estou de acordo
                    </Text>
                  </Radio>
                </Radio.Group>
              </FormControl>
            </Box>

            {confirm === false && (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                padding="2px"
                backgroundColor={colors.greenDark}
                w="100%"
                h={"20"}
                rounded="xl"
                mt={6}
              >
                <Box w="20%" alignItems={"center"}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={30}
                    color="white"
                    mx="auto"
                  />
                </Box>
                <Box
                  backgroundColor="white"
                  w="80%"
                  h="100%"
                  borderTopRightRadius="10px"
                  borderBottomRightRadius="10px"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={2}
                >
                  <Text fontFamily="PathwayRegular" fontSize={"12px"}>
                    Nesse caso, aguarde o contato de um de nossos advogados pelo
                    whatsapp. {"\n"}O prazo é de até 1 dia útil.
                  </Text>
                </Box>
              </HStack>
            )}

            <Box
              flexDirection={"row"}
              alignItems={"end"}
              justifyContent={"flex-end"}
              mt={10}
            >
              <TouchableOpacity
                onPress={async () => {
                  if (confirm) {
                    try {
                      setIsLoading(true);
                      const response: any = await saveEvent({
                        data: new Date().toISOString(),
                        status: "Aguardando aceite da minuta",
                        titulo: "Aceito de renúncia aos alimentos",
                      });

                      if (response.ok) {
                        router.push("/minuta");
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  } else {
                    Alert.alert(
                      "Para seguir com o processo de divórcio voce deve marcar está de acordo!"
                    );
                  }
                }}
                style={{ backgroundColor: colors.yellow, borderRadius: 20 }}
              >
                <Text px={5} py={4} fontFamily="PathwayBold" fontSize={20}>
                  Continuar
                </Text>
              </TouchableOpacity>
            </Box>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
