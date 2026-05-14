const express = require('express');
const { getServices, getServiceById, getTestimonials, getFAQs } = require('../controllers/publicController');
const router = express.Router();

router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.get('/testimonials', getTestimonials);
router.get('/faqs', getFAQs);

module.exports = router;