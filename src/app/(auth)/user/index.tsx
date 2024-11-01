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
  View,
} from "native-base";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { nationalitiesList } from "../../../mock/naturalidades";
import { marital } from "../../../mock/marital";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { countrys } from "../../../mock/countrys";
import { Formik } from "formik";
import { userSchemaUpdate } from "../../../utils/schema";
import Footer from "../../../components/Footer/Footer";
import useSign from "../../../hooks/useSign";
import RNPickerSelect from "react-native-picker-select";
import { useGlobalContext } from "../../../context/context";
import { validationRedirect } from "../../../utils/validationRedirect";
import useEvents from "../../../hooks/useEvents";
import Toast from "react-native-toast-message";

export default function UserS() {
  const { register } = useSign();
  const { saveEvent } = useEvents();
  const { navigation, setIsLoading } = useGlobalContext();

  const [pais, setPais] = useState("");
  const [naturalidade, setNaturalidade] = useState("");
  const [estado_civil, setEstado_civil] = useState("");
  const [nome_solteiro, setNome_solteiro] = useState(true);
  const [nao_possui_filhos_menores, setNao_possui_filhos_menores] =
    useState(false);

  const initialValues = {
    nome: "",
    profissao: "",
    rg: "",
    cpf: "",
    endereco: {
      complemento: "",
      estado: "",
      cidade: "",
      cep: "",
    },
    conjuge: {
      nome: "",
      email: "",
    },
  };


  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const body = {
        ...values,
        endereco: {
          ...values.endereco,
          pais,
        },
        nome_solteiro,
        naturalidade,
        estado_civil,
        nao_possui_filhos_menores,
      };
      const response = await register(body);

      if (response) {
        Toast.show({
          text1: "Login feito com sucesso!",
        });
        navigation(validationRedirect(response.status, response.type), true);
        await saveEvent({
          data: new Date().toISOString(),
          status: "Aguardando aceite do contrato de serviços",
          titulo: "Cadastro completo",
        });
      }
    } finally {
      setIsLoading(false);
    }
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
              Para seguirmos com os próximos passos, necessitamos do seu
              cadastro, os itens abaixo são obrigatórios.
            </Text>

            <Checkbox
              value="true"
              onChange={() =>
                setNao_possui_filhos_menores(!nao_possui_filhos_menores)
              }
              isChecked={nao_possui_filhos_menores}
              color="info.600"
              mt={6}
            >
              <Text fontFamily="PathwayRegular">
                Não possuo filhos menores {"\n"}de idade com o cônjuge
              </Text>
            </Checkbox>

            <VStack mt={4} space={2}>
              <Formik
                initialValues={initialValues}
                validationSchema={userSchemaUpdate}
                onSubmit={onSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <FormControl>
                      <FormControl.Label>Nome completo</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("nome")}
                        onBlur={handleBlur("nome")}
                        value={values.nome}
                      />
                      {touched.nome && errors.nome && (
                        <Text color="red.500">{errors.nome}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>
                        Mudará para o nome de solteiro?
                      </FormControl.Label>
                      <Radio.Group
                        onChange={(value) =>
                          setNome_solteiro(value === "sim" ? true : false)
                        }
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
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("profissao")}
                        onBlur={handleBlur("profissao")}
                        value={values.profissao}
                      />
                      {touched.profissao && errors.profissao && (
                        <Text color="red.500">{errors.profissao}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>RG</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("rg")}
                        onBlur={handleBlur("rg")}
                        value={values.rg}
                      />
                      {touched.rg && errors.rg && (
                        <Text color="red.500">{errors.rg}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>CPF</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("cpf")}
                        onBlur={handleBlur("cpf")}
                        value={values.cpf}
                      />
                      {touched.cpf && errors.cpf && (
                        <Text color="red.500">{errors.cpf}</Text>
                      )}
                    </FormControl>

                    <Heading
                      mt={5}
                      textTransform={"uppercase"}
                      fontFamily="PathwayBold"
                      fontSize={16}
                    >
                      Insira as informações do cônjuge
                    </Heading>

                    <Text fontFamily="PathwayRegular">
                      Digite exatamente como deverá aparecer no contrato.
                    </Text>

                    <FormControl>
                      <FormControl.Label>Endereço</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("endereco.complemento")}
                        onBlur={handleBlur("endereco.complemento")}
                        value={values.endereco.complemento}
                      />
                      {touched.endereco?.complemento &&
                        errors.endereco?.complemento && (
                          <Text color="red.500">
                            {errors.endereco.complemento}
                          </Text>
                        )}
                    </FormControl>

                    <HStack w={"100%"} justifyContent={"space-between"}>
                      <FormControl w={"48%"}>
                        <FormControl.Label>Cidade</FormControl.Label>
                        <Input
                          h={52}
                          backgroundColor="#fff"
                          onChangeText={handleChange("endereco.cidade")}
                          onBlur={handleBlur("endereco.cidade")}
                          value={values.endereco.cidade}
                        />
                        {touched.endereco?.cidade &&
                          errors.endereco?.cidade && (
                            <Text color="red.500">
                              {errors.endereco.cidade}
                            </Text>
                          )}
                      </FormControl>
                      <FormControl w={"48%"}>
                        <FormControl.Label>Estado</FormControl.Label>
                        <Input
                          h={52}
                          backgroundColor="#fff"
                          onChangeText={handleChange("endereco.estado")}
                          onBlur={handleBlur("endereco.estado")}
                          value={values.endereco.estado}
                        />
                        {touched.endereco?.estado &&
                          errors.endereco?.estado && (
                            <Text color="red.500">
                              {errors.endereco.estado}
                            </Text>
                          )}
                      </FormControl>
                    </HStack>

                    <HStack w={"100%"} justifyContent={"space-between"}>
                      <FormControl w={"48%"} zIndex={100}>
                        <FormControl.Label>Pais</FormControl.Label>
                        <RNPickerSelect
                          placeholder={{}}
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
                        {/* <Select
                          h={52}
                          selectedValue={pais}
                          _selectedItem={{
                            bg: colors.greenDarkOpacity,
                            endIcon: <CheckIcon size="4" />,
                          }}
                          backgroundColor={"white"}
                          onValueChange={(itemValue) => setPais(itemValue)}
                        >
                          {countrys.map((item) => (
                            <Select.Item
                              shadow={2}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </Select> */}
                      </FormControl>
                      <FormControl w={"48%"}>
                        <FormControl.Label>CEP</FormControl.Label>
                        <Input
                          h={52}
                          backgroundColor="#fff"
                          onChangeText={handleChange("endereco.cep")}
                          onBlur={handleBlur("endereco.cep")}
                          value={values.endereco.cep}
                        />
                        {touched.endereco?.cep && errors.endereco?.cep && (
                          <Text color="red.500">{errors.endereco.cep}</Text>
                        )}
                      </FormControl>
                    </HStack>

                    <Heading
                      mt={5}
                      textTransform={"uppercase"}
                      fontFamily="PathwayBold"
                      fontSize={16}
                    >
                      Insira as informações do cônjuge
                    </Heading>

                    <FormControl>
                      <FormControl.Label>Nome</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("conjuge.nome")}
                        onBlur={handleBlur("conjuge.nome")}
                        value={values.conjuge.nome}
                      />
                      {touched.conjuge?.nome && errors.conjuge?.nome && (
                        <Text color="red.500">{errors.conjuge.nome}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormControl.Label>Email</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("conjuge.email")}
                        onBlur={handleBlur("conjuge.email")}
                        value={values.conjuge.email}
                      />
                      {touched.conjuge?.email && errors.conjuge?.email && (
                        <Text color="red.500">{errors.conjuge.email}</Text>
                      )}
                    </FormControl>

                    <Text mt={2} fontFamily="PathwayRegular">
                      Enviaremos um e-mail para a pessoa acima se cadastrar no
                      aplicativo e acompanhar o processo junto com você.
                    </Text>

                    <Box alignItems="flex-end" w="100%" mt={10}>
                      <Button
                        onPress={() => handleSubmit()}
                        backgroundColor={colors.yellow}
                        h={52}
                        px={"4"}
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
                        <Text fontSize={16} fontFamily="PathwayBold">
                          Salvar e Proximo
                        </Text>
                      </Button>
                    </Box>
                  </>
                )}
              </Formik>
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
