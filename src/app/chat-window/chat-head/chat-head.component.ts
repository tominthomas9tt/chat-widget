import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IContacts } from '../../../api/interfaces/contacts.interface';

@Component({
  selector: 'chat-head',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-head.component.html'
})
export class ChatHeadComponent {
  @Input() contactDetails?: IContacts

  get userName() {
    let name = (this.contactDetails?.first_name ?? "Unknown") + " " + (this.contactDetails?.last_name ?? "");
    return name;
  }
}
