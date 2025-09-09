import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  template: `
    <section class="container">
      <h2>My Bookings</h2>
      <p>List of upcoming bookings will appear here.</p>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    h2 { margin: 0 0 0.5rem; }
    `
  ]
})
export class BookingsComponent {}


