import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private supabaseService: SupabaseService) {}

  async getRooms() {
    const { data, error } = await this.supabaseService.client
      .from('rooms')
      .select('*');
    if (error) throw error;
    return data;
  }

  async createRoom(name: string, userId: string) {
    const { data, error } = await this.supabaseService.client
      .from('rooms')
      .insert([{ name, created_by: userId }])
      .select();
    if (error) throw error;
    return data;
  }

  async sendMessage(roomId: number, userId: string, content: string) {
    const { data, error } = await this.supabaseService.client
      .from('messages')
      .insert([{ 
        room_id: roomId, 
        user_id: userId, 
        content: content, 
        message_type: 'text' 
      }]);
    if (error) throw error;
    return data;
  }

  async getMessages(roomId: number) {
    const { data, error } = await this.supabaseService.client
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  }
}