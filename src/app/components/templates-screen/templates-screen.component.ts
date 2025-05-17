import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'templates-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates-screen.component.html',
  styleUrl: './templates-screen.component.scss'
})
export class TemplatesScreenComponent {
  @Output() back = new EventEmitter<void>();

  templates = [
    { title: 'Greeting', text: 'Hello! How can I help you today?' },
    { title: 'Support info', text: 'Our support team is available Monday to Friday, 9am to 5pm.' },
    { title: 'Contact details', text: 'You can reach us at support@example.com or call (123) 456-7890.' },
    { title: 'Thank you', text: 'Thank you for contacting us. Is there anything else you need help with?' },
    { title: 'Closing', text: 'Have a great day! Feel free to reach out if you have any other questions.' }
  ];

  goBack() {
    this.back.emit();
  }
}
