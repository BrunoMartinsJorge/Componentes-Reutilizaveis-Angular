import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService, ToastServiceInterface, ToastType } from '../../Service/Toast/toast.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ToastComponent {
  toasts$: Observable<ToastServiceInterface[]>;

  toasts: ToastServiceInterface[] = [];
  constructor(public toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }
}
