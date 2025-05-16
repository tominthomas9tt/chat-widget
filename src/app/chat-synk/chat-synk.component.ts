import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'chat-synk',
  standalone: true,
  imports: [CommonModule, ChatAvatarComponent, ChatWindowComponent],
  templateUrl: './chat-synk.component.html'
})
export class ChatSynkComponent {
  chatOpen = false;
  contactId: string = "";

  constructor(private cdr: ChangeDetectorRef) {}

  toggleChat() {
    this.chatOpen = !this.chatOpen;
     this.cdr.detectChanges(); // Force view update
  }
}
