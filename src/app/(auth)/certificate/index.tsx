import { Box, Center, Heading, Text, VStack } from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";

import { ScrollView, TouchableOpacity } from "react-native";

import Footer from "../../../components/Footer/Footer";
import WebView from "react-native-webview";
import { redirectENotariado } from "../../../utils/redirects";

export default function Certificate() {
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
              Faça o seu {"\n"}certificado digital
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Emita seu certificado digital notarizado gratuitamente em um
              cartório credenciado para solicitar e assinar atos notariais,
            </Text>

            <Heading fontFamily="PathwayBold" fontSize={16} mt={5}>
              Veja no video abaixo como é {"\n"}fácil criar o seu certificado.
            </Heading>

            <Box
              w={"full"}
              h={"200px"}
              backgroundColor={"white"}
              borderWidth={2}
              rounded={"2xl"}
              borderColor={"gray.300"}
              mt={10}
            >
              <WebView
                style={{ borderRadius: 20, border: "none" }}
                source={{
                  html: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/-UEsSh73xco" frameborder="0" allowfullscreen></iframe>',
                }}
              />
            </Box>

            <Center mt={10}>
              <TouchableOpacity
                onPress={() => redirectENotariado()}
                style={{ backgroundColor: colors.yellow, borderRadius: 20 }}
              >
                <Text px={5} py={4} fontFamily="PathwayBold" fontSize={20}>
                  Acessar e-notariado
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
