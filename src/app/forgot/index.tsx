import React, { useState } from "react";
import { colors } from "../../theme/colors";
import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  Image,
  Pressable,
  Icon,
} from "native-base";
import { useGlobalContext } from "../../context/context";
import useForgot from "../../hooks/useForgot";
import { Formik, FormikHelpers } from "formik";
import { sendCodeSchema, updatePassSchema } from "../../utils/schema";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingTransparent from "../../components/LoadingTransparent/LoadingTransparent";

export default function SignUp() {
  const { navigation, setIsLoading, isLoading } = useGlobalContext();
  const { sendCode, updatePass } = useForgot();

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState(false);

  const handleSend = async (
    { email }: { email: string },
    { resetForm }: FormikHelpers<{ email: string }>
  ) => {
    try {
      setIsLoading(true);
      const response = await sendCode({ email });

      if (response) {
        setEmail(email);
        setStep(2);
        resetForm();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePass = async (
    {
      codigo,
      confirma_senha,
      senha,
    }: {
      codigo: string;
      senha: string;
      confirma_senha: string;
    },
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsLoading(true);
      const result = await updatePass({ codigo, email, senha });

      if (result) {
        resetForm();
        setEmail("");
        navigation("signin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingTransparent />}
      <Center
        w="100%"
        h="100%"
        justifyContent="start"
        style={{ backgroundColor: colors.background }}
      >
        <Box p="2" py="8" mt="20" w="100%" maxW="350">
          <Center>
            <Image source={require("../../assets/logo.png")} />
          </Center>

          <VStack space={3} mt="5">
            {step === 1 && (
              <Formik
                initialValues={{ email: "" }}
                validationSchema={sendCodeSchema}
                onSubmit={handleSend}
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
                    <FormControl isInvalid={!!(errors.email && touched.email)}>
                      <FormControl.Label>Email</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      {errors.email && touched.email && (
                        <Text color="red.500">{errors.email}</Text>
                      )}
                    </FormControl>

                    <Text fontFamily="PathwayRegular" fontSize={15}>
                      Entre com o seu e-mail que enviaremos uma senha temporária
                      para o endereço cadastrado.
                    </Text>

                    <Button
                      w="80%"
                      h={52}
                      mt={5}
                      rounded="2xl"
                      mx="auto"
                      colorScheme={colors.yellow}
                      onPress={() => handleSubmit()}
                    >
                      <Text fontSize={18} fontFamily="PathwayBold">
                        Enviar
                      </Text>
                    </Button>
                  </>
                )}
              </Formik>
            )}

            {step === 2 && (
              <Formik
                initialValues={{ codigo: "", senha: "", confirma_senha: "" }}
                validationSchema={updatePassSchema}
                onSubmit={handleUpdatePass}
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
                    <FormControl
                      isInvalid={!!(errors.codigo && touched.codigo)}
                    >
                      <FormControl.Label>Código</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("codigo")}
                        onBlur={handleBlur("codigo")}
                        value={values.codigo}
                        maxLength={4}
                        keyboardType="numeric"
                      />
                      {errors.codigo && touched.codigo && (
                        <Text color="red.500">{errors.codigo}</Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!(errors.senha && touched.senha)}>
                      <FormControl.Label>Nova senha</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("senha")}
                        onBlur={handleBlur("senha")}
                        value={values.senha}
                        type={show ? "text" : "password"}
                        InputRightElement={
                          <Pressable onPress={() => setShow(!show)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={show ? "visibility" : "visibility-off"}
                                />
                              }
                              size={5}
                              mr="2"
                              color="muted.400"
                            />
                          </Pressable>
                        }
                      />
                      {errors.senha && touched.senha && (
                        <Text color="red.500">{errors.senha}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!(errors.confirma_senha && touched.confirma_senha)
                      }
                    >
                      <FormControl.Label>
                        Confirme a nova senha
                      </FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("confirma_senha")}
                        onBlur={handleBlur("confirma_senha")}
                        value={values.confirma_senha}
                        type={show ? "text" : "password"}
                        InputRightElement={
                          <Pressable onPress={() => setShow(!show)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={show ? "visibility" : "visibility-off"}
                                />
                              }
                              size={5}
                              mr="2"
                              color="muted.400"
                            />
                          </Pressable>
                        }
                      />
                      {errors.confirma_senha && touched.confirma_senha && (
                        <Text color="red.500">{errors.confirma_senha}</Text>
                      )}
                    </FormControl>

                    <Button
                      w="80%"
                      h={52}
                      mt={5}
                      rounded="2xl"
                      mx="auto"
                      colorScheme={colors.yellow}
                      onPress={() => handleSubmit()}
                    >
                      <Text fontSize={18} fontFamily="PathwayBold">
                        Salvar
                      </Text>
                    </Button>
                  </>
                )}
              </Formik>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
}
