import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  @Input() dialogTitle: string = '';
  @Input() closeIcon: boolean = true;
}
