const express = require('express');
const { getServices, getServiceById, getTestimonials, getFAQs , getDestinations} = require('../controllers/publicController');
const router = express.Router();

router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.get('/testimonials', getTestimonials);
router.get('/faqs', getFAQs);
router.get('/destinations', getDestinations);



module.exports = router;
