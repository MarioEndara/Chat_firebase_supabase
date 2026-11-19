import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonLabel, IonInput, IonButton
  ] // <-- Componentes individuales, NO IonicModule
})
export class RegisterPage {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (!this.username || !this.email || !this.password) {
      alert('Por favor, llena todos los campos');
      return;
    }
    try {
      await this.authService.register(this.email, this.password, this.username);
      alert('¡Usuario registrado con éxito!');
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    }
  }
}