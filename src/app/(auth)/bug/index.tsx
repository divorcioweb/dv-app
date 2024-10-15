import {
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
  Pressable,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";

import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/context";

import React from "react";

export default function ChangePassword() {
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
              Relatar bug
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Relate qualquer erro ou comportamento inesperado para que possamos
              resolvê-lo rapidamente.
            </Text>

            <VStack
              space={3}
              mt="5"
            >
              <FormControl>
                <FormControl.Label>Descreva o problema</FormControl.Label>
                <TextArea
                  backgroundColor="#fff"
                  h={"160px"}
                  autoCompleteType={"text"}
                />
              </FormControl>

              <Button
                w="50%"
                h={52}
                mt={5}
                rounded="2xl"
                mx="auto"
                colorScheme={colors.yellow}
              >
                <Text fontSize={18} fontFamily="PathwayBold">
                  Enviar
                </Text>
              </Button>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
}
