const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  gridClass: { 
    type: String, 
    required: true,
    default: "md:col-span-1 md:row-span-1 h-[220px]" 
  }
}, { timestamps: true });

module.exports = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
