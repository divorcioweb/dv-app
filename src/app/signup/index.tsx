import React from "react";
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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useGlobalContext } from "../../context/context";
import { registerSchema } from "../../utils/schema";
import { router } from "expo-router";
import useSign from "../../hooks/useSign";
import { ScrollView } from "react-native";

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const { setIsLoading } = useGlobalContext();

  const { registerInit } = useSign();

  return (
    <>
      <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
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

            <Formik
              initialValues={{ email: "", telefone: "", senha: "" }}
              validationSchema={registerSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setIsLoading(true);

                  const response = await registerInit(values);

                  if (response) {
                    router.navigate("/signin");
                    resetForm();
                  }
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      h={52}
                      backgroundColor="#fff"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text color="red.500">{errors.email}</Text>
                    )}
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
                    {errors.telefone && touched.telefone && (
                      <Text color="red.500">{errors.telefone}</Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input
                      backgroundColor="#fff"
                      h={52}
                      type={show ? "text" : "password"}
                      onChangeText={handleChange("senha")}
                      onBlur={handleBlur("senha")}
                      value={values.senha}
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
                      Cadastrar-se
                    </Text>
                  </Button>
                </VStack>
              )}
            </Formik>
          </Box>
        </Center>
      </ScrollView>
    </>
  );
}
