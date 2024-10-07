import {
  Box,
  Button,
  Center,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";

import { Alert, ScrollView } from "react-native";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

import { useGlobalContext } from "../../../context/context";
import CardWhatsApp from "../../../components/CardWhatsApp/CardWhatsApp";
import Footer from "../../../components/Footer/Footer";
import * as DocumentPicker from "expo-document-picker";
import { bodyFile } from "../../../utils/bodyFile";
import UploadFile from "../../../components/Upload/Upload";

export default function Upload() {
  const [IAgree, setIAgree] = React.useState(false);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<any>([]);
  const regex = /\(\d+\)/;
  const { navigation } = useGlobalContext();

  const pickDocument = async (value: any) => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync();
      if (result.type !== "cancel") {
        const existType = selectedFile.find((file: any) => file.name === value);
        if (!existType) {
          const filtered = selectedFile.filter(
            (file: any) => file.nome.replace(regex, "").trim() === value
          );
          if (filtered[0] === undefined) {
            const body = await bodyFile(value, result.assets[0]);
            setSelectedFile([...selectedFile, body]);
          } else {
            value = value + ` (${filtered.length})`;
            const body = await bodyFile(value, result.assets[0]);
            setSelectedFile([...selectedFile, body]);
          }
        }
      }
      setIsVisibleModal(false);
    } catch (err) {
      setIsVisibleModal(false);
    }
  };

  const handleSaveAndNext = () => {
    if (selectedFile.length < 5) {
      Alert.alert("Adicione todos os documentos necessários, por favor.", "", [
        {
          text: "Ok",
          onPress: () => null,
        },
      ]);
    } else {
      // saveDocuments(selectedFile);
    }
  };

  const handleDelete = (indexToRemove: any) => {
    setSelectedFile((prevSelectedFile: any[]) =>
      prevSelectedFile.filter((_: any, index: any) => index !== indexToRemove)
    );
  };

  const CardUp = ({ item, index }: { item: any; index: number }) => {
    return (
      <HStack alignItems={"center"} h={"25px"}>
        <Box w={"15%"} alignItems={"center"}>
          <AntDesign name="file1" size={20} color="black" />
        </Box>
        <Box w={"70%"}>
          <Text ml={"10px"}>{item.nome}</Text>
        </Box>
        <Box w={"15%"} alignItems={"center"}>
          <Feather
            name="trash-2"
            size={20}
            color="red"
            onPress={() => handleDelete(index)}
          />
        </Box>
      </HStack>
    );
  };

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
              Upload dos {"\n"}documentos
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Está quase acabando, agora precisamos que você anexe aqui os
              seguintes documentos:
            </Text>
            <Box mt={2}>
              <HStack space={3}>
                <Text>-</Text>
                <Text fontFamily="PathwayRegular" fontSize={16}>
                  Cópia do RG e CPF;
                </Text>
              </HStack>
              <HStack space={3}>
                <Text>-</Text>
                <Text fontFamily="PathwayRegular" fontSize={16}>
                  Certidão de casamento atualizada no prazo de 90 dias (e caso
                  não possua - no caso de moradores do exterior, entra em
                  contato);
                </Text>
              </HStack>
              <HStack space={3}>
                <Text>-</Text>
                <Text fontFamily="PathwayRegular" fontSize={16}>
                  Comprovante de endereço;
                </Text>
              </HStack>
              <HStack space={3}>
                <Text>-</Text>
                <Text fontFamily="PathwayRegular" fontSize={16}>
                  Se existirem filhos, apresentar certidão de nascimento.
                </Text>
              </HStack>
            </Box>

            <HStack
              justifyContent="space-between"
              alignItems="center"
              padding="2px"
              backgroundColor={colors.greenDark}
              w="100%"
              h={"100px"}
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
                <Text fontFamily="PathwayRegular" py={2} fontSize={12}>
                  Após o envio dos documentos, formularemos o contrato de
                  divórcio e enviaremos uma notificação para que você visualize
                  e aceito os termos.
                </Text>
              </Box>
            </HStack>

            <Box backgroundColor={"white"} p={"2.5"} rounded={"lg"} mt={6}>
              <Text>
                O processo precisa ser concluído em 30 dias senão ele será
                reiniciado
              </Text>
              <Checkbox
                value="true"
                color="info.600"
                mt={2}
                onChange={(value) => setIAgree(value)}
              >
                <Text fontFamily="PathwayRegular">Li acima e concordo</Text>
              </Checkbox>
            </Box>

            <Center mt={6}>
              <Button
                onPress={() => setIsVisibleModal(true)}
                disabled={!IAgree}
                backgroundColor={IAgree ? colors.yellow : colors.disabled}
                h={52}
                px="4"
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={
                  <Feather
                    name="upload"
                    size={24}
                    color={IAgree ? "#000" : "#0000007b"}
                  />
                }
              >
                <Text
                  fontSize={16}
                  fontFamily="PathwayBold"
                  color={IAgree ? "black" : "gray.400"}
                >
                  Enviar documentos
                </Text>
              </Button>
            </Center>

            <Heading
              mt={5}
              textTransform={"uppercase"}
              fontFamily="PathwayBold"
              fontSize={16}
            >
              ARQUIVOS ANEXADOS
            </Heading>

            <Box mt={4}>
              <HStack backgroundColor={colors.greenDark} space={2}>
                <Text
                  color={"white"}
                  fontFamily="PathwayBold"
                  fontSize={12}
                  w={"12"}
                  textAlign={"center"}
                >
                  TIPO
                </Text>
                <Text
                  color={"white"}
                  fontFamily="PathwayBold"
                  w={"12"}
                  fontSize={12}
                  textAlign={"center"}
                >
                  NOME
                </Text>
              </HStack>
              <VStack minH={"10"} maxH={"32"} backgroundColor={"white"}>
                <FlatList
                  data={selectedFile}
                  renderItem={CardUp}
                  keyExtractor={(item, index) => index.toString()}
                />
              </VStack>
            </Box>

            <Box alignItems="flex-end" w="100%" mt={10}>
              <Button
                onPress={() => handleSaveAndNext()}
                backgroundColor={colors.yellow}
                px="4"
                h={52}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                }
              >
                <Text fontSize={16} fontFamily="PathwayBold">
                  Salvar e Proximo
                </Text>
              </Button>
            </Box>
            <CardWhatsApp />
          </VStack>
        </Center>
      </ScrollView>
      <Footer />

      <UploadFile
        pickDocument={pickDocument}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
    </>
  );
}
