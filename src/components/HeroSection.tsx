import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Gauge, Wind, Zap, Activity } from 'lucide-react';
import carHeroImg from '../assets/images/car_hero_side_profile_1791526949138.jpg';

interface MetricItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

const METRICS_DATA: MetricItem[] = [
  {
    id: 'aero',
    targetValue: 99.4,
    suffix: '%',
    label: 'Aero Efficiency',
    subtext: 'Active Venturi drag reduction index',
    icon: <Wind className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 'downforce',
    targetValue: 78.2,
    suffix: '%',
    label: 'Cornering Grip',
    subtext: 'Dynamic ground-effect downforce',
    icon: <Gauge className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 'torque',
    targetValue: 100.0,
    suffix: '%',
    label: 'Vectoring Response',
    subtext: 'Individual sub-millisecond quad-wheel sync',
    icon: <Zap className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 'regen',
    targetValue: 64.5,
    suffix: '%',
    label: 'Kinetic Recovery',
    subtext: 'Brembo carbon-ceramic energy return',
    icon: <Activity className="w-4 h-4 text-cyan-400" />,
  },
];

interface HeroSectionProps {
  smoothProgress: number;
  velocity: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  smoothProgress,
  velocity,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const metricsRef = useRef<HTMLDivElement[]>([]);
  const [metricValues, setMetricValues] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Exact letter sequence as specified: W E L C O M E   I T Z F I Z Z
  const headlineWords = [
    { word: 'WELCOME', letters: 'WELCOME'.split('') },
    { word: 'ITZFIZZ', letters: 'ITZFIZZ'.split('') },
  ];

  useEffect(() => {
    // Initial Load Animation using GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setHasAnimated(true),
      });

      // 1. Staggered headline reveal
      tl.fromTo(
        lettersRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.85,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.035,
          ease: 'power3.out',
        }
      );

      // 2. Metrics card staggered entrance
      tl.fromTo(
        metricsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // 3. Counter interpolation for statistics
      const counterObj = { v0: 0, v1: 0, v2: 0, v3: 0 };
      tl.to(
        counterObj,
        {
          v0: METRICS_DATA[0].targetValue,
          v1: METRICS_DATA[1].targetValue,
          v2: METRICS_DATA[2].targetValue,
          v3: METRICS_DATA[3].targetValue,
          duration: 1.5,
          ease: 'power1.out',
          onUpdate: () => {
            setMetricValues([
              counterObj.v0,
              counterObj.v1,
              counterObj.v2,
              counterObj.v3,
            ]);
          },
        },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute scroll-based transformations for the hero car visual
  // As user starts scrolling down, car translates, scales, and tilts
  const carTranslateX = smoothProgress * 60; // moves forward horizontally
  const carTranslateY = smoothProgress * 40; // moves slightly down with perspective
  const carScale = 1 - smoothProgress * 0.15; // smooth distance scale
  const suspensionPitch = Math.max(Math.min(-velocity * 0.12, 4), -4); // dynamic tilt based on velocity

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950"
    >
      {/* Background ambient lighting and subtle speed grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Tagline & Editorial Index */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 text-center">
        <div className="inline-flex items-center gap-3 text-xs tracking-widest text-neutral-400 font-mono mb-4 uppercase">
          <span className="text-cyan-400">STAGE 01</span>
          <span aria-hidden="true" className="text-neutral-700">/</span>
          <span>AERODYNAMIC APEX CHASSIS</span>
          <span aria-hidden="true" className="text-neutral-700">/</span>
          <span>SCROLL-DRIVEN DYNAMICS</span>
        </div>

        {/* Letter-spaced headline: W E L C O M E   I T Z F I Z Z */}
        <h1
          aria-label="WELCOME ITZFIZZ"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] text-neutral-100 flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-2 select-none"
        >
          {headlineWords.map((wordGroup, groupIdx) => (
            <div key={groupIdx} className="inline-flex whitespace-nowrap">
              {wordGroup.letters.map((char, charIdx) => {
                const totalIndex =
                  groupIdx === 0
                    ? charIdx
                    : headlineWords[0].letters.length + charIdx;
                return (
                  <span
                    key={charIdx}
                    ref={(el) => {
                      if (el) lettersRef.current[totalIndex] = el;
                    }}
                    className="inline-block transition-transform hover:text-cyan-400 hover:scale-110 duration-200"
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          Engineered for zero-compromise aerodynamics and instant torque vectoring.
          Scroll down to accelerate through dynamic track simulation.
        </p>
      </div>

      {/* Center Stage: The Hero Hypercar Visual Asset */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto py-4 sm:py-6 flex flex-col items-center justify-center">
        <div
          className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 border border-neutral-800/80 bg-neutral-900/60 gpu-layer transition-transform duration-75"
          style={{
            transform: `translate3d(${carTranslateX}px, ${carTranslateY}px, 0) scale(${carScale}) rotateZ(${suspensionPitch}deg)`,
          }}
        >
          {/* Main Car Image */}
          <img
            src={carHeroImg}
            alt="ITZFIZZ Electric Hypercar aerodynamic profile"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Dynamic Headlight beam overlay that brightens on speed */}
          <div
            className="absolute top-[48%] left-0 w-48 h-24 bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent blur-xl pointer-events-none transition-opacity"
            style={{
              opacity: 0.4 + Math.min(Math.abs(velocity) * 0.05, 0.6),
            }}
          />

          {/* Sleek reflection baseline */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent pointer-events-none" />

          {/* Floating Telemetry Micro-Badge inside frame */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-neutral-950/70 backdrop-blur-md rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
            <span className="text-cyan-400">VEHICLE STATE</span>
            <span className="text-neutral-600">·</span>
            <span>AERO LOCK 100%</span>
          </div>

          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-neutral-950/70 backdrop-blur-md rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
            <span className="text-neutral-500">VELOCITY RATIO:</span>
            <span className="text-cyan-400 tabular-nums">
              {(smoothProgress * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest animate-bounce">
          <ChevronDown className="w-4 h-4 text-cyan-400" />
          <span>Scroll down to drive</span>
        </div>
      </div>

      {/* Bottom Section: Impact Metrics / Statistics */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {METRICS_DATA.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) metricsRef.current[idx] = el;
              }}
              className="p-4 sm:p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <div className="p-1.5 rounded-lg bg-neutral-800/60 border border-neutral-700/50 group-hover:border-cyan-500/40 transition-colors">
                  {item.icon}
                </div>
              </div>

              <div className="my-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-100 font-mono tracking-tight tabular-nums flex items-baseline gap-0.5">
                  <span>
                    {hasAnimated
                      ? item.targetValue.toFixed(item.id === 'torque' ? 0 : 1)
                      : metricValues[idx].toFixed(
                          item.id === 'torque' ? 0 : 1
                        )}
                  </span>
                  <span className="text-cyan-400 text-lg sm:text-xl font-bold">
                    {item.suffix}
                  </span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-neutral-400 leading-normal mt-1">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
