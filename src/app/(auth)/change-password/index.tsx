import {
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";

import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/context";
import { router } from "expo-router";
import useForgot from "../../../hooks/useForgot";
import { Formik, FormikHelpers } from "formik";
import { changePassSchema } from "../../../utils/schema";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";

export default function ChangePassword() {
  const [showActual, setShowActual] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const { navigation, setIsLoading, isLoading } = useGlobalContext();

  const { changePass } = useForgot();

  const handleUpdatePass = async (
    {
      senha_atual,
      nova_senha,
      confirma_nova_senha,
    }: {
      senha_atual: string;
      nova_senha: string;
      confirma_nova_senha: string;
    },
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsLoading(true);
      const result = await changePass({ nova_senha, senha_atual });

      if (result) {
        resetForm();
        navigation("setting", true);
      }
    } finally {
      setIsLoading(false);
    }
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
            mt={20}
          >
            <Heading fontFamily="PathwayBold" fontSize={32}>
              Trocar senha
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Para sua segurança, você precisa digitar a senha atual para poder
              resetá-lá.
            </Text>

            <VStack space={3} mt="5">
              <Formik
                initialValues={{
                  senha_atual: "",
                  nova_senha: "",
                  confirma_nova_senha: "",
                }}
                validationSchema={changePassSchema}
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
                      isInvalid={!!(errors.senha_atual && touched.senha_atual)}
                    >
                      <FormControl.Label>Senha atual</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("senha_atual")}
                        onBlur={handleBlur("senha_atual")}
                        value={values.senha_atual}
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
                      {errors.nova_senha && touched.nova_senha && (
                        <Text color="red.500">{errors.nova_senha}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={!!(errors.nova_senha && touched.nova_senha)}
                    >
                      <FormControl.Label>Nova senha</FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("nova_senha")}
                        onBlur={handleBlur("nova_senha")}
                        value={values.nova_senha}
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
                      {errors.nova_senha && touched.nova_senha && (
                        <Text color="red.500">{errors.nova_senha}</Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!(
                          errors.confirma_nova_senha &&
                          touched.confirma_nova_senha
                        )
                      }
                    >
                      <FormControl.Label>
                        Repita a senha novamente
                      </FormControl.Label>
                      <Input
                        h={52}
                        backgroundColor="#fff"
                        onChangeText={handleChange("confirma_nova_senha")}
                        onBlur={handleBlur("confirma_nova_senha")}
                        value={values.confirma_nova_senha}
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
                      {errors.nova_senha && touched.nova_senha && (
                        <Text color="red.500">{errors.nova_senha}</Text>
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

                    <Button
                      w="80%"
                      h={52}
                      mt={2}
                      rounded="2xl"
                      mx="auto"
                      backgroundColor="white"
                      borderWidth={1}
                      onPress={() => router.navigate("/setting")}
                    >
                      <Text fontFamily="PathwayBold">Voltar</Text>
                    </Button>
                  </>
                )}
              </Formik>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
}
