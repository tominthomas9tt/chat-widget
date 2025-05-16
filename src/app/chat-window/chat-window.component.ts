import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatHeadComponent } from './chat-head/chat-head.component';
import { Whatsapp_message_logsService } from '../../api/services/whatsapp_message_logs.service';
import { IMultiresult, IResponse } from '../../mis/interfaces/reponse.interface';
import { IWhatsapp_message_logs } from '../../api/interfaces/whatsapp_message_logs.interface';
import { Whatsapp_message_logsFilter } from '../../api/models/whatsapp_message_logs.model';
import { IContacts } from '../../api/interfaces/contacts.interface';
import { ChatEmojisComponent } from './chat-emojis/chat-emojis.component';

@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule, ChatHeadComponent, ChatEmojisComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() contactDetails!: IContacts;

  ngOnInit(): void {
    console.log('Chat initialized with:', this.contactDetails._id);
    // TODO: Connect to backend with API key and contactId
  }
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;

  isLoadingMessages: boolean = false;
  whatsappMessages: IWhatsapp_message_logs[] = [];

  constructor(
    private messageService: Whatsapp_message_logsService
  ) {

  }

  messages: { text: string, sender: any, time: string }[] = [];
  showEmojiPicker = false;

  

  ngAfterViewInit(): void {
    // const initial = [
    //   { text: "Hey there! How's it going?", sender: 'other' },
    //   { text: "I'm doing great! Just finished that project we were working on.", sender: 'self' },
    //   { text: "That's awesome! Can you send me the files when you get a chance?", sender: 'other' },
    //   { text: "Sure thing! I'll email them to you this afternoon.", sender: 'self' },
    //   { text: "Perfect, thanks! 👍", sender: 'other' }
    // ];
    // initial.forEach(msg => this.addMessage(msg.text, msg.sender));
    this.getMessages({ wa_id: this.contactDetails.wa_id});
  }

  getMessages(contact: IContacts) {
    this.isLoadingMessages = true;
    let messageFilter: Whatsapp_message_logsFilter = {
      contact_wa_id: contact.wa_id
    };
    this.messageService.getAll(messageFilter).subscribe((dataResponse: IResponse<IMultiresult<IWhatsapp_message_logs>>) => {
      if (dataResponse.status) {
        this.whatsappMessages = dataResponse.data?.records as IWhatsapp_message_logs[];
        this.whatsappMessages.forEach(msg => this.addMessage(msg.message ?? "", msg.is_incoming_message == 0 ? 'self' : 'other'))
      }
      this.isLoadingMessages = false;
    })
  }

  addMessage(text: string, sender: any) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.messages.push({ text, sender, time });
    setTimeout(() => this.scrollToBottom());
  }

  scrollToBottom() {
    const container = this.chatMessages?.nativeElement;
    if (container) container.scrollTop = container.scrollHeight;
  }

  sendMessage() {
    const message = this.messageInput.nativeElement.value.trim();
    if (message) {
      this.addMessage(message, 'self');
      this.messageInput.nativeElement.value = '';
      this.simulateResponse();
    }
  }

  simulateResponse() {
    setTimeout(() => {
      this.addTypingIndicator();
      setTimeout(() => {
        this.removeTypingIndicator();
        const replies = [
          "That's interesting!", "I see what you mean.", "Thanks for sharing that.",
          "I'll keep that in mind.", "Good point! 😊", "I appreciate your perspective."
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        this.addMessage(reply, 'other');
      }, 2000);
    }, 1000);
  }

  addTypingIndicator() {
    this.messages.push({ text: '...', sender: 'typing', time: '' });
  }

  removeTypingIndicator() {
    this.messages = this.messages.filter(m => m.sender !== 'typing');
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.messageInput.nativeElement.value += emoji;
    this.messageInput.nativeElement.focus();
    this.toggleEmojiPicker();
  }
}
