import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { ChatSynkComponent } from './app/chat-synk/chat-synk.component';
import { createComponentRef } from './utils/create-component-ref';

const WIDGET_SELECTOR = 'chat-synk';
let componentRef: any = null;

/**
 * Initializes the chat widget and bootstraps the Angular component.
 */
export function initChatWidget(config: { apiKey?: string }) {
  ensureWidgetElement(WIDGET_SELECTOR);

  bootstrapApplication(ChatSynkComponent, {
    providers: [provideHttpClient()],
  }).then(appRef => {
    const ngZone = appRef.injector.get(NgZone);
    ngZone.run(() => {
      componentRef = createComponentRef(appRef, ChatSynkComponent, WIDGET_SELECTOR);
      Object.assign(componentRef.instance, config);
      componentRef.changeDetectorRef.detectChanges();
    });
  }).catch(err => console.error('[ChatWidget] Bootstrap error:', err));
}

/**
 * Passes contact information to the widget.
 */
export function loadContact(contact: { name: string; email?: string; phone?: string }) {
  if (componentRef) {
    componentRef.instance.contact = contact;
    componentRef.changeDetectorRef.detectChanges();
  } else {
    console.warn('[ChatWidget] Widget is not initialized yet.');
  }
}

/**
 * Ensures the root widget DOM element is present in the document.
 */
function ensureWidgetElement(selector: string): void {
  if (!document.querySelector(selector)) {
    const el = document.createElement(selector);
    document.body.appendChild(el);
  }
}

// Auto-bootstrap if needed (useful for dev or fallback)
initChatWidget({});

/**
 * Expose widget API on window for external use.
 */
(window as any).ChatWidget = {
  init: initChatWidget,
  loadContact: loadContact,
};
