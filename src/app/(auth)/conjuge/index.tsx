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
import { Formik } from "formik";
import { updateConjugeSchema } from "../../../utils/schema";
import useSign from "../../../hooks/useSign";
import { validationRedirect } from "../../../utils/validationRedirect";
import useEvents from "../../../hooks/useEvents";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";

export default function Conjuge() {
  const [service, setService] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [naturalidade, setNaturalidade] = React.useState("");
  const [estado_civil, setEstado_civil] = React.useState("");
  const [nome_solteiro, setNome_solteiro] = React.useState(true);

  const { navigation, setIsLoading, isLoading } = useGlobalContext();
  const { updateConjuge } = useSign();
  const { saveEvent } = useEvents();

  const user = User.getUser();

  const handleRegister = async (values: any) => {
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
      };
      const response = await updateConjuge(body);

      if (response) {
        navigation(
          validationRedirect("Aguardando aceite do contrato de serviços"),
          true
        );
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

  const initialValues = {
    nome: "",
    telefone: "",
    profissao: "",
    rg: "",
    cpf: "",
    endereco: {
      complemento: "",
      estado: "",
      cidade: "",
      cep: "",
    },
  };

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
              <Formik
                initialValues={initialValues}
                validationSchema={updateConjugeSchema}
                onSubmit={handleRegister}
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
                      <FormControl.Label>Telefone</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("telefone")}
                        onBlur={handleBlur("telefone")}
                        value={values.telefone}
                      />
                      {touched.telefone && errors.telefone && (
                        <Text color="red.500">{errors.telefone}</Text>
                      )}
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
                      Endereço
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
                        <Text
                          fontSize={20}
                          fontFamily="PathwayBold"
                          onPress={() => handleSubmit()}
                        >
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
