export const validationRedirect = (status: string, type?: number) => {
  if (status === statusUser[1]) {
    if (type === 1) {
      return "user";
    } else {
      return "conjuge";
    }
  } else if (status === statusUser[2]) {
    return "provision-of-services";
  } else if (status === statusUser[3]) {
    return "payment";
  } else if (status === statusUser[4]) {
    return "upload";
  } else if (status === statusUser[5]) {
    return "certificate";
  } else if (status === statusUser[6]) {
    return "minuta";
  } else {
    return "calendar";
  }
};

const statusUser = {
  1: "Aguardando finalizar cadastro",
  2: "Aguardando aceite do contrato de serviços",
  3: "Aguardando confirmação de pagamento",
  4: "Aguardando envio de documentos",
  5: "Aguardando renuncio de alimentos",
  6: "Aguardando aceite da minuta",
  7: "Aguardando agendamento de audiencia",
};
