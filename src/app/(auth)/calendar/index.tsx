import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";

import { ScrollView, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";
import useEvents from "../../../hooks/useEvents";
import Loading from "../../../components/Loading/Loading";
import { User } from "../../../utils/user";
import { useGlobalContext } from "../../../context/context";

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [scriture, setScriture] = useState<any>({});

  const { getEvents, getScriture } = useEvents();
  const { navigation } = useGlobalContext();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      // setIsLoading(true);
      setEvents(await getEvents());
      setScriture(await getScriture());
    } finally {
      setIsLoading(false);
    }
  };

  console.log("=", scriture);
  console.log("=", scriture?.escritura);

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
              Acompanhamento dos eventos
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Acompanhe abaixo as etapas agendadas
            </Text>
            <Box
              backgroundColor={"white"}
              width={"20"}
              mt={6}
              justifyContent={"center"}
              borderTopRadius={"lg"}
              py={"1.5"}
            >
              <Text textAlign={"center"} fontFamily="PathwayBold">
                Você
              </Text>
            </Box>
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <EventItem event={item} />}
                contentContainerStyle={{ paddingBottom: 10 }}
                style={{ maxHeight: 265 }}
              />
            )}
            {!scriture?.escritura && (
              <>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  padding="2px"
                  backgroundColor={colors.greenDark}
                  w="100%"
                  rounded="xl"
                  mt={4}
                >
                  <Box
                    w="15%"
                    h={"90%"}
                    alignItems={"center"}
                    justifyContent={"start"}
                  >
                    <AntDesign
                      name="exclamationcircleo"
                      size={26}
                      color="white"
                      mx="auto"
                    />
                  </Box>
                  <Box
                    backgroundColor="white"
                    w="85%"
                    h="100%"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                    paddingX={2}
                    paddingY={2}
                  >
                    <Text fontFamily="PathwayBold" fontSize={16}>
                      Escritura de divórcio finalizada
                    </Text>
                    <Text mt={2} fontFamily="PathwayRegular" fontSize={14}>
                      Olá, {User.getUser()?.nome}
                    </Text>
                    <Text mt={2} fontFamily="PathwayRegular" fontSize={14}>
                      Sua escritura de divórcio já está pronta! Agradecemos a
                      confiança no divórcioweb para te apoiar nesse novo início
                      de ciclo.
                    </Text>
                    <Text mt={2} fontFamily="PathwayRegular" fontSize={14}>
                      Agora você deverá baixar sua escritura em pdf e averbá-la
                      em cartório.
                    </Text>
                    <Button
                      w={"80%"}
                      h={52}
                      mt={5}
                      mb={4}
                      rounded="2xl"
                      colorScheme={colors.yellow}
                      onPress={() => {
                        navigation("escritura");
                      }}
                    >
                      <Text
                        fontSize={18}
                        fontFamily="PathwayBold"
                        textAlign="center"
                        color="black"
                      >
                        Visualizar escritura
                      </Text>
                    </Button>
                  </Box>
                </HStack>

                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  padding="2px"
                  backgroundColor={colors.greenDark}
                  w="100%"
                  rounded="xl"
                  mt={4}
                >
                  <Box
                    w="15%"
                    h={"90%"}
                    alignItems={"center"}
                    justifyContent={"start"}
                  >
                    <AntDesign
                      name="exclamationcircleo"
                      size={26}
                      color="white"
                      mx="auto"
                    />
                  </Box>
                  <Box
                    backgroundColor="white"
                    w="85%"
                    h="100%"
                    borderTopRightRadius="10px"
                    borderBottomRightRadius="10px"
                    paddingX={2}
                    paddingY={3}
                  >
                    <Text fontFamily="PathwayBold" fontSize={16}>
                      Download da escritura feito
                    </Text>
                    <Text mt={2} fontFamily="PathwayRegular" fontSize={14}>
                      Você já efetuou o download da escritura em 7 dias a contar
                      desta data, seus dados serão excluídos do aplicativo como
                      forma de lei de privacidade.
                    </Text>
                  </Box>
                </HStack>
              </>
            )}
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}

const EventItem = ({ event }: { event: any }) => {
  return (
    <HStack
      backgroundColor={"white"}
      h={20}
      p={4}
      rounded={"lg"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box
        backgroundColor={colors.greenDark}
        h={"full"}
        rounded={"sm"}
        w={"60px"}
        height={"60px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text color={"white"} fontFamily={"PathwayBold"} fontSize={22}>
          {event.formatted.dia}
        </Text>
        <Text color={"white"} fontFamily={"PathwayRegular"}>
          {event.formatted.mes.replace(".", "")}
        </Text>
      </Box>
      <Text fontFamily={"PathwayRegular"} fontSize={16} w={"65%"}>
        {event.titulo}
      </Text>
      <AntDesign name="checkcircleo" size={24} color="black" />
    </HStack>
  );
};
