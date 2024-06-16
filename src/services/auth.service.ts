// import { Injectable } from '@angular/core';
// import { FirebaseApp } from '@angular/fire/app';
// import { getAuth, signInWithPopup, getRedirectResult, GoogleAuthProvider, signOut, signInWithRedirect } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import { LoaderService } from './loader.service';

// @Injectable({
//   providedIn: 'root'
// })
// @Injectable()
// export class AuthService {
//   constructor(private readonly afApp: FirebaseApp, private readonly router: Router, private loaderService: LoaderService) { }

//   async signInWithGoogle() {
//     const auth = getAuth(this.afApp);
//     const provider = new GoogleAuthProvider();

//     try {
//       this.loaderService.show();
//       const result = await signInWithPopup(auth, provider);

//       if (result.user) {
//         const user = result.user;
//         console.log("User signed in successfully:", user);
//         this.router.navigate(['/dashboard']);
//       } else {
//         console.log("Sign-in failed or cancelled");
//       }
//     } catch (error) {
//       console.error("Error during Google sign-in:", error);
//     } finally {
//       this.loaderService.hide();
//     }
//   }

//   async logout() {
//     const auth = getAuth(this.afApp);
//     try {
//       this.loaderService.show();
//       await signOut(auth);
//       localStorage.removeItem('redirectPath');
//       this.router.navigate(['/login']); // Replace with your desired logout path
//     } catch (error) {
//       console.error("Error during logout:", error);
//     } finally {
//       this.loaderService.hide();
//     }
//   }

//   getUser() {
//     // return this.afAuth.authState;
//   }
// }


import { Component, Injectable, OnInit } from '@angular/core';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private loaderService: LoaderService, private afApp: FirebaseApp) { }

  async checkAuthentication() {
    try {
      this.loaderService.show();
      const auth = getAuth(this.afApp);
      const result = await getRedirectResult(auth).catch(error => {
        return null;
        // console.error('Error during getRedirectResult:', error);
        // Handle specific error here (optional)
        // throw error; // Re-throw the error for the outer catch block
      });

      if (result?.user) {
        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
          localStorage.removeItem('redirectPath');
          this.router.navigate([redirectPath]);
        }
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      this.router.navigate(['/']);
    } finally {
      this.loaderService.hide();
    }
  }


  async signInWithGoogle() {
    const auth = getAuth(this.afApp);
    const provider = new GoogleAuthProvider();
    const redirectUrl = '/dashboard';

    try {
      this.loaderService.show();
      localStorage.setItem('redirectPath', redirectUrl);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      this.loaderService.hide();
    }
  }

  async logout() {
    const auth = getAuth(this.afApp);
    try {
      this.loaderService.show();
      await signOut(auth);
      localStorage.removeItem('redirectPath');
      this.router.navigate(['/login']); // Replace with your desired logout path
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      this.loaderService.hide();
    }
  }
}
