import React, { useState, useEffect, useRef } from "react";
import { SearchState, Destination } from "../types";
import { CATEGORIES } from "../data";
import { Search, MapPin, Calendar, Users, Sparkles, Plus, Minus, ArrowRight, ChevronDown } from "lucide-react";

interface SearchProps {
  destinations: Destination[];
  onSearch: (state: SearchState) => void;
  onSelectCategory: (catId: string) => void;
  activeCategoryId: string | null;
  onSelectDestination: (id: string) => void;
}

export const SearchAndCategories: React.FC<SearchProps> = ({
  destinations,
  onSearch,
  onSelectCategory,
  activeCategoryId,
  onSelectDestination,
}) => {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestDropdown(false);
      }
      if (travelerRef.current && !travelerRef.current.contains(e.target as Node)) {
        setShowTravelerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination: destinationQuery || "Global Exploration",
      date: travelDate || "Anytime",
      travelers,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 z-30">
      {/* 4. Interactive Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 justify-between relative shadow-2xl"
      >
        {/* Column 1: Destination Selector */}
        <div
          ref={destRef}
          className="flex-1 px-5 py-2.5 flex items-center gap-3 border-r-0 md:border-r border-white/10 group hover:bg-white/5 transition-all rounded-l-full relative cursor-pointer"
          onClick={() => setShowDestDropdown(!showDestDropdown)}
        >
          <MapPin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          <div className="flex-1 text-left">
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
              Destination
            </span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={destinationQuery}
              onChange={(e) => {
                setDestinationQuery(e.target.value);
                setShowDestDropdown(true);
              }}
              className="bg-transparent border-none p-0 text-white placeholder-gray-400 text-sm focus:ring-0 focus:outline-none w-full font-medium"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />

          {/* Destination dropdown */}
          {showDestDropdown && (
            <div className="absolute top-[115%] left-2 right-2 md:left-0 md:right-auto md:w-[320px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl z-40 animate-[fadeIn_0.15s_ease-out]">
              <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest px-2 mb-2 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Vietnam Top Locations</span>
              </div>
              <div className="space-y-1">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDestinationQuery(dest.name);
                      onSelectDestination(dest.id);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gradient-to-r hover:from-blue-950/40 hover:to-purple-950/20 rounded-xl flex items-center justify-between text-sm transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-8 h-8 rounded-lg object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="block font-medium text-white text-xs">{dest.name}</span>
                        <span className="block text-[10px] text-gray-300">{dest.activity}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-950/50 text-blue-300 px-2 py-0.5 rounded border border-blue-800/30">
                      ★ {dest.rating}
                    </span>
                  </button>
                ))}
                {filteredDestinations.length === 0 && (
                  <div className="text-xs text-gray-400 text-center py-4">
                    No special destinations found, build custom AI plan!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Date Selector */}
        <div className="flex-1 px-5 py-2.5 flex items-center gap-3 border-r-0 md:border-r border-white/10 group hover:bg-white/5 transition-all cursor-pointer">
          <Calendar className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          <div className="flex-1 text-left">
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
              Travel Date
            </span>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="bg-transparent border-none p-0 text-white placeholder-gray-400 text-sm focus:ring-0 focus:outline-none w-full font-medium"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        {/* Column 3: Travelers Stepper */}
        <div
          ref={travelerRef}
          className="flex-1 px-5 py-2.5 flex items-center gap-3 group hover:bg-white/5 transition-all rounded-r-none md:rounded-r-full relative cursor-pointer"
          onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
        >
          <Users className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          <div className="flex-1 text-left">
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
              Travelers
            </span>
            <span className="text-sm font-medium text-white block">
              {travelers} {travelers === 1 ? "Explorer" : "Explorers"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />

          {/* Traveler Stepper Dropdown */}
          {showTravelerDropdown && (
            <div
              className="absolute top-[115%] right-2 left-2 md:left-auto md:right-0 w-[240px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-2xl z-40 animate-[fadeIn_0.15s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-sm font-medium text-white">Travelers</span>
                  <span className="block text-[10px] text-gray-400">Total participants</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 active:scale-95 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold font-mono text-blue-300">{travelers}</span>
                  <button
                    type="button"
                    onClick={() => setTravelers((prev) => Math.min(12, prev + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Glowing CTA Button */}
        <div className="p-1.5 md:pr-3">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 cursor-pointer font-bold select-none whitespace-nowrap group relative overflow-hidden text-sm"
          >
            {/* Pulsing Back Glow */}
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <Sparkles className="w-4 h-4 text-blue-200 animate-pulse shrink-0" />
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </form>

      {/* 5. Quick Categories Section */}
      <div className="w-full space-y-3.5">
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em] font-bold">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-gray-500" />
          <span>Curated Cosmic Categories</span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-gray-500" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-white/10 border-white/30 text-white scale-[1.03] shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                <span className="text-blue-400 font-sans">{cat.icon}</span>
                <span className="text-xs font-medium uppercase tracking-tighter">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
