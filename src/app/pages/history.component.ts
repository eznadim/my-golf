import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  template: `
    <section class="container">
      <h2>My History</h2>
      <p>Previous rounds and payments summary.</p>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    h2 { margin: 0 0 0.5rem; }
    `
  ]
})
export class HistoryComponent {}


