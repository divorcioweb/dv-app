import React, { useState } from "react";
import { Button, Center, Heading, Text, VStack } from "native-base";
import { colors } from "../../../theme/colors";
import { ScrollView, TouchableOpacity } from "react-native";

export default function ChangePassword() {
  const [selectedPeriod, setSelectedPeriod] = useState("Manha");
  const [selectedDay, setSelectedDay] = useState("Segunda");

  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
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
            <Heading fontFamily="PathwayBold" fontSize={26}>
              Agende a sua conferência
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              Sua conferência será agendada e após a definição da data você
              receberá uma notificação via e-mail e pelo aplicativo e o link de
              acesso ficará disponível em {"\n"}
              <Text fontFamily="PathwayBold">
                "Acompanhamento de Eventos"
              </Text>. {"\n"}
              Fique de olho!
            </Text>

            <VStack flexDirection="row" justifyContent="space-between" mt={5}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedPeriod === "Manha" ? "#FFCC32" : "#283C45",
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  marginRight: 5,
                  alignItems: "center",
                }}
                onPress={() => handleSelectPeriod("Manha")}
              >
                <Text
                  style={{
                    color: selectedPeriod === "Manha" ? "#283C45" : "#FFFFFF",
                    fontFamily: "PathwayBold",
                    fontSize: 16,
                  }}
                >
                  Manhã
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedPeriod === "Tarde" ? "#FFCC32" : "#283C45",
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  marginLeft: 5,
                  alignItems: "center",
                }}
                onPress={() => handleSelectPeriod("Tarde")}
              >
                <Text
                  style={{
                    color: selectedPeriod === "Tarde" ? "#283C45" : "#FFFFFF",
                    fontFamily: "PathwayBold",
                    fontSize: 16,
                  }}
                >
                  Tarde
                </Text>
              </TouchableOpacity>
            </VStack>

            <VStack
              flexDirection="row"
              justifyContent="space-between"
              mt={5}
              flexWrap="wrap"
            >
              {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map(
                (day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectedDay === day ? "#FFCC32" : "#283C45",
                      paddingVertical: 18,
                      paddingHorizontal: 18,
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                    onPress={() => handleSelectDay(day)}
                  >
                    <Text
                      style={{
                        color: selectedDay === day ? "#283C45" : "#FFFFFF",
                        fontFamily: "PathwayBold",
                        fontSize: 16,
                      }}
                    >
                      {day.slice(0, 3).toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </VStack>

            <Button
              w="50%"
              h={52}
              mt={10}
              rounded="2xl"
              mx="auto"
              colorScheme={colors.yellow}
            >
              <Text fontSize={18} fontFamily="PathwayBold">
                Salvar
              </Text>
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
}
