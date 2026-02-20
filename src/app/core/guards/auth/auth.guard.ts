import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const router:Router=inject(Router)
const authService:AuthService=inject(AuthService);

if(authService.userData.getValue() != null){
  return true
}
router.navigate(['login'])
  return false;
};
