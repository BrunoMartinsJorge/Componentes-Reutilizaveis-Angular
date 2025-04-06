import { Component } from '@angular/core';
import { ContaServiceService } from '../../../Service/servico-login/conta-service.service';

@Component({
    selector: 'app-usuario',
    imports: [],
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
    dadosUsuario: any;
    constructor(private http: ContaServiceService) {
        this.dadosUsuario = this.http.buscarDados().subscribe({
            next: (res: any) => this.dadosUsuario = res,
            error: (err: any) => console.error(err)
        })
    }

    sair(){
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
}
