import { Routes } from '@angular/router';
import { SegurancaContaGuard } from './Guard/seguranca-conta.guard';
import { AppComponent } from './app.component';
/*import { NaoEncontradaComponent } from './Pages/nao-encontrada/nao-encontrada.component';
import { PaginaLoginCadastroComponent } from './Pages/pagina-login-cadastro/pagina-login-cadastro.component';*/

export const routes: Routes = [
  /*{
    path: '',
    canActivate: [SegurancaContaGuard],
    loadComponent: () =>
      import('./Pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'perfil',
    canActivate: [SegurancaContaGuard],
    loadComponent: () =>
      import('./Pages/teste-login/usuario/usuario.component').then(
        (m) => m.UsuarioComponent
      ),
  },*/
  {
    path: 'entre-cadastrar',
    component: AppComponent,
    
  },
  {
    path: '**',
    component: AppComponent,
  },
];