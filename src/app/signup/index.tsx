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
import { useGlobalContext } from "../../context/context";

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const { navigation } = useGlobalContext();

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
            <FormControl>
              <FormControl.Label>Telefone</FormControl.Label>
              <Input h={52} backgroundColor="#fff" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
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
