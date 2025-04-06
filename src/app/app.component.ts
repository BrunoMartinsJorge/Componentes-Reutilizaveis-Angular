import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Prototipo';

}
