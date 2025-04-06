import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaServiceService {
  private URL_PADRAO: string = 'http://localhost:8080/conta';
  constructor(private http: HttpClient) { }

  public cadastrarUsusario(email: string, senha: string) {
    const formulario: any = {
      email: email,
      nome: "Teste",
      senha: senha
    }

    return this.http.post(`${this.URL_PADRAO}/cadastrar-conta`, formulario);
  }

  public logarUsusario(email: string, senha: string) {
    const dadosConta: any = {
      email: email,
      senha: senha
    }
    return this.http.get(`${this.URL_PADRAO}/logar-conta`, { params: dadosConta });
  }

  public buscarDados(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("Token não encontrado!");
      return of(null);
    }

    return this.http.get(`${this.URL_PADRAO}/buscar-dados`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

}
