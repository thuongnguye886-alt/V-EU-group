import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from './data';
import { SearchState, Destination } from './types';
import { CosmicBackground } from './components/CosmicBackground';
import { SearchAndCategories } from './components/SearchAndCategories';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { KayakAdventure } from './components/KayakAdventure';
import { DigitalBadgeCollection } from './components/DigitalBadgeCollection';
import { TopAttractions } from './components/TopAttractions';
import { Footer } from './components/Footer';
// Auth components from VEU-2
import { AuthPanel } from './components/auth/AuthPanel';
import { BackgroundEffects } from './components/auth/BackgroundEffects';
import { SkyScene } from './components/auth/SkyScene';
import caveBackground from './assets/auth/cave-background.png';
import {
  Compass, Bell, Search, User, Sparkles,
  X, ShieldCheck, Plane
} from 'lucide-react';

// ─── Auth phase type ───────────────────────────────────────────────────────────
type AuthPhase = 'auth' | 'zooming' | 'sky' | 'app';

export default function App() {
  // Auth state
  const [authPhase, setAuthPhase] = useState<AuthPhase>('auth');

  const handleLogin = () => {
    setAuthPhase('zooming');
    setTimeout(() => setAuthPhase('sky'), 1900);
  };

  const handleEnterApp = () => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setAuthPhase('app');
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });
  };

  // Lock body scroll during auth, unlock + reset when entering app
  useEffect(() => {
    if (authPhase !== 'app') {
      // Lock scroll while in auth screens
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      // Unlock and hard reset to top
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const root = document.getElementById('wanderverse_root');
      if (root) root.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [authPhase]);

  // App state (from vietnam-explore-unique)
  const [activeDestId, setActiveDestId] = useState<string | null>('ha-long');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>('adventure');
  const [searchState, setSearchState] = useState<SearchState | null>(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [planningMode, setPlanningMode] = useState<'loading' | 'ready'>('ready');

  const activeDestination = DESTINATIONS.find((d) => d.id === activeDestId) || DESTINATIONS[1];

  const notifications = [
    { id: '1', title: '✨ AI Optimization Complete', desc: 'Perfect seasonal weather matching found for Hue Royal Citadel palaces.', time: '2m ago', unread: true },
    { id: '2', title: '🌌 Celestial Transit Alert', desc: 'Optimal midnight luminescent star tracking window is open in Phong Nha.', time: '1h ago', unread: false },
    { id: '3', title: '🚄 Hyper-Rail Speedup', desc: 'Express bullet transit routes from Hanoi to Ninh Binh now active.', time: '5h ago', unread: false },
  ];

  const handleSearchSubmit = (state: SearchState) => {
    setSearchState(state);
    const match = DESTINATIONS.find((d) => d.name.toLowerCase().includes(state.destination.toLowerCase()));
    if (match) setActiveDestId(match.id);
    setPlanningMode('loading');
    setShowAIPlanner(true);
    setTimeout(() => setPlanningMode('ready'), 1800);
  };

  const handleSelectDestination = (id: string) => {
    setActiveDestId(id);
    const dest = DESTINATIONS.find((d) => d.id === id);
    if (dest) setActiveCategoryId(dest.category);
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const match = DESTINATIONS.find((d) => d.category === catId);
    if (match) setActiveDestId(match.id);
  };

  const getSimulatedItinerary = (dest: Destination) => {
    switch (dest.id) {
      case 'phong-nha': return [
        { day: 'Day 1', title: 'Abyssal Descent & Hidden Archways', activities: [{ time: '08:30 AM', title: 'Helicopter ingress to Ke Bang plateau', icon: '🚁' }, { time: '11:00 AM', title: 'Caving inside Hang Toi with glowing biometric suites', icon: '🎒' }, { time: '06:00 PM', title: 'Starlight dining overlooking limestone canyons', icon: '🍽' }] },
        { day: 'Day 2', title: 'Celestial Vault Bioluminescence', activities: [{ time: '09:00 AM', title: 'Mapping unexplored gallery corridors', icon: '🧭' }, { time: '02:30 PM', title: 'Underwater mud baths under ambient crystal arches', icon: '🌋' }, { time: '09:30 PM', title: 'Quiet camping under deep natural sky domes', icon: '🏕' }] },
        { day: 'Day 3', title: 'Ascent and Aerial Ridge', activities: [{ time: '07:30 AM', title: 'Sunrise cliff hiking track', icon: '🧗' }, { time: '01:00 PM', title: 'Exiting the forest canopy via solar zip-rail', icon: '⚡' }, { time: '04:00 PM', title: 'Returning luxury flight and biometric debrief', icon: '✈' }] },
      ];
      case 'ha-long':
      default: return [
        { day: 'Day 1', title: 'Islet Labyrinth Navigation', activities: [{ time: '10:30 AM', title: 'Boarding solar luxury catamaran ship', icon: '🛳' }, { time: '01:00 PM', title: 'Cruising under colossal karst arches', icon: '⛰' }, { time: '07:00 PM', title: 'Starlight seafood dining with ambient lighting', icon: '🦞' }] },
        { day: 'Day 2', title: 'Submerged Emerald Grottos', activities: [{ time: '08:30 AM', title: 'Kayaking through secluded tunnel lagoon pools', icon: '🛶' }, { time: '02:00 PM', title: 'Exploring crystal stalactites inside Sung Sot cave', icon: '🌌' }, { time: '06:30 PM', title: 'Floating wine bar & bioluminescent evening swim', icon: '🍷' }] },
        { day: 'Day 3', title: 'Aerial Peak Castaways', activities: [{ time: '06:00 AM', title: 'Tai Chi sunrise exercises on deck', icon: '🧘' }, { time: '10:00 AM', title: 'Scaling Ti Top mountain for panoramic bay capture', icon: '📸' }, { time: '04:00 PM', title: 'Seaplane departure over spectacular emerald waters', icon: '✈' }] },
      ];
    }
  };

  const selectedItinerary = getSimulatedItinerary(activeDestination);

  // ─── RENDER: Auth screens ──────────────────────────────────────────────────
  if (authPhase !== 'app') {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-50">
        {/* Cave background */}
        <motion.div
          className="absolute inset-0"
          animate={
            authPhase === 'zooming'
              ? { scale: 5, y: '6%' }
              : authPhase === 'sky'
                ? { scale: 5, y: '6%', opacity: 0 }
                : { scale: 1, y: '0%', opacity: 1 }
          }
          transition={
            authPhase === 'zooming'
              ? { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }
              : authPhase === 'sky'
                ? { duration: 0.6, ease: 'easeIn' }
                : { duration: 0 }
          }
          style={{ transformOrigin: '50% 52%' }}
        >
          <img
            src={caveBackground}
            alt="Cave with emerald river"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Cave overlays */}
        <AnimatePresence>
          {authPhase === 'auth' && (
            <motion.div
              key="cave-overlays"
              className="absolute inset-0 pointer-events-none"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particles / mist */}
        <AnimatePresence>
          {authPhase === 'auth' && <BackgroundEffects />}
        </AnimatePresence>

        {/* Sky transition */}
        <AnimatePresence>
          {authPhase === 'sky' && <SkyScene onEnter={handleEnterApp} />}
        </AnimatePresence>

        {/* Auth Panel */}
        <AnimatePresence>
          {authPhase === 'auth' && (
            <motion.div
              key="auth-panel"
              className="relative z-10 w-full min-h-screen flex items-center justify-start px-8 md:px-16"
              exit={{ opacity: 0, x: -80, transition: { duration: 0.5 } }}
            >
              <AuthPanel onLogin={handleLogin} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flash / tunnel effect during zoom */}
        <AnimatePresence>
          {authPhase === 'zooming' && (
            <motion.div
              key="flash"
              className="absolute inset-0 z-30 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.7, 0] }}
              transition={{ duration: 2, times: [0, 0.7, 0.85, 1] }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── RENDER: Main App ──────────────────────────────────────────────────────
  return (
    <motion.div
      key="main-app"
      id="wanderverse_root"
      className="min-h-screen text-white relative font-sans overflow-x-hidden selection:bg-purple-500/30 selection:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      onAnimationStart={() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
    >
      <CosmicBackground />

      {/* Navigation */}
      <nav id="navbar" className="glass-nav sticky top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setActiveDestId('ha-long'); setActiveCategoryId('adventure'); }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '25s' }} />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-white block">
                  Viet<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent inline-block" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nam</span>
                </span>
                <span className="text-[8px] font-mono tracking-widest text-[#60a5fa] uppercase block font-bold leading-none">Explore unique</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {[{ name: 'Explore', active: true }, { name: 'Destinations', active: false }, { name: 'Experiences', active: false }, { name: 'About Us', active: false }, { name: 'Time Portal', active: false }].map((item, idx) => (
                <button key={idx} className={`text-sm font-medium tracking-wide transition-colors cursor-pointer relative py-1.5 ${item.active ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
                  {item.name}
                  {item.active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button aria-label="Search" className="p-2.5 rounded-full hover:bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer">
                <Search className="w-5 h-5" />
              </button>

              <div className="relative">
                <button onClick={() => setShowNotificationPanel(!showNotificationPanel)} aria-label="Notifications" className="p-2.5 rounded-full hover:bg-white/5 text-gray-300 hover:text-white relative transition-all cursor-pointer">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                </button>
                {showNotificationPanel && (
                  <div className="absolute right-0 top-14 w-80 glass-card rounded-2xl border border-white/10 p-4 shadow-2xl z-50 animate-[fadeIn_0.2s_ease-out]">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/5">
                      <span className="font-display font-bold text-sm text-white">Dynamic AI Feed</span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full font-mono border border-purple-800/30">Active Stream</span>
                    </div>
                    <div className="space-y-3.5">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="text-left text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{notif.title}</span>
                            <span className="text-[9px] text-gray-500 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-gray-400 leading-tight">{notif.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User icon — opens sign in modal */}
              <button onClick={() => setShowSignInModal(true)} aria-label="User account" className="p-2.5 rounded-full hover:bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative bg-transparent">
        <div className="flex flex-col items-center justify-center min-h-[75vh] mt-4 sm:mt-8 w-full max-w-4xl mx-auto">
          <div className="w-full flex flex-col items-center text-center space-y-8 z-30">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              className="space-y-4 flex flex-col items-center"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white text-center">
                Explore The{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent relative neon-text-blue select-all font-sans">
                  World
                  <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-400 blur-[3px]" />
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,63,94,0.15)] font-sans">
                  V-EU Group
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed text-center">
                V-EU hướng tới kiến tạo hệ sinh thái công nghệ và du lịch thông minh, kết nối thế giới bằng những trải nghiệm số đột phá, lan tỏa giá trị văn hóa và phát triển bền vững cho cộng đồng.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
              className="w-full"
            >
              <SearchAndCategories
                destinations={DESTINATIONS}
                onSearch={handleSearchSubmit}
                onSelectCategory={handleSelectCategory}
                activeCategoryId={activeCategoryId}
                onSelectDestination={handleSelectDestination}
              />
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold w-full">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span>BIOMETRIC FLIGHTS: ACTIVE</span>
              </div>
              <div>TRANSIT CHANNELS: OPTIMAL</div>
              <div>HOTSPOTS INDEXED: 48,206</div>
            </div>
          </div>
        </div>

        <section id="featured_destinations_carousel" className="w-full pt-20 sm:pt-28 mt-12 relative z-30">
          <FeaturedCarousel destinations={DESTINATIONS} activeId={activeDestId} onSelect={handleSelectDestination} />
        </section>

        <KayakAdventure />
        <DigitalBadgeCollection />
        <TopAttractions />
      </main>

      <Footer />

      {/* AI Planner Modal */}
      {showAIPlanner && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-xl glass-card rounded-3xl border border-purple-500/40 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button onClick={() => setShowAIPlanner(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer" aria-label="Close modal">
              <X className="w-5 h-5" />
            </button>
            {planningMode === 'loading' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-400 animate-spin" style={{ animationDuration: '0.8s' }} />
                  <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-500 animate-spin" style={{ animationDuration: '1.4s' }} />
                  <div className="absolute inset-4 rounded-full bg-indigo-950 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-white">Quantum Planner Initializing</h3>
                  <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Target: {activeDestination.name}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img src={activeDestination.image} alt={activeDestination.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">WanderVerse AI Planner Output</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">Custom Voyage to {activeDestination.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">Tailored for <b>Explorer</b> ({searchState?.travelers || 1} người) starting <b>{searchState?.date || 'in June'}</b>.</p>
                  </div>
                </div>
                <div className="space-y-5 text-left">
                  {selectedItinerary.map((dayItem, dIdx) => (
                    <div key={dIdx} className="space-y-3">
                      <div className="flex items-center gap-2.5 pb-1 border-b border-white/5">
                        <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-800/20 font-mono text-xs font-bold">{dayItem.day}</span>
                        <span className="font-display font-medium text-sm text-white">{dayItem.title}</span>
                      </div>
                      <div className="space-y-2.5 pl-4 relative border-l border-white/10">
                        {dayItem.activities.map((act, aIdx) => (
                          <div key={aIdx} className="flex gap-3 text-xs items-start">
                            <span className="text-sm leading-none pt-0.5">{act.icon}</span>
                            <div>
                              <span className="font-mono text-[9px] text-[#60a5fa] block font-bold leading-none mb-0.5">{act.time}</span>
                              <p className="text-gray-300 font-medium">{act.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 border-t border-white/10">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-gray-400 uppercase font-mono">Quantum Fare</span>
                    <span className="text-lg font-bold font-mono text-emerald-400">{activeDestination.price}</span>
                  </div>
                  <button onClick={() => setShowAIPlanner(false)} className="w-full sm:flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform text-white rounded-xl font-display font-bold text-sm tracking-wide shadow-lg shadow-blue-950 flex items-center justify-center gap-2 cursor-pointer">
                    <Plane className="w-4 h-4" />
                    <span>Teleport Order Itinerary</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sign In Modal (re-uses AuthPanel) */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="relative">
            <button onClick={() => setShowSignInModal(false)} className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
            <AuthPanel onLogin={() => setShowSignInModal(false)} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
