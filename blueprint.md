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
- **Typography:** Fluid typography using `clamp()` for responsive headlines (Pretendard).
- **Depth & Texture:** Multi-layered drop shadows for cards to create a "lifted" feel. Interactive elements feature a subtle "glow" effect.

### Key Sections
1. **3D Hero Section:** An immersive Three.js background with abstract geometric shapes and a bold headline.
2. **Introduction:** Professional profile of Team Leader Yeom Geon-ho, highlighting 10+ years of expertise.
3. **Core Services:** Modular cards showcasing Store Consulting, Business Rights Valuation, and Commercial Area Analysis.
4. **Lucky Lotto Event:** A unique interactive section providing "Lucky Numbers" for a successful start-up journey.
5. **Contact & Location:** Interactive contact form and office location.

## Technical Implementation (Baseline Standards)
- **Web Components:** Encapsulated UI elements like `<service-card>`.
- **Modern CSS:** `@layer` for organization, `@container` queries, and OKLCH color spaces.
- **JavaScript:** ES Modules, Three.js for 3D visuals, and custom business logic for the Lotto event.
- **Import Maps:** Used to manage Three.js dependencies without a build step.

## Execution Plan
1. **Base Structure:** Set up `index.html` with semantic sections and Import Maps.
2. **Styling Foundation:** Implement `style.css` using OKLCH colors and CSS layers.
3. **3D Hero:** Initialize Three.js in `main.js`.
4. **Lotto Feature:** Integrate the random number generator with premium UI/UX.
5. **Validation:** Check for errors, responsiveness, and performance.
6. **Deployment:** Commit and push to the Git repository.
