import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, IonList, IonLabel 
} from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonInput, IonButton, IonList, IonLabel
  ]
})
export class RoomsPage implements OnInit {
  rooms: any[] = [];
  newRoomName = '';

  constructor(
    private chatService: ChatService, 
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    await this.loadRooms();
  }

  async loadRooms() {
    try {
      this.rooms = await this.chatService.getRooms() || [];
    } catch (error) {
      console.error(error);
    }
  }

  async onCreateRoom() {
    if (!this.newRoomName) return;
    const user = this.firebaseService.auth.currentUser;
    if (!user) return;

    try {
      await this.chatService.createRoom(this.newRoomName, user.uid);
      this.newRoomName = '';
      await this.loadRooms();
    } catch (error) {
      console.error(error);
      alert('Error al crear sala');
    }
  }

  goToChat(roomId: number, roomName: string) {
    this.router.navigate(['/chat', roomId], { queryParams: { name: roomName } });
  }
}