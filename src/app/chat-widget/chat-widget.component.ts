import { Component } from '@angular/core';

@Component({
  selector: 'chat-widget-root',
  standalone: true,
  template: `
    <div style="position: fixed; bottom: 1rem; right: 1rem; background: white; border: 1px solid #ccc; padding: 1rem; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h4>Chat Widget</h4>
      <p>This is a chat box</p>
    </div>
  `,
})
export class ChatWidgetComponent {}
