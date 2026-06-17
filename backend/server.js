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

// الدومين الحي المعتمد (يقرأ من البيئة أو يقع على فيرسيل الافتراضي)
const ALLOWED_ORIGIN = process.env.CLIENT_URL || 'https://travel.newiber.com';

// ==========================================
// 1. SECURITY & CORE MIDDLEWARES
// ==========================================

// Update Helmet Content Security Policy to allow dynamic socket traffic
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // 🌟 تعديل: السماح بالاتصالات من أي مكان في الإنتاج ودعم السوكت الحي
      connectSrc: ["'self'", "ws:", "wss:", ALLOWED_ORIGIN, "http://localhost:5000"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
    },
  },
}));

app.use(express.json());
app.use(cookieParser());

// CORS settings matching production and local environments
app.use(cors({ 
  origin: [ALLOWED_ORIGIN, 'http://localhost:5173'], 
  credentials: true 
}));

// API Route Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, 
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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ALLOWED_ORIGIN, 'http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling'] // دعم كفاءة قنوات الاتصال في البيئات السحابية
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
  console.log(`Live widget/admin connected: ${socket.id}`);
  socket.join(socket.id);

  // 🌟 الحل السحري لـ Race Condition:
  // بمجرد دخول المسؤول (الآدمن) لصفحة السوكت، السيرفر يدفعه بأحدث حالة للوتساب فوراً دون انتظار!
  const currentEngineState = getEngineState();
  if (currentEngineState.isConnected) {
    socket.emit('whatsapp_status', { connected: true });
  } else if (currentEngineState.qrCodeString) {
    // لو الـ QR متولد أوريدي وموجود في الـ EngineState، ابعته في نفس اللحظة
    socket.emit('whatsapp_qr', { qrCodeString: currentEngineState.qrCodeString });
  }

  // Fired when a customer types a text message inside the browser widget
  socket.on('send_msg_to_company', async (data) => {
    const { customerName, text } = data;
    const whatsappSock = getWhatsAppSock();
    const engineState = getEngineState();

    // Shield Layer
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
      
      const targetCompanyJid = `${process.env.COMPANY_WHATSAPP_NUMBER}@s.whatsapp.net`;

      await whatsappSock.sendMessage(targetCompanyJid, { text: routingTemplate });
      console.log(`✉️ Message from [${customerName}] routed cleanly to corporate device.`);
    } catch (error) {
      console.error('❌ Error forwarding message across Baileys gateway:', error);
      socket.emit('error_log', { message: 'Message delivery exception. Please verify network interfaces.' });
    }
  });
});

// 🌟 تعديل: البورت الديناميكي لـ Railway إجباري
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
