const ChatLog = require('./models/ChatLog');

let sock = null;
let ioRef = null;
let qrCodeString = null;
let isConnected = false;

const startWhatsAppEngine = async (ioInstance) => {
  ioRef = ioInstance;

  try {
    const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = await import('@whiskeysockets/baileys');
    const { default: pino } = await import('pino');
    const qrcode = require('qrcode');
    const qrcodeTerminal = require('qrcode-terminal');

    console.log('⚡ [SYSTEM] Initializing persistent session directory cache...');
    const { state, saveCreds } = await useMultiFileAuthState('./company_whatsapp_session');

    sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false // Custom rendered below via qrcodeTerminal for visual compatibility
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        isConnected = false;
        try {
          // 1. Generate Base64 DataURL for Admin Panel browser polling
          qrCodeString = await qrcode.toDataURL(qr);
          ioRef.emit('whatsapp_qr', { qrCodeString });

          // 2. Terminal fallback rendering
          console.log('\n✨ [ACTION REQUIRED] Scan the QR code below to link NEWIBER Travel line:');
          qrcodeTerminal.generate(qr, { small: true });
          console.log('💡 Tip: If the rendering matrix looks warped, zoom out your terminal layout.\n');
        } catch (err) {
          console.error('❌ QR Generation Error:', err);
        }
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        isConnected = false;
        qrCodeString = null;
        ioRef.emit('whatsapp_status', { connected: false });
        
        console.warn(`⚠️ [NETWORK] Connection lost (Code: ${statusCode}). Reconnect attempt status: ${shouldReconnect}`);
        if (shouldReconnect) startWhatsAppEngine(ioRef);
      } else if (connection === 'open') {
        isConnected = true;
        qrCodeString = null;
        console.log('\n==================================================================');
        console.log('✅ [SUCCESS] Gateway successfully authenticated and linked with WhatsApp!');
        console.log(`📱 Active Instance: ${sock.user.name || 'Support'} (${sock.user.id.split(':')[0]})`);
        console.log('==================================================================\n');
        ioRef.emit('whatsapp_status', { connected: true });
      }
    });

    sock.ev.on('messages.upsert', async (m) => {
      if (m.type !== 'notify') return;

      for (const msg of m.messages) {
        const remoteJid = msg.key.remoteJid;
        if (remoteJid.endsWith('@g.us')) continue; // تخطي المجموعات

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
        if (!text) continue;

        // 🌟 خاصية الرد الذكي: إذا كانت الرسالة صادرة من موبايل الشركة
        if (msg.key.fromMe) {
          
          // 1. الطريقة السهلة (الاقتباس/الرد): نتحقق إذا كان الموظف عامل Reply على رسالة السيرفر
          const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
          const quotedText = quotedMessage?.conversation || quotedMessage?.extendedTextMessage?.text;
          
          let targetSocketId = null;
          let cleanReplyText = text;

          if (quotedText) {
            // استخراج السيرفر آيدي من الرسالة المقتبسة
            const sessionMatch = quotedText.match(/🆔 Session:\s*([^\n]+)/);
            if (sessionMatch) {
              targetSocketId = sessionMatch[1].trim();
            }
          }

          // 2. الطريقة الاحتياطية (إذا كتب الكود يدوياً القديم كنوع من الأمان)
          if (!targetSocketId) {
            const routingMatch = text.match(/^\[([^\]]+)\]:\s*([\s\S]*)$/);
            if (routingMatch) {
              targetSocketId = routingMatch[1];
              cleanReplyText = routingMatch[2];
            }
          }

          // إذا عثرنا على الآيدي بأي من الطريقتين، نرسل الرسالة للموقع فوراً
          if (targetSocketId) {
            console.log(`✉️ [OUTBOUND ROUTING] Routing reply to socket session [${targetSocketId}]`);

            try {
              await ChatLog.create({
                socketSessionId: targetSocketId,
                customerName: "Company Support",
                text: cleanReplyText,
                direction: 'outgoing'
              });

              // إرسال للعميل على الموقع
              ioRef.to(targetSocketId).emit('msg_from_company', {
                text: cleanReplyText,
                timestamp: new Date(),
                isFromCompany: true
              });
            } catch (err) {
              console.error('❌ Database Sync Logging Error:', err);
            }
          }
          continue;
        }
      }
    });

  } catch (criticalCrash) {
    console.error('❌ Fatal core WhatsApp background worker crash:', criticalCrash);
  }
};

const getWhatsAppSock = () => sock;
const getEngineState = () => ({ isConnected, qrCodeString });

module.exports = { startWhatsAppEngine, getWhatsAppSock, getEngineState };