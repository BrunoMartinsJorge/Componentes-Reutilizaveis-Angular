import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const SegurancaContaGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const service = inject(AuthService);

  const isAuthenticated = await service.isAuth();
  if (isAuthenticated) {
    return true;
  }
  
  return router.createUrlTree(['/entre-cadastrar']);
};
