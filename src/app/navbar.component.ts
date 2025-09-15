import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top border-bottom shadow-sm" style="background: rgba(255,255,255,.9); backdrop-filter: saturate(180%) blur(6px);">
      <div class="container">
        <a class="navbar-brand text-uppercase fw-bold" routerLink="/">GolfersGo</a>
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
          <div class="d-flex align-items-center">
            <a *ngIf="!isAdmin()" class="btn btn-success rounded-pill px-3 me-2" routerLink="/booking">Become a Member</a>
            <a *ngIf="isAdmin()" class="btn btn-outline-primary rounded-pill px-3 me-2" routerLink="/admin">Admin Dashboard</a>

            <!-- Sign In button when logged out -->
            <button *ngIf="!isAuthed()" class="btn btn-primary rounded-pill px-3" (click)="openSignIn()">Sign In</button>

            <!-- Profile dropdown when logged in -->
            <div *ngIf="isAuthed()" class="dropdown">
              <button class="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img [src]="avatarUrl()" alt="Avatar" class="rounded-circle me-2" width="36" height="36" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="profileDropdown">
                <li>
                  <div class="px-3 py-2 small text-muted">
                    <div class="fw-semibold">Good Day, {{ displayName() }}</div>
                    <div>{{ phone() }}</div>
                  </div>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" routerLink="/profile"><span class="me-2">👤</span>Profile</a></li>
                <li><a class="dropdown-item" href="#" (click)="signOut()"><span class="me-2">↩️</span>Logout</a></li>
              </ul>
            </div>
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
export class NavbarComponent {
  private readonly auth = inject(AuthService);

  readonly isAuthed = computed(() => this.auth.isAuthenticated());
  readonly displayName = computed(() => this.auth.currentUser()?.name ?? '');
  readonly phone = computed(() => this.auth.currentUser()?.phone ?? '');
  readonly avatarUrl = computed(() => this.auth.currentUser()?.avatarUrl ?? 'assets/icons/user.svg');
  readonly isAdmin = computed(() => !!this.auth.currentUser()?.isSuperAdmin);

  openSignIn(): void {
    this.auth.openSignIn();
  }

  signOut(): void {
    this.auth.signOut();
  }
}


