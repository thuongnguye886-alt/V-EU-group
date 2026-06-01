import React, { useEffect, useRef, useState } from "react";

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Realistic Star definition
    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      pulseRate: number;
    }

    // Creating tiny realistic twinkle stars
    const stars: Star[] = Array.from({ length: 110 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      alpha: Math.random(),
      pulseRate: Math.random() * 0.015 + 0.004,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render realistic starfield of tiny bright dots
      stars.forEach((star) => {
        star.alpha += star.pulseRate;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.pulseRate = -star.pulseRate;
        }

        // Drifting stars
        star.y += star.speed;
        star.x -= star.speed * 0.3;

        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        if (star.x < 0) {
          star.x = width;
          star.y = Math.random() * height;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.15, Math.min(0.95, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw microscopic lens glow on brightest stars
        if (star.size > 1.0 && star.alpha > 0.8) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${star.alpha * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - 3, star.y);
          ctx.lineTo(star.x + 3, star.y);
          ctx.stroke();
        }
      });

      // Subtle volumetric space particles/nebula glow drifting softly
      const timeLong = Date.now() * 0.00015;
      for (let i = 0; i < 3; i++) {
        const px = width * (0.2 + 0.6 * Math.sin(timeLong + i * 1.8) * 0.5 + 0.5);
        const py = height * (0.3 + 0.5 * Math.cos(timeLong * 0.8 + i * 2.5) * 0.5 + 0.5);
        const radius = 120 + i * 50;

        const radial = ctx.createRadialGradient(px, py, 0, px, py, radius);
        radial.addColorStop(0, i % 2 === 0 ? "rgba(99, 102, 241, 0.012)" : "rgba(59, 130, 246, 0.01)");
        radial.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#010208] -z-20">
      {/* 1. Starfield Canvas layer with subtle scroll parallax */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-90" />
      </div>

      {/* 2. Glowing atmospheric effects mapped around Earth placement, bounded strictly to viewport height (h-screen) */}
      <div 
        className="absolute inset-x-0 top-0 h-screen pointer-events-none select-none z-10 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        {/* Centered positioning container matched perfectly to centered Hero layout */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-visible">
          {/* Natural atmospheric glow rings placed behind the Earth video */}
          <div className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none mix-blend-screen z-0" />
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none mix-blend-screen z-0" />
          
          {/* Immersive high quality Earth rotation video backend */}
          <video
            src="https://res.cloudinary.com/dxeavzw0p/video/upload/v1780218138/Earth_rotating_in_space_202605311547_d7rdwf.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-auto h-[90%] md:h-full max-w-full object-contain pointer-events-none opacity-[0.80] filter brightness-[1.02] contrast-[1.05] relative z-20 scale-[0.90] sm:scale-100 transition-opacity duration-1000"
            style={{ mixBlendMode: "screen" }}
          />
        </div>
      </div>

      {/* 3. Deep Cinematic Gradients */}
      {/* Symmetrical framing gradients to ensure perfect readability of centered white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010208] via-transparent to-[#010208]/80 z-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#010208]/85 via-[#010208]/10 via-transparent via-[#010208]/10 to-[#010208]/85 z-5 pointer-events-none" />

      {/* Radial vignetting overlay for high-end Apple luxury finish, rendered behind the video to avoid darkening the Earth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(1,2,8,0.95)_100%)] z-1 pointer-events-none" 
      />
    </div>
  );
};
