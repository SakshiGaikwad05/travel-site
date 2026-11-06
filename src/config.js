// Owner setup: replace clearly marked details and add confirmed rates before publishing.
export const business = {
  // Placeholder brand and domain: replace these before publishing.
  name: 'Deccan Routes', tagline: 'Travel, made personal', phone: '', whatsapp: '', email: '', siteUrl: 'https://example.com/', googleReviewUrl: '',
  address: 'Sambhaji Nagar, Maharashtra, India', coordinates: '',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sambhaji+Nagar+Maharashtra', hours: 'Daily, by prior booking',
  instagram: '', facebook: '', currency: '₹',
  // Leave blank until confirmed. Calculator then offers a quote request instead of guessing.
  extraCharges: { driverAllowance: null, tolls: null, parking: null, waiting: null },
  minKm: null, roundTripMultiplier: 2,
};

export const vehicles = [
  { id: 'swift', name: 'Maruti Suzuki Swift', type: 'Comfort', seats: '4 passengers*', ac: 'AC*', bags: '2 medium bags*', rate: null, image: 'photo-1549317661-bd32c8ce0db2', alt: 'Compact car ready for a road journey' },
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga', type: 'Family', seats: '6 passengers*', ac: 'AC*', bags: '3 medium bags*', rate: null, image: 'photo-1619767886558-efdc259cde1a', alt: 'Comfortable family vehicle on a scenic drive' },
  { id: 'innova', name: 'Toyota Innova', type: 'Premium', seats: '6 passengers*', ac: 'AC*', bags: '3 medium bags*', rate: null, image: 'photo-1552519507-da3b142c6e3d', alt: 'Premium passenger vehicle' },
  { id: 'tempo', name: 'Tempo Traveller', type: 'Group travel', seats: '12 passengers*', ac: 'AC / Non-AC*', bags: 'Group luggage*', rate: null, image: 'photo-1570125909232-eb263c188f7e', alt: 'Passenger van for group travel' },
];

export const destinations = [
  { id:'ellora', name:'Ellora Caves', distance:30, time:'About 45–60 min', kind:'UNESCO World Heritage', description:'Walk through centuries of rock-cut artistry, crowned by the extraordinary Kailasa Temple.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Kailasa_Temple_ellora_caves.jpg/1280px-Kailasa_Temple_ellora_caves.jpg', alt:'Kailasa Temple at the Ellora Caves, Maharashtra', query:'Ellora Caves Maharashtra', credit:{author:'Aums90',url:'https://commons.wikimedia.org/wiki/File:Kailasa_Temple_ellora_caves.jpg',license:'CC BY-SA 4.0'} },
  { id:'ajanta', name:'Ajanta Caves', distance:103, time:'About 2.5–3 hr', kind:'UNESCO World Heritage', description:'A remarkable collection of Buddhist cave paintings and sculpture set in a quiet horseshoe gorge.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/A_view_of_Ajanta_Caves%2CMaharashtra%28India%29.jpg/1280px-A_view_of_Ajanta_Caves%2CMaharashtra%28India%29.jpg', alt:'View of the Ajanta Caves in Maharashtra', query:'Ajanta Caves Maharashtra', credit:{author:'Diksha Jadhav',url:'https://commons.wikimedia.org/wiki/File:A_view_of_Ajanta_Caves%2CMaharashtra%28India%29.jpg',license:'CC BY-SA 4.0'} },
  { id:'bibi', name:'Bibi Ka Maqbara', distance:4, time:'About 15–20 min', kind:'City landmark', description:'A graceful Mughal-era monument framed by formal gardens and the Deccan sky.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Bibi-ka-maqbara.jpg/960px-Bibi-ka-maqbara.jpg', alt:'Bibi Ka Maqbara in Sambhaji Nagar', query:'Bibi Ka Maqbara', credit:{author:'Sanjay Acharya',url:'https://commons.wikimedia.org/wiki/File:Bibi-ka-maqbara.jpg',license:'GFDL'} },
  { id:'daulatabad', name:'Daulatabad Fort', distance:16, time:'About 35–45 min', kind:'Hilltop citadel', description:'Explore the dramatic ramparts and clever defences of historic Devgiri Fort.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Daulatabad_Fort%2C_Maharashtra.jpg/1280px-Daulatabad_Fort%2C_Maharashtra.jpg', alt:'Daulatabad Fort on a conical hill in Maharashtra', query:'Daulatabad Fort Maharashtra', credit:{author:'Jhuma Datta',url:'https://commons.wikimedia.org/wiki/File:Daulatabad_Fort%2C_Maharashtra.jpg',license:'CC BY-SA 4.0'} },
  { id:'grishneshwar', name:'Grishneshwar Temple', distance:30, time:'About 45–60 min', kind:'Jyotirlinga shrine', description:'Visit one of the revered Jyotirlinga temples, near the Ellora cave complex.', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Grishneshwar_Temple_Ellora.jpg/960px-Grishneshwar_Temple_Ellora.jpg', alt:'Grishneshwar Temple near Ellora', query:'Grishneshwar Jyotirlinga Temple', credit:{author:'Shishirdasika',url:'https://commons.wikimedia.org/wiki/File:Grishneshwar_Temple_Ellora.jpg',license:'CC BY-SA 4.0'} },
  { id:'panchakki', name:'Panchakki', distance:3, time:'About 10–15 min', kind:'Water-powered heritage', description:'A historic water mill and tranquil garden reflecting the city’s layered past.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Panchakki_at_Aurangabad.jpg/1280px-Panchakki_at_Aurangabad.jpg', alt:'Panchakki heritage water mill in Sambhaji Nagar', query:'Panchakki Aurangabad', credit:{author:'Rizwanmahai',url:'https://commons.wikimedia.org/wiki/File:Panchakki_at_Aurangabad.jpg',license:'CC BY-SA 4.0'} },
  { id:'siddharth', name:'Siddharth Garden & Zoo', distance:3, time:'About 10–15 min', kind:'Garden & family stop', description:'A leafy city escape for a relaxed stroll and family-friendly outing.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Siddharth_Garden_and_Zoo.jpg/1280px-Siddharth_Garden_and_Zoo.jpg', alt:'Siddharth Garden and Zoo in Sambhaji Nagar', query:'Siddharth Garden Aurangabad', credit:{author:'Sandesh9822',url:'https://commons.wikimedia.org/wiki/File:Siddharth_Garden_and_Zoo.jpg',license:'CC BY-SA 4.0'} },
  { id:'goga', name:'Goga Baba Hill', distance:7, time:'About 20–30 min', kind:'Sunset viewpoint', description:'Take in broad views across Sambhaji Nagar from this popular hilltop lookout.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Goga_Baba_Tekdi.jpg/1280px-Goga_Baba_Tekdi.jpg', alt:'Goga Baba Hill near Sambhaji Nagar', query:'Goga Baba Hill Aurangabad', credit:{author:'Aniruddha1803',url:'https://commons.wikimedia.org/wiki/File:Goga_Baba_Tekdi.jpg',license:'CC BY-SA 4.0'} },
  { id:'soneri', name:'Soneri Mahal', distance:5, time:'About 15–20 min', kind:'Historic palace', description:'A distinctive historic palace and museum set within the city’s university grounds.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Soneri_Mahal%2C_Aurangabad.jpg/1280px-Soneri_Mahal%2C_Aurangabad.jpg', alt:'Soneri Mahal in Sambhaji Nagar', query:'Soneri Mahal Aurangabad', credit:{author:'Mayuresh Khadke',url:'https://commons.wikimedia.org/wiki/File:Soneri_Mahal%2C_Aurangabad.jpg',license:'CC BY-SA 4.0'} },
  { id:'jayakwadi', name:'Jayakwadi Dam', distance:50, time:'About 1.5 hr', kind:'Reservoir & birdlife', description:'A wide-open waterside outing, especially lovely in the cooler months.', image:'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Jayakwadi_Dam.jpg/1280px-Jayakwadi_Dam.jpg', alt:'Jayakwadi Dam in Maharashtra', query:'Jayakwadi Dam Paithan', credit:{author:'Prasad P. Khangaonkar',url:'https://commons.wikimedia.org/wiki/File:Jayakwadi_Dam.jpg',license:'CC BY-SA 3.0'} },
];

export const packages = [
 { name:'City in a Day', title:'Sambhaji Nagar Local Sightseeing', duration:'1 day', distance:'Approx. 30–45 km', places:'Bibi Ka Maqbara · Panchakki · Soneri Mahal · city highlights', vehicles:['Swift','Ertiga','Innova','Tempo Traveller'], price:null, dest:'Bibi Ka Maqbara' },
 { name:'Three landmarks', title:'Ellora · Daulatabad · Grishneshwar', duration:'1 day', distance:'Approx. 75–90 km', places:'Ellora Caves · Daulatabad Fort · Grishneshwar Temple', vehicles:['Ertiga','Innova','Tempo Traveller'], price:null, dest:'Ellora Caves' },
 { name:'The caves', title:'Ajanta Caves Full-Day Trip', duration:'Full day', distance:'Approx. 205 km round trip', places:'Ajanta Caves with time for a relaxed journey', vehicles:['Ertiga','Innova','Tempo Traveller'], price:null, dest:'Ajanta Caves' },
 { name:'Easy arrivals', title:'Airport Pickup & Drop', duration:'On request', distance:'Route dependent', places:'Personalised pickup and drop across Sambhaji Nagar', vehicles:['Swift','Ertiga','Innova'], price:null, dest:'Sambhaji Nagar Airport' },
 { name:'Easy arrivals', title:'Railway Station Pickup & Drop', duration:'On request', distance:'Route dependent', places:'Station pickup with room for your bags', vehicles:['Swift','Ertiga','Innova'], price:null, dest:'Aurangabad Railway Station' },
 { name:'Made for you', title:'Customized Family Tours', duration:'Flexible', distance:'Your itinerary', places:'Choose your pace, stops and preferred vehicle', vehicles:['Ertiga','Innova','Tempo Traveller'], price:null, dest:'Sambhaji Nagar' },
];

export const photos = [destinations[0],destinations[1],destinations[2],destinations[3],vehicles[1],destinations[7],vehicles[2],destinations[9]];
export const sampleTestimonials = [
  { name:'Sample traveller', rating:5, text:'Replace this clearly marked sample with a customer review only after receiving permission to publish it.', sample:true },
  { name:'Sample traveller', rating:5, text:'Add verified guest feedback here. We never publish invented reviews.', sample:true },
  { name:'Sample traveller', rating:5, text:'Your confirmed review can appear here with a link to its original source.', sample:true },
];
