import React, { useState } from 'react';
import { CheckCircle2, Download, Send } from 'lucide-react';

export const SpecificationsSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', track: 'Nürburgring Nordschleife' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specsTable = [
    { label: 'Powertrain', value: 'Quad Permanent-Magnet Synchronous Motors' },
    { label: 'Peak Horsepower', value: '1,914 bhp (1,408 kW)' },
    { label: 'Combined Peak Torque', value: '2,360 Nm (1,740 lb-ft)' },
    { label: '0–100 km/h (0–62 mph)', value: '1.85 seconds (without 1-foot rollout)' },
    { label: '0–300 km/h (0–186 mph)', value: '9.3 seconds' },
    { label: 'Top Track Velocity', value: '412 km/h (258 mph)' },
    { label: 'Battery Capacity', value: '120 kWh Liquid-Cooled 800V Architecture' },
    { label: 'Drag Coefficient (Cd)', value: '0.18 with dynamic active aero flaps closed' },
    { label: 'Braking Hardware', value: '390mm Brembo Carbon-Ceramic Rotors (6-piston)' },
    { label: 'Curb Weight', value: '1,950 kg (Carbon-fiber monocoque)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="specifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 text-xs tracking-widest text-neutral-400 font-mono mb-3 uppercase">
            <span className="text-cyan-400">STAGE 04</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span>TECHNICAL SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
            Engineering Benchmark Data
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Certified dyno results, track telemetry parameters, and manufacturing homologation sheet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Specs Table with Tabular Numerals */}
          <div className="lg:col-span-7 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-neutral-200 mb-6 flex items-center justify-between">
              <span>Powertrain & Dynamics Metric Sheet</span>
              <span className="text-xs font-mono text-cyan-400">ISO 9001 TESTED</span>
            </h3>

            <div className="divide-y divide-neutral-800/80">
              {specsTable.map((item, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                  <span className="text-neutral-400 font-normal">{item.label}</span>
                  <span className="text-neutral-100 font-mono font-medium tabular-nums sm:text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Drive Scheduling / Technical Dossier Form */}
          <div className="lg:col-span-5 bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-neutral-200 mb-2">
              Reserve Track Experience
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Experience the scroll-driven physics simulation live on circuit or request the complete CAD engineering dossier.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-semibold text-neutral-100">
                  Track Reservation Request Received
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Thank you, <span className="text-neutral-200 font-medium">{formData.name}</span>. An engineering liaison will contact <span className="text-neutral-200 font-medium">{formData.email}</span> with telemetry slots for {formData.track}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-cyan-500 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="client-email" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@apex-racing.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-cyan-500 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="circuit-select" className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Preferred Proving Ground
                  </label>
                  <select
                    id="circuit-select"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-cyan-500 text-sm text-neutral-100 focus:outline-none transition-colors"
                  >
                    <option value="Nürburgring Nordschleife">Nürburgring Nordschleife (Germany)</option>
                    <option value="Silverstone Grand Prix">Silverstone Grand Prix (UK)</option>
                    <option value="Laguna Seca Raceway">WeatherTech Laguna Seca (USA)</option>
                    <option value="Suzuka International">Suzuka International Circuit (Japan)</option>
                  </select>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-950/40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reserve Session</span>
                  </button>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('ITZFIZZ Technical Homologation Sheet (PDF, 24-pages) download initiated.');
                    }}
                    className="py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Download CAD Sheet</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
