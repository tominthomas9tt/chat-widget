import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWhatsapp_message_logs } from '../../../api/interfaces/whatsapp_message_logs.interface';
import { LoaderComponent } from "../loader/loader.component";
import { getParsedComponents, IWhatsapp_templates } from '../../../api/interfaces/whatsapp_templates.interface';
import { TemplateExample, TemplateHeaderComponent } from '../../../api/whatsapp/interfaces/template.interface';

@Component({
  selector: 'chat-messages',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements AfterViewInit, OnChanges {
  @Input() messages: IWhatsapp_message_logs[] = [];
  @Input() hasMoreOlderMessages!: boolean;
  @Input() loadingOlderMessages!: boolean;
  @Output() loadMoreMessages: EventEmitter<any> = new EventEmitter();

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

  onScroll() {
    const element = this.scrollContainer.nativeElement;
    // If scrollTop is 0 or very close, load older messages
    if (element.scrollTop <= 10 && !this.loadingOlderMessages && this.hasMoreOlderMessages) {
      this.loadOlderMessages();
    }
  }

  loadOlderMessages() {
    this.loadMoreMessages.emit();
  }


  getMessageType(msg: any): string {
    try {
      const data = JSON.parse(msg.__data || '{}');

      if (msg.__data && msg.__data.includes('template_components')) return 'template';

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

  getEmoji(msg: any): string | null {
    try {
      const data = JSON.parse(msg.__data || '{}');
      return data.webhook_responses?.incoming[0].changes[0].value.messages[0].text.body || null;
    } catch {
      return msg.is_incoming_msg === 1 ? '' : null;
    }
  }

  openFullImage(url: string | null) {
    // Open in a new tab for now — or use modal
    if (url)
      window.open(url, '_blank');
  }

  shouldShowDateSeparator(index: number): boolean {
    if (index === 0) return true; // show date before first message

    const currentDate = new Date(this.messages[index].messaged_at);
    const prevDate = new Date(this.messages[index - 1].messaged_at);

    return !this.isSameDay(currentDate, prevDate);
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  getDateSeparatorLabel(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (this.isSameDay(date, today)) return 'Today';
    if (this.isSameDay(date, yesterday)) return 'Yesterday';

    // fallback to formatted date, e.g. "May 23, 2025"
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  parsetemplateComponents(templateData: IWhatsapp_templates) {
    return getParsedComponents(templateData);
  }

  getExampleMedia(component: TemplateHeaderComponent, key: keyof TemplateExample): string | undefined {
    return component.example?.[key]?.[0]; // safely get first media item if present
  }
}
