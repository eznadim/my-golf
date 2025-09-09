import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: true,
  template: `
    <section class="container">
      <h2>Events</h2>
      <p>Club events and activities.</p>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    `
  ]
})
export class EventsComponent {}


