import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const AdminChatSetup = () => {
  const [status, setStatus] = useState({ isConnected: false, qrCodeString: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Falls back to localhost:5000 if your environment variable isn't defined
    const backendUrl = "https://newiber-travel-demo.vercel.app/";
    
    // 1. Fetch immediate infrastructure status when the page mounts
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/chat/status`, { withCredentials: true });
        setStatus(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error pulling gateway status parameters:", err);
        setLoading(false);
      }
    };

    checkStatus();

    // 2. Open WebSocket link to listen for live QR updates dynamically
    const socket = io(backendUrl, { withCredentials: true });
    
    socket.on('whatsapp_qr', (data) => {
      setStatus({ isConnected: false, qrCodeString: data.qrCodeString });
    });

    socket.on('whatsapp_status', (data) => {
      if (data.connected) {
        setStatus({ isConnected: true, qrCodeString: null });
      } else {
        setStatus({ isConnected: false, qrCodeString: null });
      }
    });

    return () => socket.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-sans">
        <div className="animate-pulse tracking-widest text-xs uppercase">Initializing Communications Engine...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#18181b] border border-zinc-800 p-8 rounded-xl text-center shadow-2xl">
        <h1 className="text-xl font-bold tracking-tight mb-1 text-zinc-100">WhatsApp Gateway Portal</h1>
        <p className="text-xs text-zinc-400 mb-8 uppercase tracking-wider font-medium">NEWIBER Travel • Internal Management</p>

        {status.isConnected ? (
          <div className="space-y-5 py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h2 className="text-lg font-semibold text-emerald-400">System Connected & Active</h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Device session handshake successful. Handset nodes are actively listening to upstream queues. Web clients can now route messages smoothly.
            </p>
          </div>
        ) : status.qrCodeString ? (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg inline-block shadow-xl mx-auto">
              <img src={status.qrCodeString} alt="WhatsApp Sync Code" className="w-64 h-64 block" />
            </div>
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg text-amber-400 text-xs text-left leading-relaxed">
              <strong className="block mb-1 text-amber-300 uppercase tracking-wide">Pairing Guide:</strong>
              1. Open WhatsApp on your target corporate device phone line.<br />
              2. Navigate to Settings → Linked Devices → Tap "Link a Device".<br />
              3. Focus the camera squarely on this QR code to log the server session in.
            </div>
          </div>
        ) : (
          <div className="text-zinc-500 text-xs py-12 animate-pulse tracking-wider uppercase font-medium">
            Awaiting session payload from server engine...
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatSetup;
