export const validationRedirect = (status: string) => {
  if (status === statusUser[1]) {
    return "user";
  } else if (status === statusUser[2]) {
    return "upload";
  } else {
    return "calendar";
  }
};

const statusUser = {
  1: "Aguardando finalizar cadastro",
  2: "Aguardando envio de documentos",
};
