import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { BookingComponent } from './pages/booking.component';
import { BookingsComponent } from './pages/bookings.component';
import { HistoryComponent } from './pages/history.component';
import { CoursesComponent } from './pages/courses.component';
import { NewsComponent } from './pages/news.component';
import { EventsComponent } from './pages/events.component';
import { TournamentsComponent } from './pages/tournaments.component';
import { ContactComponent } from './pages/contact.component';
import { ProfileComponent } from './pages/profile.component';
import { AdminDashboardComponent } from './pages/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
