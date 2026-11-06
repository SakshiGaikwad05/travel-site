import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CarFront, Check, Clock3, Compass,
  Luggage, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star,
  Users, Wind, X,
} from 'lucide-react';
import { business, vehicles, destinations, packages, photos } from './config';
import './styles.css';

const img = (source, width = 900) => source.startsWith('http')
  ? source
  : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=82`;
const directions = (place) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`;
const bookingLink = (message) => business.whatsapp
  ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
  : `mailto:${business.email || ''}?subject=${encodeURIComponent('Taxi booking enquiry')}&body=${encodeURIComponent(message)}`;
const money = (amount) => `${business.currency}${Number(amount).toLocaleString('en-IN')}`;
const selectBooking = (selection) => {
  Object.entries(selection).forEach(([key, value]) => sessionStorage.setItem(`selected${key[0].toUpperCase()}${key.slice(1)}`, value));
  window.dispatchEvent(new CustomEvent('booking-selection', { detail: selection }));
};

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Our Vehicles', 'vehicles'], ['Explore Sambhaji Nagar', 'destinations'], ['Tour Packages', 'packages'], ['About Us', 'about'], ['Contact Us', 'contact']];
  return <header className="header">
    <a href="#home" className="brand" aria-label={`${business.name} home`}><span className="brand-mark"><Compass size={21}/></span><span>{business.name}<small>MAHARASHTRA · INDIA</small></span></a>
    <button className="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav open' : 'nav'}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#booking" onClick={() => setOpen(false)}>Plan your trip <ArrowUpRight size={15}/></a></nav>
  </header>;
}

function Hero() {
  return <section id="home" className="hero">
    <div className="hero-image" style={{ backgroundImage: `url('${img(destinations[0].image, 2200)}')` }}/><div className="hero-shade"/>
    <div className="hero-content"><div className="eyebrow light"><span/> YOUR DECCAN JOURNEY BEGINS HERE</div>
      <h1>Explore Sambhaji Nagar<br/><em>with comfort & confidence.</em></h1>
      <p>Reliable rides, thoughtful local knowledge and unhurried journeys to the places worth remembering.</p>
      <div className="hero-actions"><a href="#booking" className="button button-cream">Plan your journey <ArrowRight size={17}/></a><a href="#destinations" className="button button-ghost">Explore the region <ArrowDown size={15}/></a></div>
      <div className="hero-proof"><span><ShieldCheck/> Experienced local drivers</span><i/><span><CarFront/> Comfortable vehicles</span><i/><span><Sparkles/> Personalised service</span></div>
    </div><div className="hero-note"><span>01 / 10</span><b>DECCAN HERITAGE, AT YOUR OWN PACE</b>{destinations[0].credit && <a href={destinations[0].credit.url} target="_blank" rel="noreferrer">Photo: {destinations[0].credit.author} · {destinations[0].credit.license}</a>}<span className="note-line"/></div>
  </section>;
}

function Intro() {
  return <section className="intro section" id="about"><div className="eyebrow"><span/> A BETTER WAY TO DISCOVER</div>
    <div className="intro-grid"><h2>More than a ride.<br/><em>A feeling for the place.</em></h2><div className="intro-copy"><p>From the quiet grandeur of Ellora to the gardens and stories of Sambhaji Nagar, let the journey unfold at a pace that feels like yours.</p><a href="#packages" className="text-link">Discover our journeys <ArrowRight size={16}/></a></div></div>
    <div className="value-row"><div><span className="value-num">01</span><b>Local, by nature</b><p>Rooted in the roads and stories of the Deccan.</p></div><div><span className="value-num">02</span><b>Comfort, considered</b><p>The right vehicle for your people and your plans.</p></div><div><span className="value-num">03</span><b>Your day, your way</b><p>Flexible itineraries, clear communication and easy booking.</p></div></div>
  </section>;
}

function Fleet() {
  const featuredVehicles = vehicles.filter((vehicle) => ['swift', 'ertiga', 'tempo'].includes(vehicle.id));
  return <section id="vehicles" className="section section-tint"><div className="section-head"><div><div className="eyebrow"><span/> FIND YOUR RIDE</div><h2>Room for <em>your kind of journey.</em></h2></div><p>From a quick city pickup to a family day out, choose the space and comfort that suit you.</p></div>
    <div className="fleet-grid">{featuredVehicles.map((vehicle, index) => <article className="vehicle-card" key={vehicle.id}>
      <div className="vehicle-image"><img src={img(vehicle.image, 720)} alt={vehicle.alt} loading="lazy"/><span className="vehicle-type">0{index + 1} · {vehicle.type}</span></div>
      <div className="vehicle-body"><div className="vehicle-title"><h3>{vehicle.name}</h3><span className="rate">{vehicle.rate ? `${money(vehicle.rate)}/km` : 'Ask for a quote'}</span></div>
        <div className="vehicle-specs"><span><Users/>{vehicle.seats}</span><span><Wind/>{vehicle.ac}</span><span><Luggage/>{vehicle.bags}</span></div>
        <div className="availability">Local sightseeing <b>·</b> Outstation</div><small className="config-note">*Confirm exact seating, AC and luggage setup with the operator.</small>
        <a href="#booking" className="card-link" onClick={() => selectBooking({ vehicle: vehicle.id })}>Enquire about this vehicle <ArrowRight size={16}/></a>
      </div></article>)}</div>
  </section>;
}

function Destinations({ onPhoto }) {
  const [pickup, setPickup] = useState(() => sessionStorage.getItem('selectedPickup') || 'Sambhaji Nagar city centre');
  return <section id="destinations" className="section"><div className="section-head"><div><div className="eyebrow"><span/> THE DECCAN, OPEN TO YOU</div><h2>Places with a <em>story to tell.</em></h2></div>
    <div className="pickup"><MapPin size={17}/><label htmlFor="pickup-select">Starting from</label><select id="pickup-select" value={pickup} onChange={(event) => { setPickup(event.target.value); selectBooking({ pickup: event.target.value === 'custom' ? '' : event.target.value }); }}><option>Sambhaji Nagar city centre</option><option>Sambhaji Nagar Airport</option><option>Aurangabad Railway Station</option><option value="custom">Enter a pickup in the booking form</option></select></div>
  </div><p className="distance-note">Distances and journey times are approximate from central Sambhaji Nagar. Actual routes vary with pickup point and traffic.</p>
    <div className="destination-grid">{destinations.map((destination) => <article className="destination-card" key={destination.id}>
      <button className="destination-photo" aria-label={`View ${destination.name} photograph`} onClick={() => onPhoto(destination)}><img src={img(destination.image, 720)} alt={destination.alt} loading="lazy"/><span>{destination.kind}</span><b><ArrowUpRight size={17}/></b></button>
      <div className="destination-body"><div className="destination-meta"><span><MapPin size={14}/> ≈ {destination.distance} km</span><span><Clock3 size={14}/>{destination.time}</span></div><h3>{destination.name}</h3><p>{destination.description}</p>
        {destination.credit && <small className="image-credit">Photo: <a href={destination.credit.url} target="_blank" rel="noreferrer">{destination.credit.author}</a> · {destination.credit.license}</small>}
        <div className="destination-links"><a href={directions(destination.query)} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={14}/></a><a href="#booking" onClick={() => selectBooking({ destination: destination.id })}>Book a taxi <ArrowRight size={14}/></a></div>
      </div></article>)}</div>
  </section>;
}

function Calculator() {
  const [form, setForm] = useState(() => ({
    pickup: sessionStorage.getItem('selectedPickup') === 'custom' ? '' : sessionStorage.getItem('selectedPickup') || 'Sambhaji Nagar city centre',
    destination: sessionStorage.getItem('selectedDestination') || 'ellora', vehicle: sessionStorage.getItem('selectedVehicle') || 'ertiga',
    date: '', passengers: '2', trip: 'one-way', returnDate: '', name: '', phone: '', notes: '',
  }));
  const destination = destinations.find((item) => item.id === form.destination);
  const vehicle = vehicles.find((item) => item.id === form.vehicle);
  useEffect(() => {
    const applySelection = (event) => setForm((current) => ({ ...current, ...event.detail }));
    window.addEventListener('booking-selection', applySelection);
    return () => window.removeEventListener('booking-selection', applySelection);
  }, []);
  const estimate = useMemo(() => {
    if (!destination || !vehicle?.rate) return null;
    const km = Math.max(destination.distance * (form.trip === 'round-trip' ? business.roundTripMultiplier : 1), business.minKm || 0);
    const extras = Object.values(business.extraCharges || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
    return Math.round(km * vehicle.rate + extras);
  }, [destination, vehicle, form.trip]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const message = `Taxi booking enquiry\nName: ${form.name}\nPhone: ${form.phone}\nPickup: ${form.pickup}\nDestination: ${destination?.name || ''}\nVehicle: ${vehicle?.name || ''}\nDate: ${form.date || 'To be confirmed'}\nPassengers: ${form.passengers}\nTrip: ${form.trip}${form.trip === 'round-trip' ? `\nReturn date: ${form.returnDate || 'To be confirmed'}` : ''}${form.notes ? `\nAdditional message: ${form.notes}` : ''}${estimate ? `\nEstimated fare: ${money(estimate)} (estimate only)` : ''}`;
  return <section id="booking" className="booking-section"><div className="booking-visual"><div className="eyebrow light"><span/> LET’S MAKE A PLAN</div><h2>A good journey<br/>starts with <em>a conversation.</em></h2><p>Tell us what you have in mind. We’ll help you find the right ride and a fair, clear quote.</p><div className="booking-points"><span><Check/> No obligation to book</span><span><Check/> Personal response from our team</span><span><Check/> Flexible routes and timings</span></div><div className="booking-caption">YOUR JOURNEY, THOUGHTFULLY ARRANGED <span/></div></div>
    <div className="booking-form-wrap"><div className="form-heading"><span>01 — JOURNEY DETAILS</span><p>Share a few details and we’ll take it from here.</p></div>
      <form className="booking-form" onSubmit={(event) => { event.preventDefault(); window.open(bookingLink(message), '_blank', 'noopener,noreferrer'); }}>
        <div className="form-row"><label>Your name<input value={form.name} onChange={(event) => update('name', event.target.value)} required autoComplete="name"/></label><label>Phone number<input type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} required autoComplete="tel" pattern="[+0-9 ()-]{7,}"/></label></div>
        <label>Pickup location<input value={form.pickup} onChange={(event) => update('pickup', event.target.value)} required placeholder="Hotel, address or landmark"/></label>
        <label>Destination<select value={form.destination} onChange={(event) => update('destination', event.target.value)}>{destinations.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <div className="form-row"><label>Vehicle<select value={form.vehicle} onChange={(event) => update('vehicle', event.target.value)}>{vehicles.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Travel date<input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} required/></label></div>
        <div className="form-row"><label>Passengers<input type="number" min="1" max="30" value={form.passengers} onChange={(event) => update('passengers', event.target.value)}/></label><label>Journey type<select value={form.trip} onChange={(event) => update('trip', event.target.value)}><option value="one-way">One way</option><option value="round-trip">Round trip</option></select></label></div>
        {form.trip === 'round-trip' && <label>Return date<input type="date" value={form.returnDate} onChange={(event) => update('returnDate', event.target.value)}/></label>}
        <label>Additional message<textarea rows="3" value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Anything we should know?"/></label>
        <div className="fare-result"><div><span>YOUR ESTIMATE</span><b>{estimate ? money(estimate) : 'Contact us for the best available fare.'}</b></div><small>{estimate ? 'Indicative only; final fare depends on confirmed route, tolls and waiting.' : `Approx. ${destination?.distance} km from city centre · ${destination?.time}. Rates are being confirmed.`}</small></div>
        <button className="button button-dark" type="submit">{business.whatsapp ? 'Continue on WhatsApp' : 'Send an email enquiry'} <ArrowRight size={17}/></button><small className="privacy-note">Your enquiry opens in your messaging app. No booking is confirmed until we reply.</small>
      </form>
    </div>
  </section>;
}

function Packages() {
  return <section id="packages" className="section section-tint"><div className="section-head"><div><div className="eyebrow"><span/> THOUGHTFULLY PLANNED</div><h2>Days out, <em>made easy.</em></h2></div><p>Pick a starting point. We’ll tailor the pace, stops and vehicle around you.</p></div>
    <div className="package-grid">{packages.map((item, index) => <article className="package-card" key={item.title}><div className="package-top"><span>0{index + 1}</span><span>{item.name}</span></div><h3>{item.title}</h3><p className="package-places">{item.places}</p>
      <div className="package-details"><span><Clock3/>{item.duration}</span><span><MapPin/>{item.distance}</span></div><div className="package-bottom"><span>{item.price ? `From ${money(item.price)}` : 'Price on request'}</span><a href="#booking" onClick={() => selectBooking({ destination: destinations.find((place) => place.name === item.dest)?.id || 'ellora' })} aria-label={`Enquire about ${item.title}`}><ArrowRight size={17}/></a></div><small>Available: {item.vehicles.join(' · ')}</small>
    </article>)}</div>
  </section>;
}

function Gallery({ onPhoto }) {
  return <section className="section gallery-section"><div className="section-head"><div><div className="eyebrow"><span/> LITTLE GLIMPSES</div><h2>See where the <em>road leads.</em></h2></div><a href="#destinations" className="text-link">Explore all destinations <ArrowRight size={16}/></a></div>
    <div className="gallery-grid">{photos.map((photo, index) => <button className={`gallery-item gallery-${index}`} key={`${photo.id}-${index}`} onClick={() => onPhoto(photo)} aria-label={`Open photo: ${photo.name}`}><img src={img(photo.image, 900)} alt={photo.alt} loading="lazy"/><span>{photo.name}</span><b><ArrowUpRight size={16}/></b></button>)}</div>
  </section>;
}

function WhyUs() {
  const reasons = ['Clean, comfortable vehicles', 'Professional, courteous drivers', 'Local sightseeing knowledge', 'On-time pickup coordination', 'Family-friendly travel', 'Easy WhatsApp enquiries', 'Custom tours at your pace'];
  return <section className="why-section"><div className="section why-inner"><div><div className="eyebrow light"><span/> THE DECCAN, IN GOOD HANDS</div><h2>Easy to arrange.<br/><em>Lovely to remember.</em></h2><p>Good travel is built on the small things: a clean car, a thoughtful driver, and knowing when to take the scenic road.</p><a className="button button-cream" href="#booking">Let’s plan yours <ArrowRight size={17}/></a></div>
    <div className="why-list">{reasons.map((reason, index) => <div key={reason}><span>0{index + 1}</span><b>{reason}</b><Check size={16}/></div>)}</div>
  </div></section>;
}

function Reviews() {
  return <section className="section review-section"><div className="eyebrow"><span/> KIND WORDS, WHEN THEY’RE YOURS</div><div className="section-head"><h2>Good journeys leave <em>good stories.</em></h2><p>We’ll share guest feedback here once reviews are confirmed and approved to publish.</p></div>
    <div className="review-empty"><div className="review-stars"><Star/><Star/><Star/><Star/><Star/></div><p>Have travelled with us? Your experience can help another traveller plan with confidence.</p><a href={business.googleReviewUrl || business.mapUrl} target="_blank" rel="noreferrer" className="text-link">Share your experience <ArrowUpRight size={15}/></a><small>Reviews are shown here only after they are verified and approved.</small></div>
  </section>;
}

function Contact() {
  return <section id="contact" className="contact-section"><div className="section contact-inner"><div><div className="eyebrow light"><span/> HERE WHEN YOU’RE READY</div><h2>Let’s get you<br/><em>out there.</em></h2><p>Tell us where you’d like to go. We’ll help make the journey simple.</p><div className="contact-actions"><a className="button button-cream" href="#booking">Make an enquiry <ArrowRight size={17}/></a><a className="button button-outline" href={business.whatsapp ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}` : `mailto:${business.email || ''}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp us</a></div></div>
    <div className="contact-card"><span>CONTACT & PICKUP</span><h3>{business.name}</h3><p><MapPin/> {business.address}</p><p><Clock3/> {business.hours}</p><p><Phone/> {business.phone || 'Add business phone in src/config.js'}</p><div className="contact-card-links"><a href={business.mapUrl} target="_blank" rel="noreferrer">Open location <ArrowUpRight size={15}/></a><a href={business.email ? `mailto:${business.email}` : '#booking'}>{business.email || 'Send an enquiry'} <ArrowRight size={15}/></a></div><small>Business contact details are editable in src/config.js before launch.</small></div>
  </div></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><a href="#home" className="brand footer-brand"><span className="brand-mark"><Compass size={21}/></span><span>{business.name}<small>TRAVEL, MADE PERSONAL</small></span></a><p>Thoughtful taxi journeys and local tours, based in Sambhaji Nagar.</p><div className="footer-social">{business.instagram && <a href={business.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">IG</a>}{business.facebook && <a href={business.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">FB</a>}</div></div>
    <div className="footer-col"><b>EXPLORE</b><a href="#vehicles">Our vehicles</a><a href="#destinations">Destinations</a><a href="#packages">Tour packages</a><a href="#about">About us</a></div><div className="footer-col"><b>POPULAR PLACES</b>{destinations.slice(0, 4).map((place) => <a href={directions(place.query)} target="_blank" rel="noreferrer" key={place.id}>{place.name}</a>)}</div><div className="footer-col"><b>GET IN TOUCH</b><a href="#contact">Contact & location</a><a href="#booking">Booking enquiry</a><a href={business.phone ? `tel:${business.phone}` : '#contact'}>{business.phone || 'Add phone number'}</a></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}. Sambhaji Nagar, Maharashtra.</span><span>Approximate distances are indicative and may vary by route.</span></div></footer>;
}

function Lightbox({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [photo, onClose]);
  return photo && <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={photo.name}>
    <button className="lightbox-close" aria-label="Close image" onClick={onClose}><X/></button><div onClick={(event) => event.stopPropagation()}><img src={img(photo.image, 1400)} alt={photo.alt}/><p>{photo.name}</p></div>
  </div>;
}

function App() {
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    const structuredData = { '@context': 'https://schema.org', '@type': 'TaxiService', name: business.name, description: 'Taxi service, local sightseeing and outstation tours in Sambhaji Nagar, Maharashtra.', url: business.siteUrl, telephone: business.phone || undefined, email: business.email || undefined, address: { '@type': 'PostalAddress', addressLocality: 'Sambhaji Nagar', addressRegion: 'Maharashtra', addressCountry: 'IN' }, areaServed: ['Sambhaji Nagar', 'Ellora', 'Ajanta'], priceRange: 'Contact for quote' };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.textContent = JSON.stringify(structuredData); document.head.appendChild(script);
    const canonical = document.querySelector('link[rel="canonical"]'); if (canonical) canonical.href = business.siteUrl;
    return () => script.remove();
  }, []);
  const whatsapp = bookingLink('Hello, I would like to plan a taxi journey in Sambhaji Nagar.');
  return <><Header/><main><Hero/><Intro/><Fleet/><Destinations onPhoto={setPhoto}/><Calculator/><Packages/><Gallery onPhoto={setPhoto}/><WhyUs/><Reviews/><Contact/></main><Footer/>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Message us about a booking"><MessageCircle size={22}/></a>{business.phone && <a className="floating-call" href={`tel:${business.phone}`} aria-label="Call now"><Phone size={20}/></a>}<Lightbox photo={photo} onClose={() => setPhoto(null)}/>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
