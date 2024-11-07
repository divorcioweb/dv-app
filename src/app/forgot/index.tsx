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
} from "native-base";
import { useGlobalContext } from "../../context/context";
import useForgot from "../../hooks/useForgot";
import { Formik } from "formik";
import { sendCodeSchema } from "../../utils/schema";

export default function SignUp() {
  const { navigation } = useGlobalContext();
  const { sendCode } = useForgot();

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const handleSend = async (data: any) => {
    console.log(data);
  };

  console.log("email", email);

  return (
    <>
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
              <>
                <FormControl>
                  <FormControl.Label>Código</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Nova senha</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>

                <FormControl>
                  <FormControl.Label>Confirme a nova senha</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>

                <Button
                  w="80%"
                  h={52}
                  mt={5}
                  rounded="2xl"
                  mx="auto"
                  colorScheme={colors.yellow}
                  onPress={() => navigation("home")}
                >
                  <Text fontSize={18} fontFamily="PathwayBold">
                    Salvar
                  </Text>
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
}
