import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    console.log("Get Started Clicked!");
  };

  return (
    // UPDATED: Background is the primary dark charcoal/slate color
    <div className="min-h-screen bg-slate-900 overflow-hidden relative">

      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="text-center lg:text-left z-10">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Trade Skills, Grow Together
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Connect with others to share what you know and learn what you need.
              Build meaningful relationships while expanding your skillset through our vibrant community of learners and teachers.
            </p>
            <button
              onClick={handleCTAClick}
              // UPDATED: Button now uses the warm, energetic orange accent color
              className="bg-orange-600 text-white px-10 py-4 text-lg font-bold rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-orange-500/30 active:scale-95"
            >
              Get Started
            </button>
          </div>

          {/* Skill Exchange Graphic */}
          <div 
            className="flex items-center justify-center"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="relative w-96 h-96">
              {/* Skill Nodes - UPDATED: Gradients now use the vibrant duo of Teal and Purple, plus other energetic colors */}
              {[
                { emoji: <img src="/src/assets/paint.png" alt="Paint Emoji" className="inline-block w-10 h-10" />, pos: 'top-0 left-1/2 -translate-x-1/2', delay: '0s', bg: 'from-red-600 to-red-700' },
                { emoji: <img src="/src/assets/pc.png" alt="Paint Emoji" className="inline-block w-10 h-10" />, pos: 'top-1/4 right-0', delay: '0.5s', bg: 'from-teal-400 to-cyan-500' },
                { emoji: '📸', pos: 'bottom-1/4 right-0', delay: '1s', bg: 'from-blue-500 to-sky-500' },
                { emoji: '🎵', pos: 'bottom-0 left-1/2 -translate-x-1/2', delay: '1.5s', bg: 'from-purple-500 to-violet-600' },
                { emoji: '🍳', pos: 'bottom-1/4 left-0', delay: '2s', bg: 'from-rose-400 to-pink-500' },
                { emoji: '💼', pos: 'top-1/4 left-0', delay: '2.5s', bg: 'from-green-300 to pink-300' }
              ].map((node, index) => (
                <div
                  key={index}
                  className={`absolute w-20 h-20 rounded-full bg-gradient-to-br ${node.bg} flex items-center justify-center text-3xl text-white font-semibold ${node.pos} animate-float`}
                  style={{ animationDelay: node.delay }}
                >
                  {node.emoji}
                </div>
              ))}

              {/* Center Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full flex items-center justify-center text-4xl animate-pulse-center">
                👤
              </div>

              {/* Connection Lines (No color change needed) */}
              {[
                 { width: 'w-36', rotation: 'rotate-45', position: 'top-[15%] left-1/2 -translate-x-1/2', delay: '0.5s' },
                 { width: 'w-32', rotation: 'rotate-0', position: 'top-1/2 right-[15%] -translate-y-1/2', delay: '1s' },
                 { width: 'w-32', rotation: '-rotate-45', position: 'bottom-[15%] right-[25%]', delay: '1.5s' },
                 { width: 'w-36', rotation: '-rotate-[135deg]', position: 'bottom-[15%] left-1/2 -translate-x-1/2', delay: '2s' },
                 { width: 'w-32', rotation: 'rotate-180', position: 'bottom-[35%] left-[15%] -translate-y-1/2', delay: '2.5s' },
                 { width: 'w-32', rotation: 'rotate-[135deg]', position: 'top-[35%] left-[25%]', delay: '3s' }
              ].map((line, index) => (
                <div
                  key={index}
                  className={`absolute h-0.5 bg-gradient-to-r from-white/30 to-white/10 origin-left transform ${line.rotation} ${line.width} ${line.position} animate-glow`}
                  style={{ animationDelay: line.delay }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED: Animation keyframes to use a subtle orange pulse to match the CTA */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-center {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.2); }
          50% { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 20px 10px rgba(249, 115, 22, 0); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-center { animation: pulse-center 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;