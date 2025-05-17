import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { RecordingOverlayComponent } from '../recording-overlay/recording-overlay.component';
import { TemplatesScreenComponent } from '../templates-screen/templates-screen.component';
import { QuickReplyComponent } from '../quick-reply/quick-reply.component';

@Component({
  selector: 'chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    RecordingOverlayComponent,
    TemplatesScreenComponent,
    QuickReplyComponent
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent {
  isOpen = false;
  showTemplates = false;
  isDark = false;
  isRecording = false;

  messages: { from: 'user' | 'agent', text: string, time: string }[] = [
    { from: 'agent', text: 'Hello! How can I help you today?', time: '10:03 AM' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
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

  handleQuickReply(option: string) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.messages.push({ from: 'user', text: option, time });

    setTimeout(() => {
      this.messages.push({
        from: 'agent',
        text: `You selected: "${option}". How else can I assist?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
  }

  sendMessage(content: string) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  this.messages.push({
    from: 'user',
    text: content,
    time
  });

  // Optional: simulate agent reply
  setTimeout(() => {
    this.messages.push({
      from: 'agent',
      text: `Thanks for your message: "${content}"`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }, 1000);
}
}