import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'attachment-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachment-menu.component.html',
  styleUrl: './attachment-menu.component.scss'
})
export class AttachmentMenuComponent {
  @Output() attachmentSelected = new EventEmitter<string>();

  options = [
    { icon: 'far fa-image', label: 'Image', color: '#53BDEB' },
    { icon: 'far fa-file', label: 'File', color: '#25D366' },
    // { icon: 'fas fa-camera', label: 'Camera', color: '#FF3B30' },
    // { icon: 'far fa-address-card', label: 'Contact', color: '#128C7E' },
    // { icon: 'fas fa-map-marker-alt', label: 'Location', color: '#FF3B30' },
    // { icon: 'fas fa-poll', label: 'Poll', color: '#53BDEB' },
    // { icon: 'fas fa-sticky-note', label: 'Note', color: '#25D366' },
    // { icon: 'fas fa-money-bill', label: 'Payment', color: '#128C7E' },
  ];

  select(option: string) {
    this.attachmentSelected.emit(option);
  }
}
