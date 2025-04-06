import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface ToastServiceInterface {
  id?: number;
  tituloMenssagem: string;
  menssagem?: string;
  icone?: string;
  tipo: ToastType;
  tempo?: number;
}

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastServiceInterface[]>([]);
  toasts$ = this.toastsSubject.asObservable();
    static ToastType: any;

  add(dadosToast: ToastServiceInterface) {
    const toastComId = { ...dadosToast, id: Date.now() };
    const toastsAtuais = this.toastsSubject.getValue();
    this.toastsSubject.next([...toastsAtuais, toastComId]);

    setTimeout(() => {
      this.remove(toastComId.id!);
    }, dadosToast.tempo != undefined ? dadosToast.tempo : 5000);
  }

  remove(id: number) {
    const toastsFiltrados = this.toastsSubject.getValue().filter(toast => toast.id !== id);
    this.toastsSubject.next(toastsFiltrados);
  }

  constructor() { }
}