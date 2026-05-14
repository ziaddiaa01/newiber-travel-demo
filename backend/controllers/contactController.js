const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
const submitContact = async (req, res) => {
  const { name, email, phone, message, serviceInterest } = req.body;
  try {
    const contact = new Contact({ name, email, phone, message, serviceInterest });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact };