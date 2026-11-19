import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage )
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage )
  },
  {
    path: 'rooms',
    loadComponent: () => import('./pages/rooms/rooms.page').then( m => m.RoomsPage )
  },
  {
    path: 'chat/:roomId', // <-- Aquí agregamos el ID de la sala en la URL
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage )
  }
];