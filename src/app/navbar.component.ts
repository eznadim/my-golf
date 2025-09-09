import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg bg-white fixed-top border-bottom shadow-sm">
      <div class="container">
        <a class="navbar-brand text-uppercase fw-bold" routerLink="/">Kinrara Golf Club</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" routerLink="/courses" routerLinkActive="active">Golf Courses</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/news" routerLinkActive="active">News</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/events" routerLinkActive="active">Events</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/tournaments" routerLinkActive="active">Golf Tourneys</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
          </ul>
          <div class="d-flex">
            <a class="btn btn-success rounded-pill px-3" routerLink="/booking">Book Tee Time</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
    :host { display: block; }
    `
  ]
})
export class NavbarComponent {}


