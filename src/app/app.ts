import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { SignInModalComponent } from './components/sign-in-modal.component';
import { ToastContainerComponent } from './components/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SignInModalComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-golf-app');
}
