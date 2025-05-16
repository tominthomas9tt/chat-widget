import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { ChatWidgetComponent } from './app/chat-widget/chat-widget.component';
import { provideHttpClient } from '@angular/common/http';
import { createComponentRef } from './utils/create-component-ref';


let componentRef: any = null;

export function initChatWidget(config: { apiKey?: string; }) {
  const selector = 'chat-widget-root';

  if (!document.querySelector(selector)) {
    const el = document.createElement(selector);
    document.body.appendChild(el);
  }

  bootstrapApplication(ChatWidgetComponent, {
    providers: [provideHttpClient()],
  }).then(appRef => {
    componentRef = createComponentRef(appRef, ChatWidgetComponent, selector);
    Object.assign(componentRef.instance, config);
    componentRef.changeDetectorRef.detectChanges();
  }).catch(err => console.error('Bootstrap error:', err));
}

function loadContact(contact: { name: string; email?: string; phone?: string }) {
  if (componentRef) {
    componentRef.instance.contact = contact;
    componentRef.changeDetectorRef.detectChanges();
  } else {
    console.warn('ChatWidget is not initialized yet.');
  }
}
// Optional auto-bootstrap if needed
// initChatWidget({});

(window as any).ChatWidget = {
  init: initChatWidget,
  loadContact: loadContact
};