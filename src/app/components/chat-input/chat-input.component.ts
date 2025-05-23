import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmojiMenuComponent } from '../emoji-menu/emoji-menu.component';
import { AttachmentMenuComponent } from '../attachment-menu/attachment-menu.component';
import { MediaType } from '../../../api/chatsynk/message.interface';


export class SendItem {
  message?: string;
  mediaType?: MediaType;
  mediaUrl?: string;
  media?: any;
  mediaFilename?: string;
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
  @Output() fileSelected = new EventEmitter<SendItem>();

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
    this.showAttachmentMenu = false;
    if (['Image', 'File'].includes(option)) {
      this.fileInput.nativeElement.accept =
        option === 'Image' ? 'image/*' : '*';
      this.fileInput.nativeElement.click();
    }

    // handle other types (Camera, Contact, etc.) here
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const sendItem: SendItem = {
        media: file,
        mediaFilename: file.name,
        mediaType: file.type.startsWith('image') ? 'image' : 'document',
      };

      this.fileSelected.emit(sendItem);
    }

    input.value = ''; // reset input so same file can be selected again
  }

  onMicClick() {
    this.micClick.emit();
  }
}
