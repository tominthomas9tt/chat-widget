import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'emoji-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emoji-menu.component.html',
  styleUrl: './emoji-menu.component.scss'
})
export class EmojiMenuComponent {
  @Output() emojiSelected = new EventEmitter<string>();

  emojis: string[] = [
    '😊', '😂', '❤️', '👍', '🙏', '🔥', '🎉', '😍', '😘', '😭',
    '😎', '🤔', '😢', '👌', '🤣', '😉', '👏', '🙄', '😁', '😒',
    '🤷‍♂️'
  ];

  selectEmoji(emoji: string) {
    this.emojiSelected.emit(emoji);
  }
}
