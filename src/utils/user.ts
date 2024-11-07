// Interface para o corpo de dados
interface Endereco {
  id: string;
  complemento: string | null;
  estado: string | null;
  cidade: string | null;
  pais: string | null;
  cep: string | null;
  criado_em: string;
  atualizado_em: string;
  usuario_id: string;
}

interface Pagamento {
  id: string;
  porcentagem: number;
  total: number;
  valor_pago: number;
  pago: boolean;
  criado_em: string;
  atualizado_em: string;
  usuario_id: string;
}

interface Conjuge {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  naturalidade: string;
  nome_solteiro: boolean;
  nao_possui_filhos_menores: boolean;
  type: number;
  estado_civil: string;
  profissao: string;
  telefone: string;
  senha: string;
  status: string;
  endereco: Endereco;
  criado_em: string;
  atualizado_em: string;
  pagamento: Pagamento;
}

interface UserData {
  id: string;
  nome: string;
  cpf: string | null;
  rg: string | null;
  email: string;
  naturalidade: string | null;
  nome_solteiro: boolean | null;
  nao_possui_filhos_menores: boolean | null;
  type: number;
  estado_civil: string | null;
  profissao: string | null;
  telefone: string | null;
  status: string;
  criado_em: string;
  atualizado_em: string;
  endereco: Endereco;
  pagamento: Pagamento;
  conjuge: Conjuge | null;
}

// Ajustes para a classe User
export class User {
  static user: {
    id: string;
    email: string;
    nome: string;
    profissao: string | null;
    rg: string | null;
    cpf: string | null;
    telefone: string | null;
    naturalidade: string | null;
    nao_possui_filhos_menores: boolean | null;
    nome_solteiro: boolean | null;
    is_admin: boolean | null;
    status: string;
    atualizado_em: string;
    criado_em: string;
    type: number | null;
    usuario_id: string | null;
  };

  static initialize(data: UserData) {
    this.user = {
      id: data.id,
      email: data.email,
      nome: data.nome,
      profissao: data.profissao,
      rg: data.rg,
      cpf: data.cpf,
      telefone: data.telefone,
      naturalidade: data.naturalidade,
      nome_solteiro: data.nome_solteiro,
      nao_possui_filhos_menores: data.nao_possui_filhos_menores,
      is_admin: data.type === 1 ? true : false,
      status: data.status,
      atualizado_em: data.atualizado_em,
      criado_em: data.criado_em,
      type: data.type,
      usuario_id: data.id,
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
      cpf: null,
      rg: null,
      profissao: null,
      naturalidade: null,
      telefone: null,
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
