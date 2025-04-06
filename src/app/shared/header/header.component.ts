import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../Guard/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioLogado: boolean = false;
  constructor(public guard: AuthService) { }
}
