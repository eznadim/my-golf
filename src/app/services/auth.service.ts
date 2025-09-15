import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface MembershipAccessItem {
  key: string;         // identifier: golf, range, tennis, pool, dining, spa
  label: string;       // display label
  status: 'full' | 'discount' | 'locked';
  discountPercent?: number; // present if status === 'discount'
}

export interface UserBooking {
  id: string;
  club: string;
  dateIso: string;   // ISO date
  timeRange: string; // e.g. 07:00 - 11:00
  players: number;
  holes: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  amountRm: number;
  paid: boolean;
  caddy?: boolean;
  durationHours?: number;
  refundRequested?: boolean;
}

export interface UserScoreGame {
  id: string;
  club: string;
  dateIso: string;
  holes: number;
  gross: number;
  net?: number;
}

export interface AuthUserProfile {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  email?: string;
  isSuperAdmin?: boolean;
  membership?: MembershipAccessItem[];
  bookings?: UserBooking[];
  scores?: UserScoreGame[];
}

const STORAGE_KEY = 'gg_auth_user_v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Holds current signed-in user or null
  readonly currentUser = signal<AuthUserProfile | null>(null);

  // UI state for opening/closing the sign-in modal
  readonly isSignInOpen = signal(false);

  // Derived state: whether a user is authenticated
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.restoreFromStorage();
    this.seedMockDataIfEmpty();
  }

  openSignIn(): void {
    this.isSignInOpen.set(true);
  }

  closeSignIn(): void {
    this.isSignInOpen.set(false);
  }

  // Mock sign in: accept any phone/password and create a simple profile
  async signIn(phone: string, _password: string, isSuperAdmin?: boolean): Promise<AuthUserProfile> {
    const trimmedPhone = (phone || '').trim();
    if (!trimmedPhone) {
      throw new Error('Phone number is required');
    }

    const profile: AuthUserProfile = this.mergeDefaults({
      id: crypto.randomUUID(),
      name: this.generateDisplayName(trimmedPhone),
      phone: trimmedPhone,
      avatarUrl: 'assets/icons/user.svg',
      isSuperAdmin: !!isSuperAdmin
    });

    this.currentUser.set(profile);
    this.save();
    this.closeSignIn();
    return profile;
  }

  signOut(): void {
    this.currentUser.set(null);
    this.storage()?.removeItem(STORAGE_KEY);
  }

  private restoreFromStorage(): void {
    try {
      const raw = this.storage()?.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AuthUserProfile;
      // Ensure defaults exist in case of older schema
      this.currentUser.set(this.mergeDefaults(parsed));
    } catch {
      // Ignore corrupted storage
      this.storage()?.removeItem(STORAGE_KEY);
    }
  }

  private storage(): Storage | null {
    if (!this.isBrowser) return null;
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  private seedMockDataIfEmpty(): void {
    if (!this.isBrowser) return;
    const user = this.currentUser();
    if (!user) return;
    let changed = false;
    if (!user.bookings || user.bookings.length === 0) {
      const today = new Date();
      const d = (offsetDays: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offsetDays).toISOString();
      user.bookings = [
        { id: crypto.randomUUID(), club: 'Kinrara Golf Club', dateIso: d(5), timeRange: '07:00 AM - 11:00 AM', players: 2, holes: 18, caddy: true, durationHours: 4, status: 'upcoming', amountRm: 240, paid: true },
        { id: crypto.randomUUID(), club: 'Kota Permai G&CC', dateIso: d(-14), timeRange: '02:00 PM - 05:00 PM', players: 4, holes: 18, caddy: false, durationHours: 3, status: 'completed', amountRm: 520, paid: true },
        { id: crypto.randomUUID(), club: 'Bukit Kemuning GCR', dateIso: d(-3), timeRange: '08:00 AM - 12:00 PM', players: 3, holes: 9, caddy: false, durationHours: 2, status: 'cancelled', amountRm: 180, paid: false, refundRequested: false }
      ];
      changed = true;
    }
    if (!user.scores || user.scores.length === 0) {
      user.scores = [
        { id: crypto.randomUUID(), club: 'Kinrara Golf Club', dateIso: new Date().toISOString(), holes: 18, gross: 92, net: 86 },
        { id: crypto.randomUUID(), club: 'Kota Permai G&CC', dateIso: new Date(Date.now() - 86400000 * 15).toISOString(), holes: 18, gross: 88, net: 82 }
      ];
      changed = true;
    }
    if (changed) this.save();
  }

  private generateDisplayName(phone: string): string {
    // Create a light mock name based on phone
    const suffix = phone.slice(-4).padStart(4, '0');
    return `Golfer ${suffix}`;
  }

  updateProfile(partial: Partial<AuthUserProfile>): void {
    const existing = this.currentUser();
    if (!existing) return;
    const updated = this.mergeDefaults({ ...existing, ...partial });
    this.currentUser.set(updated);
    this.save();
  }

  addBooking(booking: UserBooking): void {
    const user = this.currentUser();
    if (!user) return;
    const bookings = [...(user.bookings ?? []), booking];
    this.updateProfile({ bookings });
  }

  updateBooking(bookingId: string, updates: Partial<UserBooking>): void {
    const user = this.currentUser();
    if (!user || !user.bookings) return;
    const bookings = user.bookings.map(b => b.id === bookingId ? { ...b, ...updates } : b);
    this.updateProfile({ bookings });
  }

  private save(): void {
    const user = this.currentUser();
    if (!user) return;
    this.storage()?.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private mergeDefaults(user: AuthUserProfile): AuthUserProfile {
    return {
      ...user,
      membership: user.membership && user.membership.length ? user.membership : this.defaultMembership(),
      bookings: user.bookings ?? [],
      scores: user.scores ?? []
    };
  }

  private defaultMembership(): MembershipAccessItem[] {
    return [
      { key: 'golf', label: 'Golf', status: 'full' },
      { key: 'range', label: 'Driving Range', status: 'locked' },
      { key: 'tennis', label: 'Tennis', status: 'locked' },
      { key: 'pool', label: 'Pool', status: 'locked' },
      { key: 'dining', label: 'Dining', status: 'discount', discountPercent: 20 },
      { key: 'spa', label: 'Spa', status: 'discount', discountPercent: 15 }
    ];
  }
}


