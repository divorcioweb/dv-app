import React from "react";
import { colors } from "../theme/colors";
import {
  Box,
  Center,
  Text,
  VStack,
  Image,
  Heading,
  HStack,
  Button,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/context";
import { screens } from "../mock/screens";

export default function Second() {
  const { navigation } = useGlobalContext();
  return (
    <>
      <Box
        justifyContent="start"
        alignItems="center"
        style={{ backgroundColor: colors.background }}
      >
        <ScrollView w={"full"}>
          <Center>
            <VStack p="2" py="10" w="100%" maxW="360">
              <Center>
                <Image source={require("../assets/illustration2.png")} />
              </Center>
              <Box mt={7}>
                <Text fontFamily="PathwayBold" fontSize={32}>
                  Este aplicativo não
                </Text>
                <Text fontFamily="PathwayBold" fontSize={32}>
                  é para você se:
                </Text>
              </Box>
              <Box mt={2}>
                <HStack space={3}>
                  <Text>-</Text>
                  <Text fontFamily="PathwayRegular" fontSize={14}>
                    A outra parte não quer o divórcio;
                  </Text>
                </HStack>
                <HStack space={3}>
                  <Text>-</Text>
                  <Text fontFamily="PathwayRegular" fontSize={14}>
                    Possui filhos menores de 18 anos ou com qualquer
                    incapacidade;
                  </Text>
                </HStack>
                <HStack space={3}>
                  <Text>-</Text>
                  <Text fontFamily="PathwayRegular" fontSize={14}>
                    Ou adquiriram patrimônio no período em que tiveram juntos.
                  </Text>
                </HStack>
              </Box>
              <HStack
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
              >
                <Text fontFamily="PathwayRegular" fontSize={14}>
                  Se seu caso é algum desses acima, podemos te ajudar através
                  deste
                  <Text
                    onPress={() => console.log("TESTE")}
                    alignItems={"center"}
                    underline
                    justifyContent={"center"}
                    fontFamily="PathwayBold"
                    fontSize={14}
                  >
                    {" "}
                    telefone.
                  </Text>
                </Text>
              </HStack>
            </VStack>
            <Box alignItems="flex-end" w="80%" mb={10}>
              <Button
                onPress={() => navigation(screens.signin)}
                backgroundColor={colors.yellow}
                w="180px"
                h={52}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                }
              >
                <Text fontSize={20}>Proximo</Text>
              </Button>
            </Box>
          </Center>
        </ScrollView>
      </Box>
    </>
  );
}
