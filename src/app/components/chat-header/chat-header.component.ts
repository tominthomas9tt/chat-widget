import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  @Output() themeToggle = new EventEmitter<void>();
  @Output() openTemplates = new EventEmitter<void>();

  toggleTheme() {
    this.themeToggle.emit();
  }

  showTemplates() {
    this.openTemplates.emit();
  }
}
