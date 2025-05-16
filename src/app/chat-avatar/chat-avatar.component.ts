import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chat-avatar',
  standalone: true,
  imports: [],
  templateUrl: './chat-avatar.component.html',
  styleUrl: './chat-avatar.component.scss'
})
export class ChatAvatarComponent {
  @Output() toggle = new EventEmitter<void>();
}
