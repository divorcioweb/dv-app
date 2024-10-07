import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  Modal,
  Select,
  Text,
} from "native-base";
import React, { SetStateAction } from "react";
import { types } from "./data";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function UploadFile({
  pickDocument,
  isVisibleModal,
  setIsVisibleModal,
}: {
  pickDocument: any;
  isVisibleModal: boolean;
  setIsVisibleModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedType, setSelectedType] = React.useState("");
  const onTypeChange = (value: string) => {
    setSelectedType(value);
  };

  return (
    <>
      <Modal
        isOpen={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header
            flexDirection={"row"}
            alignItems={"center"}
            borderBottomWidth={0}
          >
            <Feather name="upload" size={24} color="black" />
            <Heading fontFamily="PathwayBold" ml={4} fontSize={24}>
              Upload
            </Heading>
          </Modal.Header>
          <Modal.Body>
            <Text mt={"-20px"} fontFamily="PathwayRegular">
              Classifique abaixo o documento anexado
            </Text>
            <FormControl mt={5}>
              <FormControl.Label>Tipo</FormControl.Label>
              <Select
                h={52}
                selectedValue={selectedType}
                minWidth="200"
                _selectedItem={{
                  bg: colors.greenDarkOpacity,
                  endIcon: <CheckIcon size="4" />,
                }}
                backgroundColor={"white"}
                onValueChange={(itemValue) => onTypeChange(itemValue)}
              >
                {types.map((item) => (
                  <Select.Item
                    shadow={2}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Select>
            </FormControl>

            <TouchableOpacity
              style={{
                backgroundColor: colors.yellow,
                borderRadius: 16,
                marginTop: 20,
              }}
              onPress={() => {
                setSelectedType("");
                setIsVisibleModal(false);
                pickDocument(selectedType);
              }}
            >
              <Text py={4} mx={"auto"} fontFamily="PathwayBold">
                Salvar
              </Text>
            </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
