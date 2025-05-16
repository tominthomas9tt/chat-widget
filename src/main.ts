import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { ChatWidgetComponent } from './app/chat-widget/chat-widget.component';
import { provideHttpClient } from '@angular/common/http';

console.log('Starting bootstrap...');

const selector = 'chat-widget-root';

if (!document.querySelector(selector)) {
  console.log(`Element <${selector}> not found, creating one.`);
  const el = document.createElement(selector);
  document.body.appendChild(el);
} else {
  console.log(`Element <${selector}> already present.`);
}

bootstrapApplication(ChatWidgetComponent, {
  providers: [provideHttpClient()],
})
  .then(() => console.log('Bootstrap success'))
  .catch(err => console.error('Bootstrap error:', err));
