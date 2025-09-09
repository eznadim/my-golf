import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="hero-header position-relative pt-5">
      <img src="assets/icons/kinrara1.png" alt="Kinrara Golf Club" class="hero-bg" />
      <div class="hero-overlay"></div>
      <div class="container position-relative d-flex flex-column justify-content-center align-items-center text-center" style="min-height: 75vh;">
        <h1 class="display-4 fw-semibold">Kinrara Golf Club</h1>
        <p class="lead opacity-75 mb-4">Now Refurbished Under New Management • Puchong</p>
        <div class="d-flex gap-2">
          <a class="btn btn-success rounded-pill px-3" routerLink="/booking">Book Tee Time</a>
          <a class="btn btn-outline-dark rounded-pill px-3" routerLink="/courses">Explore Courses</a>
        </div>
      </div>
    </header>

    

    <section id="about" class="py-5">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-6">
            <h2 class="display-6">Kinrara Golf Club</h2>
            <p class="text-black-50 mb-3">
              Kinrara Golf Club is a charming golf retreat nestled in the heart of Puchong, Selangor.
              Established in 1993, this 18-hole championship course winds through rolling terrain and
              lush greenery. Tree-lined fairways, strategic bunkers, and serene water features create
              a tranquil, engaging experience for golfers of all levels.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <div class="border border-light border-opacity-25 rounded p-3">
                <div class="small text-black-50">Hours</div>
                <div class="fw-semibold">7:00am – 8:00pm (Everyday)</div>
              </div>
              <div class="border border-light border-opacity-25 rounded p-3">
                <div class="small text-black-50">Phone</div>
                <a class="fw-semibold text-decoration-none" href="tel:+60380762100">+60 3-8076 2100</a>
              </div>
              <div class="border border-light border-opacity-25 rounded p-3">
                <div class="small text-black-50">Email</div>
                <a class="fw-semibold text-decoration-none" href="mailto:kinraragolf@ssgsb.my">kinraragolf@ssgsb.my</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="ratio ratio-16x9 rounded border border-light border-opacity-25" style="background:url('https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;"></div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="features" class="py-5 section-muted">
      <div class="container">
        <div class="row text-center g-3">
          <div class="col-12 col-md-4">
            <div class="elev-card p-4 h-100">
              <div class="display-5 fw-bold">18</div>
              <div class="text-muted-kgc">Holes</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="elev-card p-4 h-100">
              <div class="display-5 fw-bold">71</div>
              <div class="text-muted-kgc">Pars</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="elev-card p-4 h-100">
              <div class="display-5 fw-bold">5341</div>
              <div class="text-muted-kgc">Meters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 section-white">
      <div class="container">
        <div class="text-center mb-4">
          <span class="text-success text-uppercase small fw-semibold">Our Golf Courses</span>
          <h2 class="display-6 mt-1">Find Your Perfect Round</h2>
          <p class="text-white-50">Two refreshed layouts designed for every level of golfer.</p>
        </div>
        <div class="row g-4 section-framed p-3">
          <div class="col-12 col-lg-6">
            <div class="elev-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="assets/icons/kinrara2.jpeg" alt="Kinrara 9-hole" class="rounded-start w-100" style="height:220px; object-fit:cover;" />
                </div>
                <div class="col-md-7">
                  <div class="card-body d-flex flex-column">
                    <h3 class="h4 mb-2">9-Hole Course</h3>
                    <p class="text-muted-kgc mb-3">Quick, technical layout ideal for practice rounds and evening play.</p>
                    <ul class="text-muted-kgc small mb-4">
                      <li>Par 34 • 2,900 yards</li>
                      <li>New greens and tee boxes</li>
                      <li>LED-lit driving range access</li>
                    </ul>
                    <div class="mt-auto">
                      <a routerLink="/courses" class="btn btn-dark rounded-pill px-3">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="elev-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="assets/icons/kinrara3.png" alt="Kinrara 18-hole" class="rounded-start w-100" style="height:220px; object-fit:cover;" />
                </div>
                <div class="col-md-7">
                  <div class="card-body d-flex flex-column">
                    <h3 class="h4 mb-2">18-Hole Championship</h3>
                    <p class="text-muted-kgc mb-3">Signature fairways with strategic bunkering and newly contoured greens.</p>
                    <ul class="text-muted-kgc small mb-4">
                      <li>Par 72 • 6,500 yards</li>
                      <li>Refurbished clubhouse facilities</li>
                      <li>Carts with GPS and scoring</li>
                    </ul>
                    <div class="mt-auto">
                      <a routerLink="/courses" class="btn btn-dark rounded-pill px-3">View Details</a>
                    </div>
                  </div>
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

    <section id="contact" class="py-5">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-12 col-lg-6">
            <h2 class="display-6">Contact</h2>
            <ul class="list-unstyled mb-4">
              <li class="mb-1"><strong>Location:</strong> Jalan Kinrara 6, Bandar Kinrara 6, 47100 Puchong, Selangor</li>
              <li class="mb-1"><strong>Phone:</strong> <a href="tel:+60380762100" class="text-decoration-none">+60 3-8076 2100</a></li>
              <li class="mb-1"><strong>Email:</strong> <a href="mailto:kinraragolf@ssgsb.my" class="text-decoration-none">kinraragolf@ssgsb.my</a></li>
            </ul>
            <div class="d-flex gap-2">
              <a routerLink="/booking" class="btn btn-success rounded-pill px-3">Book Tee Time</a>
              <a href="mailto:kinraragolf@ssgsb.my" class="btn btn-outline-light rounded-pill px-3">Contact Us</a>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="ratio ratio-16x9 rounded border border-light border-opacity-25">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.211238107514!2d101.6548121!3d3.0379484999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b93f8046d75%3A0x882b541b90f7b4ec!2sKinrara%20Golf%20Club!5e0!3m2!1sen!2smy!4v1757342307218!5m2!1sen!2smy" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; }
    header { border-bottom: 1px solid rgba(255,255,255,0.06); }
    .card { border-radius: 0.75rem; transition: transform .15s ease, border-color .15s ease; }
    .card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.4) !important; }
    `
  ]
})
export class HomeComponent {}


