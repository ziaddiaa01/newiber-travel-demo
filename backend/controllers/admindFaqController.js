const FAQ = require('../models/FAQ');

// @desc    Get all FAQs (admin)
// @route   GET /api/admin/faqs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort('order');
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create an FAQ
// @route   POST /api/admin/faqs
const createFAQ = async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an FAQ
// @route   PUT /api/admin/faqs/:id
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an FAQ
// @route   DELETE /api/admin/faqs/:id
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json({ message: 'FAQ removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getAllFAQs, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
};