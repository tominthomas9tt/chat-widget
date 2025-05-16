import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() contactId: string = "";

  ngOnInit(): void {
    console.log('Chat initialized with:', this.contactId);
    // TODO: Connect to backend with API key and contactId
  }
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLDivElement>;

  messages: { text: string, sender: any, time: string }[] = [];
  showEmojiPicker = false;

  emojis: string[] = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙏', '😍', '🤔', '😎', '👋', '🤣', '😢', '🙌', '✅'];

  ngAfterViewInit(): void {
    const initial = [
      { text: "Hey there! How's it going?", sender: 'other' },
      { text: "I'm doing great! Just finished that project we were working on.", sender: 'self' },
      { text: "That's awesome! Can you send me the files when you get a chance?", sender: 'other' },
      { text: "Sure thing! I'll email them to you this afternoon.", sender: 'self' },
      { text: "Perfect, thanks! 👍", sender: 'other' }
    ];
    initial.forEach(msg => this.addMessage(msg.text, msg.sender));
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
