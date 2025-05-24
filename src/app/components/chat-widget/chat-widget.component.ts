import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent, SendItem } from '../chat-input/chat-input.component';
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
import { MediaType, SendMessagePayload } from '../../../api/chatsynk/message.interface';
import { MESSAGE_TYPE } from '../../../api/chatsynk/type.enum.ts';
import { SortItem } from '../../../mis/models/filter.model';
import { ChatsynkService } from '../../../api/services/chatsynk.service';
import { WhatsAppTemplatePayload } from '../../../api/whatsapp/interfaces/template.interface';

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

  hasMoreOlderMessages = true; // example, set to false when no older messages left
  loadingOlderMessages = false;

  page: number = 0;

  constructor(
    private contactService: ContactsService,
    private chatsynkService: ChatsynkService,
    private chatsynkMessageService: MessageService,
    private messageService: Whatsapp_message_logsService
  ) { }

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
    this.page = 0;
    const filter: Whatsapp_message_logsFilter = {
      page: this.page,
      contact_wa_id: contact.wa_id,
      sort: [new SortItem('messaged_at', 'DESC')]
    };
    this.messageService.getAll(filter).subscribe((res: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (res.status) {
        this.whatsappMessages = (res.data?.records ?? []).reverse();
        // this.startPollingNewMessages(contact);
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

  loadOlderMessages() {
    if (this.loadingOlderMessages) return;

    this.loadingOlderMessages = true;
    const filter: Whatsapp_message_logsFilter = {
      page: ++this.page,
      contact_wa_id: this.contactDetails.wa_id,
      sort: [new SortItem('messaged_at', 'DESC')]
    };
    this.messageService.getAll(filter).subscribe((res: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (res.status) {
        if (res.data!.records.length > 0) {
          this.whatsappMessages = [...(res.data?.records ?? []).reverse(), ...this.whatsappMessages];
        } else {
          this.hasMoreOlderMessages = false; // no more messages
        }
      }
      this.loadingOlderMessages = false;
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

  handleFile(item: SendItem) {
    if (item.media && item.mediaType) {
      this.chatsynkService.uploadFile(item.media, item.mediaType).subscribe({
        next: (res: any) => {
          console.log('Upload response:', res);
          this.sendImage('http://angular-trial.esy.es/1747845957_aa02d385750a7c8dced7.pdf', item.mediaType as MediaType);

          // Emit or append uploaded media URL to chat
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  sendImage(url: string, media_Type: MediaType) {
    const payload: SendMessagePayload = {
      type: MESSAGE_TYPE.MEDIA,
      phone_number: this.contactDetails.wa_id ?? '',
      media_url: url,
      media_type: media_Type
    };
    this.chatsynkMessageService.sendMessage(payload).subscribe();
  }

  onTemplateSelected($event: WhatsAppTemplatePayload) {
    this.sendTemplateMessage($event);
    this.showTemplates = false;
  }

  sendTemplateMessage(template: WhatsAppTemplatePayload, headerImage: string = 'https://agoodmorning.in/wp-content/uploads/2024/09/good-morning-good-morning-flowers-picture-good-morning-flowers-with-love-good-morning-blue-flowers-morning-flowers_36.jpg?v=1726425170') {
    const payload: SendMessagePayload = {
      type: MESSAGE_TYPE.TEMPLATE,
      template_name: template.name,
      template_language: template.language,
      phone_number: this.contactDetails.wa_id ?? '',
    };

    const hasImageHeader = template.components?.some(
      comp => comp.type === 'HEADER' && comp.format === 'IMAGE'
    );

    if (hasImageHeader && headerImage) {
      // Dynamically add header_image property
      (payload as any).header_image = headerImage;
    }

    this.chatsynkMessageService.sendMessage(payload).subscribe();
  }
}
