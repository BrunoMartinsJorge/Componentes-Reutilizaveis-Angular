import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { segurancaContaGuard } from './seguranca-conta.guard';

describe('segurancaContaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => segurancaContaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
