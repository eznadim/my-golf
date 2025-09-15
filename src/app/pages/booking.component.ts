import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type CalendarCell = {
  date: Date | null;
  inMonth: boolean;
};

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="container py-4">
      <!-- Loading / Success overlays -->
      <div *ngIf="isLoading()" class="overlay">
        <div class="overlay-card">
          <img src="assets/icons/loading.gif" alt="Loading" class="overlay-gif" />
          <div class="h6 mt-2">Booking your Tee Time…</div>
        </div>
      </div>
      <div *ngIf="isSuccess()" class="overlay">
        <div class="overlay-card">
          <img src="assets/icons/hole.gif" alt="Success" class="overlay-gif" />
          <div class="h6 mt-2">Your Booking has been confirmed!</div>
          <div class="d-flex gap-2 mt-3">
            <a class="btn btn-outline-secondary" routerLink="/">Go Home</a>
            <a class="btn btn-success" routerLink="/bookings">My Bookings</a>
          </div>
        </div>
      </div>
      <div class="section-framed p-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <button class="nav-arrow" (click)="onPrevMonth()" [disabled]="isPrevMonthFullyPast()" aria-label="Previous month">‹</button>
          <h2 class="h5 m-0 text-uppercase">{{ monthLabel }}</h2>
          <button class="nav-arrow" (click)="onNextMonth()" aria-label="Next month">›</button>
        </div>

        <div class="calendar">
          <div class="calendar-head">
            <div *ngFor="let d of weekDayLabels" class="dow">{{ d }}</div>
          </div>
          <div class="calendar-grid">
            <ng-container *ngFor="let cell of calendar; let i = index">
              <button
                class="day"
                [class.muted]="!cell.inMonth"
                [class.today]="isToday(cell.date)"
                [class.selected]="isSelected(cell.date)"
                [disabled]="isDisabled(cell)"
                [attr.title]="availabilityTitle(cell)"
                (click)="onSelectDate(cell.date!)"
              >
                <span *ngIf="cell.date as d">{{ d.getDate() }}</span>
              </button>
            </ng-container>
          </div>
        </div>
      </div>

      <div [class.blurred]="isLoading() || isSuccess()" *ngIf="selectedDate() as sel" class="mt-4 section-framed p-3">
        <h3 class="h5 mb-3">Available Appointments on {{ sel | date:'MMM d, y' }}</h3>

        <div class="session-card elev-card p-3 d-flex align-items-center justify-content-between mb-3">
          <div>
            <div class="fw-semibold">Morning Session</div>
            <div class="text-muted-kgc small">7:05 am – 12:00 pm</div>
          </div>
          <button class="btn btn-success rounded-pill px-3" (click)="openModal('Morning')">Book Appointment</button>
        </div>

        <div class="session-card elev-card p-3 d-flex align-items-center justify-content-between">
          <div>
            <div class="fw-semibold">Afternoon Session</div>
            <div class="text-muted-kgc small">2:05 pm – 5:00 pm</div>
          </div>
          <button class="btn btn-success rounded-pill px-3" (click)="openModal('Afternoon')">Book Appointment</button>
        </div>
      </div>

      <div [class.blurred]="isLoading() || isSuccess()" *ngIf="!selectedDate()" class="text-muted-kgc small mt-3">Select a date to see available sessions.</div>

      <!-- Modal -->
      <div class="modal-backdrop" *ngIf="showModal()" (click)="closeModal()"></div>
      <div class="modal-sheet" *ngIf="showModal()" role="dialog" aria-modal="true">
        <div class="modal-header d-flex justify-content-between align-items-center">
          <div class="h6 m-0">Book Appointment — {{ selectedDate() | date:'MMM d, y' }} ({{ selectedSession() }})</div>
          <button class="btn-close" aria-label="Close" (click)="closeModal()"></button>
        </div>
        <form [formGroup]="form" (ngSubmit)="submit()" class="p-3">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label small">Full Name</label>
              <input class="form-control" [class.is-invalid]="showErrors() && form.controls['name'].invalid" formControlName="name" placeholder="Your name" />
              <div class="invalid-feedback" *ngIf="showErrors() && form.controls['name'].errors">Name is required.</div>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small">Phone</label>
              <input class="form-control" [class.is-invalid]="showErrors() && form.controls['phone'].invalid" formControlName="phone" placeholder="e.g. 0123456789" />
              <div class="invalid-feedback" *ngIf="showErrors() && form.controls['phone'].errors">Phone must be at least 10 digits.</div>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small">Players</label>
              <select class="form-select" [class.is-invalid]="showErrors() && form.controls['players'].invalid" formControlName="players">
                <option *ngFor="let p of [1,2,3,4]" [value]="p">{{ p }}</option>
              </select>
              <div class="invalid-feedback" *ngIf="showErrors() && form.controls['players'].errors">At least 1 player.</div>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small">Golf Course</label>
              <select class="form-select" [class.is-invalid]="showErrors() && form.controls['course'].invalid" formControlName="course">
                <option value="" disabled selected>Select course…</option>
                <option value="9">9 Holes</option>
                <option value="18">18 Holes</option>
              </select>
              <div class="invalid-feedback" *ngIf="showErrors() && form.controls['course'].errors">Choose 9 or 18 holes.</div>
            </div>
            <div class="col-12 col-md-6 d-flex align-items-end">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="caddy" formControlName="caddy">
                <label class="form-check-label" for="caddy">Add Caddy (RM50)</label>
              </div>
            </div>
          </div>
          <div class="price-box section-framed mt-3 p-3">
            <div class="d-flex justify-content-between small mb-1"><span>Base rate per player ({{ isWeekend(selectedDate()!) ? 'Weekend' : 'Weekday' }})</span><strong>RM {{ baseRatePerPlayer() }}</strong></div>
            <div class="d-flex justify-content-between small mb-1"><span>Course fee per player ({{ form.controls['course'].value || '-' }} holes)</span><strong>RM {{ courseRatePerPlayer() }}</strong></div>
            <div class="d-flex justify-content-between small mb-1"><span>Players</span><strong>{{ form.controls['players'].value }}</strong></div>
            <div class="d-flex justify-content-between small mb-1"><span>Carts (auto: 1 per 2 players)</span><strong>{{ cartsCount() }}</strong></div>
            <div class="d-flex justify-content-between small mb-1" *ngIf="form.controls['caddy'].value"><span>Caddy</span><strong>RM 50</strong></div>
            <hr class="my-2">
            <div class="d-flex justify-content-between"><span class="fw-semibold">Total</span><strong>RM {{ totalPrice() }}</strong></div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-3">
            <button type="button" class="btn btn-outline-secondary" (click)="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-success">Confirm Booking</button>
          </div>
        </form>
      </div>

      <div [class.blurred]="isLoading() || isSuccess()" *ngIf="confirmation() as ok" class="alert alert-success mt-3" role="alert">
        Booking received for <strong>{{ ok.date | date:'mediumDate' }}</strong> — <strong>{{ ok.session }}</strong>.
      </div>
    </section>
  `,
  styles: [
    `
    .container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }
    .section-framed { border: 1px solid rgba(0,0,0,0.08); border-radius: 0.75rem; background: #fff; }

    .nav-arrow { border: none; background: #a29a62; color: #fff; width: 32px; height: 32px; border-radius: 999px; line-height: 1; }
    .nav-arrow:disabled { opacity: .4; cursor: not-allowed; }

    .calendar { }
    .calendar-head { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 0.5rem; }
    .dow { font-size: .8rem; text-transform: uppercase; color: #6c757d; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }

    .day { position: relative; aspect-ratio: 1/1; width: 100%; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; background: #f8f9fa; color: #212529; display: flex; align-items: center; justify-content: center; font-weight: 500; }
    .day:hover:not(:disabled) { background: #e7ead9; border-color: #a3ad74; }
    .day.today { outline: 2px solid #a29a62; background: #fff; }
    .day.selected { background: #a29a62; color: #fff; }
    .day.muted { color: #adb5bd; background: #f1f3f5; }
    .day:disabled { color: #adb5bd; background: #f1f3f5; cursor: not-allowed; }

    .session-card { border: 1px solid rgba(0,0,0,0.08); border-radius: 0.75rem; background: #fff; }

    /* Simple modal */
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); }
    .modal-sheet { position: fixed; left: 50%; top: 10%; transform: translateX(-50%); width: min(720px, 92vw); background: #fff; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,.2); overflow: hidden; z-index: 1050; }
    .modal-header { padding: .75rem 1rem; border-bottom: 1px solid rgba(0,0,0,.08); }
    .btn-close { background: transparent; border: 0; width: 32px; height: 32px; }

    /* Overlay with blur */
    .overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(255,255,255,.5); backdrop-filter: blur(3px); z-index: 2000; }
    .overlay-card { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 0.75rem; padding: 1rem 1.25rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,.15); }
    .overlay-gif { width: 96px; height: 96px; object-fit: contain; }
    .blurred { filter: blur(2px); pointer-events: none; user-select: none; }
    `
  ]
})
export class BookingComponent {
  private readonly today = new Date();
  currentYear = signal<number>(this.today.getFullYear());
  currentMonth = signal<number>(this.today.getMonth()); // 0-11
  selectedDate = signal<Date | null>(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()));
  showModal = signal<boolean>(false);
  selectedSession = signal<'Morning' | 'Afternoon' | null>(null);
  confirmation = signal<{ date: Date; session: string } | null>(null);
  isLoading = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

  form: FormGroup;
  showErrors = signal<boolean>(false);

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      players: [1, [Validators.required, Validators.min(1)]],
      course: ['', [Validators.required]],
      caddy: [false]
    });
  }

  get monthLabel(): string {
    const d = new Date(this.currentYear(), this.currentMonth(), 1);
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }

  weekDayLabels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  get calendar(): CalendarCell[] {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: CalendarCell[] = [];
    // leading blanks
    for (let i = 0; i < startDay; i++) {
      cells.push({ date: null, inMonth: false });
    }
    // days of month
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ date: new Date(year, month, day), inMonth: true });
    }
    // trailing blanks to complete weeks
    while (cells.length % 7 !== 0) {
      cells.push({ date: null, inMonth: false });
    }
    return cells;
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const t = this.today;
    return date.getFullYear() === t.getFullYear() && date.getMonth() === t.getMonth() && date.getDate() === t.getDate();
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate()) return false;
    const s = this.selectedDate()!;
    return date.getFullYear() === s.getFullYear() && date.getMonth() === s.getMonth() && date.getDate() === s.getDate();
  }

  isDisabled(cell: CalendarCell): boolean {
    if (!cell.date || !cell.inMonth) return true;
    const startOfToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    return cell.date < startOfToday;
  }

  availabilityTitle(cell: CalendarCell): string | null {
    if (!cell.date || this.isDisabled(cell)) return null;
    // We present two sessions available for selectable dates
    return '2 Available';
  }

  onSelectDate(date: Date): void {
    this.selectedDate.set(date);
  }

  onPrevMonth(): void {
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 0) { this.currentMonth.set(11); this.currentYear.set(y - 1); } else { this.currentMonth.set(m - 1); }
  }

  onNextMonth(): void {
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 11) { this.currentMonth.set(0); this.currentYear.set(y + 1); } else { this.currentMonth.set(m + 1); }
  }

  isPrevMonthFullyPast(): boolean {
    // Prevent navigating to months strictly before current month of current year? Allow nav but keep dates disabled.
    // We keep nav allowed but disable only if previous month/year is far past. To keep UX simple, never disable.
    return false;
  }

  openModal(session: 'Morning' | 'Afternoon'): void {
    this.selectedSession.set(session);
    this.showModal.set(true);
    this.form.markAsPristine();
    this.showErrors.set(false);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  submit(): void {
    if (this.form.invalid || !this.selectedDate() || !this.selectedSession()) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;
    }
    this.confirmation.set({ date: this.selectedDate()!, session: this.selectedSession()! });
    this.showModal.set(false);
    // show loading, then success after 3s
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      // auto-hide success after a while? keep visible until user navigates
    }, 3000);
  }

  // Pricing helpers
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sun or Sat
  }

  baseRatePerPlayer(): number {
    const d = this.selectedDate();
    if (!d) return 0;
    return this.isWeekend(d) ? 120 : 100;
  }

  courseRatePerPlayer(): number {
    const course = this.form.controls['course'].value;
    if (course === '9' || course === 9) return 60;
    if (course === '18' || course === 18) return 100;
    return 0;
  }

  cartsCount(): number {
    const players = Number(this.form.controls['players'].value || 0);
    return Math.ceil(players / 2);
  }

  totalPrice(): number {
    const players = Number(this.form.controls['players'].value || 0);
    const base = this.baseRatePerPlayer();
    const course = this.courseRatePerPlayer();
    const caddy = this.form.controls['caddy'].value ? 50 : 0;
    return players * (base + course) + caddy;
  }

  ngOnInit(): void {
    // Read ?club= query parameter if present to pre-fill UI cues later (future enhancement)
    const qp = this.route.snapshot.queryParamMap;
    const club = qp.get('club');
    if (club) {
      // Currently we just keep it for potential display; no pricing change
      // Example: could set a hidden control or show a badge
    }
  }
}


