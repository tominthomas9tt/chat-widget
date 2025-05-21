import {
  Component,
  Input,
  AfterViewChecked,
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
export class ChatMessagesComponent implements AfterViewChecked {
  @Input() messages: IWhatsapp_message_logs[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  getMessageType(msg: any): string {
    try {
      const data = JSON.parse(msg.__data || '{}');
      const incoming = data.webhook_responses?.incoming?.[0];
      const message = incoming?.changes?.[0]?.value?.messages?.[0];
      console.log(msg._id, message?.type);

      return message?.type || 'text';
    } catch (e) {
      return 'text';
    }
  }

  getAudioUrl(msg: any): string {
    try {
      const data = JSON.parse(msg.__data || '{}');
      return data.media_values?.link || '';
    } catch (e) {
      return '';
    }
  }

  getMessageType1(msg: any): string {
    try {
      const data = JSON.parse(msg.__data);
      if (data.media_values && data.media_values.type === 'audio') {
        return 'audio';
      }
      return 'text';
    } catch (e) {
      return 'text';
    }
  }

  getAudioUrl1(msg: any): string | null {
    try {
      const data = JSON.parse(msg.__data);
      return data.media_values?.link || null;
    } catch {
      return null;
    }
  }
}
