import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, IonList, IonLabel, 
  IonFooter 
} from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FirebaseService } from '../../services/firebase.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonInput, IonButton, IonList, IonLabel, 
    IonFooter
  ]
})
export class ChatPage implements OnInit {
  roomId: number = 0;
  roomName: string = '';
  messages: any[] = [];
  newMessage = '';
  currentUserId = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private firebaseService: FirebaseService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.roomName = this.route.snapshot.queryParamMap.get('name') || 'Chat';
    this.currentUserId = this.firebaseService.auth.currentUser?.uid || '';

    await this.loadMessages();

    this.supabaseService.client
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${this.roomId}` }, 
      (payload) => {
        this.messages.push(payload.new);
      })
      .subscribe();
  }

  async loadMessages() {
    try {
      this.messages = await this.chatService.getMessages(this.roomId) || [];
    } catch (error) {
      console.error(error);
    }
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.currentUserId) return;

    try {
      await this.chatService.sendMessage(this.roomId, this.currentUserId, this.newMessage);
      this.newMessage = '';
    } catch (error) {
      console.error(error);
      alert('Error al enviar mensaje');
    }
  }
}