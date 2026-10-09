import { useState, useEffect, useRef } from 'react';

export interface ScrollState {
  rawProgress: number; // 0 to 1
  smoothProgress: number; // 0 to 1 (lerped)
  velocity: number; // instantaneous speed
  scrollY: number;
  maxScroll: number;
}

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    rawProgress: 0,
    smoothProgress: 0,
    velocity: 0,
    scrollY: 0,
    maxScroll: 1000,
  });

  const stateRef = useRef({
    raw: 0,
    smooth: 0,
    lastScrollY: 0,
    velocity: 0,
    scrollY: 0,
    maxScroll: 1000,
  });

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const raw = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const deltaY = scrollY - stateRef.current.lastScrollY;

      stateRef.current.raw = raw;
      stateRef.current.scrollY = scrollY;
      stateRef.current.maxScroll = maxScroll;
      // Filtered velocity
      stateRef.current.velocity = deltaY * 0.4 + stateRef.current.velocity * 0.6;
      stateRef.current.lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Lerp loop in requestAnimationFrame
    const updateLoop = () => {
      const current = stateRef.current;
      // Lerp smooth towards raw (0.08 factor gives that silky inertia feel)
      const diff = current.raw - current.smooth;
      if (Math.abs(diff) > 0.0001) {
        current.smooth += diff * 0.085;
      } else {
        current.smooth = current.raw;
      }

      // Decay velocity when stationary
      current.velocity *= 0.92;

      setScrollState({
        rawProgress: current.raw,
        smoothProgress: current.smooth,
        velocity: current.velocity,
        scrollY: current.scrollY,
        maxScroll: current.maxScroll,
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToProgress = (targetProgress: number) => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    });
  };

  return {
    ...scrollState,
    scrollToProgress,
  };
}
