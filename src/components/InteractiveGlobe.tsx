import React, { useRef, useEffect, useState } from "react";
import { Destination } from "../types";
import { Compass, Star, MapPin, Sparkles } from "lucide-react";

interface GlobeProps {
  destinations: Destination[];
  activeDestinationId: string | null;
  onHoverDestination: (id: string | null) => void;
  onSelectDestination: (id: string) => void;
}

export const InteractiveGlobe: React.FC<GlobeProps> = ({
  destinations,
  activeDestinationId,
  onHoverDestination,
  onSelectDestination,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High performance refs for smooth animation bypass
  const yawRef = useRef<number>(1.8);
  const pitchRef = useRef<number>(-0.3);
  const targetYawRef = useRef<number | null>(null);
  const targetPitchRef = useRef<number | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationStartRef = useRef({ yaw: 1.8, pitch: -0.3 });

  const [dimensions, setDimensions] = useState({ width: 450, height: 450 });
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Set target angle whenever active destination changes
  useEffect(() => {
    if (activeDestinationId) {
      const dest = destinations.find((d) => d.id === activeDestinationId);
      if (dest) {
        // Calculate target angles to center the destination front and center
        const targetLngRad = (dest.lng * Math.PI) / 180;
        const targetLatRad = (dest.lat * Math.PI) / 180;

        // Formula to rotate destination to face screen-forward (Z-positive center)
        let targetYaw = Math.PI / 2 - targetLngRad;
        let targetPitch = -targetLatRad;

        // Keep yaw wrap angles clean for shortest rotation path
        const currentYaw = yawRef.current;
        const diffYaw = ((targetYaw - currentYaw + Math.PI) % (Math.PI * 2)) - Math.PI;
        targetYawRef.current = currentYaw + diffYaw;
        targetPitchRef.current = targetPitch;
      }
    } else {
      targetYawRef.current = null;
      targetPitchRef.current = null;
    }
  }, [activeDestinationId, destinations]);

  // Handle Resize using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.min(width, height) || 450;
        setDimensions({ width: size, height: size });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Handle Dragging / Pointer input
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { yaw: yawRef.current, pitch: pitchRef.current };
    
    // Cancel centering animation on drag
    targetYawRef.current = null;
    targetPitchRef.current = null;

    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const R = (dimensions.width / 2) * 0.82;

    if (!isDraggingRef.current) {
      // Hover detection
      let foundId: string | null = null;
      for (const dest of destinations) {
        const coords = getProjectedCoords(dest, yawRef.current, pitchRef.current, cx, cy, R);
        if (coords) {
          const dx = mouseX - coords.x;
          const dy = mouseY - coords.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 16) {
            foundId = dest.id;
            break;
          }
        }
      }

      if (foundId !== hoveredHotspot) {
        setHoveredHotspot(foundId);
        onHoverDestination(foundId);
      }
      return;
    }

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const sensitivity = 0.005;
    yawRef.current = rotationStartRef.current.yaw + deltaX * sensitivity;
    pitchRef.current = rotationStartRef.current.pitch + deltaY * sensitivity;

    // Boundary cap on pitch (prevent flipping upside down)
    pitchRef.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitchRef.current));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    canvasRef.current?.releasePointerCapture(e.pointerId);

    // If click (little to no movement offset) and hovering hotspot, trigger selection
    const deltaX = Math.abs(e.clientX - dragStartRef.current.x);
    const deltaY = Math.abs(e.clientY - dragStartRef.current.y);
    if (deltaX < 5 && deltaY < 5) {
      if (hoveredHotspot) {
        onSelectDestination(hoveredHotspot);
      }
    }
  };

  // Convert 3D Earth space coordinates to 2D Orthographic projected space
  const getProjectedCoords = (
    dest: Destination,
    yaw: number,
    pitch: number,
    cx: number,
    cy: number,
    R: number
  ) => {
    const latRad = (dest.lat * Math.PI) / 180;
    const lngRad = (dest.lng * Math.PI) / 180;

    // 1. Initial 3D Cartesian coordinates (unit sphere)
    const x0 = Math.cos(latRad) * Math.sin(lngRad);
    const y0 = -Math.sin(latRad);
    const z0 = Math.cos(latRad) * Math.cos(lngRad);

    // 2. Yaw rotation (X/Z planes)
    const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
    const y1 = y0;
    const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

    // 3. Pitch rotation (Y/Z planes)
    const x2 = x1;
    const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
    const z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

    if (z2 > 0) {
      return {
        x: cx + x2 * R,
        y: cy + y2 * R,
        z: z2,
      };
    }
    return null;
  };

  // Canvas render flow loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const R = (dimensions.width / 2) * 0.82;

      // Smooth interpolation for automatic centering
      if (!isDraggingRef.current) {
        if (targetYawRef.current !== null && targetPitchRef.current !== null) {
          yawRef.current += (targetYawRef.current - yawRef.current) * 0.06;
          pitchRef.current += (targetPitchRef.current - pitchRef.current) * 0.06;

          // Clear targets once close enough
          if (
            Math.abs(targetYawRef.current - yawRef.current) < 0.001 &&
            Math.abs(targetPitchRef.current - pitchRef.current) < 0.001
          ) {
            targetYawRef.current = null;
            targetPitchRef.current = null;
          }
        } else {
          // Slow constant rotation
          yawRef.current = (yawRef.current + 0.0012) % (Math.PI * 2);
        }
      }

      const yaw = yawRef.current;
      const pitch = pitchRef.current;

      // 1. Atmos halo layers
      const atmosGlow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.15);
      atmosGlow.addColorStop(0, "rgba(10, 10, 35, 0.4)");
      atmosGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.2)");
      atmosGlow.addColorStop(0.85, "rgba(59, 130, 246, 0.1)");
      atmosGlow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmosGlow;
      ctx.fill();

      // 2. Base Sphere Fill
      const oceanGrad = ctx.createRadialGradient(
        cx - R * 0.3,
        cy - R * 0.3,
        R * 0.2,
        cx,
        cy,
        R
      );
      oceanGrad.addColorStop(0, "rgba(12, 11, 30, 1)");
      oceanGrad.addColorStop(0.8, "rgba(6, 6, 18, 1)");
      oceanGrad.addColorStop(1, "rgba(2, 2, 8, 1)");

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Outer rings orbit lines
      ctx.strokeStyle = "rgba(124, 58, 237, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.12, R * 0.3, Math.PI / 10, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Coordinate Grids
      ctx.lineWidth = 0.5;
      const subdivs = 12;

      // Meridians (Longitudes)
      for (let i = 0; i < subdivs; i++) {
        const lngDeg = (360 / subdivs) * i;
        const lngRad = (lngDeg * Math.PI) / 180;

        ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
        ctx.beginPath();

        let first = true;
        for (let latDeg = -90; latDeg <= 90; latDeg += 6) {
          const latRad = (latDeg * Math.PI) / 180;

          const x0 = Math.cos(latRad) * Math.sin(lngRad);
          const y0 = -Math.sin(latRad);
          const z0 = Math.cos(latRad) * Math.cos(lngRad);

          const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
          const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

          const x2 = x1;
          const y2 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch);
          const z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0) {
            const sx = cx + x2 * R;
            const sy = cy + y2 * R;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Parallels (Latitudes)
      const latSubdivs = 8;
      for (let i = 1; i < latSubdivs; i++) {
        const latDeg = -90 + (180 / latSubdivs) * i;
        const latRad = (latDeg * Math.PI) / 180;

        ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
        ctx.beginPath();

        let first = true;
        for (let lngDeg = 0; lngDeg <= 360; lngDeg += 6) {
          const lngRad = (lngDeg * Math.PI) / 180;

          const x0 = Math.cos(latRad) * Math.sin(lngRad);
          const y0 = -Math.sin(latRad);
          const z0 = Math.cos(latRad) * Math.cos(lngRad);

          const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
          const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

          const x2 = x1;
          const y2 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch);
          const z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0) {
            const sx = cx + x2 * R;
            const sy = cy + y2 * R;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Digital Land Dots Simulation (Cyber continental mapping)
      const landClusters = [
        // Southeast Asia / India / China / Indochina / VN area
        { lt: 16, ln: 108 }, { lt: 10, ln: 105 }, { lt: 22, ln: 105 }, { lt: 12, ln: 109 },
        { lt: 35, ln: 104 }, { lt: 30, ln: 121 }, { lt: 36, ln: 138 }, { lt: 41, ln: 115 },
        { lt: 15, ln: 101 }, { lt: 2, ln: 103 }, { lt: 8, ln: 78 }, { lt: 22, ln: 77 },
        { lt: 44, ln: 85 }, { lt: 50, ln: 115 }, { lt: 60, ln: 100 }, { lt: -5, ln: 110 },
        // Europe
        { lt: 48, ln: 2 }, { lt: 41, ln: 12 }, { lt: 52, ln: 13 }, { lt: 55, ln: 37 },
        { lt: 40, ln: -3 }, { lt: 64, ln: 25 }, { lt: 60, ln: -10 },
        // Africa
        { lt: 30, ln: 31 }, { lt: 0, ln: 25 }, { lt: -25, ln: 28 }, { lt: 15, ln: -12 },
        { lt: -18, ln: 15 }, { lt: 5, ln: 10 }, { lt: 22, ln: 20 },
        // Australia
        { lt: -25, ln: 134 }, { lt: -33, ln: 151 }, { lt: -37, ln: 144 }, { lt: -18, ln: 146 },
        { lt: -20, ln: 120 },
        // Americas
        { lt: 40, ln: -74 }, { lt: 34, ln: -118 }, { lt: 45, ln: -122 }, { lt: 25, ln: -80 },
        { lt: -15, ln: -47 }, { lt: -34, ln: -58 }, { lt: -23, ln: -43 }, { lt: 5, ln: -74 },
        { lt: 50, ln: -100 }, { lt: 58, ln: -120 }, { lt: 19, ln: -99 }
      ];

      ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
      for (const pt of landClusters) {
        for (let j = 0; j < 9; j++) {
          const latDisplace = (j % 3 - 1) * 3.5 + Math.sin(j) * 2;
          const lngDisplace = (Math.floor(j / 3) - 1) * 3.5 + Math.cos(j) * 2;
          const lt = pt.lt + latDisplace;
          const ln = pt.ln + lngDisplace;

          const latRad = (lt * Math.PI) / 180;
          const lngRad = (ln * Math.PI) / 180;

          const x0 = Math.cos(latRad) * Math.sin(lngRad);
          const y0 = -Math.sin(latRad);
          const z0 = Math.cos(latRad) * Math.cos(lngRad);

          const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
          const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

          const x2 = x1;
          const y2 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch);
          const z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch);

          if (z2 > 0.08) {
            const sx = cx + x2 * R;
            const sy = cy + y2 * R;

            ctx.beginPath();
            ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Scattered golden capital lights
            if ((j + pt.lt) % 6 === 0) {
              ctx.fillStyle = `rgba(250, 204, 21, ${0.45 + Math.sin(Date.now() / 250 + j) * 0.25})`;
              ctx.beginPath();
              ctx.arc(sx + 0.8, sy + 0.8, 1, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
            }
          }
        }
      }

      // Atmospheric cloud textures
      const cloudsTick = Date.now() * 0.00007;
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let c = 0; c < 6; c++) {
        const cLat = 22 + Math.cos(cloudsTick + c) * 12;
        const cLng = 105 + (cloudsTick * 40 + c * 60) % 360;

        const latRad = (cLat * Math.PI) / 180;
        const lngRad = (cLng * Math.PI) / 180;

        const x0 = Math.cos(latRad) * Math.sin(lngRad);
        const y0 = -Math.sin(latRad);
        const z0 = Math.cos(latRad) * Math.cos(lngRad);

        const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
        const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);

        const x2 = x1;
        const y2 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch);
        const z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch);

        if (z2 > 0.1) {
          const sx = cx + x2 * R;
          const sy = cy + y2 * R;
          ctx.beginPath();
          ctx.arc(sx, sy, R * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Connection lines under spots
      let currentActiveLocationCoords: { x: number; y: number; z: number } | null = null;
      const projectedHotspots: Array<{ x: number; y: number; id: string }> = [];

      destinations.forEach((dest) => {
        const projected = getProjectedCoords(dest, yaw, pitch, cx, cy, R);
        if (projected) {
          projectedHotspots.push({ x: projected.x, y: projected.y, id: dest.id });
          if (dest.id === (hoveredHotspot || activeDestinationId)) {
            currentActiveLocationCoords = projected;
          }
        }
      });

      if (currentActiveLocationCoords && projectedHotspots.length > 1) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
        ctx.setLineDash([3, 4]);
        ctx.lineWidth = 1;

        projectedHotspots.forEach((target) => {
          if (target.id !== (hoveredHotspot || activeDestinationId) && currentActiveLocationCoords) {
            ctx.beginPath();
            ctx.moveTo((currentActiveLocationCoords as any).x, (currentActiveLocationCoords as any).y);
            const midX = ((currentActiveLocationCoords as any).x + target.x) / 2;
            const midY = ((currentActiveLocationCoords as any).y + target.y) / 2 - Math.min(35, Math.hypot((currentActiveLocationCoords as any).x - target.x, (currentActiveLocationCoords as any).y - target.y) * 0.18);
            ctx.quadraticCurveTo(midX, midY, target.x, target.y);
            ctx.stroke();

            // Flowing photons
            const lightTime = (Date.now() % 1600) / 1600;
            const px = (1 - lightTime) * (1 - lightTime) * (currentActiveLocationCoords as any).x + 2 * (1 - lightTime) * lightTime * midX + lightTime * lightTime * target.x;
            const py = (1 - lightTime) * (1 - lightTime) * (currentActiveLocationCoords as any).y + 2 * (1 - lightTime) * lightTime * midY + lightTime * lightTime * target.y;

            ctx.fillStyle = "#a855f7";
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        ctx.setLineDash([]);
      }

      // 6. Spot coordinates plotting
      destinations.forEach((dest) => {
        const projected = getProjectedCoords(dest, yaw, pitch, cx, cy, R);
        if (!projected) return;

        const isHovered = dest.id === hoveredHotspot;
        const isSelected = dest.id === activeDestinationId;
        const baseRadius = isHovered || isSelected ? 8 : 4;

        const pulse = 1 + Math.abs(Math.sin(Date.now() / 240)) * 0.45;

        // Aura Outer
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, baseRadius * pulse * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? "rgba(167, 139, 250, 0.18)"
          : isHovered
          ? "rgba(59, 130, 246, 0.24)"
          : "rgba(59, 130, 246, 0.08)";
        ctx.fill();

        // Rings
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, baseRadius * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? "#a78bfa" : "#3b82f6";
        ctx.lineWidth = isHovered || isSelected ? 2 : 1;
        ctx.stroke();

        // Inner Solid
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#f3e8ff" : "#60a5fa";
        ctx.fill();

        // Labels
        if (isHovered || isSelected) {
          ctx.fillStyle = "rgba(11, 10, 24, 0.9)";
          ctx.strokeStyle = isSelected ? "rgba(168, 85, 247, 0.8)" : "rgba(6, 182, 212, 0.8)";
          ctx.lineWidth = 1;

          const text = dest.name;
          ctx.font = "bold 11px 'JetBrains Mono', monospace";
          const tw = ctx.measureText(text).width;
          const bw = tw + 14;
          const bh = 22;
          const bx = projected.x - bw / 2;
          const by = projected.y - bh - 12;

          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, 5);
          ctx.fill();
          ctx.stroke();

          // Connective stalk
          ctx.beginPath();
          ctx.moveTo(projected.x, projected.y - 12);
          ctx.lineTo(projected.x, projected.y - 4);
          ctx.strokeStyle = isSelected ? "#a855f7" : "#06b6d4";
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, projected.x, by + bh / 2 + 0.5);
        }
      });

      // 7. Sunlight Overlay
      const sunShade = ctx.createRadialGradient(
        cx - R * 0.4,
        cy - R * 0.4,
        R * 0.35,
        cx,
        cy,
        R * 1.05
      );
      sunShade.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      sunShade.addColorStop(0.3, "rgba(255, 255, 255, 0.0)");
      sunShade.addColorStop(0.75, "rgba(0, 0, 0, 0.0)");
      sunShade.addColorStop(1, "rgba(0, 0, 0, 0.82)");

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sunShade;
      ctx.fill();

      // Sharp golden shine boundary
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dimensions, destinations, hoveredHotspot, activeDestinationId]);

  const activeDest = destinations.find((d) => d.id === (hoveredHotspot || activeDestinationId));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="touch-none drop-shadow-[0_0_55px_rgba(59,130,246,0.18)] z-20 outline-none"
      />

      <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest z-30 pointer-events-none shadow-xl">
        <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
        <span>Drag to rotate · Click hotspots</span>
      </div>

      {activeDest && (
        <div className="absolute top-5 left-5 sm:top-10 sm:left-6 max-w-[250px] bg-white/10 backdrop-blur-3xl border border-purple-500/30 p-4 rounded-xl shadow-2xl z-30 animate-[fadeIn_0.25s_ease-out]">
          <div className="relative h-26 rounded-lg overflow-hidden mb-3 group">
            <img
              src={activeDest.image}
              alt={activeDest.name}
              className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded-md flex items-center gap-1 text-[9px] font-bold text-yellow-400">
              <Star className="w-2.5 h-2.5 fill-current" />
              <span>{activeDest.rating}</span>
            </div>
            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-blue-950/80 backdrop-blur-md rounded border border-blue-500/30 text-[9px] font-mono text-blue-300 font-bold uppercase tracking-wider">
              {activeDest.activity}
            </div>
          </div>

          <h4 className="font-display font-medium text-sm text-white flex items-center gap-1">
            📍 {activeDest.name}
          </h4>
          <p className="text-[11px] text-gray-300 line-clamp-2 mt-1 leading-relaxed">
            {activeDest.description}
          </p>

          <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-mono tracking-wider">AI Target Deal</span>
              <span className="text-xs font-bold font-mono text-emerald-400">{activeDest.price}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectDestination(activeDest.id);
              }}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded text-[10px] font-bold flex items-center gap-1 transition-all"
            >
              <span>Explore</span>
              <Compass className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
