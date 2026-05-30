const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Destination = require('../models/Destination');

// @route   GET /api/destinations
// @desc    Get all destinations for the public masonry grid layout
// @access  Public

const getDestinations = async (req, res) => {
  try {
    // Sort by newest first so recently added locations appear immediately
const destinations = await Destination.find().sort('-createdAt');
    return res.status(200).json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return res.status(500).json({ message: 'Server error retrieving grid elements.' });
  }
};

// Get all services (public)
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort('order');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get testimonials (visible only)
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isVisible: true });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get FAQs (visible only)
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isVisible: true }).sort('order');
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getServices, getServiceById, getTestimonials, getFAQs };
