import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="modal fade" tabindex="-1" [class.show]="isOpen()" [style.display]="isOpen() ? 'block' : 'none'" (click)="onBackdrop($event)">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sign In</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
          </div>
          <form (ngSubmit)="submit()" autocomplete="on">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-control" name="phone" [(ngModel)]="phone" placeholder="e.g. 0123456789" required />
              </div>
              <div class="mb-2">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" name="password" [(ngModel)]="password" placeholder="Enter your password" required />
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="asAdmin" name="asAdmin" [(ngModel)]="asSuperAdmin">
                <label for="asAdmin" class="form-check-label">Sign in as Super Admin</label>
              </div>
              <div class="d-flex justify-content-between small">
                <a href="#" (click)="$event.preventDefault()">Forgot your password?</a>
                <a href="#" (click)="$event.preventDefault()">Register</a>
              </div>
              <div *ngIf="error()" class="alert alert-danger mt-3 py-2">{{ error() }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="close()">Cancel</button>
              <button type="submit" class="btn btn-success">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host{display:block}
    .modal{background: rgba(0,0,0,.5);}
    `
  ]
})
export class SignInModalComponent {
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly isOpen = this.auth.isSignInOpen;
  phone = '';
  password = '';
  asSuperAdmin = false;
  error = signal<string | null>(null);

  close(): void {
    this.auth.closeSignIn();
  }

  async submit(): Promise<void> {
    this.error.set(null);
    try {
      const user = await this.auth.signIn(this.phone, this.password, this.asSuperAdmin);
      this.toast.success(`Welcome back, ${user.name}!`);
      // Navigate to home with admin query param so UI can adapt
      this.router.navigate(['/'], { queryParams: { admin: this.asSuperAdmin ? '1' : undefined } });
    } catch (e: any) {
      this.error.set(e?.message ?? 'Failed to sign in');
    }
  }

  onBackdrop(evt: MouseEvent): void {
    // Close if clicking outside dialog
    const target = evt.target as HTMLElement;
    if (target && target.classList.contains('modal')) {
      this.close();
    }
  }
}


