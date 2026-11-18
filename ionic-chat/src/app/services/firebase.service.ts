import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public auth: Auth;

  constructor() {
    // Inicializamos Firebase con las claves del environment
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);
  }
}