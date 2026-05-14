const express = require('express');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Import controllers
const {
  getAllServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/adminServiceController');

const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/adminTestimonialController');

const {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require('../controllers/admindFaqController');

const {
  getAllContacts,
  markContactRead,
  deleteContact
} = require('../controllers/adminContactController');

// All admin routes require authentication and admin role
router.use(protect, admin);

// Services
router.route('/services')
  .get(getAllServices)
  .post(createService);
router.route('/services/:id')
  .put(updateService)
  .delete(deleteService);

// Testimonials
router.route('/testimonials')
  .get(getAllTestimonials)
  .post(createTestimonial);
router.route('/testimonials/:id')
  .put(updateTestimonial)
  .delete(deleteTestimonial);

// FAQs
router.route('/faqs')
  .get(getAllFAQs)
  .post(createFAQ);
router.route('/faqs/:id')
  .put(updateFAQ)
  .delete(deleteFAQ);

// Contacts
router.route('/contacts')
  .get(getAllContacts);
router.route('/contacts/:id/read')
  .patch(markContactRead);
router.route('/contacts/:id')
  .delete(deleteContact);

module.exports = router;