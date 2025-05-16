import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSynkComponent } from './chat-synk/chat-synk.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatSynkComponent],
  template: `
  <chat-synk></chat-synk>
  `,
  styles: [],
})
export class AppComponent {
  title = 'chat-widget';
}
