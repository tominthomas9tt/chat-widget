import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [],
  template: `
    <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
  `,
  styles: `
  
.typing-indicator span {
    height: 10px;
    width: 10px;
    margin: 0 1px;
    background-color: #9ca3af;
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}

.typing-indicator {
  display: flex;
  gap: 3px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background-color: #9ca3af;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  to { transform: translateY(-5px); }
}
  `
})
export class LoaderComponent {

}
