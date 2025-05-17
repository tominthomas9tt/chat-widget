import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
// import { ChatSynkComponent } from './app/chat-synk/chat-synk.component';
import { createComponentRef } from './utils/create-component-ref';
import { ChatWidgetComponent } from './app/components/chat-widget/chat-widget.component';

const WIDGET_SELECTOR = 'chat-widget';
let componentRef: any = null;

/**
 * Initializes the chat widget and bootstraps the Angular component.
 */
export function initChatWidget(config: { apiKey?: string }) {
  ensureWidgetElement(WIDGET_SELECTOR);

  return bootstrapApplication(ChatWidgetComponent, {
    providers: [provideHttpClient()],
  }).then(appRef => {
    const ngZone = appRef.injector.get(NgZone);
    ngZone.run(() => {
      componentRef = createComponentRef(appRef, ChatWidgetComponent, WIDGET_SELECTOR);
      Object.assign(componentRef.instance, config);
      componentRef.changeDetectorRef.detectChanges();
    });
  }).catch(err => console.error('[ChatSynk] Bootstrap error:', err));
}

/**
 * Passes contact information to the widget.
 */
export function loadContact(contactId: number) {
  if (componentRef) {
    componentRef.instance.contactId = contactId;
    componentRef.changeDetectorRef.detectChanges();
  } else {
    console.warn('[ChatSynk] is not initialized yet.');
  }
}

function loadTailwindStyles() {
  if (!document.getElementById('tailwind-styles')) {
    const link = document.createElement('link');
    link.id = 'tailwind-styles';
    link.rel = 'stylesheet';
    // Adjust path depending on where styles.css is hosted/deployed
    link.href = 'http://localhost/chatwidget/styles.css';
    document.head.appendChild(link);
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
loadTailwindStyles();
initChatWidget({}).then(() => {
  loadContact(46);
});
/**
 * Expose widget API on window for external use.
 */
(window as any).ChatWidget = {
  init: initChatWidget,
  loadContact: loadContact,
};
