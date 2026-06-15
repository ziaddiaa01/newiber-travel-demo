const mongoose = require('mongoose');

const ChatLogSchema = new mongoose.Schema({
  socketSessionId: { type: String, required: true, index: true },
  customerName: { type: String, required: true },
  text: { type: String, required: true },
  direction: { type: String, enum: ['incoming', 'outgoing'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.ChatLog || mongoose.model('ChatLog', ChatLogSchema);