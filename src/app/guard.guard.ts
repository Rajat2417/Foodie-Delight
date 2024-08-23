import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppserviceService } from './appservice.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const appservice = inject(AppserviceService);
  const router = inject(Router);

  // Replace 'isAuthenticated' with your actual method or logic
  if (appservice.logged_in_user && (appservice.selected_role.id == 'A1' || appservice.selected_role.id == 'U1')) {
    return true;
  } else {
    router.navigateByUrl('forbidden')
    return false; 
  } 
};




// appser.logged_in_user && appser.selected_role.id == '1' || appser.selected_role.id == '2'