import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="container">
      <h2>Contact Us</h2>
      <p>Reach out for enquiries and support.</p>
      <ul class="details">
        <li><strong>Location:</strong> Puchong, Selangor</li>
        <li><strong>Email:</strong> info@kinraragolf.com</li>
        <li><strong>Phone:</strong> +60 XX-XXXX XXXX</li>
      </ul>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    .details { margin-top: 0.5rem; opacity: 0.9; }
    `
  ]
})
export class ContactComponent {}


