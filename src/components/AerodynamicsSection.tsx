import React, { useState } from 'react';
import carRearImg from '../assets/images/car_rear_chassis_1791526971926.jpg';
import carCockpitImg from '../assets/images/car_interior_cockpit_1791526960028.jpg';
import { Wind, ShieldCheck, Cpu, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export const AerodynamicsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aero' | 'cockpit'>('aero');
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(0);

  const aeroHotspots = [
    {
      id: 0,
      title: 'Active Dual-Element Rear Wing',
      desc: 'Actuates between -4° to +32° angle of attack depending on yaw rate, delivering 480kg of rear axle stability at 250 km/h.',
      coords: 'top-[26%] left-[28%]',
    },
    {
      id: 1,
      title: 'Venturi Underbody Diffuser',
      desc: 'Seamless forged carbon ground-effects channel creates low-pressure suction beneath the floorpan with zero parasitic drag penalty.',
      coords: 'bottom-[25%] left-[24%]',
    },
    {
      id: 2,
      title: 'Integrated Monocoque Air Curtain',
      desc: 'Redirects high-pressure wheel arch air around the Michelin Pilot Sport Cup 2R tires to prevent turbulence vortex formation.',
      coords: 'bottom-[35%] right-[32%]',
    },
  ];

  const cockpitFeatures = [
    {
      title: 'Haptic Telemetry Hub',
      desc: 'Direct race telemetry with instant lap timing, brake temperature gradients, and individual tire slip angles.',
    },
    {
      title: 'Ultralight Forged Carbon Shell',
      desc: 'Bespoke FIA-homologated carbon tub structure with integral titanium roll cage weighing merely 74 kg.',
    },
    {
      title: 'Real-time Torque Distribution',
      desc: 'Allows millimeter precision adjustment between 100% front, 50/50 AWD, or 100% rear wheel power delivery.',
    },
  ];

  return (
    <section id="aerodynamics" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 text-xs tracking-widest text-neutral-400 font-mono mb-3 uppercase">
              <span className="text-cyan-400">STAGE 03</span>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <span>ENGINEERING DEEP DIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Aero Dynamics & Pilot Interface
            </h2>
          </div>

          {/* Clean Segmented Tab Control */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('aero')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'aero'
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Aerodynamics & Rear Diffuser
            </button>
            <button
              onClick={() => setActiveTab('cockpit')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'cockpit'
                  ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Cockpit & HMI Telemetry
            </button>
          </div>
        </div>

        {/* Tab Content 1: Aerodynamics */}
        {activeTab === 'aero' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Image Display */}
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
              <img
                src={carRearImg}
                alt="ITZFIZZ Active Aerodynamics and Rear Diffuser"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {/* Hotspot Markers */}
              {aeroHotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  className={`absolute ${spot.coords} -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    selectedHotspot === spot.id
                      ? 'bg-cyan-400 text-black ring-4 ring-cyan-400/30 scale-110'
                      : 'bg-neutral-950/80 text-cyan-400 border border-neutral-700 hover:scale-110'
                  }`}
                  aria-label={`Inspect ${spot.title}`}
                >
                  <span className="text-xs font-mono font-bold">{spot.id + 1}</span>
                </button>
              ))}

              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-md rounded-lg border border-neutral-800 text-xs font-mono text-neutral-300">
                CLICK HOTSPOTS 1–3 TO INSPECT ARCHITECTURE
              </div>
            </div>

            {/* Hotspot Information Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {aeroHotspots.map((spot) => {
                const isSelected = selectedHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot.id)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                        : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected ? 'bg-cyan-400 text-black' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        0{spot.id + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-neutral-100">
                        {spot.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 2: Cockpit Telemetry */}
        {activeTab === 'cockpit' && (
          <div id="cockpit" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Cockpit Image */}
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <img
                src={carCockpitImg}
                alt="ITZFIZZ Carbon-Fiber Racing Cockpit"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-neutral-950/80 backdrop-blur-md rounded-lg border border-neutral-800 text-xs font-mono text-cyan-400">
                ACTIVE TELEMETRY SCREEN: ONLINE
              </div>
            </div>

            {/* Cockpit Breakdown Cards */}
            <div className="lg:col-span-4 space-y-4">
              {cockpitFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-neutral-100">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
