import { AntDesign } from "@expo/vector-icons";
import { Button, Center, HStack } from "native-base";
import { colors } from "../../theme/colors";
import { useGlobalContext } from "../../context/context";
import { screens } from "../../mock/screens";

export default function Footer() {
  const size = 30;
  const { selected, navigation } = useGlobalContext();

  return (
    <>
      <Center w={"full"} position={"absolute"} bottom={6}>
        <HStack
          width={"90%"}
          h={60}
          mx={"auto"}
          rounded={"3xl"}
          backgroundColor={colors.greenDark}
          justifyContent={"center"}
          space={1}
        >
          <Button
            w={"1/6"}
            h={"full"}
            onPress={() => navigation(screens.calendar, true)}
            alignItems={"center"}
            justifyContent={"center"}
            opacity={selected === "calendar" ? 1 : 50}
            backgroundColor={
              selected === "calendar"
                ? colors.greenDarkOpacity
                : colors.greenDark
            }
          >
            <AntDesign name="calendar" size={size} color="#ffffff" />
          </Button>
          <Button
            w={"1/6"}
            h={"full"}
            onPress={() => navigation(screens.upload, true)}
            alignItems={"center"}
            justifyContent={"center"}
            opacity={selected === "upload" ? 1 : 50}
            backgroundColor={
              selected === "upload" ? colors.greenDarkOpacity : colors.greenDark
            }
          >
            <AntDesign name="upload" size={size} color="#ffffff" />
          </Button>
          <Button
            w={"1/6"}
            h={"full"}
            onPress={() => navigation(screens.payment, true)}
            alignItems={"center"}
            justifyContent={"center"}
            opacity={selected === "payment" ? 1 : 50}
            backgroundColor={
              selected === "payment"
                ? colors.greenDarkOpacity
                : colors.greenDark
            }
          >
            <AntDesign name="creditcard" size={size} color="#ffffff" />
          </Button>
          <Button
            onPress={() => navigation(screens.user, true)}
            w={"1/6"}
            h={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            opacity={selected === "user" ? 1 : 50}
            backgroundColor={
              selected === "user" ? colors.greenDarkOpacity : colors.greenDark
            }
          >
            <AntDesign name="user" size={size} color="#ffffff" />
          </Button>
          <Button
            onPress={() => navigation(screens.setting, true)}
            w={"1/6"}
            h={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            opacity={selected === "setting" ? 1 : 50}
            backgroundColor={
              selected === "setting"
                ? colors.greenDarkOpacity
                : colors.greenDark
            }
          >
            <AntDesign name="setting" size={size} color="#ffffff" />
          </Button>
        </HStack>
      </Center>
    </>
  );
}
