export class formularioDeLoginModel {
    email: string;
    senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    }
}

export class formularioDeCadastroModel {
    nomeCompleto: string;
    email: string;
    senha: string;
    senhaRepetida: string;

    constructor(email: string, senha: string, nomeCompleto: string, senhaRepetida: string) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.senhaRepetida = senhaRepetida
    }
}