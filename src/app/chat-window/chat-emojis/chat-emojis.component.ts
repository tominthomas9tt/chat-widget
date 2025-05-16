import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chat-emojis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-emojis.component.html',
  styleUrl: './chat-emojis.component.scss'
})
export class ChatEmojisComponent {
  @Input() showEmojiPicker: boolean = false;
  @Output() emojiEmitter: EventEmitter<string> = new EventEmitter();

  emojis: string[] = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙏', '😍', '🤔', '😎', '👋', '🤣', '😢', '🙌', '✅'];

  addEmoji(emoji: string) {
    this.emojiEmitter.emit(emoji);
  }
}
