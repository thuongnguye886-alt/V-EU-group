import React from "react";
import { motion } from "motion/react";
import {
  Compass,
  Mountain,
  Landmark,
  Moon,
  Utensils,
  Globe,
  Sparkles,
  Award
} from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  rarity: "Epic" | "Rare" | "Common" | "Legendary";
  earned: boolean;
  icon: React.ElementType;
  colorClass: {
    border: string;
    bg: string;
    text: string;
    glow: string;
    badgeBg: string;
    innerGlow: string;
  };
}

export function DigitalBadgeCollection() {
  const badges: BadgeItem[] = [
    {
      id: "ha-noi",
      name: "Hà Nội",
      rarity: "Epic",
      earned: true,
      icon: Compass,
      colorClass: {
        border: "border-cyan-500/40 hover:border-cyan-300 group-hover:ring-cyan-500/35",
        bg: "bg-gradient-to-b from-[#0a2342]/70 to-[#030e1c]/90",
        text: "text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]",
        glow: "shadow-[0_0_25px_rgba(6,182,212,0.22)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]",
        badgeBg: "bg-gradient-to-r from-cyan-400 to-teal-400 text-black",
        innerGlow: "bg-cyan-500/20 text-cyan-200 group-hover:bg-cyan-500/30"
      }
    },
    {
      id: "tp-hcm",
      name: "TP HCM",
      rarity: "Rare",
      earned: true,
      icon: Mountain,
      colorClass: {
        border: "border-purple-500/40 hover:border-purple-300 group-hover:ring-purple-500/35",
        bg: "bg-gradient-to-b from-[#1f103c]/70 to-[#0e051d]/90",
        text: "text-purple-300 drop-shadow-[0_0_6px_rgba(192,132,252,0.5)]",
        glow: "shadow-[0_0_25px_rgba(168,85,247,0.22)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]",
        badgeBg: "bg-gradient-to-r from-purple-500 to-indigo-505 text-white",
        innerGlow: "bg-purple-500/20 text-purple-200 group-hover:bg-purple-500/30"
      }
    },
    {
      id: "da-nang",
      name: "Đà Nẵng",
      rarity: "Common",
      earned: true,
      icon: Landmark,
      colorClass: {
        border: "border-amber-500/40 hover:border-amber-300 group-hover:ring-amber-500/35",
        bg: "bg-gradient-to-b from-[#30210a]/70 to-[#140c03]/90",
        text: "text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]",
        glow: "shadow-[0_0_25px_rgba(245,158,11,0.22)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]",
        badgeBg: "bg-gradient-to-r from-amber-400 to-yellow-400 text-black",
        innerGlow: "bg-amber-500/20 text-amber-200 group-hover:bg-amber-500/30"
      }
    },
    {
      id: "hai-phong",
      name: "Hải Phòng",
      rarity: "Epic",
      earned: false,
      icon: Moon,
      colorClass: {
        border: "border-blue-500/40 hover:border-blue-300 group-hover:ring-blue-500/35",
        bg: "bg-gradient-to-b from-[#0a183d]/60 to-[#03091e]/90",
        text: "text-blue-300 drop-shadow-[0_0_6px_rgba(96,165,250,0.4)]",
        glow: "shadow-[0_0_25px_rgba(59,130,246,0.18)] hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]",
        badgeBg: "bg-gradient-to-r from-blue-500 to-blue-400 text-white",
        innerGlow: "bg-blue-500/25 text-blue-200 group-hover:bg-blue-500/35"
      }
    },
    {
      id: "thanh-hoa",
      name: "Thanh Hoá",
      rarity: "Legendary",
      earned: false,
      icon: Utensils,
      colorClass: {
        border: "border-rose-500/40 hover:border-rose-300 group-hover:ring-rose-500/35",
        bg: "bg-gradient-to-b from-[#380e22]/60 to-[#1a040e]/90",
        text: "text-rose-300 drop-shadow-[0_0_6px_rgba(251,113,133,0.4)]",
        glow: "shadow-[0_0_25px_rgba(244,63,94,0.18)] hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]",
        badgeBg: "bg-gradient-to-r from-rose-500 to-pink-500 text-white",
        innerGlow: "bg-rose-500/25 text-rose-200 group-hover:bg-rose-500/35"
      }
    },
    {
      id: "ninh-binh",
      name: "Ninh Bình",
      rarity: "Legendary",
      earned: false,
      icon: Globe,
      colorClass: {
        border: "border-emerald-500/40 hover:border-emerald-300 group-hover:ring-emerald-500/35",
        bg: "bg-gradient-to-b from-[#072d1f]/60 to-[#02130c]/90",
        text: "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]",
        glow: "shadow-[0_0_25px_rgba(16,185,129,0.18)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]",
        badgeBg: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
        innerGlow: "bg-emerald-500/25 text-emerald-200 group-hover:bg-emerald-500/35"
      }
    }
  ];

  return (
    <section id="digital_badge_section" className="w-full py-16 sm:py-24 rounded-[2.5rem] bg-gradient-to-b from-[#0c122c]/85 via-[#060c22]/95 to-[#020514]/90 border border-white/5 backdrop-blur-xl relative z-30 shadow-[0_20px_50px_rgba(99,102,241,0.08)] overflow-hidden my-12 px-4 sm:px-8">
      {/* Background Outer Ambient Glows to make it modern and bright */}
      <div className="absolute -top-12 right-1/4 w-[500px] h-[300px] bg-gradient-to-l from-indigo-500/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-pink-500/10 to-transparent blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "14s" }} />
      <div className="absolute -bottom-16 right-1/3 w-[450px] h-[300px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-4 mb-12">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
          The most famous{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            provinces and cities
          </span>
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
          Let's explore the world together with V-EU TRAVEL.
        </p>
      </div>

      {/* Grid containing the badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-7xl mx-auto">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative rounded-2xl border ${badge.colorClass.border} ${badge.colorClass.bg} ${badge.colorClass.glow} backdrop-blur-md p-6 flex flex-col items-center justify-between text-center min-h-[200px] transition-all duration-300`}
            >
              {/* Earned Tag Corner Status Badge */}
              {badge.earned && (
                <div className={`absolute -top-2.5 -right-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider ${badge.colorClass.badgeBg} shadow-lg ring-1 ring-white/10 flex items-center gap-0.5`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>EARNED</span>
                </div>
              )}

              {/* Icon Container with dynamic backdrop glows */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center relative mb-4 transition-all duration-300 ${badge.colorClass.innerGlow} ${badge.earned ? "ring-2 ring-white/5 shadow-inner" : "opacity-60 group-hover:opacity-100"}`}>
                <IconComponent className={`w-7 h-7 transition-all duration-300 ${badge.earned ? "scale-100" : "scale-95 group-hover:scale-100 text-current"}`} />
                <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg group-hover:blur-md transition-all opacity-0 group-hover:opacity-100" />
              </div>

              {/* Badge Details */}
              <div className="space-y-1 w-full">
                <h4 className={`text-sm font-bold tracking-tight text-white transition-colors duration-300 ${!badge.earned && "opacity-60 group-hover:opacity-100"}`}>
                  {badge.name}
                </h4>
                <p className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${badge.colorClass.text} ${!badge.earned && "opacity-40 group-hover:opacity-60"}`}>
                  {badge.rarity}
                </p>
              </div>

              {/* Locked/Not earned overlay styling */}
              {!badge.earned && (
                <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-2xl border border-transparent group-hover:bg-transparent transition-colors duration-300" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
