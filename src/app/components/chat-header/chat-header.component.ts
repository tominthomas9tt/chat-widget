import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContacts } from '../../../api/interfaces/contacts.interface';

@Component({
  selector: 'chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  @Input() contactDetails!: IContacts;

  @Output() themeToggle = new EventEmitter<void>();
  @Output() openTemplates = new EventEmitter<void>();

  get userName() {
    let name = (this.contactDetails?.first_name ?? "Unknown") + " " + (this.contactDetails?.last_name ?? "");
    return name;
  }

  toggleTheme() {
    this.themeToggle.emit();
  }

  showTemplates() {
    this.openTemplates.emit();
  }
}
