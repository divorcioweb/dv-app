
export class User {
    static user: {
      id: string;
      idFire: string;
      email: string;
      nome: string;
      foto: string;
      nivel: string;
      cpf: string;
      telefone: string;
      dt_nascimento: string;
      tipo_acesso: string;
    };
  
    static initialize(
      id: string,
      idFire: string,
      email: string,
      nome: string,
      foto: string,
      nivel: string,
      cpf: string,
      telefone: string,
      dt_nascimento: string,
      tipo_acesso: string,
    ) {
      this.user = {
        id: id,
        idFire: idFire,
        email: email,
        nome: nome,
        foto: foto,
        nivel: nivel,
        cpf: cpf,
        telefone: telefone,
        dt_nascimento: dt_nascimento,
        tipo_acesso: tipo_acesso,
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
        idFire: "",
        email: "",
        nome: "",
        foto: "",
        nivel: "",
        cpf: "",
        telefone: "",
        dt_nascimento: "",
        tipo_acesso: "",
      };
    }
  }
  