import { Component, computed, inject, signal, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, UserBooking } from '../services/auth.service';

type ReportRange = 'daily' | 'weekly' | 'monthly';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgIf, NgFor, NgClass, DatePipe, DecimalPipe, TitleCasePipe, RouterLink, FormsModule],
  template: `
    <div class="admin-bg">
      <div class="container-fluid py-4">
        <div class="row gx-4 gy-3">
          <!-- Sidebar -->
          <aside class="col-12 col-lg-3 col-xl-2">
            <div class="admin-sidebar shadow-sm">
              <div class="px-3 py-3 border-bottom">
                <div class="h5 mb-0">Super Admin</div>
                <div class="text-muted small">Manage platform</div>
              </div>
              <nav class="list-group list-group-flush">
                <button class="list-group-item list-group-item-action d-flex align-items-center" [class.active]="section() === 'dashboard'" (click)="setSection('dashboard')">
                  <span class="me-2">📊</span> Dashboard
                </button>
                <button class="list-group-item list-group-item-action d-flex align-items-center" [class.active]="section() === 'courses'" (click)="setSection('courses')">
                  <span class="me-2">⛳</span> Golf Courses
                </button>
                <button class="list-group-item list-group-item-action d-flex align-items-center" [class.active]="section() === 'news'" (click)="setSection('news')">
                  <span class="me-2">📰</span> News
                </button>
                <button class="list-group-item list-group-item-action d-flex align-items-center" [class.active]="section() === 'events'" (click)="setSection('events')">
                  <span class="me-2">📅</span> Events
                </button>
                <button class="list-group-item list-group-item-action d-flex align-items-center" [class.active]="section() === 'tourneys'" (click)="setSection('tourneys')">
                  <span class="me-2">🏆</span> Golf Tourneys
                </button>
              </nav>
              <div class="px-3 py-3 border-top small text-muted">
                Tips: Click items to preview management tables.
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="col-12 col-lg-9 col-xl-10" #mainFrame [style.min-height.px]="minMainHeight() ?? null">
            <div class="admin-inner">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 class="mb-0">{{ pageTitle() }}</h2>
                <div class="text-muted small" *ngIf="section() === 'dashboard'">Overview of bookings and payments</div>
              </div>
              <div *ngIf="section() !== 'dashboard'">
                <button class="btn btn-primary rounded-pill px-3" disabled>
                  <span class="me-1">＋</span> Add New
                </button>
              </div>
            </div>

            <!-- Dashboard Section -->
            <ng-container *ngIf="section() === 'dashboard'">
              <!-- Tiles -->
              <div class="row g-3 mb-3" #dashboardBlock>
                <div class="col-12 col-md-4">
                  <div class="card elev-card h-100 glass">
                    <div class="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <div class="text-muted small">Ongoing</div>
                        <div class="h3 mb-0">{{ ongoingCount() }}</div>
                      </div>
                      <div class="badge rounded-pill bg-primary-subtle text-primary">Today</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="card elev-card h-100 glass">
                    <div class="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <div class="text-muted small">Past</div>
                        <div class="h3 mb-0">{{ pastCount() }}</div>
                      </div>
                      <div class="badge rounded-pill bg-success-subtle text-success">This Month</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="card elev-card h-100 glass">
                    <div class="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <div class="text-muted small">Cancelled</div>
                        <div class="h3 mb-0">{{ cancelledCount() }}</div>
                      </div>
                      <div class="badge rounded-pill bg-danger-subtle text-danger">All Time</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row g-3">
                <!-- Recent Activity -->
                <div class="col-12 col-lg-4">
                  <div class="card elev-card h-100 glass">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="mb-0">Recent Activity</h5>
                        <span class="small text-muted">Today</span>
                      </div>
                      <ul class="list-unstyled m-0">
                        <li *ngFor="let a of recentActivity()" class="d-flex align-items-start py-2 border-bottom small">
                          <span class="me-2 bullet" [ngClass]="activityColor(a)"></span>
                          <div>
                            <div class="fw-semibold">{{ a.club }}</div>
                            <div class="text-muted">{{ a.status | titlecase }} · {{ timeAgo(a.dateIso) }}</div>
                          </div>
                        </li>
                        <li *ngIf="recentActivity().length === 0" class="text-muted small">No recent activity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Reports -->
                <div class="col-12 col-lg-8">
                  <div class="card elev-card h-100 glass">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="mb-0">Reports</h5>
                        <div class="btn-group btn-group-sm" role="group">
                          <button class="btn" [ngClass]="{ 'btn-primary': range() === 'daily', 'btn-outline-primary': range() !== 'daily' }" (click)="setRange('daily')">Daily</button>
                          <button class="btn" [ngClass]="{ 'btn-primary': range() === 'weekly', 'btn-outline-primary': range() !== 'weekly' }" (click)="setRange('weekly')">Weekly</button>
                          <button class="btn" [ngClass]="{ 'btn-primary': range() === 'monthly', 'btn-outline-primary': range() !== 'monthly' }" (click)="setRange('monthly')">Monthly</button>
                        </div>
                      </div>

                      <div class="row g-3">
                        <div class="col-12 col-md-6">
                          <div class="p-3 border rounded-3 h-100">
                            <div class="small text-muted">Total Bookings</div>
                            <div class="display-6">{{ report().totalBookings }}</div>
                            <div class="progress" style="height: 6px;">
                              <div class="progress-bar bg-primary" role="progressbar" [style.width.%]="report().bookingPct"></div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="p-3 border rounded-3 h-100">
                            <div class="small text-muted">Revenue</div>
                            <div class="display-6">RM {{ report().revenue | number:'1.0-0' }}</div>
                            <div class="progress" style="height: 6px;">
                              <div class="progress-bar bg-success" role="progressbar" [style.width.%]="report().revenuePct"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive mt-3">
                        <table class="table align-middle">
                          <thead class="table-light">
                            <tr>
                              <th scope="col">Period</th>
                              <th scope="col">Bookings</th>
                              <th scope="col">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr *ngFor="let r of report().buckets">
                              <td>{{ r.label }}</td>
                              <td>{{ r.count }}</td>
                              <td>RM {{ r.revenue | number:'1.0-0' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recent Sales -->
                <div class="col-12">
                  <div class="card elev-card glass">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="mb-0">Recent Sales</h5>
                        <input class="form-control form-control-sm" style="max-width: 240px;" placeholder="Search..." [(ngModel)]="salesQuery" />
                      </div>
                      <div class="table-responsive">
                        <table class="table align-middle">
                          <thead class="table-light">
                            <tr>
                              <th>#</th>
                              <th>Customer</th>
                              <th>Club</th>
                              <th>Date</th>
                              <th>Price</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr *ngFor="let s of filteredSales(); let i = index">
                              <td class="text-muted">#{{ i + 1 }}</td>
                              <td>{{ currentUserName() }}</td>
                              <td>{{ s.club }}</td>
                              <td>{{ s.dateIso | date:'mediumDate' }}</td>
                              <td>RM {{ s.amountRm | number:'1.0-0' }}</td>
                              <td>
                                <span class="badge" [ngClass]="paymentBadgeClass(s)">{{ paymentStatus(s) }}</span>
                              </td>
                            </tr>
                            <tr *ngIf="filteredSales().length === 0">
                              <td colspan="6" class="text-center text-muted">No sales</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>

            <!-- Management Sections (Mock) -->
            <ng-container *ngIf="section() !== 'dashboard'">
              <div class="card elev-card glass">
                <div class="card-body">
                  <div class="table-responsive wide-table">
                    <table class="table align-middle">
                      <thead class="table-light">
                        <tr *ngIf="section() === 'courses'">
                          <th style="width: 80px;">Code</th>
                          <th>Name</th>
                          <th>City</th>
                          <th>Holes</th>
                          <th>Status</th>
                          <th class="text-end">Actions</th>
                        </tr>
                        <tr *ngIf="section() === 'news'">
                          <th style="width: 80px;">ID</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th class="text-end">Actions</th>
                        </tr>
                        <tr *ngIf="section() === 'events'">
                          <th style="width: 80px;">ID</th>
                          <th>Event</th>
                          <th>Date</th>
                          <th>Venue</th>
                          <th class="text-end">Actions</th>
                        </tr>
                        <tr *ngIf="section() === 'tourneys'">
                          <th style="width: 80px;">ID</th>
                          <th>Tournament</th>
                          <th>Date</th>
                          <th>Club</th>
                          <th class="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let c of courses()" [ngClass]="{ 'd-none': section() !== 'courses' }">
                          <td class="text-muted">{{ c.code }}</td>
                          <td>{{ c.name }}</td>
                          <td>{{ c.city }}</td>
                          <td>{{ c.holes }}</td>
                          <td><span class="badge bg-success">{{ c.status }}</span></td>
                          <td class="text-end">
                            <button class="btn btn-sm btn-outline-secondary me-2" disabled>Edit</button>
                            <button class="btn btn-sm btn-outline-danger" disabled>Delete</button>
                          </td>
                        </tr>

                        <tr *ngFor="let n of news()" [ngClass]="{ 'd-none': section() !== 'news' }">
                          <td class="text-muted">{{ n.id }}</td>
                          <td>{{ n.title }}</td>
                          <td>{{ n.date | date:'mediumDate' }}</td>
                          <td><span class="badge bg-info text-dark">{{ n.status }}</span></td>
                          <td class="text-end">
                            <button class="btn btn-sm btn-outline-secondary me-2" disabled>Edit</button>
                            <button class="btn btn-sm btn-outline-danger" disabled>Delete</button>
                          </td>
                        </tr>

                        <tr *ngFor="let e of events()" [ngClass]="{ 'd-none': section() !== 'events' }">
                          <td class="text-muted">{{ e.id }}</td>
                          <td>{{ e.title }}</td>
                          <td>{{ e.date | date:'mediumDate' }}</td>
                          <td>{{ e.venue }}</td>
                          <td class="text-end">
                            <button class="btn btn-sm btn-outline-secondary me-2" disabled>Edit</button>
                            <button class="btn btn-sm btn-outline-danger" disabled>Delete</button>
                          </td>
                        </tr>

                        <tr *ngFor="let t of tourneys()" [ngClass]="{ 'd-none': section() !== 'tourneys' }">
                          <td class="text-muted">{{ t.id }}</td>
                          <td>{{ t.title }}</td>
                          <td>{{ t.date | date:'mediumDate' }}</td>
                          <td>{{ t.club }}</td>
                          <td class="text-end">
                            <button class="btn btn-sm btn-outline-secondary me-2" disabled>Edit</button>
                            <button class="btn btn-sm btn-outline-danger" disabled>Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ng-container>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host{display:block}
    .admin-bg{background: radial-gradient(1200px 400px at 10% -10%, rgba(99,102,241,.12), transparent 60%), radial-gradient(1200px 400px at 100% 10%, rgba(16,185,129,.12), transparent 60%), linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)}
    .admin-sidebar{backdrop-filter: blur(8px); background: rgba(255,255,255,.7); border-radius: 12px; overflow: hidden}
    .admin-sidebar .list-group-item{border:0; border-radius:0; padding:.8rem 1rem; background: transparent}
    .admin-sidebar .list-group-item:hover{background: rgba(16,24,40,.03)}
    .admin-sidebar .list-group-item.active{background: #0d6efd; color: #fff}
    .admin-inner{max-width: 1120px; margin: 0 auto}
    .wide-table{min-width: 900px}
    .glass{background: rgba(255,255,255,.8); backdrop-filter: blur(6px);}
    .bullet{width:10px;height:10px;border-radius:50%;display:inline-block;margin-top:6px}
    .bg-primary-subtle{background-color:rgba(13,110,253,.1)!important}
    .bg-success-subtle{background-color:rgba(25,135,84,.1)!important}
    .bg-danger-subtle{background-color:rgba(220,53,69,.1)!important}
    `
  ]
})
export class AdminDashboardComponent implements AfterViewInit {
  private readonly auth = inject(AuthService);

  readonly bookings = computed<UserBooking[]>(() => this.auth.currentUser()?.bookings ?? []);
  readonly currentUserName = computed(() => this.auth.currentUser()?.name ?? 'User');

  // Sidebar section state
  section = signal<'dashboard' | 'courses' | 'news' | 'events' | 'tourneys'>('dashboard');
  setSection(s: 'dashboard' | 'courses' | 'news' | 'events' | 'tourneys'){ this.section.set(s); }
  readonly pageTitle = computed(() => {
    const s = this.section();
    if (s === 'dashboard') return 'Admin Dashboard';
    if (s === 'courses') return 'Manage Golf Courses';
    if (s === 'news') return 'Manage News';
    if (s === 'events') return 'Manage Events';
    return 'Manage Golf Tourneys';
  });

  // Maintain stable main container height based on dashboard content
  @ViewChild('mainFrame', { static: false }) mainFrame?: ElementRef<HTMLElement>;
  @ViewChild('dashboardBlock', { static: false }) dashboardBlock?: ElementRef<HTMLElement>;
  minMainHeight = signal<number | null>(null);
  ngAfterViewInit(): void {
    // Measure after view settles
    queueMicrotask(() => {
      const block = this.dashboardBlock?.nativeElement;
      const frame = this.mainFrame?.nativeElement;
      if (block && frame) {
        const measured = frame.getBoundingClientRect().height;
        const fallback = block.getBoundingClientRect().height + 300; // generous allowance for following sections
        const base = Math.max(measured, fallback);
        this.minMainHeight.set(Math.ceil(base));
      }
    });
  }

  readonly ongoingCount = computed(() => this.bookings().filter(b => b.status === 'upcoming').length);
  readonly pastCount = computed(() => this.bookings().filter(b => b.status === 'completed').length);
  readonly cancelledCount = computed(() => this.bookings().filter(b => b.status === 'cancelled').length);

  readonly recentActivity = computed(() => {
    return [...this.bookings()]
      .sort((a,b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
      .slice(0, 6);
  });

  range = signal<ReportRange>('daily');
  setRange(r: ReportRange){ this.range.set(r); }

  readonly report = computed(() => this.buildReport(this.range()));

  salesQuery = '';
  filteredSales(): UserBooking[] {
    const q = (this.salesQuery || '').toLowerCase().trim();
    if (!q) return this.bookings();
    return this.bookings().filter(b =>
      b.club.toLowerCase().includes(q) || this.currentUserName().toLowerCase().includes(q)
    );
  }

  activityColor(b: UserBooking){
    return {
      'bg-primary': b.status === 'upcoming',
      'bg-success': b.status === 'completed',
      'bg-danger': b.status === 'cancelled'
    };
  }

  timeAgo(iso: string): string {
    const diffMs = Date.now() - new Date(iso).getTime();
    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (day > 0) return day + (day === 1 ? ' day' : ' days');
    if (hr > 0) return hr + (hr === 1 ? ' hr' : ' hrs');
    if (min > 0) return min + ' min';
    return 'just now';
  }

  paymentStatus(b: UserBooking): 'Approved' | 'Pending' | 'Rejected' | 'Refunded' {
    if (b.refundRequested) return 'Refunded';
    if (b.paid) return 'Approved';
    if (!b.paid && b.status === 'cancelled') return 'Rejected';
    return 'Pending';
  }

  paymentBadgeClass(b: UserBooking){
    const s = this.paymentStatus(b);
    return {
      'bg-success': s === 'Approved',
      'bg-warning text-dark': s === 'Pending',
      'bg-danger': s === 'Rejected',
      'bg-info text-dark': s === 'Refunded'
    };
  }

  // Mock admin lists for management sections
  courses = signal([
    { code: 'KIN', name: 'Kinrara Golf Club', city: 'Puchong', holes: 18, status: 'Active' },
    { code: 'KPG', name: 'Kota Permai G&CC', city: 'Kota Kemuning', holes: 18, status: 'Active' },
    { code: 'BKG', name: 'Bukit Kemuning GCR', city: 'Shah Alam', holes: 18, status: 'Active' }
  ]);
  news = signal([
    { id: 'N-1024', title: 'Course renovation update', date: new Date(), status: 'Scheduled' },
    { id: 'N-1003', title: 'Membership promo extended', date: new Date(Date.now()-86400000*4), status: 'Published' }
  ]);
  events = signal([
    { id: 'E-220', title: 'Junior Golf Clinic', date: new Date(Date.now()+86400000*7), venue: 'Kinrara' },
    { id: 'E-219', title: 'Night Range Party', date: new Date(Date.now()+86400000*14), venue: 'Kota Permai' }
  ]);
  tourneys = signal([
    { id: 'T-88', title: 'Selangor Open Qualifier', date: new Date(Date.now()+86400000*30), club: 'Kota Permai' },
    { id: 'T-72', title: 'Kinrara Monthly Medal', date: new Date(Date.now()+86400000*21), club: 'Kinrara' }
  ]);

  private buildReport(range: ReportRange){
    const now = new Date();
    const buckets: { label: string; start: Date; end: Date; count: number; revenue: number }[] = [];
    const addBucket = (label: string, start: Date, end: Date) => buckets.push({ label, start, end, count: 0, revenue: 0 });

    if (range === 'daily'){
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
        addBucket(d.toLocaleDateString(undefined, { weekday: 'short' }), start, end);
      }
    } else if (range === 'weekly'){
      // last 6 weeks
      const currentMonday = new Date(now);
      const day = currentMonday.getDay();
      const diffToMonday = (day + 6) % 7; // 0->6, 1->0
      currentMonday.setDate(now.getDate() - diffToMonday);
      for (let i = 5; i >= 0; i--) {
        const start = new Date(currentMonday);
        start.setDate(start.getDate() - i * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        addBucket('Wk ' + this.weekNumber(start), start, end);
      }
    } else {
      // monthly: last 6 months
      for (let i = 5; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
        addBucket(start.toLocaleDateString(undefined, { month: 'short' }), start, end);
      }
    }

    for (const b of this.bookings()){
      const bookedAt = new Date(b.dateIso);
      for (const bucket of buckets){
        if (bookedAt >= bucket.start && bookedAt <= bucket.end){
          bucket.count += 1;
          bucket.revenue += b.paid ? (b.amountRm || 0) : 0;
          break;
        }
      }
    }

    const totalBookings = buckets.reduce((s, b) => s + b.count, 0);
    const totalRevenue = buckets.reduce((s, b) => s + b.revenue, 0);
    const maxBookings = Math.max(1, ...buckets.map(b => b.count));
    const maxRevenue = Math.max(1, ...buckets.map(b => b.revenue));

    return {
      totalBookings,
      revenue: totalRevenue,
      bookingPct: Math.min(100, Math.round((totalBookings / (maxBookings * buckets.length)) * 100)),
      revenuePct: Math.min(100, Math.round((totalRevenue / (maxRevenue * buckets.length)) * 100)),
      buckets
    };
  }

  private weekNumber(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date as any) - (yearStart as any)) / 86400000 + 1) / 7);
  }
}


