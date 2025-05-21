import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmojiMenuComponent } from '../emoji-menu/emoji-menu.component';
import { AttachmentMenuComponent } from '../attachment-menu/attachment-menu.component';


export class SendItem{
  message?:string;
  mediaType?:'document'|'audio'|'text';
  mediaUrl?:'string';
  media?:any;
  mediaFilename?:string;
}

@Component({
  selector: 'chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, EmojiMenuComponent, AttachmentMenuComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Output() micClick = new EventEmitter<void>();
  @Output() messageSend = new EventEmitter<string>();

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  message = '';
  showEmojiMenu = false;
  showAttachmentMenu = false;

  send() {
    const trimmed = this.message.trim();
    if (trimmed) {
      this.messageSend.emit(trimmed);
      this.message = '';
      this.autoGrow();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  autoGrow() {
    const el = this.textarea.nativeElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  toggleEmojiMenu() {
    this.showEmojiMenu = !this.showEmojiMenu;
    this.showAttachmentMenu = false;
  }

  appendEmoji(emoji: string) {
    this.message += emoji;
    this.autoGrow();
    this.showEmojiMenu = false;
  }

  toggleAttachmentMenu() {
    this.showAttachmentMenu = !this.showAttachmentMenu;
    this.showEmojiMenu = false;
  }

  onAttachment(option: string) {
    console.log('Attachment selected:', option);
    this.showAttachmentMenu = false;
  }

  onMicClick() {
    this.micClick.emit();
  }
}
