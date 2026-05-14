const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientTitle: String,
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  imageUrl: String,
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);