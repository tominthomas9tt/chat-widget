import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWhatsapp_message_logs } from '../../../api/interfaces/whatsapp_message_logs.interface';

@Component({
  selector: 'chat-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements AfterViewInit, OnChanges {
  @Input() messages: IWhatsapp_message_logs[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private lastMessageId: number | null = null;
  private initialized = false;

  ngAfterViewInit() {
    this.initialized = true;
    this.scrollToBottom(); // Initial scroll
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && this.initialized) {
      const latestMsg = this.messages[this.messages.length - 1];
      if (latestMsg?._id !== this.lastMessageId) {
        this.lastMessageId = latestMsg?._id as number;
        this.scrollToBottom();
      }
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    });
  }

  getMessageType(msg: any): string {
    try {
      const data = JSON.parse(msg.__data || '{}');

      if (msg.is_incoming_msg === 1) {
        const message = data?.webhook_responses?.incoming?.[0]?.changes?.[0]?.value?.messages?.[0];
        return message?.type || 'text';
      } else {
        const type = data.media_values?.type;
        if (!type) return 'text';

        switch (type) {
          case 'audio':
          case 'image':
          case 'video':
          case 'document':
          case 'sticker':
          case 'location':
            return type;
          default:
            return 'text';
        }
      }
    } catch {
      return 'unsupported';
    }
  }


  getAudioUrl(msg: any): string | null {
    try {
      const data = JSON.parse(msg.__data || '{}');

      if (msg.is_incoming_msg === 1) {
        return data?.media_values?.link || '';
      } else {
        return data.media_values?.link || null;
      }
    } catch {
      return msg.is_incoming_msg === 1 ? '' : null;
    }
  }

  getImageUrl(msg: any): string | null {
    try {
      const data = JSON.parse(msg.__data || '{}');

      if (msg.is_incoming_msg === 1) {
        return data?.media_values?.link || '';
      } else {
        return data.media_values?.link || null;
      }
    } catch {
      return msg.is_incoming_msg === 1 ? '' : null;
    }
  }


  openFullImage(url: string | null) {
    // Open in a new tab for now — or use modal
    if (url)
      window.open(url, '_blank');
  }
}
