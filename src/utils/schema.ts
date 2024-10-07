import * as yup from "yup";

export const loginSchema = yup.object().shape({
  senha: yup.string().required("A senha é obrigatória"),
  email: yup.string().required("O e-mail é obrigatório"),
});
