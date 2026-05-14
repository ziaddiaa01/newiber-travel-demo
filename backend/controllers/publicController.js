const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');

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