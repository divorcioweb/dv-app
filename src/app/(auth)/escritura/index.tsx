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
  View,
} from "native-base";
import { Image, ScrollView } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";
import { useGlobalContext } from "../../../context/context";
import { colors } from "../../../theme/colors";
import { screens } from "../../../mock/screens";

export default function Minuta() {
  const { navigation } = useGlobalContext();

  const [confirm, setConfirm] = useState(false);

  return (
    <>
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
              Escritura de divórcio
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={1} mb={5}>
              Após o download, você receberá uma cópia por e-mail e logo a
              seguir,{" "}
              <Text fontFamily="PathwayBold">
                o arquivo será excluído de nosso banco.
              </Text>{" "}
              As segundas vias só podem ser emitidas pelo cartório.
            </Text>

            <Center>
              <Image
                source={require("../../../assets/minuta.png")}
                style={{ width: 270, height: 373 }}
              />
            </Center>

            <View w={"5/6"} mt={4}>
              <Checkbox
                value="true"
                color="info.600"
                mt={2}
                onChange={(value) => setConfirm(value)}
              >
                <Text fontFamily="PathwayRegular" fontSize={14}>
                  Estou ciente que após a conclusão do processo{" "}
                  <Text fontFamily="PathwayBold">
                    meus dados serão excluídos da plataforma em até 7 dias
                  </Text>
                </Text>
              </Checkbox>
            </View>

            <HStack mb={10} mt={4} justifyContent={"flex-end"}>
              <Button
                onPress={() => navigation(screens.upload)}
                backgroundColor={colors.yellow}
                h={52}
                px={"8"}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={<Octicons name="download" size={24} color="black" />}
              >
                <Text fontSize={16} fontFamily="PathwayBold">
                  Download
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
