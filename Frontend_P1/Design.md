```markdown
# AI Interview Coach — Design System & UI Specification
### Stack (Frontend): React + Redux Toolkit + JavaScript + Tailwind CSS
### Inspiration: Hubtown.co.in (cinematic scroll, massive editorial typography, one idea per viewport)

---
## Product Story

AI Interview Coach is a flight simulator for technical interviews.

Users arrive with a job description and leave with confidence.

The experience should feel like:

1. Preparing for an important interview
2. Sitting across from a senior engineer
3. Receiving honest but constructive feedback
4. Tracking measurable improvement over time

The application should prioritize focus and confidence over productivity dashboard aesthetics.

Every screen should reinforce one question:

"Am I ready for this interview?"

## Visual References

**Reference Website:**
https://hubtown.co.in

**Key inspiration elements:**
* Massive editorial typography
* Cinematic scrolling
* Large whitespace
* Premium card layouts
* Minimal navigation
* One concept per viewport
* Smooth transitions

---

## Design Vision

Build a premium, cinematic interview simulation platform.

Every screen should feel like entering a real technical interview environment — calm, focused, high-stakes. The aesthetic draws from Hubtown's storytelling scroll: **one bold idea per viewport**, large text that breathes, smooth transitions between states.

**The feeling:**
> "This is the closest thing to a real technical interview. Before the real interview."

**Personality words:**
* Cinematic
* Editorial
* Focused
* Premium
* Intelligent
* Trustworthy

**Avoid:**
* Gaming aesthetics
* Neon / gradient overload
* Cluttered dashboards
* Busy animations

---

## AI Personality

The AI interviewer should feel:
* Professional
* Encouraging
* Honest
* Senior Engineer level

**Avoid:**
* Overly robotic language
* Excessive praise
* Generic feedback

---

## Color System

```css
/* Tailwind custom config — tailwind.config.js */

colors: {
  background:   '#F8F8F6',   /* Off-white page bg */
  surface:      '#FFFFFF',   /* Cards, panels */
  border:       '#E5E7EB',   /* Dividers */

  ink:          '#111111',   /* Primary text, primary button */
  muted:        '#6B7280',   /* Secondary text, captions */
  faint:        '#F3F4F6',   /* Subtle fills, hover bg */

  ai:           '#2563EB',   /* AI accent — question cards, AI badge */
  score:        '#4F46E5',   /* Score ring, readiness % */
  success:      '#16A34A',   /* Strengths section */
  warning:      '#F59E0B',   /* Improvements section */
  danger:       '#DC2626',   /* Errors, low score */
}

```

**Usage rules:**

* Page backgrounds always use `background` (#F8F8F6) — never pure white


* Cards always use `surface` (#FFFFFF) with a `border` border


* The `ai` blue is reserved exclusively for AI-generated content indicators


* Black (`ink`) is the only button primary color — no colored primary buttons



---

## Typography



```css
/* Font: Inter — import in index.html */
/* Fallback: Plus Jakarta Sans */

font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;

```

### Scale (Tailwind classes)



| Role | Size | Weight | Class |
| --- | --- | --- | --- |
| Hero | 72px | 800 | `text-7xl font-extrabold` |
| H1 | 56px | 700 | `text-6xl font-bold` |
| H2 | 40px | 700 | `text-4xl font-bold` |
| H3 | 28px | 600 | `text-3xl font-semibold` |
| Body | 18px | 400 | `text-lg font-normal` |
| Small | 14px | 400 | `text-sm font-normal` |
| Caption | 12px | 400 | `text-xs font-normal` |

### Typography rules



* Headings: tight letter spacing (`tracking-tight`)


* Hero text: extra-tight (`tracking-tighter`)


* Body: `leading-relaxed` for comfortable reading


* Max reading width: `max-w-2xl` (800px)


* Never use decorative or display fonts



---

## Spacing System



```text
Section vertical padding:   py-28 (112px) md:py-36 (144px)
Card padding:               p-8 (32px)
Element gap:                gap-6 (24px)
Micro gap:                  gap-3 (12px)
Container max width:        max-w-7xl (1280px) with mx-auto px-6

```

---

## Component Library



### Buttons



```jsx
/* Primary — black pill */
<button className="bg-ink text-white px-8 py-3 rounded-full font-medium 
  hover:scale-[1.02] hover:opacity-90 transition-all duration-200">
  Start Mock Interview
</button>

/* Secondary — outlined */
<button className="border border-ink text-ink px-8 py-3 rounded-full font-medium
  hover:bg-faint transition-all duration-200">
  Watch Demo
</button>

/* Ghost */
<button className="text-muted hover:text-ink transition-colors duration-200">
  Skip
</button>

```

### Cards



```jsx
/* Standard card */
<div className="bg-surface border border-border rounded-2xl p-8
  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
</div>

/* AI-tagged card (used for question cards) */
<div className="bg-surface border border-ai/20 rounded-2xl p-8
  ring-1 ring-ai/10">
  <span className="text-xs font-medium text-ai bg-ai/10 px-2 py-1 rounded-full">
    AI Generated
  </span>
</div>

```

### Input / Textarea



```jsx
<textarea className="w-full bg-faint border border-border rounded-xl p-4
  text-ink placeholder:text-muted resize-none
  focus:outline-none focus:ring-2 focus:ring-ai/30 focus:border-ai/50
  transition-all duration-200">
</textarea>

```

### Badge



```jsx
/* Status badges */
<span className="text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success">
  Strong Answer
</span>
<span className="text-xs font-medium px-3 py-1 rounded-full bg-warning/10 text-warning">
  Needs Work
</span>

```

---

## Motion Philosophy

* Slow premium transitions
* Fade and reveal content
* Scroll-triggered animations
* Text reveal effects
* Cards lift subtly on hover

**Avoid:**

* Bounce animations
* Excessive parallax
* Flashy effects

### Micro-interactions



```css
/* Global transition defaults */
transition-all duration-200   /* hover states */
transition-all duration-300   /* page elements, modals */

/* Hover elevation */
hover:-translate-y-0.5 hover:shadow-md

/* Button press */
active:scale-[0.98]

/* Skeleton loader */
animate-pulse bg-faint rounded-xl

```

---

## Page Specifications



---

### 1. Home Page (`/`)



**Concept:** Hubtown-style cinematic scroll. One big idea per section. The new interview input lives front and center.

#### Section 1 — Hero (full viewport height)



```text
Layout: Two column on desktop, stacked on mobile
Left (55%): 
  - Eyebrow: small caps label "AI Interview Coach"
  - Hero headline (72px bold, tight):
      "Practice Before The 
       Interview That Matters."
  - Subtext (18px muted):
      "Turn any job description into a realistic 
       AI-powered technical interview and receive 
       detailed feedback instantly."
  - Two CTA buttons: [Start Mock Interview] [Watch Demo]

Right (45%):
  - The main interview input card (see below ↓)
  - Below it: 2–3 recent session cards in floating style

```

#### The Interview Input Card (Hero Right)



```text
Style: White card, rounded-2xl, soft shadow, border
  
Contents:
  - Label: "What role are you preparing for?"
  - Textarea: "Paste job description here..."
    (min-height: 160px, bg-faint, rounded-xl)
  - Row: [Upload JD button (ghost)] + [Generate Questions →]
  - AI thinking state (when loading):
      Animated dots + text: "Analyzing role requirements..."

```

#### Recent Session Cards (Floating Below Input)



```text
3 cards, slightly overlapping or offset vertically (floating style)
Each card:
  - Company / Role name
  - Score badge (e.g. 84/100 in score purple)
  - Date
  - Subtle hover lift
  - Width: ~280px, compact height
  
Label above: "Continue where you left off"

```

Tailwind layout for floating cards:

```jsx
<div className="relative mt-4 flex flex-col gap-2">
  
  <div className="bg-surface border border-border rounded-xl px-5 py-4
    hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
    flex justify-between items-center">
    <div>
      <p className="text-sm font-medium text-ink">Frontend Engineer @ Stripe</p>
      <p className="text-xs text-muted">2 days ago</p>
    </div>
    <span className="text-sm font-semibold text-score">84/100</span>
  </div>
</div>

```

#### Section 2 — Trust Metrics



```text
4 large number stats in a row:
  10,000+   Practice Sessions
  500+      Job Roles Supported
  < 5s      Question Generation
  Instant   AI Feedback

Style: Large number in 56px bold ink, label in 14px muted below
Divider lines between each stat

```

#### Section 3 — How It Works



```text
Hubtown-style: 3 large numbered steps, one per row, very spacious

01  Paste Job Description
    Upload or paste the target role's JD.

02  Take the Interview
    Answer AI-generated technical questions.

03  Get Detailed Feedback
    Receive scoring, strengths, and improvement tips.

Typography: Step number in 120px ultra-light gray (decorative)
            Title in 40px bold
            Body in 18px muted

```

#### Section 4 — Feature Grid



```text
2x2 card grid, generous gap

1. Dynamic Question Generation
   "Questions built from actual job requirements — not generic lists."

2. AI Evaluation Engine
   "Expert-level analysis on every answer you submit."

3. Readiness Scoring
   "Know your interview preparedness with a precise readiness score."

4. Session History
   "Track your growth across multiple practice sessions."

Card style: white, border, rounded-2xl, p-8
Icon: Simple line icon (Heroicons outline) top-left

```

---

### 2. Login Page (`/login`)



```text
Layout: Centered card on background

Card: max-w-md, centered, white, rounded-2xl, p-10, border

Contents:
  - Logo / wordmark top center
  - H2: "Welcome back."
  - Subtext: "Sign in to continue your interview prep."
  - Email input
  - Password input
  - [Sign In] button (full width, black pill)
  - Divider: "or"
  - [Continue with Google] (outlined, full width)
  - Footer: "Don't have an account? Sign up"

Minimal. No sidebars. No imagery.

```

---

### Dashboard (/dashboard)
```text

Hero Section:
- Welcome back, {User Name}- Current readiness score
- Resume last interview button

Recent Sessions:
- Horizontal cards
- Score badges
- Quick resume

Performance Snapshot:
- Average score
- Interviews completed
- Improvement trend

Recommended Practice:
- React
- Spring Boot
- System Design

Primary CTA:
[Start New Mock Interview]
---
```
### 4. Questions Page (`/interview/:sessionId`)



Most important screen. Maximum focus.

```text
Layout: Centered single column, max-w-2xl, no sidebar
Background: #F8F8F6 (slightly off-white — feels like an exam room)

Top bar:
  - Left: Logo (small, minimal)
  - Center: Progress bar (thin, full width, ai blue fill)
    "Question 3 of 8"
  - Right: Timer (if enabled) + [End Session] ghost button

Main Question Card:
  - AI badge: "AI Generated"
  - Question number: "03 / 08" in large muted type
  - Question text: H2 size (40px), bold, ink color
  - Difficulty badge: Easy / Medium / Hard
  - Estimated time: "~3 min"

Answer Area:
  - Large textarea, bg-faint, rounded-xl
  - Placeholder: "Type your answer here..."
  - Bottom row:
      Left: Character count (text-xs muted)
      Right: Autosave indicator ("Saved ✓" in success green)

Action row:
  - [← Previous] ghost
  - [Submit Answer →] black pill (primary)

Loading state (between questions):
  - Skeleton card pulse animation
  - "Preparing next question..." text

```

---

### 5. Feedback Page (`/feedback/:sessionId`)



```text
Layout: max-w-3xl centered

Score Header:
  - Large circular score ring (SVG, animated reveal on mount)
    e.g. 84 / 100 in center
    Ring color: score purple (#4F46E5)
  - Below: "Interview Readiness Score"
  - Sub-label: "Based on 8 answers evaluated"

Two highlight cards side by side:
  Left — Strengths (green tinted)
    Border: success/30
    Background: success/5
    Bullet list of strengths

  Right — Improvements (amber tinted)
    Border: warning/30
    Background: warning/5
    Bullet list of improvements

Per-Question Accordion:
  - Each row: Question text + score badge
  - Expanded: Full AI feedback text
  - Alternating subtle bg for readability

Actions:
  - [Start New Interview] — black pill
  - [Back to Dashboard] — outlined

```

---

### 6. Analytics Page (`/analytics`)

**Key Analytics Modules:**

* Skill Radar
* Score Trend
* Weak Areas
* Strong Areas
* Interview History

---

### 7. Profile Page (`/profile`)



```text
Layout: Sidebar (280px) + main content

Sidebar:
  - User avatar + name
  - Navigation:
      Dashboard
      New Interview
      Sessions
      Analytics
      Profile Settings

Main content — one main section:

1. Profile Settings & Account Data:
   Update email, password, and preferences.

```

*(Note: Elements related to tracking have been migrated to the dedicated Analytics Page.)*

---
## Route Map

### Public Routes (no auth required)
| Route      | Page       | Component File        |
|------------|------------|-----------------------|
| `/`        | Home       | `pages/Home.jsx`      |
| `/login`   | Login      | `pages/Login.jsx`     |

### Protected Routes (auth required)
| Route                      | Page       | Component File          |
|----------------------------|------------|-------------------------|
| `/dashboard`               | Dashboard  | `pages/Dashboard.jsx`   |
| `/interview/:sessionId`    | Questions  | `pages/Interview.jsx`   |
| `/feedback/:sessionId`     | Feedback   | `pages/Feedback.jsx`    |
| `/analytics`               | Analytics  | `pages/Analytics.jsx`   |
| `/profile`                 | Profile    | `pages/Profile.jsx`     |

### Redirect Rules
- Unauthenticated user hits `/dashboard` → redirect to `/login`
- Authenticated user hits `/login` → redirect to `/dashboard`
- Unknown route → 404 page (`pages/NotFound.jsx`)

### React Router Setup (App.jsx)
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Wrapper for protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/interview/:sessionId" element={
          <ProtectedRoute><Interview /></ProtectedRoute>
        } />
        <Route path="/feedback/:sessionId" element={
          <ProtectedRoute><Feedback /></ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute><Analytics /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Sidebar Navigation Config
```js
// Used to render sidebar links dynamically
export const NAV_LINKS = [
  { label: 'Dashboard',     path: '/dashboard',  icon: 'LayoutDashboard' },
  { label: 'New Interview', path: '/',            icon: 'Plus'            },
  { label: 'Analytics',     path: '/analytics',  icon: 'BarChart2'       },
  { label: 'Profile',       path: '/profile',    icon: 'User'            },
]
```
----

## Loading States



```jsx
/* Skeleton loader — use for question cards, session list */
<div className="animate-pulse space-y-3">
  <div className="h-6 bg-faint rounded w-3/4"></div>
  <div className="h-4 bg-faint rounded w-1/2"></div>
</div>

/* AI thinking state — use during question generation / evaluation */
<div className="flex items-center gap-3 text-muted text-sm">
  <span className="flex gap-1">
    <span className="w-1.5 h-1.5 bg-ai rounded-full animate-bounce [animation-delay:0ms]"></span>
    <span className="w-1.5 h-1.5 bg-ai rounded-full animate-bounce [animation-delay:150ms]"></span>
    <span className="w-1.5 h-1.5 bg-ai rounded-full animate-bounce [animation-delay:300ms]"></span>
  </span>
  Analyzing your answers...
</div>

```

---

## Empty States



```text
Style: Centered in content area, max-w-sm

Icon: Simple line illustration (SVG)
Headline: "No sessions yet."
Subtext: "Start your first AI interview and track your progress here."
CTA: [Start Interview] black pill button

```

---

## Page Transitions



```javascript
/* Use Framer Motion or simple CSS transitions */

Page enter:
  opacity: 0 → 1
  translateY: 12px → 0
  duration: 300ms
  easing: ease-out

Page exit:
  opacity: 1 → 0
  duration: 200ms

```

---

## Responsive Breakpoints



```text
Mobile first. Tailwind default breakpoints:

sm:   640px+   (large phone)
md:   768px+   (tablet)
lg:   1024px+  (desktop)
xl:   1280px+  (large desktop)
2xl:  1536px+  (wide)

Home hero: 2-column on lg+, stacked on mobile
Questions: Always single column, max-w-2xl centered
Profile: Sidebar hidden on mobile (hamburger menu)

```

---

## Tailwind Config Summary



```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F8F6',
        surface:    '#FFFFFF',
        border:     '#E5E7EB',
        ink:        '#111111',
        muted:      '#6B7280',
        faint:      '#F3F4F6',
        ai:         '#2563EB',
        score:      '#4F46E5',
        success:    '#16A34A',
        warning:    '#F59E0B',
        danger:     '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      maxWidth: {
        'reading': '800px',
      },
    },
  },
  plugins: [],
}

```

---
## Visual References

Reference Images:
- hubtown-hero.png
<img width="1881" height="1037" alt="image" src="https://github.com/user-attachments/assets/50b9a1e2-494d-4ba1-a77a-f6828c6d38e2" />

- hubtown-typography.png
- hubtown-cards.png
- hubtown-navigation.png

Use these images as visual inspiration for:
- Typography scale
- Spacing
- Layout composition
- Motion design
- Card styling

----
## Design Checklist (before each screen)



* [ ] Does the page have one clear primary action?


* [ ] Is there enough whitespace — does it breathe?


* [ ] Is the AI-generated content clearly labeled with the `ai` blue badge?


* [ ] Do all loading states have skeleton or thinking animations?


* [ ] Is the max reading width capped at `max-w-2xl` for text-heavy areas?


* [ ] Are hover states smooth (200ms transition)?


* [ ] Does the mobile layout collapse cleanly?



---

## Final Design Goal



The user opens the app and immediately feels:
"This is serious. This is going to prepare me."

Not playful. Not casual. Not a quiz app.
A focused, premium simulation of the real thing.

```

```
