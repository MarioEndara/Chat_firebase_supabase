import { Injectable } from '@angular/core';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    private supabaseService: SupabaseService
  ) {}

  // 1. Registrar usuario en Firebase y guardarlo en Supabase
  async register(email: string, password: string, username: string) {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth, 
        email, 
        password
      );

      const user = userCredential.user;

      // Guardar el perfil en la tabla 'profiles' de Supabase
      const { error } = await this.supabaseService.client
        .from('profiles')
        .insert([
          { 
            id: user.uid, 
            username: username,
            full_name: username, 
            avatar_url: '' 
          }
        ]);

      if (error) throw error;

      return user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // 2. Iniciar Sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth, 
        email, 
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // 3. Cerrar Sesión
  async logout() {
    await signOut(this.firebaseService.auth);
  }

  // 4. Obtener el usuario actual
  getCurrentUser() {
    return this.firebaseService.auth.currentUser;
  }
}