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
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/context";
import { screens } from "../mock/screens";

export default function Primary() {
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
                <Image source={require("../assets/illustration1.png")} />
              </Center>

              <Box mt={7}>
                <Heading fontFamily="PathwayBold" fontSize={32}>
                  Bem vindo ao
                </Heading>
                <Heading fontFamily="PathwayBold" fontSize={32}>
                  DivorcioWeb!
                </Heading>
              </Box>

              <Box mt={2}>
                <HStack space={3}>
                  <Text>-</Text>
                  <Text fontFamily="PathwayRegular" fontSize={16}>
                    Simplificando o processo de {"\n"}divórcio para você.
                  </Text>
                </HStack>
                <HStack space={3}>
                  <Text>-</Text>
                  <Text fontFamily="PathwayRegular" fontSize={16}>
                    Vamos ajudá-lo a navegar nessa {"\n"}jornada com facilidade.
                  </Text>
                </HStack>
              </Box>

              <HStack
                justifyContent="space-between"
                alignItems="center"
                padding="2px"
                backgroundColor={colors.greenDark}
                w="100%"
                h={"16"}
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
                    Este processo é legalmente válido {"\n"}de acordo com as
                    leis brasileiras
                  </Text>
                </Box>
              </HStack>

              <HStack
                mt={5}
                borderWidth={2}
                borderColor={colors.greenDark}
                rounded="lg"
                width="100%"
                h={52}
                justifyContent="space-between"
                backgroundColor="white"
                alignItems="center"
                paddingX={5}
                space={2}
              >
                <Box w="15%">
                  <Feather name="youtube" size={30} color="black" />
                </Box>
                <Text w="90%" fontFamily="PathwayRegular" fontSize={"12px"}>
                  Assista a este vídeo explicativo
                </Text>
              </HStack>
            </VStack>
            <Box alignItems="flex-end" w="80%" mb={10}>
              <Button
                onPress={() => navigation(screens.second)}
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
