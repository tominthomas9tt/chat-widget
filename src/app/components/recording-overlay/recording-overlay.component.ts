import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'recording-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recording-overlay.component.html',
  styleUrl: './recording-overlay.component.scss'
})
export class RecordingOverlayComponent implements OnInit, OnDestroy {
  @Input() isRecording: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() send = new EventEmitter<Blob>(); // emit audio blob

  seconds = 0;
  interval: any;

  mediaRecorder?: MediaRecorder;
  audioChunks: Blob[] = [];
  mimeType = 'audio/webm';

  ngOnInit() {
    if (this.isRecording) {
      this.startRecording();
    }
    this.interval = setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.stopStream();
  }

  get formattedTime(): string {
    const mins = Math.floor(this.seconds / 60).toString().padStart(2, '0');
    const secs = (this.seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.audioChunks = [];

      // if (MediaRecorder.isTypeSupported('audio/webm')) {
      //   this.mimeType = 'audio/webm';
      // } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      //   this.mimeType = 'audio/webm;codecs=opus';
      // } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
      //   this.mimeType = 'audio/ogg;codecs=opus';
      // } else {
      //   console.error('No supported MIME type found for MediaRecorder');
      //   alert('Your browser does not support audio recording.');
      //   return;
      // }
      let mimeType = 'audio/webm';
      this.mediaRecorder = new MediaRecorder(stream, { mimeType });



      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error('Microphone permission denied or error:', err);
      alert('Microphone access denied. Please allow access to record audio.');
      this.cancelRecording();
    }
  }

  stopStream() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }

  cancelRecording() {
    this.stopStream();
    this.cancel.emit();
  }

  sendRecording() {
    if (!this.mediaRecorder) return;

    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, { type: this.mimeType });
      this.send.emit(audioBlob);
    };

    this.mediaRecorder.stop();
    this.stopStream();
  }
}
