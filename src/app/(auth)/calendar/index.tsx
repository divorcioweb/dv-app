import { Box, Center, HStack, Heading, Text, VStack } from "native-base";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";

import { ScrollView, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";
import useEvents from "../../../hooks/useEvents";

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([]);

  const { getEvents } = useEvents();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setEvents(await getEvents());
  };

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

            {/* FlatList para exibir os eventos */}
            <FlatList
              data={events}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <EventItem event={item} />}
            />
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}

const EventItem = ({ event }: { event: any }) => {
  console.log(event);

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
