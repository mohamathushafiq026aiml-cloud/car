# ITZFIZZ - Scroll-Driven Hero Section Animation

A high-performance scroll-driven automotive interactive experience inspired by modern engineering showcases, built with **React 19**, **GSAP 3**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🌟 Features & Functional Requirements Implemented

### 1. Hero Section Layout
- Occupies the first screen above the fold (`100vh / min-h-screen`).
- Features the letter-spaced display headline:  
  **`W E L C O M E   I T Z F I Z Z`**
- Below the headline, includes 4 high-impact metrics with exact percentages and descriptions:
  - **99.4%** — Aero Efficiency (Active Venturi drag reduction)
  - **78.2%** — Cornering Grip (Dynamic ground-effect downforce)
  - **100%** — Vectoring Response (Sub-millisecond quad-wheel sync)
  - **64.5%** — Kinetic Recovery (Brembo carbon-ceramic return)

### 2. Initial Load Animation
- Built with **GSAP timeline**:
  - Staggered letter reveal for `W E L C O M E   I T Z F I Z Z` with upward translation, scale, blur filter elimination, and opacity fade.
  - Staggered entrance for impact statistic cards.
  - Smooth counter interpolation animating percentages from 0 to target values.

### 3. Scroll-Based Motion (Core Feature)
- **Tied directly to scroll progress** (not time-based autoplay).
- Uses **60–120 FPS lerp interpolation** (`current += (target - current) * 0.085`) inside `requestAnimationFrame` for natural fluid inertia.
- The high-performance sports car translates dynamically along the runway with:
  - Horizontal translation (`translateX`)
  - Distance scaling (`scale`)
  - Aerodynamic suspension pitch responding to instantaneous scroll velocity
  - Yaw angle curves (`rotateY`)
  - Dynamic wind tunnel streaks and ground reflection
- Real-time speedometer accelerating smoothly from **0 km/h up to 412 km/h** as you scroll.

### 4. Performance & Compositor-First Motion
- Strictly hardware-accelerated transform properties (`translate3d`, `scale`, `rotateZ`, `rotateY`).
- No layout reflows (`width`/`height`/`top`/`left`) triggered during scroll events.
- Passive scroll listeners with decoupled RAF render loop.

### 5. Interactive Enhancements
- **Dynamic Drive Modes**: Track Mode, Dyno Lab, and Stealth Cruise.
- **Scroll Scrubber**: Real-time slider to scrub through scroll progress directly.
- **Acoustic Audio Engine**: Client-side Web Audio API synthesizer modulating motor whine according to scroll velocity (opt-in sound toggle).
- **Matrix Headlights Toggle**: Interactive high-beam projector switch.
- **Aerodynamics & Cockpit Deep-Dive**: Interactive hotspot inspection and technical benchmark sheet.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **Animation**: GSAP 3 + Native `requestAnimationFrame` Lerp Loop
- **Icons**: Lucide React
- **Audio**: Web Audio API (Synthesized oscillators)
- **Bundler**: Vite 8

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
