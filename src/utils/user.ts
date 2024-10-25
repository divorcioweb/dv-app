export class User {
  static user: {
    id: string;
    email: string;
    nome: string;
    profissao: string;
    rg: string;
    cpf: string;
    telefone: string;
    naturalidade: string;
    nao_possui_filhos_menores: boolean | null;
    nome_solteiro: boolean | null;
    is_admin: boolean | null;
    status: string;
    atualizado_em: string;
    criado_em: string;
    type: number | null;
    usuario_id: string | null;
  };

  static initialize(
    id: string,
    email: string,
    nome: string,
    profissao: string,
    rg: string,
    cpf: string,
    telefone: string,
    naturalidade: string,
    nao_possui_filhos_menores: boolean | null,
    nome_solteiro: boolean | null,
    is_admin: boolean | null,
    status: string,
    atualizado_em: string,
    criado_em: string,
    type: number | null,
    usuario_id: string | null
  ) {
    this.user = {
      id: id,
      email: email,
      nome: nome,
      cpf: cpf,
      rg: rg,
      profissao: profissao,
      naturalidade: naturalidade,
      telefone: telefone,
      nome_solteiro: nome_solteiro,
      nao_possui_filhos_menores: nao_possui_filhos_menores,
      is_admin: is_admin,
      status: status,
      atualizado_em: atualizado_em,
      criado_em: criado_em,
      type: type,
      usuario_id: usuario_id,
    };
  }

  static getUser() {
    return this.user;
  }

  static setUser(user: any) {
    this.user = {
      ...user,
    };
  }

  static clearUser() {
    this.user = {
      id: "",
      email: "",
      nome: "",
      cpf: "",
      rg: "",
      profissao: "",
      naturalidade: "",
      telefone: "",
      nome_solteiro: null,
      nao_possui_filhos_menores: null,
      is_admin: null,
      status: "",
      atualizado_em: "",
      criado_em: "",
      type: null,
      usuario_id: "",
    };
  }
}

const body = {
  atualizado_em: "2024-10-18T17:09:15.643Z",
  cpf: null,
  criado_em: "2024-10-18T17:09:15.643Z",
  email: "gui@gmail.com",
  estado_civil: null,
  id: "839487c7-5fc8-4345-b4df-94e60161e26b",
  is_admin: false,
  nao_possui_filhos_menores: null,
  naturalidade: null,
  nome: null,
  nome_solteiro: null,
  profissao: null,
  rg: null,
  status: "Aguardando finalizar cadastro",
  telefone: "77999577372",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzOTQ4N2M3LTVmYzgtNDM0NS1iNGRmLTk0ZTYwMTYxZTI2YiIsImlhdCI6MTcyOTgwNDYxNywiZXhwIjoxNzI5ODkxMDE3fQ.nFb71Mt9jggH-KLOqnyIG9PB7PnegNSNW7haHaWYpZY",
  type: 1,
  usuario_id: null,
};
