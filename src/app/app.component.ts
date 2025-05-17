import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatWidgetComponent],
  template: `
  <chat-widget></chat-widget>
  `,
  styles: [],
})
export class AppComponent {
  title = 'chat-widget';
}
