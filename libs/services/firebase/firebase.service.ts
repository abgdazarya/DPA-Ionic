import { Injectable } from '@angular/core';

import { GoogleAuthProvider, getAuth } from 'firebase/auth';

import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  // public initialize(): void {
  //   const app = initializeApp(this.firebaseConfig);
  //   const analytics = getAnalytics(app);
  // }

  // public signInWithApple(): void {
  //   SignInWithApple.authorize(this.options)
  //     .then((result: SignInWithAppleResponse) => {
  //       // Handle user information
  //       // Validate token with server and create new session
  //     })
  //     .catch((error) => {
  //       // Handle error
  //     });
  // }
}
