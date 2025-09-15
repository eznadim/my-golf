import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="hero-header position-relative pt-5">
      <img src="assets/icons/golferbg.jpg" class="hero-bg" />
      <div class="hero-overlay"></div>
      <div class="container position-relative d-flex flex-column justify-content-center align-items-center text-center" style="min-height: 75vh;">
        <h1 class="hover-underline">GolfersGo</h1>
        <p class="lead opacity-75 mb-4">One stop where all the golfers go</p>
        <div class="d-flex gap-2">
          <a class="btn btn-success rounded-pill px-3" routerLink="/booking">Become a Member</a>
          <a class="btn btn-outline-dark rounded-pill px-3" routerLink="/courses">Explore Clubs</a>
        </div>
      </div>
    </header>

    <section id="how" class="py-5 section-white">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">How It Works</span>
          <h2 class="display-6 mt-1">Book in minutes</h2>
          <p class="text-white-50">Follow these simple steps to lock your tee time.</p>
        </div>
        <ol class="row g-4 section-framed p-3 list-unstyled m-0">
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">1. Choose a club</div>
              <p class="text-muted-kgc mb-0">Pick Kinrara, Kota Permai, or Bukit Kemuning.</p>
                </div>
          </li>
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">2. Pick your date</div>
              <p class="text-muted-kgc mb-0">Select a day with available sessions.</p>
                    </div>
          </li>
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">3. Fill the form</div>
              <p class="text-muted-kgc mb-0">Tell us who’s playing and your preferences.</p>
                  </div>
          </li>
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">4. Pay with DuitNow QR</div>
              <p class="text-muted-kgc mb-0">Instant confirmation once payment is received.</p>
                </div>
          </li>
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">5. Check in at counter</div>
              <p class="text-muted-kgc mb-0">Provide your reservation name on arrival.</p>
            </div>
          </li>
          <li class="col-12 col-md-6 col-lg-4">
            <div class="elev-card h-100 p-3">
              <div class="h4 m-0">6. Enjoy your tee time</div>
              <p class="text-muted-kgc mb-0">Have a great round!</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="clubs" class="py-5">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">Featured Clubs</span>
          <h2 class="display-6 mt-1">Pick a club, book in seconds</h2>
        </div>
        <div class="row g-4">
          <div class="col-12 col-md-4">
            <div class="card elev-card h-100 overflow-hidden">
              <img src="assets/icons/kinrara1.png" alt="Kinrara Golf Club" class="w-100" style="height:180px; object-fit:cover;" />
              <div class="p-3">
                <h3 class="h5 mb-1">Kinrara Golf Club</h3>
                <p class="text-muted-kgc small mb-2">Puchong, Selangor</p>
                <div class="d-flex gap-2">
                  <a class="btn btn-dark btn-sm rounded-pill px-3" href="https://kinraragolfclub.com/" target="_blank" rel="noopener">View</a>
                  <a class="btn btn-success btn-sm rounded-pill px-3" [routerLink]="'/booking'" [queryParams]="{ club: 'kinrara' }">Book</a>
                </div>
              </div>
                    </div>
                  </div>
          <div class="col-12 col-md-4">
            <div class="card elev-card h-100 overflow-hidden">
              <img src="assets/icons/kinrara2.jpeg" alt="Kota Permai Golf & Country Club" class="w-100" style="height:180px; object-fit:cover;" />
              <div class="p-3">
                <h3 class="h5 mb-1">Kota Permai G&CC</h3>
                <p class="text-muted-kgc small mb-2">Kota Kemuning, Selangor</p>
                <div class="d-flex gap-2">
                  <a class="btn btn-dark btn-sm rounded-pill px-3" href="https://www.kotapermai.com.my/" target="_blank" rel="noopener">View</a>
                  <a class="btn btn-success btn-sm rounded-pill px-3" [routerLink]="'/booking'" [queryParams]="{ club: 'kota-permai' }">Book</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card elev-card h-100 overflow-hidden">
              <img src="assets/icons/kinrara3.png" alt="Bukit Kemuning Golf & Country Resort" class="w-100" style="height:180px; object-fit:cover;" />
              <div class="p-3">
                <h3 class="h5 mb-1">Bukit Kemuning GCR</h3>
                <p class="text-muted-kgc small mb-2">Shah Alam, Selangor</p>
                <div class="d-flex gap-2">
                  <a class="btn btn-dark btn-sm rounded-pill px-3" href="https://www.bkgcr.com/" target="_blank" rel="noopener">View</a>
                  <a class="btn btn-success btn-sm rounded-pill px-3" [routerLink]="'/booking'" [queryParams]="{ club: 'bukit-kemuning' }">Book</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="facilities" class="py-5">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">Facilities</span>
          <h2 class="display-6 mt-1">Everything You Need On And Off The Course</h2>
        </div>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="elev-card h-100 p-3 section-framed">
              <div class="card-body">
                <div class="d-flex align-items-center mb-1">
                  <img src="assets/icons/coach.png" alt="Coaches" class="facility-icon me-2" />
                  <h3 class="h5 mb-0">Coaches</h3>
                </div>
                <p class="text-muted-kgc mb-0">Enhance your skills with experienced instructors.</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="elev-card h-100 p-3 section-framed">
              <div class="card-body">
                <div class="d-flex align-items-center mb-1">
                  <img src="assets/icons/golf-course.png" alt="Driving Range" class="facility-icon me-2" />
                  <h3 class="h5 mb-0">Driving Range</h3>
                </div>
                <p class="text-muted-kgc mb-0">Practice your swing with refreshed bays.</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="elev-card h-100 p-3 section-framed">
              <div class="card-body">
                <div class="d-flex align-items-center mb-1">
                  <img src="assets/icons/golf-cart.png" alt="Buggies" class="facility-icon me-2" />
                  <h3 class="h5 mb-0">Buggies</h3>
                </div>
                <p class="text-muted-kgc mb-0">Speed your play with well-maintained carts.</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="elev-card h-100 p-3 section-framed">
              <div class="card-body">
                <div class="d-flex align-items-center mb-1">
                  <img src="assets/icons/menu.png" alt="Restaurants" class="facility-icon me-2" />
                  <h3 class="h5 mb-0">Restaurants</h3>
                </div>
                <p class="text-muted-kgc mb-0">Savor exquisite meals at the clubhouse.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" class="py-5 section-muted">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">Pricing</span>
          <h2 class="display-6 mt-1">Our Prices</h2>
        </div>
        <div class="row g-4">
          <div class="col-12 col-lg-4">
            <div class="elev-card h-100 section-framed">
              <div class="card-body d-flex flex-column text-center">
                <img src="assets/icons/golf1.png" alt="Weekdays" class="pricing-icon align-self-center mb-2" />
                <h3 class="h5">Weekdays</h3>
                <div class="display-6 fw-bold my-2">RM100</div>
                <ul class="list-unstyled text-muted-kgc mb-4">
                  <li>Sharing Buggy, Insurance, & Tax</li>
                </ul>
                <a routerLink="/booking" class="btn btn-success rounded-pill px-3 mt-auto">Book now</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="elev-card h-100 section-framed">
              <div class="card-body d-flex flex-column text-center">
                <img src="assets/icons/golf2.png" alt="Weekends" class="pricing-icon align-self-center mb-2" />
                <h3 class="h5">Weekends</h3>
                <div class="display-6 fw-bold my-2">RM130</div>
                <ul class="list-unstyled text-muted-kgc mb-4">
                  <li>Sharing Buggy, Insurance, & Tax</li>
                </ul>
                <a routerLink="/booking" class="btn btn-success rounded-pill px-3 mt-auto">Book now</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="elev-card h-100 section-framed">
              <div class="card-body d-flex flex-column text-center">
                <img src="assets/icons/golf3.png" alt="18 Holes" class="pricing-icon align-self-center mb-2" />
                <h3 class="h5">18 Holes</h3>
                <div class="display-6 fw-bold my-2">RM100–130</div>
                <ul class="list-unstyled text-muted-kgc mb-4">
                  <li>Sharing Buggy, Insurance, & Tax</li>
                </ul>
                <a routerLink="/booking" class="btn btn-success rounded-pill px-3 mt-auto">Book now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="py-5 section-white">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">Testimonials</span>
          <h2 class="display-6 mt-1">What Golfers Say</h2>
        </div>
        <div class="scroll-x section-framed p-3">
          <div class="elev-card review-card p-3">
            <div class="d-flex align-items-center mb-2">
              <strong>Azhar Hamid</strong>
              <span class="ms-2 stars">★★★★★</span>
            </div>
            <p class="mb-2">Very comfortable, with restaurant (we tried cucur bilis/udang — seriously sedaaaap 😍). Tasty & original. Surau, shops & swimming pool.</p>
            <small class="text-muted-kgc">a year ago</small>
          </div>
          <div class="elev-card review-card p-3">
            <div class="d-flex align-items-center mb-2">
              <strong>Amirul Salim</strong>
              <span class="ms-2 stars">★★★★★</span>
            </div>
            <p class="mb-2">Played last weekend. Condition is improving compared to early 2023. New management has taken over and is restoring Kinrara.</p>
            <small class="text-muted-kgc">a year ago</small>
          </div>
          <div class="elev-card review-card p-3">
            <div class="d-flex align-items-center mb-2">
              <strong>Farhan Izmi</strong>
              <span class="ms-2 stars">★★★★☆</span>
            </div>
            <p class="mb-2">Avoid when it rains as the ball may plug. On a dry week fairways were okay; staff and marshals friendly. Comparable to UPM/PDGCC.</p>
            <small class="text-muted-kgc">2 months ago</small>
          </div>
          <div class="elev-card review-card p-3">
            <div class="d-flex align-items-center mb-2">
              <strong>hi it</strong>
              <span class="ms-2 stars">★★★☆☆</span>
            </div>
            <p class="mb-2">Walk-in Sunday morning during Ramadan—ok for a practice run. Cost for cart and caddy RM200 + RM50 tips. Greens rough in places but fairways well‑mowed.</p>
            <small class="text-muted-kgc">5 months ago</small>
          </div>
        </div>
      </div>
    </section>

    
    
    <section id="faqs" class="py-5 section-white">
      <div class="container">
        <h2 class="display-6 text-center mb-4">FAQs</h2>
        <div class="accordion section-framed" id="faqAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="faq1">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1c" aria-expanded="true" aria-controls="faq1c">
                Can I use GolfersGo for free?
              </button>
            </h2>
            <div id="faq1c" class="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Yes. The free version works great for individual play. Track scores, follow friends' games, and leave comments in real time.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="faq2">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2c" aria-expanded="false" aria-controls="faq2c">
                Is GolfersGo the right golf app for me?
              </button>
            </h2>
            <div id="faq2c" class="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                If you enjoy tracking scores and playing with friends, you'll love GolfersGo. Create games, share live leaderboards, and compare with your group.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="faq3">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3c" aria-expanded="false" aria-controls="faq3c">
                Where can I find the app?
              </button>
            </h2>
            <div id="faq3c" class="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                GolfersGo is available for iOS and Android in the App Store and Google Play.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="app" class="py-5 section-muted">
      <div class="container">
        <div class="row">
          <div class="col-8 col-lg-6">
            <h2 class="display-6 mb-2">Get the GolfersGo app</h2>
            <p class="text-muted-kgc mb-3">Everything you need to have more fun on the golf course.</p>
            <div class="d-flex align-items-center gap-3">
              <img src="assets/icons/appstore.png" height="44" />
              <img src="assets/icons/googleplay.png" height="44" />
              <img src="assets/icons/qr.png" height="72" />
            </div>
          </div>
          <div class="col-8 col-lg-6">
            
              <img src="assets/icons/mobileapp.png" style="width : 70%;" />
            <div class="ratio ratio-16x9 rounded border border-light border-opacity-25" style="background:url('assets/app/app-preview.png') center/cover no-repeat;"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; }
    header { border-bottom: 1px solid rgba(255,255,255,0.06); }
    .card { border-radius: 0.75rem; transition: transform 0.5s; }
    .card:hover { transform: scale(1.1); }
    `
  ]
})
export class HomeComponent {}


