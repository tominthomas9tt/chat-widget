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

  messages: { from: 'user' | 'agent'; text: string; time: string }[] = [];

  constructor(
    private contactService: ContactsService,
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
      contact_wa_id: contact.wa_id
    };
    this.messageService.getAll(messageFilter).subscribe((dataResponse: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (dataResponse.status) {
        this.whatsappMessages = dataResponse.data?.records as IWhatsapp_message_logs[];
        this.whatsappMessages.forEach(msg => this.addMessage(msg.message ?? "", msg.is_incoming_message == 0 ? 'user' : 'agent'))
      }
      this.isLoadingMessages = false;
    })
  }

  addMessage(text: string, from: any) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.messages.push({ text, from, time });
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

  sendMessage(content: string) {
    this.addMessage(content, 'user');

    setTimeout(() => {
      this.addMessage(`Thanks for your message: "${content}"`, 'agent');
    }, 1000);
  }
}
