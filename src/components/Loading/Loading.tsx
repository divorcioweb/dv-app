import { Center } from "native-base";
import { ActivityIndicator } from "react-native";
import { colors } from "../../theme/colors";

export default function Loading() {
  return (
    <Center
      position="absolute"
      zIndex="100"
      w="full"
      h="full"
      backgroundColor={colors.background}
    >
      <ActivityIndicator  size="large" color={colors.yellow} />
    </Center>
  );
}
