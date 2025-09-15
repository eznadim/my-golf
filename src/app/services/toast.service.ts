import { Injectable, signal } from '@angular/core';

export type ToastLevel = 'success' | 'info' | 'warning' | 'danger';

export interface ToastMessage {
  id: string;
  text: string;
  level: ToastLevel;
  timeoutMs?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  show(text: string, level: ToastLevel = 'info', timeoutMs = 3000): void {
    const toast: ToastMessage = { id: crypto.randomUUID(), text, level, timeoutMs };
    this.toasts.update(list => [toast, ...list]);
    if (timeoutMs && timeoutMs > 0) {
      window.setTimeout(() => this.dismiss(toast.id), timeoutMs);
    }
  }

  success(text: string, timeoutMs = 3000): void {
    this.show(text, 'success', timeoutMs);
  }

  dismiss(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}


