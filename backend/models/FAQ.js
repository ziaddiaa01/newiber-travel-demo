const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  imageUrl: { type: String, default: "" }, // 🌟 تم إضافة هذا الحقل لاستقبال رابط الصورة
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true }); // اختياري: لإضافة وقت الإنشاء والتعديل تلقائياً

module.exports = mongoose.model('FAQ', FAQSchema);
