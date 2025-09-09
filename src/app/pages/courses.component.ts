import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  template: `
    <section class="container">
      <h2>Golf Courses</h2>
      <p>Kinrara features three distinctive courses.</p>
      <div class="grid">
        <article class="course">Course A</article>
        <article class="course">Course B</article>
        <article class="course">Course C</article>
      </div>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    .grid { display: grid; grid-template-columns: repeat(1, minmax(0,1fr)); gap: 0.9rem; }
    @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
    .course { background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1rem; }
    `
  ]
})
export class CoursesComponent {}


