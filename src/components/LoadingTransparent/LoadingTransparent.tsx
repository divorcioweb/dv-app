import { Center } from "native-base";
import { ActivityIndicator } from "react-native";
import { colors } from "../../theme/colors";

export default function LoadingTransparent() {
  return (
    <Center
      position="absolute"
      zIndex="100"
      w="full"
      h="full"
      backgroundColor={'#00000049'}
    >
      <ActivityIndicator  size="large" color={colors.yellow} />
    </Center>
  );
}
