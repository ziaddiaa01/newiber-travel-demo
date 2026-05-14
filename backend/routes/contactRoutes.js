// In server.js or create contactRoutes.js
const { submitContact } = require('./controllers/contactController');
router.post('/contact', limiter, submitContact);