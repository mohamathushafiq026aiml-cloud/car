import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CarCanvasTrack } from './components/CarCanvasTrack';
import { AerodynamicsSection } from './components/AerodynamicsSection';
import { SpecificationsSection } from './components/SpecificationsSection';
import { SubmissionDrawer } from './components/SubmissionDrawer';
import { Footer } from './components/Footer';
import { useScrollProgress } from './hooks/useScrollProgress';
import { audioEngine } from './utils/audio';

export default function App() {
  const {
    rawProgress,
    smoothProgress,
    velocity,
    scrollToProgress,
  } = useScrollProgress();

  const [audioActive, setAudioActive] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);

  // Synchronize audio synthesis with real-time velocity
  useEffect(() => {
    if (audioActive) {
      const speedKmh = Math.round(smoothProgress * 412);
      audioEngine.updateSpeed(speedKmh, velocity);
    }
  }, [smoothProgress, velocity, audioActive]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenSubmission={() => setSubmissionOpen(true)}
        audioActive={audioActive}
        setAudioActive={setAudioActive}
      />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Above-the-fold Hero Section with Letter-Spaced WELCOME ITZFIZZ & Staggered Reveal */}
        <HeroSection
          smoothProgress={smoothProgress}
          velocity={velocity}
        />

        {/* 2. Core Scroll-Driven Car Motion Track (Lerp Interpolation, Physics transforms) */}
        <CarCanvasTrack
          rawProgress={rawProgress}
          smoothProgress={smoothProgress}
          velocity={velocity}
          onScrollTo={scrollToProgress}
        />

        {/* 3. Deep Dive Aerodynamics & Cockpit Telemetry Showcase */}
        <AerodynamicsSection />

        {/* 4. Certified Benchmarks, Technical Specs & Proving Ground Reservation */}
        <SpecificationsSection />
      </main>

      {/* Footer */}
      <Footer onOpenSubmission={() => setSubmissionOpen(true)} />

      {/* Assignment Submission Audit Modal */}
      <SubmissionDrawer
        isOpen={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
      />
    </div>
  );
}
