import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSubmission: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmission }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Quiet Details */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="text-base font-bold tracking-widest text-neutral-200 uppercase">
            ITZFIZZ
          </span>
          <span className="hidden sm:inline text-neutral-800">|</span>
          <p className="text-neutral-500">
            Scroll-Driven Automotive Performance Interface · Evaluated for Motion Quality & Lerp Smoothness
          </p>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenSubmission}
            className="text-neutral-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Assignment Spec & Links
          </button>
          <a
            href="https://github.com/mohamathushafiq026aiml/itzfizz-scroll-car-animation"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-cyan-400 transition-colors"
          >
            GitHub Repo
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
