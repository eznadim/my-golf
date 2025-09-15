import { Component, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor, NgClass, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, AuthUserProfile, MembershipAccessItem, UserBooking, UserScoreGame } from '../services/auth.service';
import { BookingsComponent } from './bookings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, RouterLink, DatePipe, DecimalPipe, BookingsComponent],
  template: `
    <div class="container py-4" *ngIf="isAuthed(); else signInPrompt">
      <div class="row g-4">
        <div class="col-12 col-lg-4">
          <div class="card elev-card section-framed">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <img [src]="profile().avatarUrl || 'assets/icons/user.svg'" class="rounded-circle me-3" width="60" height="60"/>
                <div>
                  <h5 class="mb-1">{{ profile().name }}</h5>
                  <div class="text-muted small">{{ profile().phone }}</div>
                </div>
              </div>
              <form (ngSubmit)="saveProfile()">
                <div class="mb-2">
                  <label class="form-label small">Name</label>
                  <input class="form-control" [(ngModel)]="editName" name="name" placeholder="Your name" />
                </div>
                <div class="mb-2">
                  <label class="form-label small">Email</label>
                  <input class="form-control" [(ngModel)]="editEmail" name="email" placeholder="email@example.com" />
                </div>
                <div class="mb-3">
                  <label class="form-label small">Profile Picture URL</label>
                  <input class="form-control" [(ngModel)]="editAvatar" name="avatar" placeholder="https://" />
                </div>
                <button class="btn btn-success w-100" type="submit">Save Details</button>
              </form>
            </div>
          </div>

          <div class="card elev-card section-framed mt-3">
            <div class="card-body">
              <h6 class="mb-3">Membership Access</h6>
              <div *ngFor="let m of membership()" class="d-flex justify-content-between align-items-center py-2 border-bottom small">
                <span>{{ m.label }}</span>
                <span [ngClass]="{
                    'text-success': m.status === 'full',
                    'text-warning': m.status === 'discount',
                    'text-muted': m.status === 'locked'
                  }">
                  {{ accessLabel(m) }}
                </span>
              </div>
              <div class="small mt-2 text-muted">Default: Full Access to Golf; some areas may show discounts.</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <app-bookings></app-bookings>
        </div>
      </div>
    </div>

    <ng-template #signInPrompt>
      <div class="container py-5 text-center">
        <p class="lead mb-3">Please sign in to view your profile.</p>
        <button class="btn btn-primary" (click)="openSignIn()">Sign In</button>
      </div>
    </ng-template>
  `,
  styles: [
    `:host{display:block}`
  ]
})
export class ProfileComponent {
  private readonly auth = inject(AuthService);

  readonly isAuthed = computed(() => this.auth.isAuthenticated());
  readonly profile = computed<AuthUserProfile>(() => this.auth.currentUser()!);
  readonly membership = computed<MembershipAccessItem[]>(() => this.profile().membership ?? []);
  readonly bookings = computed<UserBooking[]>(() => this.profile().bookings ?? []);
  readonly scores = computed<UserScoreGame[]>(() => this.profile().scores ?? []);

  editName = '';
  editEmail = '';
  editAvatar = '';
  readonly tab = signal<'bookings' | 'scores'>('bookings');

  constructor() {
    // Initialize edit fields from current profile if present
    const p = this.auth.currentUser();
    if (p) {
      this.editName = p.name ?? '';
      this.editEmail = p.email ?? '';
      this.editAvatar = p.avatarUrl ?? '';
    }
  }

  accessLabel(m: MembershipAccessItem): string {
    if (m.status === 'full') return 'Full Access';
    if (m.status === 'discount') return `${m.discountPercent}% Discount`;
    return 'Locked';
  }

  saveProfile(): void {
    this.auth.updateProfile({
      name: this.editName || this.profile().name,
      email: this.editEmail || undefined,
      avatarUrl: this.editAvatar || undefined
    });
  }

  openSignIn(): void {
    this.auth.openSignIn();
  }
}


