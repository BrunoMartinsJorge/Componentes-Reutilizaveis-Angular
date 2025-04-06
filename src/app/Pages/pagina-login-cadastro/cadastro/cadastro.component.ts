import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Guard/auth.service';
import { formularioDeCadastroModel, formularioDeLoginModel } from '../../../Models/FormulariosEntrada.model';
import { ContaServiceService } from '../../../Service/servico-login/conta-service.service';
import { ToastService, ToastType } from '../../../Service/Toast/toast.service';
import { CommonModule } from '@angular/common';
import { StepsInterface, StepsPersonalizadoComponent } from '../../../shared/steps-personalizado/steps-personalizado.component';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, StepsPersonalizadoComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() alterarLogin = new EventEmitter<boolean>;
  @Input() loginForm!: formularioDeCadastroModel;
  formularioDeCadastro!: FormGroup;
  mostrarSenha: boolean = false;

  steps: StepsInterface[] = [{ label: "Informações", routerLink: "teste", ativo: false }, { label: "Complemento", routerLink: "teste", ativo: false }, { label: "Localização", routerLink: "teste", ativo: false }];

  ngOnInit() {
    this.inicializarFormulario();
  }

  constructor(private http: ContaServiceService, private authService: AuthService, private router: Router, public toastService: ToastService) {

  }

  private inicializarFormulario() {
    this.formularioDeCadastro = new FormGroup({
      email: new FormControl(this.loginForm?.email || '', [Validators.required]),
      senha: new FormControl(this.loginForm?.senha || '', [Validators.required, Validators.minLength(8)]),
      senhaRepetida: new FormControl(this.loginForm?.senhaRepetida || '', [Validators.required, Validators.minLength(8)]),
    });
  }

  alterarModoSenha() {
    let inputSenha: HTMLElement = document.getElementById('passowrd') as HTMLElement;
    this.mostrarSenha = !this.mostrarSenha;
    if (this.mostrarSenha) {
      inputSenha.setAttribute('type', 'password');
    } else {
      inputSenha.setAttribute('type', 'text');
    }
  }

  efetuarCadastro() {
    if (this.formularioDeCadastro.valid) {
      console.log(this.formularioDeCadastro.value);
      this.http.cadastrarUsusario(this.formularioDeCadastro.value.email, this.formularioDeCadastro.value.senha).subscribe({
        next: (response: any) => {
          this.toastService.add({ tituloMenssagem: "Sucesso!", menssagem: "Sucesso ao cadastrar sua conta...", icone: "user", tipo: ToastType.SUCCESS, tempo: 2000 });
          localStorage.setItem('token', response.token);
          this.authService.login();
          this.router.navigate(['']);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.toastService.add({ tituloMenssagem: "Erro!", menssagem: "Erro ao cadastrar sua conta...", icone: "user", tipo: ToastType.ERROR, tempo: 2000 });
        },
      });
    }
  }
}