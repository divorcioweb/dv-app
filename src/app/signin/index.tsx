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
  Checkbox,
  Image,
  Link,
  Toast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../../components/Loading/Loading";
import { useGlobalContext } from "../../context/context";
import { screens } from "../../mock/screens";
import { Formik } from "formik";
import useSignin from "../../hooks/useSignin";
import { loginSchema } from "../../utils/schema";

export default function SignIn() {
  const [show, setShow] = React.useState(false);
  const { signIn } = useSignin();
  const { isLoading, setIsLoading, navigation } = useGlobalContext();

  const handleSubmit = async (values: { email: string; senha: string }) => {
    try {
      setIsLoading(true);
      const validated = await loginSchema
        .validate(values)
        .then(() => true)
        .catch((err) => {
          Toast.show({
            title: err.message,
            backgroundColor: "red.500",
            rounded: 12,
          });
          return false;
        });
      if (validated) {
        const response = await signIn(values);
        if (response) {
          navigation(screens.user, true);

          // setIsAuth(true);
          // router.navigate("/home");
          // resetForm();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ handleChange, handleSubmit, values }) => (
                <>
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      h={52}
                      backgroundColor="#fff"
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      value={values.senha}
                      onChangeText={handleChange("senha")}
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
                  </FormControl>
                  <Checkbox value="true" color="info.600" mt={2}>
                    <Text fontFamily="PathwayRegular">
                      Salvar login neste dispositivo
                    </Text>
                  </Checkbox>
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
