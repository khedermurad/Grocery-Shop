import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole();

  if(role === 'ROLE_ROLE_ADMIN'){
    return true;
  }else{
    router.navigate(['/access-denied']);
    return false;
  }

};
