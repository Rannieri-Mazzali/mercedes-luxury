"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

// Definimos o que é um Carro para o TypeScript não reclamar
interface Car {
  id: number;
  name: string;
  img: string;
}

interface CarData {
  [key: string]: Car[];
}

export default function MercedesExperience() {
  const [data, setData] = useState<CarData | null>(null);
  const [category, setCategory] = useState<string>('SUV');
  const [index, setIndex] = useState(0);
  const [colorMode, setColorMode] = useState<string>('default');

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Erro na API:", err));
  }, []);

  if (!data) return <div className="h-screen bg-black" />;

  const currentCar = data[category][index];

  const filterStyles: Record<string, string> = {
    default: "brightness(1)",
    silver: "grayscale(1) brightness(1.2)",
    gold: "sepia(0.6) saturate(3) hue-rotate(-10deg)",
    obsidian: "brightness(0.4) contrast(1.4)"
  };

  return (
    <main className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <nav className="flex gap-10 mb-20">
        {Object.keys(data).map((cat) => (
          <button 
            key={cat} 
            onClick={() => { setCategory(cat); setIndex(0); }}
            className={category === cat ? "text-yellow-500 border-b border-yellow-500" : "text-gray-500"}
          >
            {cat}
          </button>
        ))}
      </nav>

      <h1 className="text-5xl font-bold italic uppercase mb-10">{currentCar.name}</h1>
      
      <div className="relative h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${currentCar.id}-${colorMode}`}
            src={currentCar.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`w-[700px] object-contain transition-all duration-700`}
            style={{ filter: filterStyles[colorMode] }}
          />
        </AnimatePresence>
      </div>

      <div className="flex gap-10 mt-10 bg-white/10 p-5 rounded-full backdrop-blur-md items-center">
        <button onClick={() => setIndex((index + 2) % 3)} title="Anterior" aria-label="Anterior"><ShieldCheck /></button>
        <div className="flex gap-4 border-x px-6 border-white/20">
          <button onClick={() => setColorMode('silver')} className="w-6 h-6 rounded-full bg-gray-400" title="Prata" />
          <button onClick={() => setColorMode('gold')} className="w-6 h-6 rounded-full bg-yellow-600" title="Ouro" />
          <button onClick={() => setColorMode('obsidian')} className="w-6 h-6 rounded-full bg-zinc-900" title="Preto" />
        </div>
        <button onClick={() => setIndex((index + 1) % 3)} title="Próximo" aria-label="Próximo"><Zap /></button>
      </div>
    </main>
  );
} 