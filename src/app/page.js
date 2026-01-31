"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Crown } from 'lucide-react';

export default function MercedesExperience() {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState('SUV');
  const [index, setIndex] = useState(0);
  const [colorMode, setColorMode] = useState('default');

  useEffect(() => {
    fetch('/api/cars').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-gold">CARREGANDO LUXO...</div>;

  const currentCar = data[category][index];

  const filters = {
    default: "brightness(1) contrast(1)",
    silver: "grayscale(1) brightness(1.2) contrast(1.1) drop-shadow(0 0 20px #fff)",
    gold: "sepia(0.6) saturate(3) hue-rotate(-10deg) brightness(1.1) drop-shadow(0 0 25px #d4af37)",
    obsidian: "brightness(0.4) contrast(1.4) drop-shadow(0 0 15px rgba(255,255,255,0.2))"
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="bg-luxury" />
      <nav className="flex justify-between items-center px-10 md:px-20 py-10 relative z-50">
        <h1 className="text-xl md:text-2xl font-light tracking-[10px] md:tracking-[15px] opacity-80">MERCEDES-BENZ</h1>
        <div className="flex gap-6 md:gap-12 font-semibold">
          {['SUV', 'LUXO'].map(cat => (
            <button 
              key={cat}
              onClick={() => {setCategory(cat); setIndex(0)}}
              className={`${category === cat ? 'text-gold border-b-2 border-[#d4af37]' : 'text-gray-500'} transition-all duration-500`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-10">
        <motion.div key={currentCar.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
          <span className="text-gold tracking-[5px] text-xs md:text-sm uppercase mb-2 block font-bold">The New Era of Luxury</span>
          <h2 className="text-4xl md:text-7xl font-bold italic tracking-tighter mb-4 uppercase">{currentCar.name}</h2>
          <p className="max-w-xl mx-auto text-gray-400 italic text-sm md:text-lg">
            &quot;A alma da máquina em perfeita simbiose com a excelência de quem a conduz.&quot;
          </p>
        </motion.div>

        <div className="relative flex justify-center items-center h-[300px] md:h-[500px] w-full">
          <div className="golden-stage" />
          <AnimatePresence mode="wait">
            <motion.img
              key={currentCar.id + colorMode}
              src={currentCar.img}
              initial={{ filter: "brightness(0) blur(20px)", scale: 0.8, opacity: 0 }}
              animate={{ filter: filters[colorMode], scale: 1, opacity: 1 }}
              exit={{ filter: "hue-rotate(180deg) brightness(5)", scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative z-10 w-[90%] md:w-[850px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
            />
          </AnimatePresence>
        </div>

        <div className="flex gap-10 md:gap-20 items-center z-50 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-full border border-white/10 shadow-2xl mt-10">
          <button onClick={() => setIndex((index - 1 + 3) % 3)} className="hover:text-gold transition-colors"><ShieldCheck size={28}/></button>
          <div className="flex gap-4 md:gap-6 border-x border-white/20 px-6 md:px-10">
            <button onClick={() => setColorMode('silver')} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-300 border-2 border-white hover:scale-125 transition-transform" />
            <button onClick={() => setColorMode('gold')} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-600 border-2 border-white hover:scale-125 transition-transform" />
            <button onClick={() => setColorMode('obsidian')} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-white hover:scale-125 transition-transform" />
          </div>
          <button onClick={() => setIndex((index + 1) % 3)} className="hover:text-gold transition-colors"><Zap size={28}/></button>
        </div>
      </div>
    </main>
  );
}