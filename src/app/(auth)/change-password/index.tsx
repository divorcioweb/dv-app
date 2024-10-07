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

export default function ChangePassword() {
  const [showActual, setShowActual] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const { navigation } = useGlobalContext();

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
              <FormControl>
                <FormControl.Label>Senha atual</FormControl.Label>
                <Input
                  backgroundColor="#fff"
                  h={52}
                  type={showActual ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShowActual(!showActual)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={showActual ? "visibility" : "visibility-off"}
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

              <FormControl>
                <FormControl.Label>Nova senha</FormControl.Label>
                <Input
                  backgroundColor="#fff"
                  h={52}
                  type={showNew ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShowNew(!showNew)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={showNew ? "visibility" : "visibility-off"}
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
              <FormControl>
                <FormControl.Label>Repita a senha novamente</FormControl.Label>
                <Input
                  backgroundColor="#fff"
                  h={52}
                  type={showNew ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShowNew(!showNew)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={showNew ? "visibility" : "visibility-off"}
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
                onPress={() => navigation("user")}
              >
                <Text fontSize={18} fontFamily="PathwayBold">
                  Salvar
                </Text>
              </Button>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
}
