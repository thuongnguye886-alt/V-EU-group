import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  MapPin, 
  Map, 
  Navigation,
  Globe2
} from "lucide-react";

interface Attraction {
  id: number;
  name: string;
  description?: string;
}

export function TopAttractions() {
  const attractions: Attraction[] = [
    { id: 1, name: "Vịnh Hạ Long" },
    { id: 2, name: "Sun World Bà Nà Hills" },
    { id: 3, name: "Địa đạo Củ Chi" },
    { id: 4, name: "Phố đường tàu Hà Nội" },
    { id: 5, name: "Hòn Gầm Ghì" },
    { id: 6, name: "Di sản Tràng An - Ninh Bình" },
    { id: 7, name: "Ngũ Hành Sơn" },
    { id: 8, name: "Phố cổ Hội An" },
    { id: 9, name: "Đồng bằng sông Cửu Long" },
    { id: 10, name: "Sông Sài Gòn" },
    { id: 11, name: "Cầu Rồng" },
    { id: 12, name: "Vịnh Lan Hạ" },
    { id: 13, name: "Khu Phố Cổ Hà Nội" },
    { id: 14, name: "Bản Cát Cát" },
    { id: 15, name: "Bãi Sao" },
    { id: 16, name: "Phan Xi Păng" },
    { id: 17, name: "Grand World Phú Quốc" },
    { id: 18, name: "Tam Cốc – Bích Động" },
    { id: 19, name: "Bãi biển Mỹ Khê" },
    { id: 20, name: "Cầu Vàng" }
  ];

  return (
    <section id="top_attractions_section" className="w-full py-16 sm:py-24 rounded-[2.5rem] bg-gradient-to-b from-[#0c122c]/85 via-[#060c22]/95 to-[#020514]/90 border border-white/10 backdrop-blur-xl relative z-30 shadow-[0_20px_50px_rgba(245,158,11,0.08)] overflow-hidden my-12 px-4 sm:px-8">
      {/* Background Outer Ambient Glows to make it modern and bright */}
      <div className="absolute -top-12 right-1/4 w-[500px] h-[300px] bg-gradient-to-l from-amber-500/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/15 to-transparent blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "14s" }} />
      <div className="absolute -bottom-16 right-1/3 w-[450px] h-[300px] bg-gradient-to-t from-rose-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Modern styled headers */}
        <div className="text-left space-y-3 mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Hấp dẫn không kém</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white">
            Điểm tham quan hàng đầu Việt Nam
          </h2>
          
          <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-xl">
            Những địa danh trứ danh đầy mê hoặc và mang đậm bản sắc văn hoá lịch sử dân tộc. Hãy lưu dấu chân bạn trên mọi miền đất nước cùng V-EU TRAVEL.
          </p>
        </div>

        {/* Dynamic Responsive Attraction tag flow layout */}
        <div className="flex flex-wrap gap-3.5 mt-8 max-w-7xl justify-start items-center">
          {attractions.map((attraction, idx) => {
            return (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="flex items-center rounded-xl bg-[#0d1226]/40 hover:bg-[#151c3a]/60 border border-amber-500/20 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(245,158,11,0.02)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.08)] transition-all duration-200 group overflow-hidden cursor-pointer h-10"
              >
                {/* Number index box */}
                <div className="h-full px-3.5 flex items-center justify-center bg-amber-500/5 group-hover:bg-amber-500/10 border-r border-amber-500/20 group-hover:border-amber-400/40 text-xs font-mono font-bold text-amber-400/80 group-hover:text-amber-300 transition-colors">
                  {attraction.id}
                </div>
                {/* Name */}
                <div className="px-4 text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  <MapPin className="w-3 h-3 text-amber-500/40 group-hover:text-amber-400 transition-colors" />
                  <span>{attraction.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
