import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';

export interface StepsInterface {
  label: string;
  routerLink: string;
  ativo: boolean;
}

@Component({
  selector: 'app-steps-personalizado',
  imports: [CommonModule],
  templateUrl: './steps-personalizado.component.html',
  styleUrl: './steps-personalizado.component.css'
})

export class StepsPersonalizadoComponent {
  @Input() listaDeSteps!: StepsInterface[];

  buscarIndicie(valor: StepsInterface): number {
    return this.listaDeSteps.indexOf(valor);
  }
}
