import { Component, computed, inject } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="toast-container position-fixed p-3" style="z-index: 1080; top: 70px; right: 12px;">
      <div *ngFor="let t of toasts()" class="toast show align-items-center text-bg-light border-0 shadow-sm mb-2"
           [ngClass]="{
             'text-bg-success': t.level === 'success',
             'text-bg-danger': t.level === 'danger',
             'text-bg-warning': t.level === 'warning',
             'text-bg-info': t.level === 'info'
           }" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ t.text }}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="dismiss(t.id)"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`:host{display:block}`]
})
export class ToastContainerComponent {
  private readonly toast = inject(ToastService);
  readonly toasts = computed(() => this.toast.toasts());

  dismiss(id: string): void {
    this.toast.dismiss(id);
  }
}


