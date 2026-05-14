const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');

// Sample data
const sampleServices = [
  {
    title: 'Luxury Nile Cruises',
    description: 'Experience the magic of the Nile aboard our premium cruise ships. Enjoy exquisite dining, spacious suites, and guided tours of ancient temples.',
    icon: 'fa-ship',
    imageUrl: '/images/nile-cruise.jpg',
    isVip: true,
    order: 1
  },
  {
    title: 'Private Desert Safaris',
    description: 'Explore the Egyptian desert in style with private 4x4 vehicles, Bedouin camps, and stunning sunset views over the dunes.',
    icon: 'fa-jeep',
    imageUrl: '/images/desert-safari.jpg',
    isVip: false,
    order: 2
  },
  {
    title: 'Corporate Travel Management',
    description: 'Tailored travel solutions for businesses, including group bookings, conference arrangements, and VIP airport services.',
    icon: 'fa-briefcase',
    imageUrl: '/images/corporate.jpg',
    isVip: false,
    order: 3
  },
  {
    title: 'VIP Airport Concierge',
    description: 'Skip the lines with our meet-and-assist service, fast-track immigration, and access to exclusive airport lounges.',
    icon: 'fa-concierge-bell',
    imageUrl: '/images/airport-vip.jpg',
    isVip: true,
    order: 4
  }
];

const sampleTestimonials = [
  {
    clientName: 'Ahmed Hassan',
    clientTitle: 'Business Traveler',
    content: 'NEWIBER made my business trip to Cairo seamless. Their attention to detail and professionalism is unmatched. Highly recommended!',
    rating: 5,
    imageUrl: '/images/client1.jpg',
    isVisible: true
  },
  {
    clientName: 'Sarah Johnson',
    clientTitle: 'Tourist from UK',
    content: 'We booked the luxury Nile cruise through NEWIBER and it was the highlight of our Egypt trip. Everything was perfectly organized.',
    rating: 5,
    imageUrl: '/images/client2.jpg',
    isVisible: true
  },
  {
    clientName: 'Mohamed Al-Ali',
    clientTitle: 'VIP Client',
    content: 'The VIP services are truly exceptional. From airport pickup to private tours, they cater to every need with utmost privacy.',
    rating: 5,
    imageUrl: '/images/client3.jpg',
    isVisible: true
  }
];

const sampleFAQs = [
  {
    question: 'How do I book a service?',
    answer: 'You can contact us via WhatsApp, phone, or the contact form on our website. We will respond within 24 hours.',
    order: 1,
    isVisible: true
  },
  {
    question: 'Do you offer customized tours?',
    answer: 'Yes, we specialize in creating personalized itineraries based on your interests and schedule. Just let us know your preferences.',
    order: 2,
    isVisible: true
  },
  {
    question: 'What safety measures do you have for travelers?',
    answer: 'We follow all local and international safety guidelines. Our partners are vetted, and we provide 24/7 support during your trip.',
    order: 3,
    isVisible: true
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Cancellation and modification policies vary by service. Please refer to the terms and conditions or contact us directly.',
    order: 4,
    isVisible: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - uncomment if you want to reset)
    // await User.deleteMany({});
    // await Service.deleteMany({});
    // await Testimonial.deleteMany({});
    // await FAQ.deleteMany({});
    // console.log('Cleared existing collections');

    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@newiber.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('SecurePass123!', 12);
      await User.create({
        email: 'admin@newiber.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Seed Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.insertMany(sampleServices);
      console.log('Sample services added');
    } else {
      console.log('Services already exist, skipping');
    }

    // Seed Testimonials
    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      await Testimonial.insertMany(sampleTestimonials);
      console.log('Sample testimonials added');
    } else {
      console.log('Testimonials already exist, skipping');
    }

    // Seed FAQs
    const faqsCount = await FAQ.countDocuments();
    if (faqsCount === 0) {
      await FAQ.insertMany(sampleFAQs);
      console.log('Sample FAQs added');
    } else {
      console.log('FAQs already exist, skipping');
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();