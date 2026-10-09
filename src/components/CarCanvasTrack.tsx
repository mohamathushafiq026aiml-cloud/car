import React, { useState } from 'react';
import { Play, RotateCcw, Sliders, Zap, Shield, Sparkles } from 'lucide-react';
import carHeroImg from '../assets/images/car_hero_side_profile_1791526949138.jpg';

interface CarCanvasTrackProps {
  rawProgress: number;
  smoothProgress: number;
  velocity: number;
  onScrollTo: (progress: number) => void;
}

export const CarCanvasTrack: React.FC<CarCanvasTrackProps> = ({
  rawProgress,
  smoothProgress,
  velocity,
  onScrollTo,
}) => {
  const [driveMode, setDriveMode] = useState<'track' | 'dyno' | 'cruise'>('track');
  const [headlightsHigh, setHeadlightsHigh] = useState(true);

  // Calculate dynamic physical transforms strictly with transforms:
  // Interpolated progress: 0.0 to 1.0
  // Translation X: moves across the screen from -15% to +60% of viewport
  const translateX = (smoothProgress - 0.25) * 120; // percentage
  // Elevation / Suspension compression based on velocity
  const suspensionPitch = Math.max(Math.min(-velocity * 0.18, 5), -5);
  // Scale dynamically: zooms slightly as it crosses center screen, then settles
  const zoomFactor = 0.9 + Math.sin(smoothProgress * Math.PI) * 0.22;
  // Yaw rotation: turns slightly into the curve
  const yawAngle = (smoothProgress - 0.5) * 12;

  // Real-time calculated telemetry values tied to scroll progress
  const speedKmh = Math.round(smoothProgress * 412);
  const downforceKg = Math.round(180 + Math.pow(smoothProgress, 1.4) * 820);
  const gForce = (0.2 + Math.abs(velocity) * 0.08 + smoothProgress * 1.6).toFixed(2);
  const batteryKw = Math.round(smoothProgress * 1420);

  // Speed streak opacity tied to velocity and speed
  const streakOpacity = Math.min(0.2 + Math.abs(velocity) * 0.04 + smoothProgress * 0.3, 0.9);

  return (
    <section id="runway" className="relative min-h-[140vh] w-full bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Sticky Theater Viewport Container */}
      <div className="sticky top-20 max-w-7xl mx-auto flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[750px]">
        {/* Background Speed Lines & Wind Tunnel Grid */}
        <div className="absolute inset-0 bg-speed-lines opacity-20 pointer-events-none" />
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: streakOpacity,
            backgroundImage: `radial-gradient(circle at ${50 + translateX * 0.3}% 60%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)`
          }}
        />

        {/* Header HUD: Mode Toggles & Telemetry Snapshot */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span>ACTIVE STAGE 02</span>
              <span className="text-neutral-700">/</span>
              <span>LERP-INTERPOLATED RUNWAY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight mt-1">
              Scroll-Driven Aerodynamic Trajectory
            </h2>
          </div>

          {/* Drive Mode Segmented Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950/80 rounded-xl border border-neutral-800">
            <button
              onClick={() => setDriveMode('track')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                driveMode === 'track'
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-950/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              TRACK MODE
            </button>
            <button
              onClick={() => setDriveMode('dyno')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                driveMode === 'dyno'
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-950/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              DYNO LAB
            </button>
            <button
              onClick={() => setDriveMode('cruise')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                driveMode === 'cruise'
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-950/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              STEALTH CRUISE
            </button>
          </div>
        </div>

        {/* Center Stage: Physical Animated Vehicle Arena */}
        <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center overflow-hidden min-h-[380px]">
          {/* Asymmetrical Track / Runway Centerline */}
          <div className="absolute w-[180%] h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent top-[68%] -translate-y-1/2 pointer-events-none" />
          <div className="absolute w-full h-32 bg-gradient-to-t from-neutral-950 via-neutral-900/10 to-transparent bottom-0 pointer-events-none" />

          {/* Scroll-Driven Car Visual with Compositor-Only Transforms */}
          <div
            className="relative w-full max-w-3xl aspect-[16/9] transition-transform duration-75 ease-out select-none"
            style={{
              transform: `translate3d(${translateX}%, 0, 0) scale(${zoomFactor}) rotateZ(${suspensionPitch}deg) rotateY(${yawAngle}deg)`,
              transformOrigin: 'center 80%',
            }}
          >
            {/* The High-Fidelity Car Image */}
            <img
              src={carHeroImg}
              alt="ITZFIZZ In-Motion Profile"
              className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Simulated Headlight Beam */}
            {headlightsHigh && (
              <div
                className="absolute top-[48%] left-[-15%] w-[45%] h-[28%] bg-gradient-to-l from-cyan-300/40 via-cyan-400/15 to-transparent blur-2xl pointer-events-none rounded-full transform -rotate-6"
                style={{
                  opacity: 0.5 + Math.min(speedKmh / 500, 0.5),
                }}
              />
            )}

            {/* Aerodynamic Wind Vector Particle Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
              <div
                className="absolute top-[28%] right-[10%] w-48 h-[1px] bg-gradient-to-l from-cyan-400 to-transparent animate-pulse"
                style={{ transform: `scaleX(${1 + smoothProgress})` }}
              />
              <div
                className="absolute top-[42%] right-[25%] w-64 h-[1px] bg-gradient-to-l from-cyan-400/80 to-transparent"
                style={{ transform: `scaleX(${1 + smoothProgress * 1.5})` }}
              />
              <div
                className="absolute bottom-[25%] right-[5%] w-80 h-[1px] bg-gradient-to-l from-blue-400/60 to-transparent"
              />
            </div>

            {/* Dynamic Ground Shadow */}
            <div className="absolute -bottom-6 inset-x-8 h-8 bg-black/80 blur-xl rounded-full pointer-events-none" />
          </div>

          {/* Velocity HUD Tag pinned beneath car */}
          <div className="relative mt-2 px-4 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-800 backdrop-blur-md flex items-center gap-3 text-xs font-mono">
            <span className="text-neutral-400">INSTANTANEOUS VELOCITY:</span>
            <span className="text-cyan-400 font-bold text-sm tabular-nums">
              {speedKmh} km/h
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">PROGRESS:</span>
            <span className="text-neutral-200 tabular-nums">
              {(smoothProgress * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Footer Bar: Real-time Telemetry Metrics & Interactive Controls */}
        <div className="relative z-20 pt-6 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Live Digital Gauge Cluster */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 font-mono">
              <span className="text-[10px] text-neutral-500 uppercase block">Terminal Speed</span>
              <span className="text-lg font-bold text-neutral-100 tabular-nums">{speedKmh}</span>
              <span className="text-xs text-cyan-400 ml-1">km/h</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 font-mono">
              <span className="text-[10px] text-neutral-500 uppercase block">Active Downforce</span>
              <span className="text-lg font-bold text-neutral-100 tabular-nums">{downforceKg}</span>
              <span className="text-xs text-cyan-400 ml-1">kg</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 font-mono">
              <span className="text-[10px] text-neutral-500 uppercase block">Lateral G-Force</span>
              <span className="text-lg font-bold text-neutral-100 tabular-nums">{gForce}</span>
              <span className="text-xs text-cyan-400 ml-1">G</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 font-mono">
              <span className="text-[10px] text-neutral-500 uppercase block">Power Draw</span>
              <span className="text-lg font-bold text-neutral-100 tabular-nums">{batteryKw}</span>
              <span className="text-xs text-cyan-400 ml-1">kW</span>
            </div>
          </div>

          {/* Interactive Scrub & Playback Affordances */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Direct Scroll Scrubber */}
            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(rawProgress * 100)}
                onChange={(e) => onScrollTo(Number(e.target.value) / 100)}
                className="w-24 sm:w-32 accent-cyan-400 cursor-pointer"
                title="Scrub scroll position"
              />
              <span className="tabular-nums w-10 text-right">{Math.round(rawProgress * 100)}%</span>
            </div>

            {/* Quick action buttons */}
            <button
              onClick={() => onScrollTo(smoothProgress > 0.8 ? 0 : 1)}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title={smoothProgress > 0.8 ? 'Reset to Top' : 'Launch Full Runway Run'}
            >
              {smoothProgress > 0.8 ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                  <span>RESET</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LAUNCH RUN</span>
                </>
              )}
            </button>

            <button
              onClick={() => setHeadlightsHigh(!headlightsHigh)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                headlightsHigh
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-500'
              }`}
              title="Toggle Matrix Headlights Beam"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
