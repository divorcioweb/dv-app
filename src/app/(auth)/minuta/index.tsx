import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  Checkbox,
} from "native-base";
import { Alert, ScrollView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/context";
import { colors } from "../../../theme/colors";
import { User } from "../../../utils/user";
import Footer from "../../../components/Footer/Footer";
import useEvents from "../../../hooks/useEvents";
import LoadingTransparent from "../../../components/LoadingTransparent/LoadingTransparent";

export default function ProvisionOfServices() {
  const { navigation } = useGlobalContext();
  const scrollViewRef = useRef<any>(null);
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 100;

  const scrollDown = () => {
    if (scrollViewRef.current) {
      const newPosition = scrollPosition + scrollAmount;
      scrollViewRef.current.scrollTo({ y: newPosition, animated: true });
      setScrollPosition(newPosition);
    }
  };

  const scrollUp = () => {
    if (scrollViewRef.current) {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      scrollViewRef.current.scrollTo({ y: newPosition, animated: true });
      setScrollPosition(newPosition);
    }
  };

  const { acceptContractEvent } = useEvents();

  const user = User.getUser();

  useEffect(() => {
    get()
  }, [])

  const get = async () => {

  }

  return (
    <>
      {isLoading && <LoadingTransparent />}
      <ScrollView style={{ backgroundColor: colors.background }}>
        <Center
          w="100%"
          h="100%"
          style={{ backgroundColor: colors.background }}
          pb={"16"}
        >
          <VStack
            backgroundColor={colors.background}
            w="full"
            maxW={350}
            mt={8}
          >
            <Heading fontFamily="PathwayBold" fontSize={32}>
              Minuta de divórcio
            </Heading>
            <Text fontFamily="PathwayRegular" fontSize={16} mt={1} mb={5}>
              Olá, {user?.nome} {"\n"}
              Sua minuta de divórcio está pronta para conferência. Leia todo o
              texto com atenção.
            </Text>

            <VStack w={"100%"} bg={"white"} h={"450px"} rounded={"md"} p={4}>
              <Heading fontFamily="PathwayBold" fontSize={16}>
                Modelo de Divórcio Consensual Extrajudicial
              </Heading>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Text fontFamily="PathwayRegular" fontSize={16} mt={2}>
                  ILUSTRÍSSIMO SENHOR TABELIÃO DO CARTÓRIO ______ DE REGISTRO
                  CIVIL DA COMARCA DE ____ DO ESTADO DE _____ (NOME COMPLETO DO
                  DIVORCIANDO (A), (nacionalidade), (estado civil), (profissão),
                  portador do RG n°..., inscrito no CPF n°..., residente e
                  domiciliado à _____ (endereço completo do autor), e (NOME
                  COMPLETO DO DIVORCIANDO (A), (nacionalidade), (estado civil),
                  (profissão), portador do RG n°..., inscrito no CPF n°...,
                  residente e domiciliado à _____ (endereço completo do autor),
                  ambos representados por seu advogado (NOME COMPLETO DO
                  ADVOGADO), inscrito na OAB n°... (número da OAB), endereço
                  profissional _____ (endereço completo do escritório do
                  advogado), onde recebe notificações e intimações, endereço
                  eletrônico (e-mail do advogado), conforme procuração em anexo,
                  vem perante Vossa Excelência, propor DIVÓRCIO CONSENSUAL
                  EXTRAJUDICIAL Pelos fatos e fundamentos a seguir expostos. DO
                  CASAMENTO O(a) requerente casou-se com o(a) requerido(a) em
                  (data do casamento), sob o **regime de comunhão parcial de
                  bens (se outro, modificar), de modo que durou ____
                  anos(período do casamento). Entretanto a vida conjugal deixou
                  de ser satisfatória para as partes e não obtendo êxito em
                  outros meios possíveis para a manutenção da família, faz-se
                  necessária a dissolução do vínculo conjugal. DOS FILHOS (OU DA
                  INEXISTÊNCIA DE FILHOS) Da relação entre as partes não adveio
                  filhos. OU Da relação entre as partes adveio os filhos
                  __________(nome completo dos filhos), todos maiores de idade e
                  capazes. DOS BENS (OU DA INEXISTÊNCIA DE BENS) O casal não
                  adquiriu patrimônio na constância do relacionamento, de modo
                  que não há partilha de bens a ser feita. OU O casal adquiriu
                  bens na constância do relacionamento, quais sejam: Imóvel
                  (detalhar) no valor de R$...; Automóvel (detalhar) no valor de
                  R$...; Saldo em conta bancária conjunta (detalhar) no valor
                  R$... Assim, resolvem partilhar de tal modo: Ao divorciando(a)
                  _____ (Nome do divorciando) caberá a fração de.../totalidade
                  do bem (detalhar qual bem), no valor de R$...; Ao
                  divorciando(a) ______ (Nome do divorciando) caberá a fração
                  de.../totalidade do bem (detalhar qual bem), no valor de
                  R$...; DA DESNECESSIDADE DE ALIMENTOS As partes renunciam o
                  direito de prestação alimentícia entre si, uma vez que têm
                  possibilidade de proverem o próprio sustento. DA ALTERAÇÃO DO
                  NOME A divorcianda voltará a usar seu nome de solteira, qual
                  seja _____ (escreva o nome de solteira). DO DIVÓRCIO O
                  divórcio consensual está previsto no art. 733, do Código de
                  Processo Civil, in verbis: Art. 733. O divórcio consensual, a
                  separação consensual e a extinção consensual de união estável,
                  não havendo nascituro ou filhos incapazes e observados os
                  requisitos legais, poderão ser realizados por escritura
                  pública, da qual constarão as disposições de que trata o art.
                  731 . 1o A escritura não depende de homologação judicial e
                  constitui título hábil para qualquer ato de registro, bem como
                  para levantamento de importância depositada em instituições
                  financeiras. Deste modo, tendo chegado ao fim a harmonia
                  conjugal e preenchidos os requisitos legais, os divorciandos
                  pleiteiam a dissolução do casamento através do divórcio
                  consensual. DAS DECLARAÇÕES Perante seu advogado assistente e
                  tabelião, as partes declaram que têm plena ciência das
                  consequências do divórcio, nada mais tendo a reclamar um do
                  outro a qualquer tempo. DOS PEDIDOS Diante de todo o exposto,
                  as partes requerem a lavratura da Escritura Pública do
                  Divórcio Extrajudicial, nos termos do art. 733, do Código de
                  Processo Civil, para averbação em seus registros civis. Requer
                  a juntada dos documentos necessários a instrução desta.
                  ________________ (cidade), __ de ___________ de 2022.
                  __________________________________ Assinatura do advogado OAB
                  no ___/ UF
                </Text>
              </ScrollView>
            </VStack>

            <VStack
              space={2}
              mt={"130px"}
              position={"absolute"}
              h={"430px"}
              justifyContent={"space-between"}
              right={2}
              zIndex={"100px"}
            >
              <Entypo
                name="chevron-with-circle-up"
                size={28}
                color="black"
                onPress={scrollUp}
              />
              <Entypo
                onPress={scrollDown}
                name="chevron-with-circle-down"
                size={28}
                color="black"
              />
            </VStack>

            <Checkbox
              value="true"
              color="info.600"
              mt={2}
              onChange={(value) => setConfirm(value)}
            >
              <Text fontFamily="PathwayRegular" fontSize={16}>
                Confirmo que li e estou de acordo {"\n"}com a minuta
              </Text>
            </Checkbox>

            <HStack mb={10} mt={4} justifyContent={"space-between"}>
              <Button
                onPress={() => {
                  Alert.alert(
                    "Para seguir você precisa ler e aceitar a minuta!"
                  );
                }}
                backgroundColor={"white"}
                h={52}
                px={"8"}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
              >
                <AntDesign name="close" size={24} color="black" />
              </Button>
              <Button
                onPress={async () => {
                  if (confirm) {
                    try {
                      setIsLoading(true);
                      await acceptContractEvent({
                        data: new Date().toISOString(),
                        titulo: "Aceite de minuta",
                        status: "Aguardando preferência de agendamento",
                      });
                      navigation("agendamento");
                    } finally {
                      setIsLoading(false);
                    }
                  } else {
                    Alert.alert(
                      "Para seguir você precisa ler e aceitar a minuta!"
                    );
                  }
                }}
                backgroundColor={colors.yellow}
                h={52}
                px={"8"}
                rounded="2xl"
                textDecorationColor="black"
                flexDirection="row"
                endIcon={<AntDesign name="check" size={24} color="black" />}
              >
                <Text fontSize={16} fontFamily="PathwayBold">
                  Aceito
                </Text>
              </Button>
            </HStack>
          </VStack>
        </Center>
      </ScrollView>
      <Footer />
    </>
  );
}
