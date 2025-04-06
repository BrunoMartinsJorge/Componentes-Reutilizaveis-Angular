import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = localStorage.getItem('token') ? new BehaviorSubject<boolean>(true) : new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private rotas: Router) { }

  async login(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.isLoggedInSubject.next(true);
    this.rotas.navigate(['/perfil']);
  }

  async logOut(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.isLoggedInSubject.next(false);
  }

  isAuth(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.isLoggedInSubject.value);
    });
  }
}
