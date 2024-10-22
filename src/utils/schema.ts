import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("Insíra um email válido"),
  senha: yup.string().required("A senha é obrigatória"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("Insíra um email válido"),
  telefone: yup.string().required("O telefone é obrigatório"),
  senha: yup.string().required("A senha é obrigatória"),
});
