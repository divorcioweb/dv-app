import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  login: yup.string().required("Requer email"),
  senha: yup.string().required("Requer senha"),
});
