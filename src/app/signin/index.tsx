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
  Pressable,
  Icon,
  Image,
  Link,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/context";
import { Formik } from "formik";
import { loginSchema } from "../../utils/schema";
import { validationRedirect } from "../../utils/validationRedirect";

import Loading from "../../components/Loading/Loading";
import useSign from "../../hooks/useSign";
import Toast from "react-native-toast-message";

export default function SignIn() {
  const [show, setShow] = useState(false);
  const { signIn } = useSign();
  const { isLoading, setIsLoading, navigation, setIsAuth } = useGlobalContext();

  return (
    <>
      {isLoading && <Loading />}
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
            <Formik
              initialValues={{ email: "", senha: "" }}
              validationSchema={loginSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setIsLoading(true);

                  const response = await signIn(values);

                  if (response) {
                    navigation(
                      validationRedirect(response.status, response.type),
                      true
                    );
                    setIsAuth(true);
                    Toast.show({
                      text1: "Login feito com sucesso!",
                    });
                    resetForm();
                  }
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                handleBlur,
              }) => (
                <>
                  <FormControl>
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
                  <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input
                      value={values.senha}
                      onChangeText={handleChange("senha")}
                      onBlur={handleBlur("senha")}
                      backgroundColor="#fff"
                      h={52}
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
                  {/* <Checkbox value="true" color="info.600" mt={2}>
                    <Text fontFamily="PathwayRegular">
                      Salvar login neste dispositivo
                    </Text>
                  </Checkbox> */}
                  <Button
                    w="80%"
                    h={52}
                    mt={5}
                    rounded="2xl"
                    mx="auto"
                    colorScheme={colors.yellow}
                    onPress={() => handleSubmit()}
                  >
                    <Text fontFamily="PathwayBold">Entrar</Text>
                  </Button>

                  <Button
                    w="80%"
                    h={52}
                    mt={2}
                    rounded="2xl"
                    mx="auto"
                    backgroundColor="white"
                    borderWidth={1}
                    onPress={() => navigation("signup")}
                  >
                    <Text fontFamily="PathwayBold">Quero me Cadastrar</Text>
                  </Button>

                  <Link
                    _text={{
                      fontWeight: "600",
                      fontFamily: "PathwayBold",
                      color: "black",
                      textDecorationLine: "none",
                    }}
                    alignSelf="flex-end"
                    mt="1"
                    w="80%"
                    mx="auto"
                    justifyContent="center"
                    py={3}
                    onPress={() => navigation("forgot")}
                  >
                    Esqueci minha senha
                  </Link>
                </>
              )}
            </Formik>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
