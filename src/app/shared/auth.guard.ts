import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth(inject(FirebaseApp));
    const isAuthenticated = auth.currentUser !== null; // Check if user is logged in

    if (!isAuthenticated) {
      inject(Router).navigate(['/login'], { queryParamsHandling: 'merge' });
      return false;
    }

    return true;
};
