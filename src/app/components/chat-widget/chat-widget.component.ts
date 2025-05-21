import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { RecordingOverlayComponent } from '../recording-overlay/recording-overlay.component';
import { TemplatesScreenComponent } from '../templates-screen/templates-screen.component';
import { QuickReplyComponent } from '../quick-reply/quick-reply.component';
import { IContacts } from '../../../api/interfaces/contacts.interface';
import { IWhatsapp_message_logs } from '../../../api/interfaces/whatsapp_message_logs.interface';
import { Whatsapp_message_logsService } from '../../../api/services/whatsapp_message_logs.service';
import { Whatsapp_message_logsFilter } from '../../../api/models/whatsapp_message_logs.model';
import { IMultiresult, IResponse } from '../../../mis/interfaces/reponse.interface';
import { ContactsService } from '../../../api/services/contacts.service';
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from '../../../api/chatsynk/message.service';
import { SendMessagePayload } from '../../../api/chatsynk/message.interface';
import { SendMessageResponse } from '../../../api/chatsynk/message.model';
import { MESSAGE_TYPE } from '../../../api/chatsynk/type.enum.ts';
import { SortItem } from '../../../mis/models/filter.model';
import { ChatsynkService } from '../../../api/services/chatsynk.service';

@Component({
  selector: 'chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    LoaderComponent,
    RecordingOverlayComponent,
    TemplatesScreenComponent,
    QuickReplyComponent
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent {
  @Input() contactId!: number;

  isOpen = false;
  showTemplates = false;
  isDark = false;
  isRecording = false;

  loadingContact = false;
  contactDetails!: IContacts;
  isLoadingMessages = false;
  whatsappMessages: IWhatsapp_message_logs[] = [];

  pollingInterval: any = null;
  currentPollingIntervalMs = 5000;
  emptyFetchCount = 0;
  maxPollingIntervalMs = 60000;

  constructor(
    private contactService: ContactsService,
    private chatsynkService: ChatsynkService,
    private chatsynkMessageService: MessageService,
    private messageService: Whatsapp_message_logsService
  ) {}

  ngAfterViewInit(): void {
    if (this.contactId) this.getContactDetails();
  }

  toggleChat() {
    if (this.isOpen && this.contactDetails) {
      this.whatsappMessages = [];
      this.stopPolling();
      this.isOpen = !this.isOpen;
    } else {
      this.getContactDetails();
    }
  }

  getContactDetails() {
    if (!this.contactId) return;
    this.loadingContact = true;
    this.contactService.getDetails(this.contactId).subscribe((res: IResponse<IContacts>) => {
      if (res.status) {
        this.contactDetails = res.data as IContacts;
        this.getMessages(this.contactDetails);
      }
      this.loadingContact = false;
      this.isOpen = true;
    });
  }

  getMessages(contact: IContacts) {
    this.isLoadingMessages = true;
    const filter: Whatsapp_message_logsFilter = {
      contact_wa_id: contact.wa_id,
      sort: [new SortItem('messaged_at', 'DESC')]
    };
    this.messageService.getAll(filter).subscribe((res: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (res.status) {
        this.whatsappMessages = (res.data?.records ?? []).reverse();
        this.startPollingNewMessages(contact);
      }
      this.isLoadingMessages = false;
    });
  }

  fetchNewMessages(contact: IContacts) {
    if (!this.whatsappMessages.length) return this.scheduleNextPoll(contact);

    const latestId = this.whatsappMessages[this.whatsappMessages.length - 1]._id;
    const filter: Whatsapp_message_logsFilter = {
      contact_wa_id: contact.wa_id,
      sort: [new SortItem('messaged_at', 'ASC')],
      '_id>': latestId
    };

    this.messageService.getAll(filter).subscribe((res: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      const newMessages = res.data?.records ?? [];

      if (res.status && newMessages.length > 0) {
        newMessages.forEach(msg => this.addMessage(msg));
        this.emptyFetchCount = 0;
        this.currentPollingIntervalMs = 5000;
      } else {
        this.emptyFetchCount++;
        this.currentPollingIntervalMs = Math.min(5000 * Math.pow(2, this.emptyFetchCount), this.maxPollingIntervalMs);
      }

      this.scheduleNextPoll(contact);
    });
  }

  addMessage(message: IWhatsapp_message_logs) {
    this.whatsappMessages.push(message);
  }

  startPollingNewMessages(contact: IContacts) {
    if (this.pollingInterval) clearTimeout(this.pollingInterval);
    this.scheduleNextPoll(contact);
  }

  scheduleNextPoll(contact: IContacts) {
    this.pollingInterval = setTimeout(() => {
      this.fetchNewMessages(contact);
    }, this.currentPollingIntervalMs);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearTimeout(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }

  toggleTemplates() {
    this.showTemplates = !this.showTemplates;
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
  }

  stopRecording() {
    this.isRecording = false;
  }

  voiceSent(blob: Blob) {
    this.chatsynkService.uploadVoiceNote(blob).subscribe((res: any) => {
      this.sendVoiceNote('http://angular-trial.esy.es/new1.ogg');
    });
  }

  sendVoiceNote(url: string) {
    const payload: SendMessagePayload = {
      type: MESSAGE_TYPE.MEDIA,
      phone_number: this.contactDetails.wa_id ?? '',
      media_url: url,
      media_type: 'audio'
    };
    this.chatsynkMessageService.sendMessage(payload).subscribe();
  }

  sendMessage(content: string) {
    const payload: SendMessagePayload = {
      type: MESSAGE_TYPE.TEXT,
      phone_number: this.contactDetails.wa_id ?? '',
      message_body: content
    };
    this.chatsynkMessageService.sendMessage(payload).subscribe();
  }
}
