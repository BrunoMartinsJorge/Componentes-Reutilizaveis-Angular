import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CarregamentoComponent } from '../../shared/carregamento/carregamento.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-pagina-login-cadastro',
  imports: [CommonModule, LoginComponent, CadastroComponent, CarregamentoComponent, DialogComponent],
  templateUrl: './pagina-login-cadastro.component.html',
  styleUrl: './pagina-login-cadastro.component.css'
})
export class PaginaLoginCadastroComponent {
  isLogin: boolean = true;
  carregando: boolean = false;

  banner: any = window.document.getElementsByClassName(".banner-empresa");
  formulario: any = window.document.getElementsByClassName(".formulario");

  alterarFormulario(): void {
    this.isLogin = !this.isLogin;
    this.carregando = !this.carregando
    setTimeout(() => {
      this.carregando = false;
    }, 1200)
  }
}
