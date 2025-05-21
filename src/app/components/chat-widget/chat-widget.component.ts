import { Component, Input, SimpleChanges } from '@angular/core';
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

  loadingContact: boolean = false;
  contactDetails!: IContacts;

  isLoadingMessages: boolean = false;
  whatsappMessages: IWhatsapp_message_logs[] = [];

  pollingInterval: any = null;

  constructor(
    private contactService: ContactsService,
    private chatsynkService: ChatsynkService,
    private chatsynkMessageService: MessageService,
    private messageService: Whatsapp_message_logsService
  ) {

  }

  ngAfterViewInit(): void {
    if (this.contactId) {
      this.getContactDetails();
    }
  }

  toggleChat() {
    if (this.isOpen && this.contactDetails) {
      this.whatsappMessages = [];
      this.stopPolling();
      this.isOpen = !this.isOpen;
    } else {
      this.getContactDetails()
    }
  }

  getContactDetails() {
    if (this.contactId) {
      this.loadingContact = true;
      this.contactService.getDetails(Number(this.contactId)).subscribe((dataResponse: IResponse<IContacts>) => {
        if (dataResponse.status) {
          this.contactDetails = dataResponse.data as IContacts;
          this.getMessages(this.contactDetails);
        }
        this.loadingContact = false;
        this.isOpen = !this.isOpen;
      })
    }
  }

  getMessages(contact: IContacts) {
    this.isLoadingMessages = true;
    let messageFilter: Whatsapp_message_logsFilter = {
      contact_wa_id: contact.wa_id,
      sort: [new SortItem('messaged_at', 'DESC')]
    };
    this.messageService.getAll(messageFilter).subscribe((dataResponse: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (dataResponse.status) {
        // this.whatsappMessages = dataResponse.data?.records as IWhatsapp_message_logs[];
        this.whatsappMessages = (dataResponse.data?.records ?? []).reverse(); // 👈 reverse newest-to-oldest
        // sorted.forEach(msg => this.addMessage(msg.message ?? "", msg.is_incoming_message == 0 ? 'user' : 'agent', msg.messaged_at, msg.status))
        this.startPollingNewMessages(contact);
      }
      this.isLoadingMessages = false;
    })
  }

  fetchNewMessages(contact: IContacts) {
    if (!this.whatsappMessages.length) return;

    // Get latest messaged_at from current list
    const latestTime = this.whatsappMessages[this.whatsappMessages.length - 1]._id;

    const filter: Whatsapp_message_logsFilter = {
      contact_wa_id: contact.wa_id,
      sort: [new SortItem('messaged_at', 'ASC')],
      '_id>': latestTime
    };

    this.messageService.getAll(filter).subscribe((res: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (res.status && res.data?.records?.length) {
        res.data.records.forEach(msg => {
          this.addMessage(msg);
        });
        return true;
      }
    });
  }


  addMessage(message: IWhatsapp_message_logs) {
    this.whatsappMessages.push(message);
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
    this.chatsynkService.uploadVoiceNote(blob).subscribe((dataRepsonse: any) => {
      console.log(dataRepsonse);
      this.sendVoiceNote('http://angular-trial.esy.es/new1.ogg');
    })
  }
  
  sendVoiceNote(url: string) {
    let payload: SendMessagePayload = {
      type: MESSAGE_TYPE.MEDIA,
      phone_number: this.contactDetails.wa_id ?? "",
      media_url: url,
      media_type: 'audio'
    }
    this.chatsynkMessageService.sendMessage(payload).subscribe({
      next: (res) => {
        if (res?.result === 'success' && res.data) {
          // this.addMessage(content, 'user');
          console.log('Log UID:', res.data.log_uid);
          console.log('Status:', res.data.status);
        } else {
          console.warn('Message failed:', res?.message || 'Unknown error');
        }
      },
      error: (err: any) => {
        console.error('Send error:', err);
      },
    });
  }

  sendMessage(content: string, type = "text") {
    let payload: SendMessagePayload = {
      type: MESSAGE_TYPE.TEXT,
      phone_number: this.contactDetails.wa_id ?? "",
      message_body: content
    }
    this.chatsynkMessageService.sendMessage(payload).subscribe({
      next: (res) => {
        if (res?.result === 'success' && res.data) {
          // this.addMessage(content, 'user');
          console.log('Log UID:', res.data.log_uid);
          console.log('Status:', res.data.status);
        } else {
          console.warn('Message failed:', res?.message || 'Unknown error');
        }
      },
      error: (err: any) => {
        console.error('Send error:', err);
      },
    });
    // this.addMessage(content, 'user');

    // setTimeout(() => {
    //   this.addMessage(`Thanks for your message: "${content}"`, 'agent');
    // }, 1000);
  }

  startPollingNewMessages(contact: IContacts, intervalMs = 5000) {
    if (this.pollingInterval) clearInterval(this.pollingInterval); // clear previous

    this.pollingInterval = setInterval(() => {
      this.fetchNewMessages(contact);
    }, intervalMs);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

}
