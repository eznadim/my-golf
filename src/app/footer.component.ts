import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer mt-auto text-light">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-12 col-lg-4">
            <div class="d-flex align-items-start gap-2 mb-3">
              <img src="assets/icons/golf1.png" alt="GolfersGo" width="36" height="36" />
              <div class="h5 m-0">GolfersGo</div>
            </div>
            <p class="text-white-50 small mb-3">One stop where all the golfers go.</p>
            <div class="small text-white-50">© GolfersGo {{ year }}. All rights reserved.</div>
          </div>

          <div class="col-6 col-lg-2">
            <div class="h6 mb-3">Products</div>
            <ul class="list-unstyled small">
              <li><a class="link" routerLink="/" >App</a></li>
              <li><a class="link" routerLink="/membership">Gold Membership</a></li>
              <li><a class="link" routerLink="/benefits">Member Benefits</a></li>
              <li><a class="link" routerLink="/tournaments">Tournament Manager</a></li>
            </ul>
          </div>

          <div class="col-6 col-lg-2">
            <div class="h6 mb-3">Company</div>
            <ul class="list-unstyled small">
              <li><a class="link" routerLink="/about">About us</a></li>
              <li><a class="link" routerLink="/careers">Careers</a></li>
            </ul>
          </div>

          <div class="col-6 col-lg-2">
            <div class="h6 mb-3">Useful links</div>
            <ul class="list-unstyled small">
              <li><a class="link" routerLink="/support">App Support</a></li>
              <li><a class="link" routerLink="/support">TM Support</a></li>
              <li><a class="link" routerLink="/articles">Articles</a></li>
            </ul>
          </div>

          <div class="col-6 col-lg-2">
            <div class="h6 mb-3">Resources</div>
            <ul class="list-unstyled small">
              <li><a class="link" routerLink="/advertisers">Advertisers</a></li>
              <li><a class="link" routerLink="/press">Press</a></li>
              <li><a class="link" routerLink="/community">Community</a></li>
            </ul>
          </div>
        </div>

        <hr class="border-light border-opacity-25 my-4">

        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 small text-white-50">
          <div class="d-flex align-items-center gap-3">
            <a class="icon" href="#" aria-label="Facebook"><img src="assets/icons/facebook.svg" alt="fb" width="20" height="20"></a>
            <a class="icon" href="#" aria-label="Instagram"><img src="assets/icons/instagram.svg" alt="ig" width="20" height="20"></a>
            <a class="icon" href="#" aria-label="LinkedIn"><img src="assets/icons/linkedin.svg" alt="in" width="20" height="20"></a>
            <a class="icon" href="#" aria-label="YouTube"><img src="assets/icons/youtube.svg" alt="yt" width="22" height="22"></a>
            <a class="icon" href="#" aria-label="TikTok"><img src="assets/icons/tiktok.svg" alt="tt" width="18" height="18"></a>
          </div>
          <div class="d-flex gap-3">
            <a class="link" routerLink="/terms">Terms of Use</a>
            <a class="link" routerLink="/privacy">Privacy Policy</a>
            <a class="link" routerLink="/cookies">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer { background: #0d2a1e; background-image: radial-gradient(80rem 40rem at -10% -10%, rgba(47,190,110,0.12), transparent 60%), radial-gradient(60rem 30rem at 110% 10%, rgba(18,110,64,0.1), transparent 60%); }
    .link { color: rgba(255,255,255,.7); text-decoration: none; }
    .link:hover { color: #fff; text-decoration: underline; }
    .icon img { filter: brightness(0) invert(1); opacity: .85; }
    .icon img:hover { opacity: 1; }
    `
  ]
})
export class FooterComponent { year = new Date().getFullYear(); }


