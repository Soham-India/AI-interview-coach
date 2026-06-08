# AI Interview Coach — Architectural Design System & UI Specification
### Stack: React + Redux Toolkit + React Router DOM + Tailwind CSS
### Aesthetic Target: 40% Hubtown | 30% Apple Event | 20% Stripe Press | 10% Sci-Fi Simulation Room

---

## 0. Product First Rule

> When visual spectacle conflicts with interview effectiveness,  
> **interview effectiveness always wins.**

The application is a career tool first and a visual experience second.  
This rule prevents future AI generations from becoming too artistic at the cost of usability.

---

## 1. Design Vision & Philosophy

The AI Interview Coach is not a productivity tool; it is a **premium flight simulator for your career.**

We do not think in "pages" (Dashboards, Analytics, Profiles). We think in **experiences** (Simulation Archive, Readiness Report, Operator Identity). Every interaction is a meticulously crafted scene.

**The Core Directives:**

- **The Scroll Narrative:** The experience unfolds chronologically like a film, not a filing cabinet. One bold idea per viewport.
- **The Hubtown Contrast Shift:** We use dramatic lighting changes to signal state changes. The simulation happens in a dark, atmospheric chamber. The verdict is delivered in a stark, brightly lit icy-blue environment.
- **Atmospheric & Luxury:** The interface must feel expensive, serious, and high-stakes.
- **Desktop-First Architecture:** The experience is engineered for the primary medium of interviews: the laptop/desktop screen.

---

## 2. Forbidden UI Elements

To maintain the architectural, storytelling aesthetic, the following elements are **STRICTLY PROHIBITED:**

- Generic SaaS dashboards
- KPI cards & statistic grids
- Bootstrap-style layouts
- Dense sidebars
- Multiple competing CTAs
- Colorful charts & glassmorphism
- Rounded modern startup UI
- Standard admin templates

---

## 3. Visual References

Do not reference standard UI kits. Study the architectural spacing, typography scaling, and motion physics of the following web experiences:

- **Hubtown.co.in** — Deep dark modes, dramatic lighting, massive editorial contrast shifts
- **Apple Event Landing Pages** — Cinematic transitions, hardware-level precision
- **Stripe Press** — Editorial layouts, exquisite typography, minimalist navigation

---

## 4. Color System

The palette is extremely constrained to maximize contrast and architectural framing.

```javascript
// tailwind.config.js - Core Palette
module.exports = {
  theme: {
    colors: {
      /* The Simulation Chamber (Dark Mode) */
      abyss:      '#050B14',   // Deep atmospheric architectural dark background
      panel:      '#0A121F',   // Slightly elevated floating elements
      frame:      '#1A2436',   // Geometric framing lines / subtle borders

      /* The Verdict Environment (Light Mode) */
      icyBlue:    '#D5E0FF',   // The Hubtown signature overlay background
      ink:        '#000000',   // Massive typography on icy backgrounds

      /* Typography */
      pureWhite:  '#FFFFFF',   // Primary text in the abyss
      steel:      '#8BA0B8',   // Muted text, metadata, subtle controls

      /* AI Core & Accents */
      neonBlue:   '#0088FF',   // Subtle glowing accents for AI activity
      success:    '#10B981',   // Reserved strictly for positive feedback flags
      warning:    '#EF4444',   // Reserved strictly for critical improvement flags
      danger:     '#DC2626',   // Critical errors
    }
  }
}
```

**Usage Rules:**

| Context | Background | Text |
|---|---|---|
| Dark Mode (Default) | `abyss` | `pureWhite` |
| Light Mode (Reports / Menus) | `icyBlue` | `ink` (massive) |
| AI Activity Accent | — | `neonBlue` (primary actions only) |
| Positive Feedback | — | `success` (strictly reserved) |
| Critical Flag | — | `warning` (strictly reserved) |

---

## 5. Typography System

Typography is the primary structural element. We use massive editorial scaling.

```css
/* Font: Inter — import in index.html */
font-family: 'Inter', sans-serif;
```

| Role | Size | Weight | Tailwind Class |
|---|---|---|---|
| **Hero / Score** | 120px+ | 900 | `text-[120px] font-black tracking-tighter leading-none` |
| **Headline** | 72px | 800 | `text-7xl font-extrabold tracking-tight leading-none` |
| **Scene Focus** | 48px | 700 | `text-5xl font-bold tracking-tight` |
| **Body** | 24px | 400 | `text-2xl font-normal leading-relaxed text-steel` |
| **Standard** | 18px | 400 | `text-lg font-normal` |
| **Metadata** | 12px | 500 | `text-xs font-medium tracking-widest uppercase text-steel` |

---

## 6. Motion Philosophy & Micro-interactions

- **No Bounce:** Absolutely no spring animations. Gravity is heavy; motion is deliberate.
- **Scroll Triggering:** Content reveals itself as it enters the viewport (fading up slowly over 800ms).
- **The AI Glow:** When the AI is generating, the `neonBlue` accent should pulse with a slow, breathing opacity shift.

---

## 7. Component Library

### Buttons

```jsx
/* Primary Cinematic Button — Glowing border */
<button className="border border-neonBlue/40 text-pureWhite px-10 py-4 uppercase tracking-widest text-sm
  hover:bg-neonBlue/10 hover:shadow-[0_0_30px_rgba(0,136,255,0.2)] transition-all duration-500">
  Enter The Simulator
</button>

/* Secondary Cinematic Button — Architectural Outline */
<button className="border border-frame text-steel px-10 py-4 uppercase tracking-widest text-sm
  hover:border-pureWhite hover:text-pureWhite transition-all duration-300">
  Return to Landing
</button>

/* Light Mode Editorial Button — Brutalist Block */
<button className="bg-ink text-icyBlue px-10 py-4 font-bold uppercase tracking-widest text-sm
  hover:bg-black/80 transition-all duration-300">
  View The Verdict
</button>
```

### CTA Standardization

All calls-to-action follow this hierarchy strictly:

| Context | CTA Label |
|---|---|
| Landing page (first entry) | `ENTER THE SIMULATOR` |
| Anywhere else | `NEW INTERVIEW` |
| Within simulation | `SUBMIT RESPONSE` |
| From report / archive | `VIEW THE VERDICT` |

### Loading States (The AI Atmosphere)

```jsx
/* AI Compiling Sequence — Full Screen or Panel Center */
<div className="flex flex-col items-center justify-center gap-6">

  <div className="w-16 h-16 rounded-full border border-neonBlue/30 bg-neonBlue/10
    shadow-[0_0_50px_rgba(0,136,255,0.2)] animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 rounded-full bg-neonBlue/50 animate-ping"></div>
  </div>

  <div className="text-neonBlue text-sm tracking-[0.3em] uppercase font-bold animate-pulse">
    Compiling Next Scenario...
  </div>

</div>
```

---

## 8. Page Specifications (The Narrative)

### A. The Landing Narrative (`/`)

The homepage is a linear, scroll-driven story focused on the methodology. Each scene occupies exactly 100vh. No fake statistics.

**Scene 1: The Core**
- Background: `bg-abyss`
- Centerpiece: A perfectly centered, floating AI Core (holographic cube or pulsating neural sphere).
- Headline: `PRACTICE BEFORE THE INTERVIEW THAT MATTERS.` (`text-pureWhite`)
- Action: `[ ENTER THE SIMULATOR ]` (Neon border button)

**Scene 2: The Method**
- Visual: Entire viewport. Immense, dominating typography vertically centered.
- Typography: `MASTER THE INTERVIEW.` (120px, `pureWhite`, vertically centered)

**Scene 3: Step One**
- Typography: Stacked on the left — `01 / ANALYZE`
- Body Copy: "Supply the role requirements. Our intelligence analyzes the specific tech stack and behavioral expectations to craft a bespoke interview scenario that mirrors reality." (24px, `steel`)
- Visual: Right side fades in a glowing architectural wireframe of the input panel.

**Scene 4: Step Two**
- Typography: Stacked on the left — `02 / SIMULATE`
- Body Copy: "Engage in a dynamic back-and-forth. The intelligence adapts to your answers, probing deeper on weak points just like a real hiring manager."
- Visual: A question panel animates in, illuminated by the `neonBlue` AI glow.

**Scene 5: Step Three**
- Typography: Stacked on the left — `03 / ASSESS`
- Body Copy: "Receive a comprehensive readiness score, actionable critiques, and specific suggestions for improving your technical communication."
- Visual: An abstract representation of telemetry and data lines.

**Scene 6: The Verdict**
- Visual: Scroll crosses a threshold; screen flashes dramatically from `abyss` to `icyBlue`.
- Typography: `RECEIVE THE VERDICT` (Massive `ink`)
- Action: `[ ENTER THE SIMULATOR ]` (Solid ink block)

---

### B. The Simulation Chamber (`/simulation/:sessionId`)

**Vibe:** High-stakes, dark, focused. Maximum concentration.

```
Layout: Centered single column, max-w-3xl.
Background: bg-abyss. Geometric framing lines subtly divide the screen.

Top bar:
  - Left: Minimalist timer in text-steel.
  - Center: Thin neonBlue line expanding across the top edge (Progress).
  - Right: [ RETURN TO LANDING ] (Secondary cinematic button, border-frame).

The Focal Element (Question Panel):
  - bg-panel with glowing neonBlue border.
  - Question Number: "SEQUENCE 03 / 08" (Metadata text).
  - Question Text: 40px, bold, pureWhite.

Input Area:
  - Massive, borderless textarea feeling like writing on glass.
  - Bottom Right: "SYNCED ✓" (success color).

Action Row (Bottom):
  - Left: [ ← PREVIOUS ] (Ghost text, text-steel hover:text-pureWhite)
  - Right: [ SUBMIT RESPONSE → ] (Primary neon border button)

Loading State (Between questions):
  - Panel dissolves smoothly.
  - Replaced by the pulsating neural core and text: "COMPILING NEXT SCENARIO..." or "ANALYZING RESPONSE..."
```

---

### C. The Readiness Report & Feedback Architecture (`/report/:sessionId`)

**Architecture:** Single Continuous Editorial Experience  
**Vibe:** The Hubtown Contrast Shift. The Verdict.  
**Background:** `bg-icyBlue` entirely. **Typography Base:** `ink` (#000000).

```
Section 1: The Macro Verdict (100vh)
  - Left: 150px font-black text "84"
  - Stacked uppercase text: "INTERVIEW / READINESS / SCORE"
  - Bottom Right: Summary verdict paragraph.
    Example: "Technically proficient, but communication lacks structural clarity."

Section 2: The Diagnostics (Min 50vh)
  - Two architectural columns separated by a 1px solid black line.
  - Left Column (Strengths): Massive header "CORE COMPETENCIES".
    Followed by unboxed, bold typography bullet points.
  - Right Column (Failures): Massive header "CRITICAL VULNERABILITIES".
    Followed by brutal, honest weakness breakdowns.

Section 3: Telemetry / Per-Question Breakdown
  - No cards. No accordions. A pure architectural timeline flowing down the page.
  - Each question is separated by a full-width solid black line (border-ink).

  Layout per question:
    Row 1: "SEQUENCE 01" (Metadata) | Score: "9/10"
    Row 2: The Question (Massive bold ink text, 32px)
    Row 3: Two columns.
           Left: "AI EVALUATION" — What you did right/wrong.
           Right: "CORRECTIVE ACTION" — How to fix it.

Section 4: The Terminus (Feedback Actions)
  - Centered at the bottom of the scroll.
  - [ NEW INTERVIEW ]       (Solid ink block)
  - [ RETURN TO ARCHIVE ]   (Outline ink block)
  - [ EXPORT REPORT ]       (Ghost text block)
```

---

### D. Analytics Page (`/analytics`)

**Vibe:** Architectural data room. An editorial approach to telemetry. Do not convert into a traditional SaaS dashboard.

```
Background: bg-abyss.
Layout: Vertical scroll narrative. Massive full-screen modules separated by thin geometric frame lines.

Header: "ANALYTICS" (Massive pureWhite text).

Module 1: Skill Radar
  - Full-screen architectural radar visualization.
  - Rendered with ultra-thin neonBlue geometric lines spanning across the dark abyss.
  - Labels float in text-steel.

Module 2: Score Trend
  - Editorial readiness trend across interviews.
  - An edge-to-edge line chart. No axes, no gridlines.
  - Just a glowing neonBlue line charting readiness over time.

Module 3: Weak & Strong Areas (Editorial Split)
  - Left Column: "STRONG AREAS"
    Massive typography list: React, DSA, API Design, Debugging.
  - Right Column: "WEAK AREAS"
    Massive typography list: Communication, System Design, Problem Solving, Technical Depth.

Module 4: Interview History
  - Historical simulations as an editorial timeline, not a dashboard table.
  - Layout per entry: "DATE" | "ROLE" | "SCORE" separated by horizontal architectural rules.
  - Interaction: Clicking an entry opens the corresponding report.

Module 5: Readiness Evolution (AI Narrative)
  - AI-generated editorial narrative summary block.
  - No charts. Pure editorial typography on the abyss.
  - Example output:
    "Communication has improved by 18% across the last five simulations,
     while system design remains the largest limiting factor."
```

---

### E. Simulation Archive (`/archive`)

**Vibe:** A chronological mission log. A timeline of past encounters.

```
Background: bg-abyss.
Layout: Single column, deeply indented timeline. Not a table-heavy admin page. No dashboard cards.

Header: "ARCHIVE" (72px, pureWhite)

The Timeline:
  - A single, uninterrupted vertical frame line dropping down the left side of the screen.
  - Each entry is a node delineated by architectural dividers.

  Node Structure per entry:
    - Date & Status: "OCTOBER 12, 2025 // STATUS: EVALUATED" (text-steel, tracking-widest)
    - Role: "SENIOR FRONTEND ENGINEER" (48px, pureWhite)
    - Company: "STRIPE" (24px, steel)
    - Readiness Score: "SCORE: 88" (neonBlue)

Interaction:
  - Hovering a node: subtle neonBlue border appears around the bounding box.
  - Clicking the node: transitions directly into the icyBlue Readiness Report (/report/:sessionId).
```

---

### F. Profile Page (`/profile`)

**Vibe:** System configuration terminal. Brutalist forms. Avoid generic settings-page aesthetics.

```
Background: bg-abyss.
Layout: Centered, single column. Max width 3xl.

Header: "PROFILE" (72px, pureWhite)

Identity Section:
  - Avatar (minimalist geometric circle frame).
  - Massive text for Name.
  - Minimal, border-b input for Email update.

Configuration Sections (Stacked, separated by solid frame lines):

  "SECURITY"
    - Password Management (borderless text inputs).
    - Login Methods (Google, etc.).

  "INTERVIEW PREFERENCES"
    - Preferred Duration (30m, 45m).
    - Preferred Difficulty Level.
    - Preferred Domains (React, Backend, Systems).

  "NOTIFICATIONS"
    - Email Notifications toggle.
    - Report Notifications toggle.

  "ACCOUNT ACTIONS" (Danger Zone)
    - [ EXPORT ACCOUNT DATA ] (Secondary cinematic button)
    - [ DELETE ACCOUNT ]      (Ghost text, text-danger)

Save Actions: Floating [ SAVE CONFIGURATION ] (neon border button).
```

---

## 9. Navigation Architecture

The navigation is a disruptive, full-screen takeover. It pauses the current scene to offer systemic routing.

### The Overlay

- **Trigger:** Floating `[ MENU ]` metadata text in the top right of all screens.
- **Background:** `bg-icyBlue` (forces the Hubtown contrast shift).
- **Transition:** Fades in seamlessly (300ms) over the active viewport.

### The Hierarchy & Routing

Centered, massive `ink` typography. Labels are instantly understandable.

| Label | Route |
|---|---|
| `NEW INTERVIEW` | `/` |
| `ANALYTICS` | `/analytics` |
| `ARCHIVE` | `/archive` |
| `PROFILE` | `/profile` |

### Interaction Behavior

- **Hover:** Un-hovered items fade to 20% opacity. The hovered item remains 100% solid black.
- **Close:** Massive `[ CLOSE ]` button in the top right.

---

## 10. Route Map & React Router Structure

### Route Map

| Route | Scene Title | Component File | Environment |
|---|---|---|---|
| `/` | Landing Narrative | `pages/Landing.jsx` | Abyss → Icy |
| `/login` | Authentication | `pages/Login.jsx` | Abyss |
| `/simulation/:sessionId` | Simulation Chamber | `pages/Simulation.jsx` | Abyss |
| `/report/:sessionId` | Readiness Report | `pages/Report.jsx` | Icy Blue |
| `/analytics` | Analytics | `pages/Analytics.jsx` | Abyss |
| `/archive` | Simulation Archive | `pages/Archive.jsx` | Abyss |
| `/profile` | Profile | `pages/Profile.jsx` | Abyss |

### React Router Setup (`App.jsx`)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Wrapper for protected sequences
const ProtectedSequence = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? children : <Navigate replace to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/simulation/:sessionId" element={
          <ProtectedSequence><Simulation /></ProtectedSequence>
        } />
        <Route path="/report/:sessionId" element={
          <ProtectedSequence><Report /></ProtectedSequence>
        } />
        <Route path="/analytics" element={
          <ProtectedSequence><Analytics /></ProtectedSequence>
        } />
        <Route path="/archive" element={
          <ProtectedSequence><Archive /></ProtectedSequence>
        } />
        <Route path="/profile" element={
          <ProtectedSequence><Profile /></ProtectedSequence>
        } />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
```

---

## 11. Responsiveness Strategy (Desktop-First)

**Philosophy: Laptop / Desktop First.**  
Technical interviews are taken on laptops and large displays. The application is engineered primarily for large viewports (1024px+). The mobile experience is a graceful degradation, ensuring functionality without compromising the architectural brutalism.

### Tailwind Breakpoints (Desktop-First Override Order)

Since Tailwind is mobile-first by default, we write base classes for desktop and use **max-w** breakpoints to scale down.  
Read breakpoints top-to-bottom as: **base = desktop → scale down to mobile.**

```
2xl:  1536px+   (wide desktop)       → Full 120px+ typography, sweeping layouts
xl:   1280px+   (large desktop)      → Primary target. Full visual language intact.
lg:   1024px+   (laptop / desktop)   → Minimum desktop threshold. All scenes active.
md:   768px+    (tablet)             → Typography scales down. Columns remain.
sm:   640px+    (large phone)        → Single column. Reduced typography.
base: < 640px   (mobile)             → Maximum degradation. Brutalist but functional.
```

### Breakpoint Behavior Per Layout Type

**Home Hero (Landing)**

| Breakpoint | Layout |
|---|---|
| `lg+` (desktop) | Two-column: AI Core visual left, headline right |
| `md` (tablet) | Two columns remain, typography scales to 96px |
| `< md` (mobile) | Single column, stacked. Typography scales to 72px |

**Simulation Chamber (Questions)**

| Breakpoint | Layout |
|---|---|
| All breakpoints | Always single column, `max-w-2xl` centered |
| `< md` | Side padding reduced. Full viewport focus preserved. |

**Readiness Report (Two-Column Diagnostics)**

| Breakpoint | Layout |
|---|---|
| `lg+` | Two columns: CORE COMPETENCIES | CRITICAL VULNERABILITIES |
| `md` | Two columns remain, reduced font sizes |
| `< md` | Stacked single column. Each section full-width. |

**Navigation Overlay**

| Breakpoint | Behavior |
|---|---|
| All breakpoints | Full-screen icyBlue overlay. Retained at all sizes. |
| `< md` | Font sizes scale from 72px to 48px to remain edge-to-edge |

**Profile Page**

| Breakpoint | Behavior |
|---|---|
| `lg+` | Centered single column, `max-w-3xl`, architectural sidebar spacing |
| `< md` | Full-width, no padding gutters. No sidebar. |

### Typography Scaling Rules

```
Hero / Score (default 120px):
  2xl: text-[120px]
  xl:  text-[120px]
  lg:  text-[100px]
  md:  text-[80px]    (tablet)
  sm:  text-[72px]    (phone)

Headline (default 72px):
  lg:  text-7xl
  md:  text-6xl
  sm:  text-5xl

Scene Focus (default 48px):
  lg:  text-5xl
  md:  text-4xl
  sm:  text-3xl
```

On mobile, typography intentionally breaks standard "mobile safe-spacing" padding to maintain the brutalist, edge-to-edge editorial look. This is deliberate, not an oversight.

### Mobile Scene Behavior

The Readiness Score scene occupies the entirety of the mobile viewport. The user must scroll down to reach the textual verdict. This is architectural, not a bug.

---

## Final Design Goal

The user opens the application and immediately feels:

> **"This is serious. This is a premium flight simulator for my career."**
