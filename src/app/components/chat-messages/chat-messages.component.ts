import {
  Component,
  Input,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements AfterViewChecked {
  @Input() messages: { from: string; text: string; time: string }[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {}
  }
}
