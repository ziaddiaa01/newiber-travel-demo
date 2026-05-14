const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials (admin)
// @route   GET /api/admin/testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort('-createdAt');
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a testimonial
// @route   POST /api/admin/testimonials
const createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/admin/testimonials/:id
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/admin/testimonials/:id
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getAllTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
};