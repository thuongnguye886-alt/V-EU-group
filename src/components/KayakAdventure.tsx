import React, { useState, useEffect, useRef } from "react";
import imgNinhBinh from "../assets/images/regenerated_image_1780229488923.jpg";
import imgHaLong from "../assets/images/regenerated_image_1780229086647.jpg";
import imgPhongNha from "../assets/images/regenerated_image_1780229160920.jpg";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  Users,
  ShieldCheck,
  Eye,
  EyeOff,
  Zap,
  Star,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  X,
  CheckCircle2,
  Compass
} from "lucide-react";

// Web Audio API ambient noise generator for immersive spatial sound
class NatureSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  start() {
    if (this.isPlaying) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate pink/brownish noise for sea waves
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter approximation
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // boost volume slightly
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter to simulate washing of waves
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(350, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      // Low frequency oscillator (LFO) to control filter frequency (simulate sea wave rhythm)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second waves cycle

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(250, this.ctx.currentTime); // wave frequency sweep depth

      // Master volume gain node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      // Smooth fade in
      this.masterGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 2.5);

      // Connections
      this.lfo.connect(this.lfoGain);
      if (this.lfoGain && this.filter) {
        this.lfoGain.connect(this.filter.frequency);
      }
      noiseSource.connect(this.filter);
      if (this.masterGain) {
        this.filter.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }

      // Start nodes
      this.lfo.start();
      noiseSource.start();
      this.isPlaying = true;
    } catch (e) {
      console.error("Audio Synthesis failed:", e);
    }
  }

  stop() {
    if (!this.isPlaying) return;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.ctx?.close();
        } catch (_) {}
        this.isPlaying = false;
      }, 900);
    } else {
      this.isPlaying = false;
    }
  }
}

export function KayakAdventure() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "reviews">("overview");
  const [immersivePreview, setImmersivePreview] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const audioSynthRef = useRef<NatureSynth | null>(null);
  
  // Booking Modal States
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("2026-06-03");
  const [travelers, setTravelers] = useState(2);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const images = [
    {
      src: imgNinhBinh,
      title: "Hoàng Đế cùng 2 Tiểu Thái Giám trở về mái nhà xưa tại Hoàng Thành Huế",
      credit: "Hoàng Đế cùng 2 Tiểu Thái Giám trở về mái nhà xưa tại Hoàng Thành Huế"
    },
    {
      src: imgHaLong,
      title: "Active Karst Kayaking Course",
      credit: "Emerald Bays of Ha Long"
    },
    {
      src: imgPhongNha,
      title: "Crystal Cavern Lagoons Exploration",
      credit: "Phong Nha Subterranean River"
    }
  ];

  // Initialize synth on demand
  useEffect(() => {
    audioSynthRef.current = new NatureSynth();
    return () => {
      audioSynthRef.current?.stop();
    };
  }, []);

  // Handle spatial audio play when preview is open
  useEffect(() => {
    if (immersivePreview && !isAudioMuted) {
      audioSynthRef.current?.start();
    } else {
      audioSynthRef.current?.stop();
    }
  }, [immersivePreview, isAudioMuted]);

  const handleToggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const handleTabClick = (tab: "overview" | "itinerary" | "reviews") => {
    setActiveTab(tab);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  return (
    <section id="kayak_adventure_section" className="w-full py-16 sm:py-24 rounded-[2.5rem] bg-gradient-to-b from-[#0c122c]/85 via-[#060c22]/95 to-[#020514]/90 border border-white/10 backdrop-blur-xl relative z-30 shadow-[0_20px_50px_rgba(6,182,212,0.12)] overflow-hidden my-12 px-4 sm:px-8">
      
      {/* Background Outer Ambient Glows */}
      <div className="absolute -top-12 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-cyan-500/20 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/20 to-transparent blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute -bottom-16 left-1/3 w-[450px] h-[300px] bg-gradient-to-t from-teal-500/15 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Title block with elegant typography and custom cyan gradient */}
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono tracking-widest text-cyan-400 uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Curated Active Experience</span>
        </motion.div>
        
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          Ha Long Bay <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(45,212,191,0.15)]">Kayak Adventure</span>
        </h2>
        <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Embark on an unparalleled journey through emerald waters, hidden tunnel lagoons, and pristine karst grottos curated by our AI destination guides.
        </p>
      </div>

      {/* Main Core Section Card Layout */}
      <div id="kayak_dashboard_card" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto p-4 sm:p-8 rounded-3xl bg-[#030712]/60 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full" />

        {/* LEFT STREAM: Immersive Video/Photo Window */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Main Visual Frame */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
            
            {/* Ambient image background */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIdx}
                src={images[activeImageIdx].src}
                alt={images[activeImageIdx].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Dark glass-gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Right Try Before You Go CTA Button */}
            <button
              id="try_before_you_go_btn"
              onClick={() => {
                setImmersivePreview(true);
                setIsAudioMuted(false);
              }}
              className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/30 text-white text-xs font-semibold tracking-wide backdrop-blur-md hover:scale-[1.05] transition-all cursor-pointer shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Try Before You Go</span>
            </button>

            {/* Bottom Info overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              
              {/* Star details */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/5">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white pl-1">4.9</span>
                  <span className="text-[10px] text-gray-400">(847 reviews)</span>
                </div>
                
                {/* Active selection tag */}
                <span className="text-xs text-slate-300 pl-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
                  Currently Viewing: {images[activeImageIdx].credit}
                </span>
              </div>
            </div>
          </div>

          {/* Three Interactive Thumbnails */}
          <div id="kayak_thumbnails_row" className="grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  activeImageIdx === idx
                    ? "border-cyan-400 ring-2 ring-cyan-400/20 scale-[1.02]"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                
                {/* Corner active mark */}
                {activeImageIdx === idx && (
                  <div className="absolute bottom-1 right-1 bg-cyan-400 rounded-full p-0.5">
                    <Check className="w-2 h-2 text-black stroke-[3px]" />
                  </div>
                )}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT STREAM: Itinerary, Booking Controls & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Top row with 3 key stats cards */}
          <div className="grid grid-cols-3 gap-3">
            
            {/* Stat 1: Duration */}
            <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-1.5 hover:bg-white/5 transition-all">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-400 leading-none">Duration</span>
              <span className="text-xs font-bold text-white">Full Day</span>
            </div>

            {/* Stat 2: Group Size */}
            <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-1.5 hover:bg-white/5 transition-all">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-400 leading-none">Group Size</span>
              <span className="text-xs font-bold text-white">2-12</span>
            </div>

            {/* Stat 3: Safety Certification */}
            <div className="bg-white/3 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-1.5 hover:bg-white/5 transition-all">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-400 leading-none">Safety</span>
              <span className="text-xs font-bold text-white">Certified</span>
            </div>

          </div>

          {/* Interactive Navigation Tabs for content */}
          <div className="flex flex-col space-y-3 flex-1">
            
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              {[
                { id: "overview", label: "Overview" },
                { id: "itinerary", label: "Itinerary" },
                { id: "reviews", label: "Reviews" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as any)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-800/30 shadow-inner"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tabs Dynamic Content Box */}
            <div className="bg-[#050b1d]/80 rounded-2xl border border-white/5 p-4.5 min-h-[140px] flex flex-col justify-center text-left relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      Glide through the emerald waters of Ha Long Bay on a private kayak, weaving between towering limestone karsts draped in lush jungle. Discover hidden lagoons, sea caves, and floating fishing villages that most tourists never see. Your expert guide ensures both safety and unforgettable memories.
                    </p>
                  </motion.div>
                )}

                {activeTab === "itinerary" && (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 text-xs text-gray-300 font-sans"
                  >
                    <div className="flex gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">08:30 AM</span>
                      <span>Departure from Tuan Chau Marina aboard luxury escort catamaran.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">10:00 AM</span>
                      <span>Launch kayaks directly outer side of Luon & Sung Sot caves.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">12:30 PM</span>
                      <span>Seafood spread onboard styled catamaran support vessel.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">02:30 PM</span>
                      <span>Navigate secluded coral reefs and hidden cove lagoons.</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5 font-sans"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-white font-bold">5.0</span>
                    </div>
                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "An absolutely mindblowing experience! Kayaking under the hidden caves and seeing the pristine lagoons was the absolute highlight of our trip. Highly recommend!"
                    </p>
                    <span className="text-[10px] text-gray-400 block">- Sarah M., Melbourne</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Checklist items with green checks */}
            <div className="flex flex-wrap gap-2 pt-2 justify-start">
              {[
                "Kayak Equipment",
                "Life Vest",
                "Local Guide",
                "Lunch Included",
                "Insurance"
              ].map((pill, pIdx) => (
                <div
                  key={pIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/20 border border-cyan-800/10 text-[11px] text-cyan-300 font-semibold"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-cyan-400 stroke-[3px]" />
                  </div>
                  <span>{pill}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Pricing Row and CTA Box */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block leading-none mb-1">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-mono text-white">$89</span>
                <span className="text-xs text-gray-400 font-sans font-medium">/ person</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowBookingModal(true);
                setIsBookingConfirmed(false);
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-display font-medium text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 relative border border-cyan-400/20 shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white fill-current" />
              <span>Book Now</span>
            </button>
          </div>

        </div>

      </div>

      {/* PORTAL BOX: Immersive Audio / Visual Live Wave Sim Preview Modal */}
      <AnimatePresence>
        {immersivePreview && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-full max-w-2xl bg-slate-950 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden relative p-6 sm:p-8 flex flex-col space-y-6">
              
              {/* Top Row with Close & Audio button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "20s" }} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-base text-white">Spatial Nature Portal</h3>
                    <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Simulation: Ha Long Bay Marine</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleAudio}
                    className="p-2.5 rounded-full bg-white/5 border border-white/5 text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-mono font-medium"
                  >
                    {isAudioMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-red-400" />
                        <span>UNMUTE REEF SOUNDS</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span>MUTED</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setImmersivePreview(false);
                      audioSynthRef.current?.stop();
                    }}
                    className="p-2.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                    aria-label="Close portal modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Central Dynamic Wave Visualizer Canvas simulation */}
              <div className="bg-black/40 rounded-2xl aspect-video w-full border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                
                {/* Simulated ambient lapping waves rendering */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-cyan-950/40 via-blue-950/20 to-black pointer-events-none" />
                
                {/* SVG Visualizer that animates smoothly */}
                <svg className="absolute inset-0 w-full h-full z-10 opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,60 Q25,30 50,60 T100,60 L100,100 L0,100 Z" fill="rgba(6, 182, 212, 0.1)">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite"
                      values="M0,60 Q25,30 50,60 T100,60 L100,100 L0,100 Z;
                              M0,50 Q25,75 50,54 T100,50 L100,100 L0,100 Z;
                              M0,60 Q25,30 50,60 T100,60 L100,100 L0,100 Z"
                    />
                  </path>
                  <path d="M0,70 Q30,50 60,75 T100,70 L100,100 L0,100 Z" fill="rgba(13, 148, 136, 0.15)">
                    <animate attributeName="d" dur="7s" repeatCount="indefinite"
                      values="M0,70 Q30,50 60,75 T100,70 L100,100 L0,100 Z;
                              M0,80 Q30,65 60,82 T100,80 L100,100 L0,100 Z;
                              M0,70 Q30,50 60,75 T100,70 L100,100 L0,100 Z"
                    />
                  </path>
                </svg>

                {/* Main live interactive element overlay */}
                <div className="z-20 text-center space-y-4 max-w-md p-4 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner">
                  <motion.div
                    animate={{ scale: isAudioMuted ? 1 : [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto"
                  >
                    {!isAudioMuted ? (
                      <Volume2 className="w-8 h-8 text-cyan-400" />
                    ) : (
                      <VolumeX className="w-8 h-8 text-gray-500" />
                    )}
                  </motion.div>
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-sm text-white">Spatial Soundscape Activated</h4>
                    <p className="text-xs text-gray-400 leading-normal">
                      We generated high-quality ambient sea tides, sweeping wind, and local bird frequencies dynamically on your system using Web Audio synth modules.
                    </p>
                  </div>
                  
                  {isAudioMuted && (
                    <button
                      onClick={() => setIsAudioMuted(false)}
                      className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold text-xs cursor-pointer hover:bg-cyan-300 transition-colors"
                    >
                      ENABLE REAL AUDIO
                    </button>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-gray-500 uppercase">
                  ACTIVE DECAY INDEX: 8.41ns -- SYNTH CH1
                </div>
              </div>

              {/* Description of what they see */}
              <p className="text-xs text-slate-300 leading-relaxed text-left bg-white/3 p-4 rounded-xl border border-white/5">
                ⚡ <b>Spatial Preview Insights:</b> This portal simulates the acoustics inside Luon Lagoon. At low tide (typically around 09:30 AM), acoustic resonance inside the cave causes ambient wind frequencies to fall to 220Hz, providing a relaxing quiet echo.
              </p>

              {/* Close CTAs */}
              <button
                onClick={() => {
                  setImmersivePreview(false);
                  audioSynthRef.current?.stop();
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-xl text-xs sm:text-sm tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
              >
                RETURN TO EXPERIENCE DASHBOARD
              </button>

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Form Overlay Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-[fadeIn_0.15s_ease-out]">
            <div className="w-full max-w-md bg-[#02050c] rounded-3xl border border-white/10 p-6 sm:p-8 relative shadow-2xl space-y-6">
              
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4" />
              </button>

              {!isBookingConfirmed ? (
                // Booking Entry Form
                <form onSubmit={handleBookSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/5 text-left">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">Secure Voyage Seating</h3>
                      <p className="text-xs text-gray-400">Ha Long Bay Kayak Excursion Booking</p>
                    </div>
                  </div>

                  {/* Input 1: Date */}
                  <div className="text-left space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Departure Voyage Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                      required
                    />
                  </div>

                  {/* Input 2: Number of explorers */}
                  <div className="text-left space-y-1">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Explorers Count
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num} className="bg-slate-900 text-white">
                          {num} {num === 1 ? "Explorer" : "Explorers"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Breakdown Preview */}
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-white/5 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Standard ticket ($89 × {travelers})</span>
                      <span className="font-mono text-white">${89 * travelers}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2">
                      <span className="text-gray-400">AI Optimization Fee</span>
                      <span className="font-mono text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2 text-sm">
                      <span className="font-bold text-white">Total Estimated Voyage Cost</span>
                      <span className="font-bold font-mono text-cyan-400">${89 * travelers}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-900/40 cursor-pointer"
                  >
                    Confirm Booking Reservation
                  </button>
                </form>
              ) : (
                // Confirmed State
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-6 flex flex-col items-center justify-center font-sans"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-white">Voyage Confirmed!</h3>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                      Congratulations! Your booking for <b>{travelers} {travelers === 1 ? "explorer" : "explorers"}</b> on <b>{bookingDate}</b> has been locked securely into the WanderVerse ledger.
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 px-4 py-2.5 rounded-xl border border-emerald-500/10 text-xs text-emerald-300 font-mono tracking-wide">
                    RESERV-CODE: NB-WV-982-KAYAK
                  </div>

                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Back to Dashboard
                  </button>
                </motion.div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
