const flightsData = [
  {
    id: "FL001",
    airline: "IndiGo",
    code: "6E-742",
    from: "Vijayawada",
    to: "Chennai",
    departure: "06:45 AM",
    arrival: "08:50 AM",
    duration: "2h 05m",
    price: 4299,
    seatsLeft: 12,
    classType: "Economy",
    baggage: "15kg Check-in",
    refund: "Partial Refund"
  },
  {
    id: "FL002",
    airline: "Air India",
    code: "AI-508",
    from: "Hyderabad",
    to: "Bangalore",
    departure: "09:30 AM",
    arrival: "10:55 AM",
    duration: "1h 25m",
    price: 5199,
    seatsLeft: 6,
    classType: "Business",
    baggage: "20kg Check-in",
    refund: "Refundable"
  },
  {
    id: "FL003",
    airline: "Akasa Air",
    code: "QP-220",
    from: "Visakhapatnam",
    to: "Mumbai",
    departure: "01:15 PM",
    arrival: "03:30 PM",
    duration: "2h 15m",
    price: 6899,
    seatsLeft: 9,
    classType: "Economy",
    baggage: "15kg Check-in",
    refund: "Non Refundable"
  },
  {
    id: "FL004",
    airline: "SpiceJet",
    code: "SG-871",
    from: "Chennai",
    to: "Delhi",
    departure: "07:10 PM",
    arrival: "10:00 PM",
    duration: "2h 50m",
    price: 7499,
    seatsLeft: 4,
    classType: "Economy",
    baggage: "15kg Check-in",
    refund: "Partial Refund"
  }
];

const trainsData = [
  {
    id: "TR001",
    trainName: "AP Express",
    trainNo: "12724",
    from: "Guntur",
    to: "Hyderabad",
    departure: "09:10 PM",
    arrival: "03:50 AM",
    duration: "6h 40m",
    price: 890,
    availability: "RAC 12",
    classes: ["Sleeper", "3A", "2A"],
    days: "Daily"
  },
  {
    id: "TR002",
    trainName: "Charminar Express",
    trainNo: "12759",
    from: "Vijayawada",
    to: "Chennai",
    departure: "05:40 PM",
    arrival: "12:15 AM",
    duration: "6h 35m",
    price: 760,
    availability: "AVAILABLE 34",
    classes: ["Sleeper", "3A"],
    days: "Daily"
  },
  {
    id: "TR003",
    trainName: "Godavari Express",
    trainNo: "12727",
    from: "Rajahmundry",
    to: "Hyderabad",
    departure: "06:20 PM",
    arrival: "05:10 AM",
    duration: "10h 50m",
    price: 950,
    availability: "WL 08",
    classes: ["Sleeper", "3A", "2A"],
    days: "Daily"
  },
  {
    id: "TR004",
    trainName: "Duronto Express",
    trainNo: "12285",
    from: "Secunderabad",
    to: "Delhi",
    departure: "11:00 AM",
    arrival: "09:35 AM",
    duration: "22h 35m",
    price: 2450,
    availability: "AVAILABLE 11",
    classes: ["3A", "2A", "1A"],
    days: "Mon, Wed, Fri"
  }
];

const busesData = [
  {
    id: "BS001",
    operator: "Orange Travels",
    type: "AC Sleeper",
    from: "Hyderabad",
    to: "Bangalore",
    departure: "10:00 PM",
    arrival: "06:30 AM",
    duration: "8h 30m",
    price: 1450,
    seatsLeft: 16,
    boarding: "Miyapur",
    dropping: "Madiwala"
  },
  {
    id: "BS002",
    operator: "IntrCity SmartBus",
    type: "AC Seater",
    from: "Guntur",
    to: "Hyderabad",
    departure: "08:15 PM",
    arrival: "01:30 AM",
    duration: "5h 15m",
    price: 799,
    seatsLeft: 9,
    boarding: "Lakshmipuram",
    dropping: "Ameerpet"
  },
  {
    id: "BS003",
    operator: "VRL Travels",
    type: "Non-AC Sleeper",
    from: "Vijayawada",
    to: "Vizag",
    departure: "09:00 PM",
    arrival: "04:30 AM",
    duration: "7h 30m",
    price: 999,
    seatsLeft: 5,
    boarding: "Benz Circle",
    dropping: "RTC Complex"
  },
  {
    id: "BS004",
    operator: "SRS Travels",
    type: "Volvo Multi-Axle",
    from: "Chennai",
    to: "Coimbatore",
    departure: "11:15 PM",
    arrival: "06:00 AM",
    duration: "6h 45m",
    price: 1299,
    seatsLeft: 12,
    boarding: "Koyambedu",
    dropping: "Gandhipuram"
  }
];

const hotelsData = [
  {
    id: "HT001",
    name: "Skyline Residency",
    city: "Bangalore",
    location: "City Center",
    rating: 4.5,
    reviews: 2143,
    pricePerNight: 3799,
    roomsLeft: 5,
    amenities: ["Free Wi-Fi", "Breakfast", "Pool", "Airport Pickup"],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM"
  },
  {
    id: "HT002",
    name: "Palm Grove Hotel",
    city: "Hyderabad",
    location: "Banjara Hills",
    rating: 4.2,
    reviews: 1322,
    pricePerNight: 2899,
    roomsLeft: 8,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking"],
    checkIn: "01:00 PM",
    checkOut: "11:00 AM"
  },
  {
    id: "HT003",
    name: "Ocean Pearl Stay",
    city: "Chennai",
    location: "Near Marina Beach",
    rating: 4.7,
    reviews: 1875,
    pricePerNight: 4599,
    roomsLeft: 3,
    amenities: ["Breakfast", "Sea View", "Free Cancellation"],
    checkIn: "12:00 PM",
    checkOut: "10:00 AM"
  },
  {
    id: "HT004",
    name: "Budget Nest Inn",
    city: "Vijayawada",
    location: "Near Railway Station",
    rating: 4.0,
    reviews: 906,
    pricePerNight: 1799,
    roomsLeft: 11,
    amenities: ["Wi-Fi", "AC Rooms", "24x7 Desk"],
    checkIn: "12:00 PM",
    checkOut: "11:00 AM"
  }
];

const offerCardsData = [
  {
    title: "Flight Mega Sale",
    code: "FLYNOW",
    description: "Get up to 30% off on selected domestic flights.",
    category: "Flights"
  },
  {
    title: "Train Smart Saver",
    code: "RAILSAVE",
    description: "Special savings on route combinations and early bookings.",
    category: "Trains"
  },
  {
    title: "Bus Rush Deal",
    code: "BUSBLAST",
    description: "Save instantly on sleeper and AC bus routes.",
    category: "Buses"
  },
  {
    title: "Luxury Stay Deal",
    code: "STAYPLUS",
    description: "Flat discount on premium and city-center hotel stays.",
    category: "Hotels"
  }
];