import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Heading,
  Input,
  Radio,
  Select,
  Text,
  VStack,
} from "native-base";
import { colors } from "../../../theme/colors";
import React from "react";
import { ScrollView } from "react-native";
import { useGlobalContext } from "../../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import Footer from "../../../components/Footer/Footer";
import { screens } from "../../../mock/screens";
import { parcelas } from "../../../mock/parcelas";
import { Slider } from "@react-native-assets/slider";

export default function User() {
  const [service, setService] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(3);
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
          >
            <Box mt={7}>
              <Heading fontFamily="PathwayBold" fontSize={32}>
                Validação de {"\n"}pagamento
              </Heading>
            </Box>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
              O processo iniciará mediante quitação integral {"\n"}do valor de{" "}
              <Heading fontFamily="PathwayBold" fontSize={16}>
                R$ 4.000,00.
              </Heading>
            </Text>

            <HStack
              mt={7}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading
                fontFamily="PathwayBold"
                fontSize={18}
                textTransform={"uppercase"}
              >
                O pagamento será dividido {"\n"}entre as partes?
              </Heading>
            </HStack>
            <HStack mt={2}>
              <FormControl w={"25%"}>
                <Radio.Group defaultValue="sim" name="myRadioGroup" space={2}>
                  <Radio value="sim" my={1}>
                    Sim
                  </Radio>
                  <Radio value="nao" my={1}>
                    Não
                  </Radio>
                </Radio.Group>
              </FormControl>

              <Box w={"75%"} justifyContent={"space-between"}>
                <Text fontFamily="PathwayRegular" fontSize={18}>
                  Quanto você pagará?
                </Text>
                <HStack justifyContent={"space-between"} mb={"-8px"}>
                  <Text fontFamily="PathwayBold">10%</Text>
                  <Text fontFamily="PathwayBold">50%</Text>
                  <Text fontFamily="PathwayBold">100%</Text>
                </HStack>
                <Slider
                  minimumValue={1}
                  maximumValue={3}
                  value={selectedValue}
                  onValueChange={(value) => setSelectedValue(value)}
                  step={1}
                  maximumTrackTintColor="#ffff"
                  thumbTintColor="#283C45"
                  thumbSize={20}
                  trackStyle={{
                    height: 8,
                    borderRadius: 10,
                  }}
                />
              </Box>
            </HStack>

            <VStack mt={4} space={2}>
              <FormControl>
                <FormControl.Label>Parcelamento</FormControl.Label>
                <Select
                  h={52}
                  selectedValue={service}
                  minWidth="200"
                  _selectedItem={{
                    bg: colors.greenDarkOpacity,
                    endIcon: <CheckIcon size="4" />,
                  }}
                  backgroundColor={"white"}
                  onValueChange={(itemValue) => setService(itemValue)}
                >
                  {parcelas.map((item) => (
                    <Select.Item
                      shadow={2}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Numero do cartão</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <FormControl>
                <FormControl.Label>Nome impresso no cartão</FormControl.Label>
                <Input h={52} backgroundColor="#fff" />
              </FormControl>

              <HStack justifyContent={"space-between"}>
                <FormControl w={"48%"}>
                  <FormControl.Label>Data</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>
                <FormControl w={"48%"}>
                  <FormControl.Label>CVV</FormControl.Label>
                  <Input h={52} backgroundColor="#fff" />
                </FormControl>
              </HStack>

              <Box alignItems="flex-end" w="100%" mt={10}>
                <Button
                  onPress={() => navigation(screens.upload)}
                  backgroundColor={colors.yellow}
                  h={52}
                  px={"4"}
                  rounded="2xl"
                  textDecorationColor="black"
                  flexDirection="row"
                  endIcon={
                    <MaterialIcons
                      name="navigate-next"
                      size={24}
                      color="black"
                    />
                  }
                >
                  <Text fontSize={16} fontFamily="PathwayBold">
                    Salvar e Proximo
                  </Text>
                </Button>
              </Box>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
