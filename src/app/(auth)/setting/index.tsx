import { Button, Center, Heading, Modal, Pressable, Text, VStack } from "native-base";
import { colors } from "../../../theme/colors";
import React, { useState } from "react";

import { ScrollView } from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";
import { useGlobalContext } from "../../../context/context";
import { redirectWhatsApp } from "../../../utils/redirects";
import { screens } from "../../../mock/screens";

export default function Setting() {
  const { navigation } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState<boolean>();

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
              Configurações
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Acompanhe abaixo as etapas agendadas
            </Text>

            <VStack mt={12}>
              <Button
                onPress={() => console.log("teste")}
                justifyContent={"flex-start"}
                backgroundColor={"transparent"}
                leftIcon={<AntDesign name="lock1" size={25} color="black" />}
                px={0}
                h={70}
                borderBottomColor={"gray.200"}
                borderBottomWidth={1}
              >
                <Text fontFamily="PathwayRegular" fontSize={20} ml={5}>
                  Trocar senha
                </Text>
              </Button>

              <Button
                onPress={() => navigation(screens.certificate)}
                justifyContent={"flex-start"}
                backgroundColor={"transparent"}
                leftIcon={
                  <AntDesign name="questioncircleo" size={25} color="black" />
                }
                px={0}
                h={70}
                borderBottomColor={"gray.200"}
                borderBottomWidth={1}
              >
                <Text fontFamily="PathwayRegular" fontSize={20} ml={5}>
                  Dúvidas frequentes
                </Text>
              </Button>

              <Button
                justifyContent={"flex-start"}
                backgroundColor={"transparent"}
                leftIcon={
                  <MaterialCommunityIcons
                    name="message-reply-text-outline"
                    size={25}
                    color="black"
                  />
                }
                px={0}
                h={70}
                borderBottomColor={"gray.200"}
                borderBottomWidth={1}
                onPress={() => setModalVisible(true)}
              >
                <Text fontFamily="PathwayRegular" fontSize={20} ml={5}>
                  Fale com o advogado
                </Text>
              </Button>
              <Button
                justifyContent={"flex-start"}
                backgroundColor={"transparent"}
                leftIcon={
                  <MaterialIcons name="logout" size={25} color="black" />
                }
                px={0}
                h={70}
                borderBottomColor={"gray.200"}
                borderBottomWidth={1}
              >
                <Text fontFamily="PathwayRegular" fontSize={20} ml={5}>
                  Sair do aplicativo
                </Text>
              </Button>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        bottom="4"
        size="lg"
      >
        <Modal.Content rounded={"3xl"}>
          <Modal.CloseButton />
          <Modal.Header flexDirection={"row"} alignItems={"center"}>
            <Feather name="phone" size={24} color="black" />
            <Heading fontFamily="PathwayBold" ml={4} fontSize={32}>
              Fale com o {"\n"}advogado
            </Heading>
          </Modal.Header>
          <Modal.Body>
            <Text fontFamily="PathwayRegular" textAlign={"center"}>
              Tem alguma dúvida ou problema com o aplicativo, ligue para nós
              pelo número abaixo.
            </Text>
            <Button
              my={4}
              onPress={() => redirectWhatsApp()}
              rounded={"2xl"}
              backgroundColor={colors.disabled}
              borderWidth={1}
              leftIcon={<FontAwesome name="whatsapp" size={36} color="black" />}
            >
              <Text fontSize={24} fontFamily="PathwayBold" ml={4}>
                21 98757-8661
              </Text>
            </Button>
            <Text fontFamily="PathwayRegular" textAlign={"center"}>
              Atendimento de segunda à sexta das 9h às 18h
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
