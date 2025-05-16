import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ContactsService } from '../../api/services/contacts.service';
import { IContacts } from '../../api/interfaces/contacts.interface';
import { IResponse } from '../../mis/interfaces/reponse.interface';

@Component({
  selector: 'chat-synk',
  standalone: true,
  imports: [CommonModule, ChatAvatarComponent, ChatWindowComponent],
  templateUrl: './chat-synk.component.html'
})
export class ChatSynkComponent {
  // contactId!: number;
  chatOpen = false;

  @Input() contactId!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contactId']) {
      console.log('Updated contactId:', this.contactId);
      // you can fetch data here too
    }
  }

  loadingContact: boolean = false;
  contactDetails!: IContacts;

  constructor(
    private contactService: ContactsService
  ) { }



  toggleChat() {
    if (this.chatOpen && this.contactDetails) {
      this.chatOpen = !this.chatOpen;
    } else {
      this.getContactDetails()
    }
  }

  getContactDetails() {
    if (this.contactId) {
      this.loadingContact = true;
      this.contactService.getDetails(Number(this.contactId)).subscribe((dataResponse: IResponse<IContacts>) => {
        if (dataResponse.status) {
          this.contactDetails = dataResponse.data as IContacts;
        }
        this.loadingContact = false;
        this.chatOpen = !this.chatOpen;
      })
    }
  }
}
