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
        <div className="destination-links"><a href={directions(destination.query)} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={14}/></a><a href="#bookinrowRight size={14}/></a></div>
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
    return () => window.removeEventListener('booking-selec