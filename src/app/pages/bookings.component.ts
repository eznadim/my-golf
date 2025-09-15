import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { AuthService, UserBooking } from '../services/auth.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, CurrencyPipe, DecimalPipe],
  template: `
    <section class="container py-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="h4 m-0">My Bookings</h2>
        <div class="btn-group" role="tablist">
          <button class="btn btn-outline-success" [ngClass]="{active: tab() === 'upcoming'}" (click)="tab.set('upcoming')">Upcoming</button>
          <button class="btn btn-outline-success" [ngClass]="{active: tab() === 'completed'}" (click)="tab.set('completed')">Past</button>
          <button class="btn btn-outline-success" [ngClass]="{active: tab() === 'cancelled'}" (click)="tab.set('cancelled')">Cancelled</button>
        </div>
      </div>

      <div *ngFor="let b of filtered()" class="booking-card elev-card section-framed mb-3 p-3">
        <div class="card-body p-0">
          <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-start">
              <img [src]="clubImage(b.club)" class="me-3 rounded" width="64" height="64" style="object-fit:cover" alt="{{ b.club }}" />
              <div class="fw-semibold">{{ b.club }}</div>
              <div class="small text-muted">{{ b.dateIso | date:'mediumDate' }} • {{ b.timeRange }}</div>
            </div>
            <div class="text-success small fw-semibold" *ngIf="b.status === 'upcoming'">Confirmed</div>
            <div class="text-muted small fw-semibold" *ngIf="b.status === 'completed'">Completed</div>
            <div class="text-danger small fw-semibold" *ngIf="b.status === 'cancelled'">Cancelled</div>
          </div>
          <div class="row small mt-3 gx-3">
            <div class="col-6 col-md-3 mb-1"><div class="text-muted">Duration</div><div>{{ b.durationHours || (b.holes >= 18 ? 4 : 2) }} hours</div></div>
            <div class="col-6 col-md-3 mb-1"><div class="text-muted">Players</div><div>{{ b.players }} Player{{ b.players > 1 ? 's' : '' }}</div></div>
            <div class="col-6 col-md-3 mb-1"><div class="text-muted">Total</div><div>RM {{ b.amountRm | number:'1.2-2' }}</div></div>
            <div class="col-6 col-md-3 mb-1"><div class="text-muted">Notes</div><div>{{ b.holes }} holes, {{ b.caddy ? 'caddy included' : 'no caddy' }}</div></div>
          </div>
          <div class="d-flex gap-2 justify-content-end mt-3">
            <button class="btn btn-outline-secondary btn-sm" (click)="viewDetails(b)">View details</button>
            <button *ngIf="b.status === 'upcoming'" class="btn btn-outline-danger btn-sm" (click)="cancel(b)">Cancel</button>
            <button *ngIf="b.status === 'cancelled' && !b.refundRequested" class="btn btn-outline-warning btn-sm" (click)="refund(b)">Request refund</button>
            <span *ngIf="b.status === 'cancelled' && b.refundRequested" class="badge text-bg-warning align-self-center">Refund requested</span>
          </div>
        </div>
      </div>

      <!-- Details Modal -->
      <div class="modal-backdrop" *ngIf="detailOpen()" (click)="closeDetails()"></div>
      <div class="modal-sheet" *ngIf="detailOpen()" role="dialog" aria-modal="true">
        <div class="modal-header d-flex justify-content-between align-items-center">
          <div class="h6 m-0">Booking Details</div>
          <button class="btn-close" aria-label="Close" (click)="closeDetails()"></button>
        </div>
        <div class="p-3" *ngIf="selected() as d">
          <div class="d-flex align-items-start mb-3">
            <img [src]="clubImage(d.club)" class="me-3 rounded" width="72" height="72" style="object-fit:cover" alt="{{ d.club }}" />
            <div>
              <div class="fw-semibold">{{ d.club }}</div>
              <div class="small text-muted">{{ d.dateIso | date:'fullDate' }} • {{ d.timeRange }}</div>
              <div class="small">Players: {{ d.players }} • Holes: {{ d.holes }} • {{ d.caddy ? 'Caddy' : 'No caddy' }}</div>
              <div class="small">Duration: {{ d.durationHours || (d.holes >= 18 ? 4 : 2) }} hours • Total: RM {{ d.amountRm | number:'1.2-2' }}</div>
            </div>
          </div>
          <!-- Mock score for completed bookings with styled scorecard -->
          <div *ngIf="d.status === 'completed' && modalScore() as s" class="mt-3">
            <div class="fw-semibold mb-2">Scorecard</div>
            <div class="scorecard">
              <!-- Front 9 -->
              <table class="score-table">
                <thead>
                  <tr>
                    <th>Hole</th>
                    <th *ngFor="let i of frontIdx(s)">{{ i + 1 }}</th>
                    <th>Out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Par</th>
                    <td *ngFor="let i of frontIdx(s)">{{ s.pars[i] }}</td>
                    <td>{{ totalRange(s.pars, 0, frontIdx(s).length) }}</td>
                  </tr>
                  <tr>
                    <th>Score</th>
                    <td *ngFor="let i of frontIdx(s)" class="score-cell">
                      <span *ngIf="rel(s,i) !== 0" class="badge-dot" [ngClass]="relClass(rel(s,i))">{{ relLabel(rel(s,i)) }}</span>
                      <span class="score-num">{{ s.strokes[i] }}</span>
                    </td>
                    <td>{{ totalRange(s.strokes, 0, frontIdx(s).length) }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Back 9 -->
              <table class="score-table" *ngIf="s.holes > 9">
                <thead>
                  <tr>
                    <th>Hole</th>
                    <th *ngFor="let i of backIdx(s)">{{ i + 1 }}</th>
                    <th>In</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Par</th>
                    <td *ngFor="let i of backIdx(s)">{{ s.pars[i] }}</td>
                    <td>{{ totalRange(s.pars, 9, backIdx(s).length) }}</td>
                  </tr>
                  <tr>
                    <th>Score</th>
                    <td *ngFor="let i of backIdx(s)" class="score-cell">
                      <span *ngIf="rel(s,i) !== 0" class="badge-dot" [ngClass]="relClass(rel(s,i))">{{ relLabel(rel(s,i)) }}</span>
                      <span class="score-num">{{ s.strokes[i] }}</span>
                    </td>
                    <td>{{ totalRange(s.strokes, 9, backIdx(s).length) }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="totals-line">
                <div>CR 74.5</div>
                <div>Score {{ s.gross }}/{{ total(s.pars) }}</div>
                <div>Slope 146</div>
              </div>
            </div>
          </div>
          <div class="d-flex gap-2 justify-content-end mt-3">
            <button class="btn btn-outline-secondary" (click)="closeDetails()">Close</button>
            <button *ngIf="d.status === 'upcoming'" class="btn btn-danger" (click)="cancel(d); closeDetails()">Cancel booking</button>
            <button *ngIf="d.status === 'cancelled' && !d.refundRequested" class="btn btn-warning" (click)="refund(d); closeDetails()">Request refund</button>
          </div>
        </div>
      </div>

      <div *ngIf="filtered().length === 0" class="text-center text-muted py-5">No bookings.</div>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; }
    .booking-card { border: 1px solid rgba(0,0,0,0.08); border-radius: 0.75rem; background: #fff; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1050; }
    .modal-sheet { position: fixed; left: 50%; top: 10%; transform: translateX(-50%); width: min(720px, 92vw); background: #fff; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,.2); overflow: hidden; z-index: 1060; }
    .modal-header { padding: .75rem 1rem; border-bottom: 1px solid rgba(0,0,0,.08); }
    .btn-close { background: transparent; border: 0; width: 32px; height: 32px; }

    /* Scorecard styles */
    .scorecard { border: 1px solid rgba(0,0,0,.08); border-radius: 12px; overflow: hidden; background: #fafafa; }
    .score-table { width: 100%; border-collapse: separate; border-spacing: 0; }
    .score-table + .score-table { border-top: 1px solid rgba(0,0,0,.06); }
    .score-table th, .score-table td { text-align: center; padding: 6px 8px; font-size: 12px; }
    .score-table thead th { background: #e6efe2; color: #2b3a2f; font-weight: 600; }
    .score-table tbody th { background: #f1f5f0; text-align: left; font-weight: 600; color: #2b3a2f; }
    .score-cell { position: relative; }
    .score-num { display: inline-block; min-width: 22px; height: 22px; line-height: 22px; border-radius: 6px; background: #fff; border: 1px solid rgba(0,0,0,.08); }
    .badge-dot { position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; border-radius: 999px; color: #fff; font-size: 10px; display: grid; place-items: center; }
    .badge-birdie { background: #2fbf71; }
    .badge-bogey { background: #f4a261; }
    .badge-eagle { background: #118ab2; }
    .badge-double { background: #e76f51; }
    .totals-line { display: flex; justify-content: space-between; padding: 8px 10px; background: #ffffff; border-top: 1px solid rgba(0,0,0,.06); font-size: 12px; color: #2b3a2f; }
    `
  ]
})
export class BookingsComponent {
  private readonly auth = inject(AuthService);
  readonly tab = signal<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  readonly bookings = computed<UserBooking[]>(() => this.auth.currentUser()?.bookings ?? []);
  readonly filtered = computed<UserBooking[]>(() => this.bookings().filter(b => b.status === this.tab()));
  readonly detailOpen = signal<boolean>(false);
  readonly selected = signal<UserBooking | null>(null);
  readonly modalScore = signal<{ holes: number; pars: number[]; strokes: number[]; gross: number } | null>(null);

  clubImage(club: string): string {
    // map club name to home page images
    const name = club.toLowerCase();
    if (name.includes('kinrara')) return 'assets/icons/kinrara1.png';
    if (name.includes('kota permai')) return 'assets/icons/kinrara2.jpeg';
    if (name.includes('bukit kemuning')) return 'assets/icons/kinrara3.png';
    return 'assets/icons/golf1.png';
  }

  viewDetails(_b: UserBooking): void {
    this.selected.set(_b);
    if (_b.status === 'completed') {
      this.modalScore.set(this.generateMockScore(_b));
    } else {
      this.modalScore.set(null);
    }
    this.detailOpen.set(true);
  }

  closeDetails(): void { this.detailOpen.set(false); }

  cancel(b: UserBooking): void {
    this.auth.updateBooking(b.id, { status: 'cancelled', paid: b.paid });
  }

  refund(b: UserBooking): void {
    this.auth.updateBooking(b.id, { refundRequested: true });
  }

  private generateMockScore(b: UserBooking): { holes: number; pars: number[]; strokes: number[]; gross: number } {
    const holes = b.holes || 18;
    // Base par pattern for 9 holes, duplicate if 18
    const base9 = [4,4,3,5,4,4,5,3,4];
    const pars = (holes === 9 ? base9 : [...base9, ...base9]).slice(0, holes);
    const rng = this.seededRandom(b.id);
    const strokes = pars.map(p => p + Math.floor(rng() * 3)); // par, par+1, par+2
    const gross = strokes.reduce((a, v) => a + v, 0);
    return { holes, pars, strokes, gross };
  }

  private seededRandom(seedStr: string): () => number {
    // Simple xorshift32 seeded RNG
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed << 5) - seed + seedStr.charCodeAt(i);
    if (seed === 0) seed = 123456789;
    return () => {
      let x = seed |= 0;
      x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
      seed = x;
      // Convert to 0..1
      return ((x >>> 0) % 1000) / 1000;
    };
  }

  total(arr: number[]): number {
    return arr.reduce((sum, v) => sum + v, 0);
  }

  frontIdx(s: { holes: number }): number[] {
    const len = Math.min(9, s.holes);
    return Array.from({ length: len }, (_, i) => i);
    }

  backIdx(s: { holes: number }): number[] {
    const len = s.holes - 9;
    return Array.from({ length: len }, (_, i) => i + 9);
  }

  totalRange(arr: number[], start: number, len: number): number {
    let sum = 0;
    for (let i = start; i < start + len && i < arr.length; i++) sum += arr[i];
    return sum;
  }

  rel(s: { pars: number[]; strokes: number[] }, i: number): number {
    return (s.strokes[i] ?? 0) - (s.pars[i] ?? 0);
  }

  relClass(diff: number): string {
    if (diff <= -2) return 'badge-eagle';
    if (diff === -1) return 'badge-birdie';
    if (diff === 1) return 'badge-bogey';
    if (diff >= 2) return 'badge-double';
    return '';
  }

  relLabel(diff: number): string {
    if (diff <= -2) return 'E';
    if (diff === -1) return 'B';
    if (diff === 1) return 'Bgy';
    if (diff >= 2) return 'DB';
    return '';
  }
}


