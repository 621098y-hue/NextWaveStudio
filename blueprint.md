# Blueprint: 점포라인 염건호 (Yeom Geon-ho) Professional Portfolio

## Overview
A high-performance, visually stunning professional landing page for Team Leader Yeom Geon-ho (염건호) of Storeline (점포라인). This project recreates and elevates the existing web presence using modern web standards (Baseline), featuring 3D graphics, custom web components, and advanced CSS.

## Project Details & Design
### Visual Identity
- **Aesthetics:** Premium, trustworthy, and modern.
- **Color Palette (OKLCH):**
  - Primary: Deep Navy (`oklch(25% 0.05 260)`) for stability.
  - Accent: Vibrant Gold (`oklch(75% 0.15 80)`) for "Success".
  - Background: Off-white (`oklch(98% 0.01 260)`) with a subtle noise texture.
- **Typography:** Fluid typography using `clamp()` for responsive headlines (Pretendard/Noto Sans KR).
- **Depth & Texture:** Multi-layered drop shadows for cards to create a "lifted" feel. Interactive elements feature a subtle "glow" effect.

### Key Sections
1. **3D Hero Section:** An immersive Three.js background with abstract geometric shapes and a bold headline: "성공 창업의 든든한 파트너" (Your Reliable Partner for Successful Start-ups).
2. **Introduction:** Professional profile of Team Leader Yeom Geon-ho, highlighting 10+ years of expertise and big data analysis.
3. **Core Services:** Modular cards showcasing:
   - Store Consulting (점포 컨설팅)
   - Business Rights Valuation (권리금 산정)
   - Commercial Area Analysis (상권 분석)
4. **Contact & Location:** Interactive contact links and office location (Seoul, Seocho-gu).

## Technical Implementation (Baseline Standards)
- **Web Components:** Encapsulated UI elements like `<service-card>` and `<contact-info>`.
- **Modern CSS:**
  - `@layer` for style organization.
  - `@container` queries for component-level responsiveness.
  - `:has()` selector for interactive parent styling.
  - CSS Variables for theming and consistency.
- **JavaScript:** ES Modules for clean structure, `fetch` for potential data integration, and Three.js for 3D visuals.
- **Accessibility:** Semantic HTML5, ARIA roles, and keyboard-friendly navigation.

## Execution Plan
1. **Base Structure:** Set up `index.html` with semantic sections and CDN links (Three.js, Lucide Icons).
2. **Styling Foundation:** Implement `style.css` using OKLCH colors, fluid typography, and CSS layers.
3. **3D Hero:** Initialize Three.js in `main.js` to create the background animation.
4. **Web Components:** Define custom elements for reusable UI parts.
5. **Interactivity:** Add scroll-driven animations and hover effects.
6. **Validation:** Check for errors, responsiveness, and performance.
