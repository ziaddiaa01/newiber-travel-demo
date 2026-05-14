const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const FAQ = require('./models/FAQ');

// ----- SERVICES DATA -----
const services = [
  {
    title: "Inbound Tourism",
    description: "Discover the ancient wonders of Egypt through our meticulously crafted cultural tours. Whether you desire a private cruise down the Nile or a guided expedition to the Pyramids, our itineraries are tailored to your pace and interests.",
    icon: "fa-ship",
    imageUrl: "/images/ship",
    isVip: false,
    order: 1
  },
  {
    title: "Hotel Booking",
    description: "Rest in the lap of luxury. We have cultivated relationships with the finest 5-star hotels and boutique resorts across Egypt. Enjoy exclusive rates, room upgrades, and amenities available only to our clients.",
    icon: "fa-jeep",
    imageUrl: "/images/hotel",
    isVip: false,
    order: 2
  },
  {
    title: "Limousine & Transport",
    description: "Move through the city with ease and elegance. Our fleet of premium vehicles and professional chauffeurs ensures that your transit is as comfortable as your destination.",
    icon: "fa-briefcase",
    imageUrl: "/images/limousine",
    isVip: false,
    order: 3
  },
  {
    title: "B2B Management",
    description: "Meetings, Incentives, Conferences, and Exhibitions. We provide end-to-end management for your corporate events, ensuring professional execution that reflects your brand's standards.",
    icon: "fa-concierge-bell",
    imageUrl: "/images/management",
    isVip: false,
    order: 4
  },
  {
    title: "Aviation",
    description: "Private charters and helicopter transfers to remote locations.",
    icon: "fa-plane",
    imageUrl: "/images/Aviation",
    isVip: true,
    order: 5
  },
  {
    title: "Maritime",
    description: "Custom feluccas on the Nile and luxury yachts on the Red Sea.",
    icon: "fa-ship",
    imageUrl: "/images/Maritime",
    isVip: true,
    order: 6
  },
  {
    title: "Private Access",
    description: "Exclusive entry to monuments outside of public operating hours.",
    icon: "fa-key",
    imageUrl: "/images/Private",
    isVip: true,
    order: 7
  }
];

// ----- TESTIMONIALS DATA -----
const testimonials = [
  {
    clientName: "Ahmed Hassan",
    clientTitle: "Business Traveler",
    content: "NEWIBER made my business trip to Cairo seamless. Their attention to detail and professionalism is unmatched. Highly recommended!",
    rating: 5,
    imageUrl: "/images/client1.jpg",
    isVisible: true
  },
  {
    clientName: "Sarah Johnson",
    clientTitle: "Tourist from UK",
    content: "We booked the luxury Nile cruise through NEWIBER and it was the highlight of our Egypt trip. Everything was perfectly organized.",
    rating: 5,
    imageUrl: "/images/client2.jpg",
    isVisible: true
  },
  {
    clientName: "Mohamed Al-Ali",
    clientTitle: "VIP Client",
    content: "The VIP services are truly exceptional. From airport pickup to private tours, they cater to every need with utmost privacy.",
    rating: 5,
    imageUrl: "/images/client3.jpg",
    isVisible: true
  }
];

// ----- FAQS DATA -----
const faqs = [
  {
    question: "Is it safe to travel to Egypt now?",
    answer: "Yes, Egypt is very safe for tourists. We provide 24/7 support and only use trusted partners and secure routes.",
    order: 1,
    isVisible: true
  },
  {
    question: "Do you handle visa processing?",
    answer: "We can assist with visa-on-arrival procedures and provide necessary documentation for your application.",
    order: 2,
    isVisible: true
  },
  {
    question: "Can I customize my itinerary?",
    answer: "Absolutely. All our packages are fully customizable to suit your preferences and budget.",
    order: 3,
    isVisible: true
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation up to 48 hours before arrival for most standard packages.",
    order: 4,
    isVisible: true
  }
];

// ----- SEED FUNCTION -----
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    console.log('Cleared collections');

    // Create admin user
    const hashedPassword = await bcrypt.hash('SecurePass123!', 12);
    await User.create({
      email: 'admin@newiber.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created');

    // Insert data
    await Service.insertMany(services);
    console.log('Services inserted');
    await Testimonial.insertMany(testimonials);
    console.log('Testimonials inserted');
    await FAQ.insertMany(faqs);
    console.log('FAQs inserted');

    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();