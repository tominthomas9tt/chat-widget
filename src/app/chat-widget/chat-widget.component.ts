import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Contact {
  name: string;
  email?: string;
  phone?: string;
}

@Component({
  selector: 'chat-widget-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent {
  @Input() title: string = 'Chat Widget';
  @Input() message: string = 'This is a chat box';
  @Input() theme = { background: 'white', color: 'black' };
  @Input() contact?: Contact;

  close() {
    const el = document.querySelector('chat-widget-root');
    if (el) el.remove();
  }
}
