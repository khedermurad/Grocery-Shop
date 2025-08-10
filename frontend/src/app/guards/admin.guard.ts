import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole();

  if (role === 'ROLE_ROLE_ADMIN') {
    return true;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }
};

export const adminChildGuard: CanActivateChildFn = (route, state) => {
  return adminGuard(route, state);
};
