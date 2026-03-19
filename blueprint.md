# Blueprint: Pyeong to Square Meter Converter

## Overview
A modern, minimalist standalone tool for converting area units (Pyeong <-> Square Meter). Specifically designed for Korean users, prioritizing clarity, accuracy, and mobile accessibility.

## Project Details & Design
### Visual Identity (Soft Modern)
- **Aesthetics:** Minimalist design with high contrast and soft, deep shadows.
- **Colors (OKLCH):**
  - Primary: `oklch(25% 0.05 260)` (Deep Navy)
  - Accent: `oklch(60% 0.15 250)` (Vibrant Blue)
  - Background: `oklch(98% 0.01 260)` (Soft Gray/White)
- **Typography:** Pretendard for its exceptional readability in Korean.
- **Micro-interactions:** Smooth transitions when values change and active focus states.

### Key Features
1. **Bi-directional Conversion:** Real-time calculation between Pyeong (坪) and Square Meters (㎡).
2. **Quick Selection:** One-tap buttons for common real estate sizes (24평, 32평, 59㎡, 84㎡, etc.).
3. **Reference Guide:** Helpful information about apartment area terminology (전용/공용/공급면적).

## Technical Implementation
- **Standard:** Modern Web Standards (Baseline).
- **Structure:** Semantic HTML5.
- **Styles:** CSS Layers (`@layer`) and OKLCH color space for future-proof design.
- **Interactions:** Vanilla JavaScript (ES Modules).

## Execution Plan
1. **Styling Foundation:** Define global styles and layout in `style.css`.
2. **Core Interface:** Build the converter UI in `index.html`.
3. **Conversion Engine:** Implement logic in `main.js`.
4. **Validation:** Verify accuracy (1 Pyeong = 3.3058㎡).
