import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatWidget = ({ companyName = "NEWIBER Travel", companyLogo, forcedOpenState, setForcedOpenState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // مرجع ثابت لملف الصوت الخاص بك
  const audioRef = useRef(null);

  useEffect(() => {
    if (forcedOpenState) {
      setIsOpen(true);
    }
  }, [forcedOpenState]);

  useEffect(() => {
    // تحميل ملف الصوت من مجلد public
    audioRef.current = new Audio('/notification.mp3');
    
    // 🌟 تأكيد إيقاف التكرار برمجياً للأمان (يشتغل مرة واحدة فقط ويموت)
    audioRef.current.loop = false;

    const backendUrl = import.meta.env.CLIENT_URL || 'https://travel.newiber.com/';
    socketRef.current = io(backendUrl, { withCredentials: true });

    // الاستماع لردود الواتساب القادمة من السيرفر
    socketRef.current.on('msg_from_company', (data) => {
      setMessages((prev) => [...prev, {
        text: data.text,
        isFromCompany: true,
        timestamp: data.timestamp
      }]);

      // تشغيل الصوت الخاطف فوراً عند وصول الرسالة
      if (audioRef.current) {
        try {
          audioRef.current.volume = 1.0;    // حجم الصوت كامل
          audioRef.current.currentTime = 0; // إرجاع التراك للبداية لضمان التشغيل الفوري
          
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.log("المتصفح في انتظار التفاعل الأول لتشغيل الصوت.");
            });
          }
        } catch (soundError) {
          console.error("خطأ تشغيل ملف الصوت الخاص بك:", soundError);
        }
      }
    });

    socketRef.current.on('error_log', (data) => {
      alert(data.message);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClose = () => {
    setIsOpen(false);
    if (setForcedOpenState) setForcedOpenState(false);
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (customerName.trim()) {
      // إيقاظ وتفعيل صلاحية الصوت للموقع فور نقرة العميل (دون تكرار)
      if (audioRef.current) {
        audioRef.current.volume = 0.001; // صامت تماماً في هذه اللحظة
        audioRef.current.play()
          .then(() => {
            // نوقفه فوراً ونعيده للصفر، المتصفح الآن فتح لنا تصريح الصوت بالكامل!
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            console.log("تم تفعيل قنوات الصوت بنجاح للاستخدام الفردي المتقطع");
          })
          .catch(err => console.log("جاري الانتظار"));
      }

      setIsRegistered(true);
      setMessages([{
        text: `Hello ${customerName}! Welcome to ${companyName}. How may our travel architects assist you in curating your luxury itinerary today?`,
        isFromCompany: true,
        timestamp: new Date()
      }]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const msgData = {
      customerName: customerName,
      text: inputValue.trim()
    };

    socketRef.current.emit('send_msg_to_company', msgData);

    setMessages((prev) => [...prev, {
      text: inputValue.trim(),
      isFromCompany: false,
      timestamp: new Date()
    }]);

    setInputValue('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#29abe2] text-white p-4 rounded-full shadow-2xl hover:bg-[#228cb8] transition-all flex items-center justify-center w-14 h-14 text-xl"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden font-sans text-black" dir="ltr">
      <div className="bg-[#29abe2] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {companyLogo && <img src={companyLogo} alt="Logo" className="w-8 h-8 rounded-full object-cover bg-white" />}
          <div>
            <h3 className="font-bold text-sm tracking-wide">{companyName}</h3>
            <span className="text-[10px] opacity-90 block uppercase tracking-widest font-semibold">Concierge Support Desk</span>
          </div>
        </div>
        <button onClick={handleClose} className="text-white hover:text-gray-200 text-xl font-bold">&times;</button>
      </div>

      {!isRegistered ? (
        <form onSubmit={handleStartChat} className="flex-1 p-6 flex flex-col justify-center gap-4 bg-gray-50">
          <div className="text-center mb-2">
            <h4 className="font-bold text-gray-800 text-base">Begin Premium Experience</h4>
            <p className="text-xs text-gray-500 mt-1">Please enter your name below to connect with our dedicated representatives instantly.</p>
          </div>
          <input 
            type="text" 
            required
            placeholder="Your name..." 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-sm bg-white text-black outline-none focus:border-[#29abe2]"
          />
          <button type="submit" className="w-full bg-[#29abe2] text-white font-bold py-3 text-xs uppercase tracking-widest rounded-lg shadow-md hover:bg-[#228cb8] transition-all">
            Connect Live
          </button>
        </form>
      ) : (
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[75%] p-3 rounded-lg text-sm shadow-sm ${
                  msg.isFromCompany 
                    ? 'bg-white text-gray-800 align-self-start rounded-tl-none border border-gray-100' 
                    : 'bg-[#29abe2] text-white self-end rounded-tr-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-[9px] text-right mt-1 opacity-60 font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-200 px-4 py-2 rounded-full text-sm outline-none focus:border-[#29abe2] bg-gray-50 text-black"
            />
            <button type="submit" className="bg-[#29abe2] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#228cb8] transition-all uppercase tracking-wider">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
