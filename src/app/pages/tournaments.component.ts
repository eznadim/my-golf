import { Component } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  template: `
    <section class="container">
      <h2>Golf Tourneys</h2>
      <p>Upcoming and past tournaments.</p>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    `
  ]
})
export class TournamentsComponent {}


