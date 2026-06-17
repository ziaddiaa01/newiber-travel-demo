require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import the WhatsApp background worker and Chat log model
const { startWhatsAppEngine, getWhatsAppSock, getEngineState } = require('./whatsappWorker');
const ChatLog = require('./models/ChatLog'); 

const app = express();

// ==========================================
// 1. SECURITY & CORE MIDDLEWARES
// ==========================================

// Update Helmet Content Security Policy to allow dynamic socket traffic
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "ws:", "wss:", "http://localhost:5000"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
    },
  },
}));

app.use(express.json());
app.use(cookieParser());

// CORS settings matching your local React/Vite development setup
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true 
}));

// API Route Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Raised safely to cover live chat socket polling and admin lookups
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// ==========================================
// 2. BACKEND ROUTES
// ==========================================

// Direct API endpoint to grab the latest connection/QR code state for Admin Portal
app.get('/api/chat/status', (req, res) => {
  return res.status(200).json(getEngineState());
});

// Import your existing MVC modular router layers
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

// Base Test Endpoint
app.get('/', (req, res) => res.send('API Running with Live Chat Infrastructure'));

// 404 Route Fallback Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Catch Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ==========================================
// 3. DATABASE & SERVER INITIALIZATION
// ==========================================

// Create the standard HTTP base wrapper needed by Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }
});

// Establish connection to your MongoDB Atlas cluster loop instance
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_db')
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
    
    // Boot up the Baileys background WhatsApp listener
    startWhatsAppEngine(io);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); 
  });

// ==========================================
// 4. REAL-TIME CHAT SOCKET CONTROLLER
// ==========================================
io.on('connection', (socket) => {
  console.log(`Live widget connected: ${socket.id}`);
  socket.join(socket.id);

  // Fired when a customer types a text message inside the browser widget
  socket.on('send_msg_to_company', async (data) => {
    const { customerName, text } = data;
    const whatsappSock = getWhatsAppSock();
    const engineState = getEngineState();

    // Shield Layer: Halt operations if WhatsApp engine is booting or unauthenticated
    if (!whatsappSock || !engineState.isConnected || !whatsappSock.user) {
      console.log('⚠️ Transmit Denied: Device context missing or unauthenticated.');
      return socket.emit('error_log', { 
        message: 'Our corporate WhatsApp connection is currently optimizing. Please resubmit this request in a few seconds.' 
      });
    }

    try {
      // 1. Archive the new message inside MongoDB
      await ChatLog.create({
        socketSessionId: socket.id,
        customerName: customerName,
        text: text,
        direction: 'incoming'
      });

      // 2. Format a structured message template for the agent's phone view
      const routingTemplate = `📢 New Web Lead\n👤 Name: ${customerName}\n🆔 Session: ${socket.id}\n💬 Message: ${text}\n\n👉 Copy line below to reply directly to this client:\n[${socket.id}]: write message here`;
      
      // Dynamic Target JID populated directly from your secure env files
      const targetCompanyJid = `${process.env.COMPANY_WHATSAPP_NUMBER}@s.whatsapp.net`;

      await whatsappSock.sendMessage(targetCompanyJid, { text: routingTemplate });
      console.log(`✉️ Message from [${customerName}] routed cleanly to corporate device.`);
    } catch (error) {
      console.error('❌ Error forwarding message across Baileys gateway:', error);
      socket.emit('error_log', { message: 'Message delivery exception. Please verify network interfaces.' });
    }
  });
});

// Start listening on your designated development profile port channel
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
