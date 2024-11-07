import {
  Box,
  Button,
  Center,
  CheckIcon,
  Checkbox,
  FormControl,
  HStack,
  Heading,
  Input,
  Radio,
  Select,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";
import { nationalitiesList } from "../../../mock/naturalidades";
import { marital } from "../../../mock/marital";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import { countrys } from "../../../mock/countrys";
import Footer from "../../../components/Footer/Footer";
import RNPickerSelect from "react-native-picker-select";
import { User } from "../../../utils/user";

export default function Conjuge() {
  const [service, setService] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [naturalidade, setNaturalidade] = React.useState("");
  const [estado_civil, setEstado_civil] = React.useState("");
  const [nome_solteiro, setNome_solteiro] = React.useState(true);

  const { navigation } = useGlobalContext();

  const user = User.getUser();

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
          >
            <Box mt={7}>
              <Heading fontFamily="PathwayBold" fontSize={32}>
                Bem vindo ao
              </Heading>
              <Heading fontFamily="PathwayBold" fontSize={32}>
                DivorcioWeb!
              </Heading>
            </Box>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Você recebeu um convite de {user.conjuge?.nome} para se cadastrar
              aqui no aplicativo. Para seguirmos com os próximos passos,
              necessitamos do seu cadastro, os itens abaixo são obrigatórios.
            </Text>

            <VStack mt={4} space={2}>
              <FormControl>
                <FormControl.Label>Nome completo</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  Mudará para o nome de solteiro?
                </FormControl.Label>
                <Radio.Group
                  defaultValue="sim"
                  flexDirection={"row"}
                  name="myRadioGroup"
                >
                  <Radio value="sim" my={1}>
                    Sim
                  </Radio>
                  <Radio value="nao" my={1} ml={2}>
                    Não
                  </Radio>
                </Radio.Group>
              </FormControl>

              <FormControl>
                <FormControl.Label>Telefone para contato</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <FormControl>
                <FormControl.Label>Naturalidade</FormControl.Label>
                <RNPickerSelect
                  placeholder={{
                    label: "",
                    value: "",
                  }}
                  style={{
                    inputAndroid: styles.select,
                    inputIOS: styles.select,
                  }}
                  onValueChange={(value) => {
                    setNaturalidade(value);
                  }}
                  value={naturalidade}
                  items={nationalitiesList}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Estado civil</FormControl.Label>
                <RNPickerSelect
                  placeholder={{
                    label: "",
                    value: "",
                  }}
                  style={{
                    inputAndroid: styles.select,
                    inputIOS: styles.select,
                  }}
                  onValueChange={(value) => {
                    setEstado_civil(value);
                  }}
                  value={estado_civil}
                  items={marital}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Profissão</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <FormControl>
                <FormControl.Label>RG</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <FormControl>
                <FormControl.Label>CPF</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <Heading
                mt={5}
                textTransform={"uppercase"}
                fontFamily="PathwayBold"
                fontSize={16}
              >
                Endereço
              </Heading>

              <Text fontFamily="PathwayRegular">
                Digite exatamente como deverá aparecer no contrato.
              </Text>

              <FormControl>
                <FormControl.Label>Endereço</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <HStack w={"100%"} justifyContent={"space-between"}>
                <FormControl w={"48%"}>
                  <FormControl.Label>Cidade</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>
                <FormControl w={"48%"}>
                  <FormControl.Label>Estado</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>
              </HStack>

              <HStack w={"100%"} justifyContent={"space-between"}>
                <FormControl w={"48%"} zIndex={100}>
                  <FormControl.Label>Pais</FormControl.Label>
                  <RNPickerSelect
                    placeholder={{
                      label: "",
                      value: "",
                    }}
                    style={{
                      inputAndroid: styles.selectPais,
                      inputIOS: styles.selectPais,
                    }}
                    onValueChange={(value) => {
                      setPais(value);
                    }}
                    value={pais}
                    items={countrys}
                  />
                </FormControl>
                <FormControl w={"48%"}>
                  <FormControl.Label>CEP</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>
              </HStack>

              <Box alignItems="flex-end" w="100%" mt={10}>
                <Button
                  onPress={() => navigation("user")}
                  backgroundColor={colors.yellow}
                  w="230px"
                  h={52}
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
                  <Text fontSize={20} fontFamily="PathwayBold">
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

const styles = StyleSheet.create({
  select: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: Platform.OS === "ios" ? 14 : 0,
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d8d8d8",
  },
  selectPais: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: Platform.OS === "ios" ? 14 : 0,
    height: 52,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d8d8d8",
  },
});
