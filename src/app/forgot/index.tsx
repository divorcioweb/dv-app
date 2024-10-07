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
  Image,
} from "native-base";
import { useGlobalContext } from "../../context/context";

export default function SignUp() {
  const { navigation } = useGlobalContext()

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
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input h={52} backgroundColor="#fff" />
            </FormControl>

            <Text fontFamily="PathwayRegular" fontSize={15}>
              Entre com o seu e-mail que enviaremos uma senha temporária para o
              endereço cadastrado.
            </Text>

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
          </VStack>
        </Box>
      </Center>
    </>
  );
}
