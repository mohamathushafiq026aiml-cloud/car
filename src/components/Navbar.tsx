import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onOpenSubmission: () => void;
  audioActive: boolean;
  setAudioActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmission,
  audioActive,
  setAudioActive,
}) => {
  const handleToggleSound = () => {
    const isNowPlaying = audioEngine.toggleMute();
    setAudioActive(isNowPlaying);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="text-lg font-bold tracking-widest text-neutral-100 hover:text-cyan-400 transition-colors uppercase whitespace-nowrap shrink-0"
        >
          ITZFIZZ
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('runway')}
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Motion Track
          </button>
          <button
            onClick={() => scrollToSection('aerodynamics')}
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Aerodynamics
          </button>
          <button
            onClick={() => scrollToSection('cockpit')}
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cockpit
          </button>
          <button
            onClick={() => scrollToSection('specifications')}
            className="hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Specifications
          </button>
        </nav>

        {/* Zone 3: Actions (Sound toggle + Submission Info / Primary Action) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleSound}
            aria-label={audioActive ? 'Mute engine audio' : 'Enable engine audio'}
            title={audioActive ? 'Mute Sound' : 'Enable Acoustic Drive Sound'}
            className="p-2 text-neutral-400 hover:text-cyan-400 hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            {audioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline text-neutral-300">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-500" />
                <span className="hidden sm:inline text-neutral-500">SOUND</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSubmission}
            className="px-4 py-2 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-lg shadow-cyan-950/50 cursor-pointer"
          >
            Project Spec
          </button>
        </div>
      </div>
    </header>
  );
};
