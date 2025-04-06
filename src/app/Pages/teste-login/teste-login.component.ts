import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { formularioDeCadastroModel, formularioDeLoginModel } from '../../Models/FormulariosEntrada.model';
import { ContaServiceService } from '../../Service/servico-login/conta-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../Guard/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from '../../Service/Toast/toast.service';

@Component({
  selector: 'app-teste-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teste-login.component.html',
  styleUrl: './teste-login.component.css'
})
export class TesteLoginComponent implements OnInit, OnChanges {
  @Input() loginForm!: formularioDeLoginModel;
  @Input() cadastroForm!: formularioDeCadastroModel;
  formularioDeCadastro!: FormGroup;
  formularioDeLogin!: FormGroup;

  logar: boolean = false;

  alterarSecao() {
    this.logar = !this.logar;
  }

  mostrarSenha: boolean = false;

  alterarModoSenha() {
    this.mostrarSenha = !this.mostrarSenha

    if (this.logar) {
      let inputSenha: HTMLElement = document.getElementById('senha-login') as HTMLElement;
      if (this.mostrarSenha) {
        inputSenha.setAttribute('type', 'text');
      }else{
        inputSenha.setAttribute('type', 'password');
      }
    } else if (!this.logar) {
      let inputSenha: HTMLElement = document.getElementById('senha-cadastro') as HTMLElement;
      if (this.mostrarSenha) {
        inputSenha.setAttribute('type', 'text');
      }else{
        inputSenha.setAttribute('type', 'password');
      }
    }
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  constructor(private http: ContaServiceService, private authService: AuthService, private router: Router, public toastService: ToastService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['loginForm'] && !changes['loginForm'].firstChange) || (changes['cadastroForm'] && !changes['cadastroForm'].firstChange)) {
      this.inicializarFormulario();
    }
  }

  private inicializarFormulario() {
    this.formularioDeCadastro = new FormGroup({
      nomeCompleto: new FormControl(this.cadastroForm?.nomeCompleto || '', [Validators.required]),
      email: new FormControl(this.cadastroForm?.email || '', [Validators.required]),
      senha: new FormControl(this.cadastroForm?.senha || '', [Validators.required]),
    });
    this.formularioDeLogin = new FormGroup({
      email: new FormControl(this.loginForm?.email || '', [Validators.required]),
      senha: new FormControl(this.loginForm?.senha || '', [Validators.required]),
    });
  }

  // validarSenha(): ValidatorFn{
    // return (control: AbstractControl) : ValidationErrors | null => {

    //   const senha = control.get('senha')?.value;
    //   // const confirmarSenha = control.get('confirmarSenha')?.value;

    //   // if(senha !== this.formularioDeCadastro.value.senha){
    //   //  return null; 
    //   // }

    //   const validar = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(senha);
    // }
  // }

  efetuarCadastro() {
    if (this.formularioDeCadastro.valid) {
      console.log(this.formularioDeCadastro.value);
      this.http.cadastrarUsusario(this.formularioDeCadastro.value.email, this.formularioDeCadastro.value.senha).subscribe({
        next: (response: any) => {
          this.toastService.add({ tituloMenssagem: "Sucesso!", menssagem: "Sucesso ao cadastrar sua conta...", icone: "user", tipo: ToastType.SUCCESS, tempo: 2000 });
          localStorage.setItem('token', response.token);
          this.authService.login();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 400) {
            alert("Usuário já cadastrado!");
          }
        },
      });
    } else {
      alert('Formulário inválido');
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
          if (err.status === 400) {
            alert("Usuário não cadastrado!");
          }
        },
      });
    } else {
      alert('Formulário inválido');
    }
  }
}
