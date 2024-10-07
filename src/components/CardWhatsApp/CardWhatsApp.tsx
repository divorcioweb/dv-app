import { Box, HStack, Text, VStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { redirectWhatsApp } from "../../utils/redirects";

export default function CardWhatsApp() {
  return (
    <>
      <TouchableOpacity
        style={{ marginVertical: 20 }}
        onPress={() => redirectWhatsApp()}
      >
        <VStack
          justifyContent=""
          padding="2px"
          backgroundColor="white"
          borderWidth={2}
          w="100%"
          h={130}
          rounded="xl"
          borderColor="gray.300"
        >
          <Box w="full" h="50%" justifyContent="center" paddingX={2}>
            <Text textAlign="center" fontFamily="PathwayRegular" fontSize={14}>
              Precisa de algum suporte? Entre em contato com nossos advogados.
            </Text>
          </Box>
          <HStack
            w="100%"
            alignItems="center"
            justifyContent={"center"}
            space={2}
          >
            <FontAwesome name="whatsapp" size={36} color="black" />
            <Text fontFamily="PathwayBold" fontSize={26}>
              21 98757-8661
            </Text>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </>
  );
}
