import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'recording-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recording-overlay.component.html',
  styleUrl: './recording-overlay.component.scss'
})
export class RecordingOverlayComponent {
  @Input() isRecording: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() send = new EventEmitter<void>();

  seconds = 0;
  interval: any;

  ngOnInit() {
    this.interval = setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  get formattedTime(): string {
    const mins = Math.floor(this.seconds / 60).toString().padStart(2, '0');
    const secs = (this.seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  cancelRecording() {
    this.cancel.emit();
  }

  sendRecording() {
    this.send.emit();
  }
}
