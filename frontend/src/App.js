import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatWidget from './components/ChatWidget';

// 🌟 استورد اللوجو هنا في ملف App.jsx الرئيسي
import companyLogo from './assets/logo-solid.svg'; 

const App = () => {
  const [forcedOpenState, setForcedOpenState] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-[#29abe2]/30">
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet context={[forcedOpenState, setForcedOpenState]} />
        </motion.div>
      </main>

      {/* 🌟 مرر اللوجو هنا للمكون */}
      <ChatWidget 
        companyName="NEWIBER Travel" 
        companyLogo={companyLogo} 
        forcedOpenState={forcedOpenState} 
        setForcedOpenState={setForcedOpenState} 
      />
    </div>
  );
};

export default App;