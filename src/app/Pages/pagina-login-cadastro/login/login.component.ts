import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Guard/auth.service';
import { ContaServiceService } from '../../../Service/servico-login/conta-service.service';
import { ToastService, ToastType } from '../../../Service/Toast/toast.service';
import { formularioDeLoginModel } from '../../../Models/FormulariosEntrada.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() alterarLogin = new EventEmitter<boolean>;
  @Input() loginForm!: formularioDeLoginModel;
  mostrarSenha: boolean = false;
  formularioDeLogin!: FormGroup;

  ngOnInit() {
      this.inicializarFormulario();
    }
  
    constructor(private http: ContaServiceService, private authService: AuthService, private router: Router, public toastService: ToastService) {
  
    }
    
    private inicializarFormulario() {
      this.formularioDeLogin = new FormGroup({
        email: new FormControl(this.loginForm?.email || '', [Validators.required, Validators.email]),
        senha: new FormControl(this.loginForm?.senha || '', [Validators.required, Validators.minLength(8)]),
      });
    }

    alterarModoSenha(){
      let inputSenha: HTMLElement = document.getElementById('passowrd') as HTMLElement;
      this.mostrarSenha = !this.mostrarSenha;
      if (this.mostrarSenha) {
        inputSenha.setAttribute('type', 'password');
      }else{
        inputSenha.setAttribute('type', 'text');
      }
    }

    efetuarLogin() {
      if (this.formularioDeLogin.valid) {
        console.log(this.formularioDeLogin.value);
        this.http.logarUsusario(this.formularioDeLogin.value.email, this.formularioDeLogin.value.senha).subscribe({
          next: (response: any) => {
            this.toastService.add({ tituloMenssagem: "Sucesso!", menssagem: "Sucesso ao logar em sua conta...", icone: "user", tipo: ToastType.SUCCESS, tempo: 2000 });
            localStorage.setItem('token', response.token);
            this.authService.login();
            this.router.navigate(['']);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this.toastService.add({ tituloMenssagem: "Erro!", menssagem: "Erro ao logar em sua conta...", icone: "user", tipo: ToastType.ERROR, tempo: 2000 });
          },
        });
      }
    }
}
