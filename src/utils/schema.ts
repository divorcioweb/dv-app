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

export const userSchemaUpdate = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  profissao: yup.string().required("A profissão é obrigatória"),
  rg: yup.string().required("O RG é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  endereco: yup.object().shape({
    complemento: yup.string().required("O endereço é obrigatório"),
    estado: yup.string().required("O estado é obrigatório"),
    cidade: yup.string().required("A cidade é obrigatória"),
    cep: yup.string().required("O CEP é obrigatório"),
  }),
  conjuge: yup.object().shape({
    nome: yup.string().required("O nome do cônjuge é obrigatório"),
    email: yup
      .string()
      .required("O email do cônjuge é obrigatório")
      .email("O email do cônjuge deve ser válido"),
  }),
});
