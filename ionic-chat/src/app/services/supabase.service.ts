import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { getAuth } from 'firebase/auth'; // <-- Importamos la autenticación de Firebase

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      accessToken: async () => {
        // Aquí conectamos: le decimos a Supabase que pida el token a Firebase
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
          return await user.getIdToken();
        }
        return null;
      }
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}