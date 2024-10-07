import {
  Box,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";

import { ScrollView } from "react-native";
import {
  AntDesign,
} from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";

export default function Calendar() {
  return (
    <>
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
              Acompanhamento dos eventos
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Acompanhe abaixo as etapas agendadas
            </Text>

            <Box
              backgroundColor={"white"}
              width={"20"}
              mt={6}
              justifyContent={"center"}
              borderTopRadius={"lg"}
              py={"1.5"}
            >
              <Text textAlign={"center"} fontFamily="PathwayBold">
                Você
              </Text>
            </Box>
            <VStack
              backgroundColor={"white"}
              borderTopRightRadius={"lg"}
              borderBottomLeftRadius={"lg"}
              borderBottomRightRadius={"lg"}
            >
              <ComponentAgend />
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}

const ComponentAgend = () => {
  return (
    <>
      <HStack
        backgroundColor={"white"}
        h={20}
        p={4}
        rounded={"lg"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          backgroundColor={colors.greenDark}
          h={"full"}
          rounded={"sm"}
          w={"12"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={"white"} fontFamily={"PathwayBold"}>
            11
          </Text>
          <Text color={"white"} fontFamily={"PathwayBold"}>
            JUN
          </Text>
        </Box>
        <Text fontFamily={"PathwayRegular"} fontSize={16} w={"65%"}>
          Cadastro no aplicativo
        </Text>
        <AntDesign name="checkcircleo" size={24} color="black" />
      </HStack>
    </>
  );
};
