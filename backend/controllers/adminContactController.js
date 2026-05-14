const Contact = require('../models/Contact');

// @desc    Get all contact submissions
// @route   GET /api/admin/contacts
const getAllContacts = async (req, res) => {
  try {
    const { isRead } = req.query;
    let query = {};
    
    // Filter by read status if provided
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }
    
    const contacts = await Contact.find(query).sort('-createdAt');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark contact as read/unread
// @route   PATCH /api/admin/contacts/:id/read
const markContactRead = async (req, res) => {
  try {
    const { isRead } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: isRead !== undefined ? isRead : true },
      { new: true }
    );
    
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/admin/contacts/:id
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getAllContacts, 
  markContactRead, 
  deleteContact 
};