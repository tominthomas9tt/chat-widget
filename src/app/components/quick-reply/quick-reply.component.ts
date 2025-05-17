import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quick-reply',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-reply.component.html',
  styleUrl: './quick-reply.component.scss'
})
export class QuickReplyComponent {
  @Input() options: string[] = [];
  @Output() reply = new EventEmitter<string>();

  send(option: string) {
    this.reply.emit(option);
  }
}
