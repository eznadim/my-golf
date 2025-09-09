import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: true,
  template: `
    <section class="container">
      <h2>News</h2>
      <p>Latest updates and club announcements.</p>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    `
  ]
})
export class NewsComponent {}


