import React, { useRef, useState } from "react";
import { Destination } from "../types";
import { Star, ArrowRight, ArrowLeft, Sparkles, MapPin, Compass, Globe, Award, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeaturedCarouselProps {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  destinations,
  activeId,
  onSelect,
}) => {
  const currentId = activeId || destinations[0].id;
  const activeDest = destinations.find((d) => d.id === currentId) || destinations[0];
  const activeIndex = destinations.findIndex((d) => d.id === currentId);

  const listRef = useRef<HTMLDivElement>(null);

  // Smooth scroll target item into view when active item changes
  React.useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-id="${currentId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentId]);

  // Premium stats definitions with matched icons for exquisite decoration
  const stats = [
    { label: "Experiences", value: "15,000+", icon: <Compass className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: "Provinces", value: "63", icon: <Globe className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: "Travelers", value: "1.2M+", icon: <Heart className="w-3.5 h-3.5 text-pink-400" /> },
    { label: "Satisfaction", value: "98%", icon: <Award className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + destinations.length) % destinations.length;
    onSelect(destinations[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % destinations.length;
    onSelect(destinations[nextIdx].id);
  };

  const progressPercent = ((activeIndex + 1) / destinations.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1400px] mx-auto rounded-[32px] overflow-hidden border border-white/10 relative group/showcase shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-[#010208]"
    >
      
      {/* 2. Panoramic background drone aerial image of Vietnam cliffs/sea */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Subtle, beautiful space transition: dark gradient from top to blend seamlessly with space background */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#010208] via-black/20 to-transparent z-10" />
        {/* Soft left-to-right mask helping text read perfectly without solid black overlay */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        {/* Soft bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#010208] via-[#010208]/30 to-transparent z-10" />

        {/* Slow zoom background with full premium color representation */}
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=82"
          alt="Aerial Drone Vietnam Coastline"
          className="w-full h-full object-cover group-hover/showcase:scale-[1.04] transition-transform duration-[6000ms] ease-out"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Main Content Layout Container */}
      <div className="relative z-20 px-6 py-12 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial Presentation in premium elegant Glass container */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start text-left space-y-8 bg-black/35 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          
          <div className="space-y-4 w-full">
            {/* Dynamic Label */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-emerald-400 font-bold">
                ✦ Discover Vietnam
              </span>
            </motion.div>

            {/* Headline with custom stylized letterforms */}
            <h2 className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-none uppercase">
              Hello <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 select-all tracking-wide">
                Vietnam
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-200/90 leading-relaxed font-normal pt-2">
              Journey through emerald bays, ancient heritage, dramatic caves, tropical coastlines, and authentic cultural experiences across Vietnam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-start sm:items-center">
            {/* Premium Glassmorphism CTA Button */}
            <button
              onClick={() => {
                // Scroll key target points smoothly into place
                document.getElementById("navbar")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group/cta overflow-hidden relative flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] active:scale-95 cursor-pointer shrink-0"
            >
              {/* Soft inner glow trace */}
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity" />
              <span>Discover Destinations</span>
              <ArrowRight className="w-4 h-4 text-white group-hover/cta:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Floating statistics placed subtly in lower zone */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 w-full">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-3 transition-colors duration-300">
                <div className="w-8 h-8 rounded-xl bg-slate-900/80 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner">
                  {stat.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-black text-white leading-none font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-mono font-bold mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Overlapping Deck Carousel */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-end w-full space-y-6">
          
          {/* Overlapping Slider List - perfectly bounded inside viewport/frame */}
          <div className="relative w-full flex items-center justify-start lg:justify-end overflow-hidden min-h-[320px] pl-1">
            <div 
              ref={listRef}
              className="flex -space-x-4 sm:-space-x-8 hover:-space-x-3 transition-all duration-500 w-full lg:max-w-xl justify-start lg:justify-start overflow-x-auto no-scrollbar pb-4 pt-1 scroll-smooth"
            >
              {destinations.map((dest, idx) => {
                const isSelected = dest.id === currentId;
                
                return (
                  <motion.div
                    key={dest.id}
                    data-id={dest.id}
                    onClick={() => onSelect(dest.id)}
                    className={`shrink-0 rounded-[24px] overflow-hidden cursor-pointer relative transition-all duration-500 shadow-2xl ${
                      isSelected
                        ? "w-[190px] sm:w-[230px] h-[280px] sm:h-[330px] z-30 scale-100 ring-4 ring-emerald-400 ring-offset-2 ring-offset-[#010208]"
                        : "w-[150px] sm:w-[170px] h-[240px] sm:h-[280px] z-10 opacity-75 sm:opacity-50 scale-95 hover:opacity-100 hover:scale-[0.98] saturate-[0.85] filter hover:saturate-100"
                    }`}
                  >
                    {/* Destination Photo Backdrop */}
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Elite Glassmorphism Bottom Vignette Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    
                    {/* Header Star Tag */}
                    <div className="absolute top-3 left-3 flex gap-1 items-center">
                      <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-md text-[9px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                        {dest.tags[0] || "Luxury"}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                          <Star className="w-4 h-4 fill-current text-white" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/15 backdrop-blur-sm">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Info Block overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 text-left flex flex-col justify-end bg-gradient-to-t from-[#010208] via-[#010208]/80 to-transparent pt-8">
                      <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-widest font-bold block mb-0.5">
                        {dest.activity}
                      </span>
                      
                      <h4 className="font-display font-bold text-sm sm:text-base text-white mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{dest.name}</span>
                      </h4>

                      <p className="text-[10px] text-gray-300 leading-normal line-clamp-2 font-normal opacity-90">
                        {dest.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Premium Bottom Slider Actions bar */}
          <div className="w-full lg:max-w-xl bg-[#010208]/75 backdrop-blur-xl border border-white/15 px-6 py-3.5 rounded-full flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Circled Next/Prev Buttons exactly like the template photo */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Next Slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Line Progress Gauge and fractions */}
            <div className="flex items-center gap-5">
              <div className="w-24 sm:w-36 h-[2.5px] bg-white/15 relative rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex items-baseline font-mono select-none">
                <span className="text-sm sm:text-base font-bold text-white">0{activeIndex + 1}</span>
                <span className="text-xs text-white/40 px-1">/</span>
                <span className="text-xs text-white/40">0{destinations.length}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

