# AI Interview Coach — Frontend Architecture Specification
### Stack: React + Redux Toolkit + React Router DOM + Tailwind CSS + Axios
### Document Type: Engineering Architecture (Implementation-Ready)

> This document is the engineering counterpart to `DESIGN.md`.  
> It defines **how** the application is built — not how it looks.  
> Do not add visual design decisions here. Reference `DESIGN.md` for those.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Folder Structure](#2-folder-structure)
3. [Routing Architecture](#3-routing-architecture)
4. [Redux Architecture](#4-redux-architecture)
5. [API Layer Architecture](#5-api-layer-architecture)
6. [Authentication Flow](#6-authentication-flow)
7. [Interview Session Architecture](#7-interview-session-architecture)
8. [Data Models](#8-data-models)
9. [Component Architecture](#9-component-architecture)
10. [Feature Module Structure](#10-feature-module-structure)
11. [State Management Rules](#11-state-management-rules)
12. [Performance Strategy](#12-performance-strategy)
13. [Error Handling Strategy](#13-error-handling-strategy)
14. [Security Considerations](#14-security-considerations)
15. [Future Scalability](#15-future-scalability)
16. [Development Standards](#16-development-standards)
17. [Environment Variables](#17-environment-variables)
18. [Testing Strategy](#18-testing-strategy)
19. [Build Order](#19-build-order)
---

## 1. High-Level Architecture

### Application Layers

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
├─────────────────────────────────────────────────────────────┤
│  PRESENTATION LAYER                                         │
│  pages/ + components/ + layouts/                            │
│  React components. Renders UI. Dispatches actions.          │
├─────────────────────────────────────────────────────────────┤
│  STATE LAYER                                                │
│  store/ (Redux Toolkit)                                     │
│  Single source of truth. Drives all UI state.               │
├─────────────────────────────────────────────────────────────┤
│  SERVICE LAYER                                              │
│  services/ (Axios)                                          │
│  All API communication. Abstracts HTTP from components.     │
├─────────────────────────────────────────────────────────────┤
│  ROUTING LAYER                                              │
│  routes/ (React Router DOM)                                 │
│  Declarative route definitions. Route guards. Navigation.   │
├─────────────────────────────────────────────────────────────┤
│  UTILITY LAYER                                              │
│  hooks/ + utils/ + constants/                               │
│  Reusable logic. Helpers. App-wide constants.               │
└─────────────────────────────────────────────────────────────┘
         │
         │ HTTP (Axios)
         ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND API (Spring Boot)                                  │
│  JWT Auth + Interview Engine + Report Generation            │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction
      │
      ▼
React Component (dispatches action or calls hook)
      │
      ▼
Redux Thunk (async) → Service Layer (Axios) → Backend API
      │                                              │
      │                      Response ◄─────────────┘
      ▼
Redux Slice (updates state)
      │
      ▼
React Component re-renders (via useSelector)
```

### State Flow

```
Component
  │  useSelector(state => state.feature.data)   ← READ
  │  dispatch(action())                          ← WRITE
  ▼
Redux Store
  ├── auth
  ├── interview
  ├── report
  ├── analytics
  ├── profile
  └── ui
```

### Component Hierarchy

```
App
├── BrowserRouter
│   ├── PublicLayout
│   │   ├── Landing
│   │   └── Login
│   └── ProtectedLayout
│       ├── NavigationOverlay (global, portal-mounted)
│       ├── Simulation/:sessionId
│       ├── Report/:sessionId
│       ├── Analytics
│       ├── Archive
│       └── Profile
```

---

## 2. Folder Structure

```
src/
│
├── app/                          # App bootstrap
│   ├── App.jsx                   # Root component, router, providers
│   ├── store.js                  # Redux store configuration
│   └── rootReducer.js            # Combined slice reducers
│
├── routes/                       # Routing definitions
│   ├── index.jsx                 # All route declarations
│   ├── ProtectedRoute.jsx        # Auth guard wrapper
│   └── PublicRoute.jsx           # Redirect if already logged in
│
├── pages/                        # Page-level components (one per route)
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Simulation.jsx
│   ├── Report.jsx
│   ├── Analytics.jsx
│   ├── Archive.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── features/                     # Feature modules (Redux slice + logic)
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── authThunks.js
│   │   └── authSelectors.js
│   ├── interview/
│   │   ├── interviewSlice.js
│   │   ├── interviewThunks.js
│   │   └── interviewSelectors.js
│   ├── report/
│   │   ├── reportSlice.js
│   │   ├── reportThunks.js
│   │   └── reportSelectors.js
│   ├── analytics/
│   │   ├── analyticsSlice.js
│   │   ├── analyticsThunks.js
│   │   └── analyticsSelectors.js
│   ├── profile/
│   │   ├── profileSlice.js
│   │   ├── profileThunks.js
│   │   └── profileSelectors.js
│   └── ui/
│       └── uiSlice.js
│
├── components/                   # Shared UI components
│   ├── common/                   # Truly global (Button, Input, Modal)
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── AiCompilingLoader.jsx
│   ├── navigation/               # Nav-specific components
│   │   ├── NavigationOverlay.jsx
│   │   └── MenuTrigger.jsx
│   ├── simulation/               # Simulation-specific UI components
│   │   ├── QuestionPanel.jsx
│   │   ├── AnswerTextarea.jsx
│   │   ├── ProgressBar.jsx
│   │   └── SimulationTimer.jsx
│   ├── report/                   # Report-specific UI components
│   │   ├── MacroVerdict.jsx
│   │   ├── DiagnosticsPanel.jsx
│   │   ├── QuestionBreakdown.jsx
│   │   └── TerminusActions.jsx
│   ├── analytics/
│   │   ├── SkillRadar.jsx
│   │   ├── ScoreTrendLine.jsx
│   │   ├── AreasEditorialSplit.jsx
│   │   ├── InterviewHistoryTimeline.jsx
│   │   └── ReadinessEvolution.jsx
│   └── archive/
│       └── ArchiveTimeline.jsx
│
├── layouts/                      # Layout wrappers
│   ├── AbyssLayout.jsx           # Dark environment wrapper
│   ├── IcyBlueLayout.jsx         # Light environment wrapper
│   └── SimulationLayout.jsx      # Focused simulation wrapper (no nav)
│
├── services/                     # All API communication (Axios)
│   ├── axiosInstance.js          # Configured Axios instance, interceptors
│   ├── authService.js
│   ├── interviewService.js
│   ├── reportService.js
│   ├── analyticsService.js
│   └── profileService.js
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.js
│   ├── useInterview.js
│   ├── useReport.js
│   ├── useScrollReveal.js        # Scroll-triggered animation hook
│   ├── useTimer.js               # Simulation countdown hook
│   └── useNavigationOverlay.js
│
├── utils/                        # Pure utility functions
│   ├── tokenUtils.js             # JWT decode, expiry check
│   ├── dateUtils.js
│   ├── scoreUtils.js             # Score formatting helpers
│   └── errorUtils.js
│
├── constants/                    # App-wide constants
│   ├── routes.js                 # Route path strings
│   ├── apiEndpoints.js           # All API endpoint strings
│   ├── interviewConstants.js     # Difficulty levels, durations, domains
│   └── errorMessages.js
│
└── assets/                       # Static files
    ├── fonts/
    └── icons/
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Bootstrap: store setup, root provider, router mount |
| `routes/` | Route declarations and auth guards only. No UI logic. |
| `pages/` | One file per route. Orchestrates feature components. No business logic. |
| `features/` | Redux slices, thunks, selectors. One sub-folder per domain. |
| `components/` | Reusable UI components. No direct API calls. No Redux dispatch. |
| `layouts/` | Environment wrappers (abyss/icy). Handle menu trigger mounting. |
| `services/` | All Axios calls. One file per domain. Returns raw responses. |
| `hooks/` | Encapsulates stateful logic. Connects Redux + components cleanly. |
| `utils/` | Pure functions. No side effects. Fully testable. |
| `constants/` | All magic strings and enums. Never hard-code in components. |

---

## 3. Routing Architecture

### Route Definitions (`routes/index.jsx`)

```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import LoadingScreen from '../components/common/LoadingScreen'
import { ROUTES } from '../constants/routes'

// Lazy-loaded pages
const Landing    = lazy(() => import('../pages/Landing'))
const Login      = lazy(() => import('../pages/Login'))
const Simulation = lazy(() => import('../pages/Simulation'))
const Report     = lazy(() => import('../pages/Report'))
const Analytics  = lazy(() => import('../pages/Analytics'))
const Archive    = lazy(() => import('../pages/Archive'))
const Profile    = lazy(() => import('../pages/Profile'))
const NotFound   = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* Public Routes */}
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.LOGIN}   element={
          <PublicRoute><Login /></PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path={ROUTES.SIMULATION} element={
          <ProtectedRoute><Simulation /></ProtectedRoute>
        } />
        <Route path={ROUTES.REPORT} element={
          <ProtectedRoute><Report /></ProtectedRoute>
        } />
        <Route path={ROUTES.ANALYTICS} element={
          <ProtectedRoute><Analytics /></ProtectedRoute>
        } />
        <Route path={ROUTES.ARCHIVE} element={
          <ProtectedRoute><Archive /></ProtectedRoute>
        } />
        <Route path={ROUTES.PROFILE} element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  )
}
```

### Route Constants (`constants/routes.js`)

```js
export const ROUTES = {
  LANDING:    '/',
  LOGIN:      '/login',
  SIMULATION: '/simulation/:sessionId',
  REPORT:     '/report/:sessionId',
  ANALYTICS:  '/analytics',
  ARCHIVE:    '/archive',
  PROFILE:    '/profile',
}

// Builder helpers for dynamic routes
export const buildSimulationRoute = (sessionId) => `/simulation/${sessionId}`
export const buildReportRoute     = (sessionId) => `/report/${sessionId}`
```

### ProtectedRoute (`routes/ProtectedRoute.jsx`)

```jsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuthenticated, selectAuthLoading } from '../features/auth/authSelectors'
import LoadingScreen from '../components/common/LoadingScreen'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading       = useSelector(selectAuthLoading)
  const location        = useLocation()

  // Wait for session recovery check to complete
  if (isLoading) return <LoadingScreen />

  if (!isAuthenticated) {
    // Preserve intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

### PublicRoute (`routes/PublicRoute.jsx`)

```jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../features/auth/authSelectors'

// Prevents authenticated users from accessing /login
export default function PublicRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? <Navigate to="/" replace /> : children
}
```

### Navigation Flow

```
User visits /simulation/abc123
      │
      ▼
ProtectedRoute checks selectIsAuthenticated
      │
      ├── isLoading: true  → render <LoadingScreen />
      ├── authenticated    → render <Simulation />
      └── not authenticated → <Navigate to="/login" state={{ from: /simulation/abc123 }} />

User logs in successfully
      │
      ▼
authThunk sets isAuthenticated: true
      │
      ▼
Login page reads location.state.from → navigates to /simulation/abc123
```

---

## 4. Redux Architecture

### Store Configuration (`app/store.js`)

```js
import { configureStore } from '@reduxjs/toolkit'
import authReducer      from '../features/auth/authSlice'
import interviewReducer from '../features/interview/interviewSlice'
import reportReducer    from '../features/report/reportSlice'
import analyticsReducer from '../features/analytics/analyticsSlice'
import profileReducer   from '../features/profile/profileSlice'
import uiReducer        from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth:      authReducer,
    interview: interviewReducer,
    report:    reportReducer,
    analytics: analyticsReducer,
    profile:   profileReducer,
    ui:        uiReducer,
  },
})
```

---

### authSlice

```js
// State Shape
{
  user:            null,     // { id, name, email, avatarUrl }
  token:           null,     // JWT access token (memory only — NOT localStorage)
  isAuthenticated: false,
  isLoading:       false,    // true during session recovery or login
  error:           null,
}

// Actions
authSlice.actions.setCredentials({ user, token })
authSlice.actions.clearCredentials()
authSlice.actions.setAuthLoading(boolean)

// Async Thunks
loginThunk(credentials)         → POST /auth/login
logoutThunk()                   → POST /auth/logout
recoverSessionThunk()           → GET  /auth/me (using httpOnly cookie)
```

---

### interviewSlice

```js
// State Shape
{
  sessionId:          null,
  jobDescription:     '',
  questions:          [],    // Array<Question>
  currentIndex:       0,
  answers:            {},    // { [questionId]: string }
  status:             'idle',  // 'idle' | 'creating' | 'active' | 'submitting' | 'complete'
  totalQuestions:     0,
  elapsedSeconds:     0,
  error:              null,
}

// Actions
interviewSlice.actions.setJobDescription(string)
interviewSlice.actions.setCurrentIndex(number)
interviewSlice.actions.saveAnswer({ questionId, answer })
interviewSlice.actions.resetInterview()
interviewSlice.actions.tickTimer()

// Async Thunks
createInterviewThunk(jobDescription)            → POST /interviews
fetchQuestionsThunk(sessionId)                  → GET  /interviews/:sessionId/questions
submitAnswerThunk({ sessionId, questionId, answer }) → POST /interviews/:sessionId/answers
completeInterviewThunk(sessionId)               → POST /interviews/:sessionId/complete
```

---

### reportSlice

```js
// State Shape
{
  sessionId:       null,
  report:          null,    // Report object (see Data Models)
  isLoading:       false,
  isExporting:     false,
  error:           null,
}

// Actions
reportSlice.actions.clearReport()

// Async Thunks
fetchReportThunk(sessionId)    → GET  /reports/:sessionId
exportReportThunk(sessionId)   → GET  /reports/:sessionId/export (triggers download)
```

---

### analyticsSlice

```js
// State Shape
{
  skillRadar:          null,   // { [skill]: score }
  scoreTrend:          [],     // Array<{ date, score }>
  strongAreas:         [],     // Array<string>
  weakAreas:           [],     // Array<string>
  interviewHistory:    [],     // Array<ArchiveEntry>
  readinessEvolution:  null,   // AI-generated narrative string
  isLoading:           false,
  error:               null,
}

// Async Thunks
fetchAnalyticsThunk()    → GET /analytics
```

---

### profileSlice

```js
// State Shape
{
  preferences: {
    preferredDuration:    30,        // minutes
    preferredDifficulty:  'medium',  // 'easy' | 'medium' | 'hard'
    preferredDomains:     [],        // Array<string>
  },
  notifications: {
    emailNotifications:  true,
    reportNotifications: true,
  },
  isSaving:  false,
  error:     null,
}

// Async Thunks
fetchProfileThunk()             → GET  /profile
updateProfileThunk(profileData) → PUT  /profile
exportAccountDataThunk()        → GET  /profile/export
deleteAccountThunk()            → DELETE /profile
```

---

### uiSlice

```js
// State Shape
{
  isNavOverlayOpen: false,
  isAiCompiling:    false,   // True when AI is generating content
  globalError:      null,    // { message, type } — surface-level error state
  toast:            null,    // { message, type } — ephemeral notification
}

// Actions
uiSlice.actions.openNavOverlay()
uiSlice.actions.closeNavOverlay()
uiSlice.actions.setAiCompiling(boolean)
uiSlice.actions.setGlobalError({ message, type })
uiSlice.actions.clearGlobalError()
uiSlice.actions.showToast({ message, type })
uiSlice.actions.clearToast()
```

---

## 5. API Layer Architecture

### Axios Instance (`services/axiosInstance.js`)

```js
import axios from 'axios'
import { store } from '../app/store'
import { clearCredentials } from '../features/auth/authSlice'

const axiosInstance = axios.create({
  baseURL:         import.meta.env.VITE_API_BASE_URL,
  timeout:         15000,
  withCredentials: true,  // Required for httpOnly cookie (refresh token)
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach Bearer token from Redux store
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearCredentials())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
```

---

### authService.js

```js
import axiosInstance from './axiosInstance'
import { API } from '../constants/apiEndpoints'

export const authService = {
  login:           (credentials) => axiosInstance.post(API.AUTH.LOGIN, credentials),
  logout:          ()            => axiosInstance.post(API.AUTH.LOGOUT),
  getMe:           ()            => axiosInstance.get(API.AUTH.ME),
  refreshToken:    ()            => axiosInstance.post(API.AUTH.REFRESH),
}
```

### interviewService.js

```js
export const interviewService = {
  createInterview:  (jobDescription) => axiosInstance.post(API.INTERVIEWS.CREATE, { jobDescription }),
  getQuestions:     (sessionId)      => axiosInstance.get(API.INTERVIEWS.QUESTIONS(sessionId)),
  submitAnswer:     (sessionId, questionId, answer) =>
                      axiosInstance.post(API.INTERVIEWS.SUBMIT_ANSWER(sessionId), { questionId, answer }),
  completeInterview:(sessionId)      => axiosInstance.post(API.INTERVIEWS.COMPLETE(sessionId)),
}
```

### reportService.js

```js
export const reportService = {
  getReport:    (sessionId) => axiosInstance.get(API.REPORTS.GET(sessionId)),
  exportReport: (sessionId) => axiosInstance.get(API.REPORTS.EXPORT(sessionId), { responseType: 'blob' }),
}
```

### analyticsService.js

```js
export const analyticsService = {
  getAnalytics: () => axiosInstance.get(API.ANALYTICS.GET),
}
```

### profileService.js

```js
export const profileService = {
  getProfile:       ()            => axiosInstance.get(API.PROFILE.GET),
  updateProfile:    (data)        => axiosInstance.put(API.PROFILE.UPDATE, data),
  exportData:       ()            => axiosInstance.get(API.PROFILE.EXPORT, { responseType: 'blob' }),
  deleteAccount:    ()            => axiosInstance.delete(API.PROFILE.DELETE),
}
```

### API Endpoint Constants (`constants/apiEndpoints.js`)

```js
export const API = {
  AUTH: {
    LOGIN:   '/auth/login',
    LOGOUT:  '/auth/logout',
    ME:      '/auth/me',
    REFRESH: '/auth/refresh',
  },
  INTERVIEWS: {
    CREATE:        '/interviews',
    QUESTIONS:     (id) => `/interviews/${id}/questions`,
    SUBMIT_ANSWER: (id) => `/interviews/${id}/answers`,
    COMPLETE:      (id) => `/interviews/${id}/complete`,
  },
  REPORTS: {
    GET:    (id) => `/reports/${id}`,
    EXPORT: (id) => `/reports/${id}/export`,
  },
  ANALYTICS: {
    GET: '/analytics',
  },
  PROFILE: {
    GET:    '/profile',
    UPDATE: '/profile',
    EXPORT: '/profile/export',
    DELETE: '/profile',
  },
}
```

---

## 6. Authentication Flow

### Login Flow

```
User submits credentials on /login
      │
      ▼
dispatch(loginThunk({ email, password }))
      │
      ▼
authService.login(credentials)
      │
      ├── Success: Backend returns { accessToken, user }
      │     │
      │     ▼
      │   dispatch(setCredentials({ token, user }))
      │   token stored in Redux memory only (never localStorage)
      │   httpOnly refresh cookie set by backend automatically
      │     │
      │     ▼
      │   navigate to location.state.from ?? '/'
      │
      └── Failure: dispatch(setAuthError(message))
                   render error state on Login page
```

### JWT Storage Strategy

| Token | Storage | Reason |
|---|---|---|
| Access Token (short-lived) | Redux memory only | Never exposed to `localStorage` — XSS protection |
| Refresh Token (long-lived) | httpOnly Cookie (set by backend) | Inaccessible to JavaScript. CSRF-safe with SameSite=Strict |

**Rule:** The frontend never manually stores tokens in `localStorage` or `sessionStorage`. This is non-negotiable.

### Session Recovery Flow

```
App mounts (App.jsx)
      │
      ▼
dispatch(recoverSessionThunk())
      │
      ▼
authService.getMe()  ← Uses httpOnly cookie automatically
      │
      ├── Success: user still has valid session
      │     dispatch(setCredentials({ token, user }))
      │     setAuthLoading(false)
      │
      └── Failure: session expired or no cookie
            dispatch(clearCredentials())
            setAuthLoading(false)
            ProtectedRoute will redirect to /login
```

### Logout Flow

```
User triggers logout
      │
      ▼
dispatch(logoutThunk())
      │
      ▼
authService.logout()  ← Backend clears httpOnly cookie
      │
      ▼
dispatch(clearCredentials())  ← Wipes token from Redux
      │
      ▼
navigate('/login')
```

---

## 7. Interview Session Architecture

### Full Session Flow

```
1. JOB DESCRIPTION SUBMISSION
───────────────────────────────────────────────────────────
User pastes Job Description on Landing page
      │
      ▼
dispatch(setJobDescription(text))
dispatch(createInterviewThunk(jobDescription))
      │
      ▼
POST /interviews → Backend returns { sessionId }
      │
      ▼
navigate(buildSimulationRoute(sessionId))


2. QUESTION RETRIEVAL
───────────────────────────────────────────────────────────
Simulation.jsx mounts with sessionId from URL params
      │
      ▼
dispatch(fetchQuestionsThunk(sessionId))
      │
      ▼
GET /interviews/:sessionId/questions
      │
      ▼
interviewSlice stores questions[], sets currentIndex: 0
      │
      ▼
QuestionPanel renders questions[currentIndex]


3. ANSWER SUBMISSION (Per Question)
───────────────────────────────────────────────────────────
User types answer → dispatch(saveAnswer({ questionId, answer }))
User clicks SUBMIT RESPONSE
      │
      ▼
dispatch(submitAnswerThunk({ sessionId, questionId, answer }))
      │
      ▼
POST /interviews/:sessionId/answers
      │
      ▼
ui: setAiCompiling(true) → AiCompilingLoader renders
      │
      ▼
Backend ACKs receipt (does not block on AI evaluation)
      │
      ▼
dispatch(setCurrentIndex(currentIndex + 1))
ui: setAiCompiling(false)


4. INTERVIEW COMPLETION
───────────────────────────────────────────────────────────
currentIndex === totalQuestions (last answer submitted)
      │
      ▼
dispatch(completeInterviewThunk(sessionId))
      │
      ▼
POST /interviews/:sessionId/complete
Backend triggers AI evaluation of all answers
      │
      ▼
navigate(buildReportRoute(sessionId))


5. REPORT GENERATION
───────────────────────────────────────────────────────────
Report.jsx mounts with sessionId from URL params
      │
      ▼
dispatch(fetchReportThunk(sessionId))
      │
      ▼
GET /reports/:sessionId
      │
      ├── Report ready: render full report
      └── Still generating: poll every 3 seconds until ready
            (or Backend uses webhook/SSE — preferred for future)
```

### Interview State Lifecycle

```
'idle'
  │ createInterviewThunk called
  ▼
'creating'
  │ sessionId returned, questions fetched
  ▼
'active'
  │ submitting an answer
  ▼
'submitting'
  │ answer ACKed, move to next question
  ▼
'active'  (repeats until last answer)
  │ completeInterviewThunk called
  ▼
'complete'
  │ navigate to report
  ▼
'idle' (after report viewed, interview reset)
```

---

## 8. Data Models

All models are defined as TypeScript-style interfaces for documentation clarity. Implementation is in JavaScript.

```typescript
// ─── User ───────────────────────────────────────────────────
interface User {
  id:        string
  name:      string
  email:     string
  avatarUrl: string | null
  createdAt: string   // ISO 8601
}

// ─── Interview Session ──────────────────────────────────────
interface InterviewSession {
  sessionId:      string
  userId:         string
  jobDescription: string
  status:         'created' | 'active' | 'complete' | 'evaluated'
  totalQuestions: number
  startedAt:      string   // ISO 8601
  completedAt:    string | null
}

// ─── Question ────────────────────────────────────────────────
interface Question {
  questionId:   string
  sessionId:    string
  sequenceNo:   number       // 1-based display number
  text:         string
  category:     string       // e.g., "DSA", "System Design", "Behavioral"
}

// ─── Answer ──────────────────────────────────────────────────
interface Answer {
  answerId:   string
  questionId: string
  sessionId:  string
  text:       string
  submittedAt: string   // ISO 8601
}

// ─── Report ──────────────────────────────────────────────────
interface Report {
  sessionId:          string
  overallScore:       number          // 0–100
  verdictSummary:     string          // One-paragraph AI summary
  strengths:          string[]        // Core competencies list
  vulnerabilities:    string[]        // Critical weaknesses list
  questionBreakdowns: QuestionBreakdown[]
  generatedAt:        string          // ISO 8601
}

interface QuestionBreakdown {
  questionId:       string
  sequenceNo:       number
  questionText:     string
  score:            number    // e.g., 9 (out of 10)
  aiEvaluation:     string    // What was done right/wrong
  correctiveAction: string    // How to improve
}

// ─── Analytics ───────────────────────────────────────────────
interface Analytics {
  skillRadar: Record<string, number>     // { "React": 85, "DSA": 72, ... }
  scoreTrend: ScoreTrendPoint[]
  strongAreas: string[]
  weakAreas:   string[]
  interviewHistory: ArchiveEntry[]
  readinessEvolution: string             // AI-generated narrative
}

interface ScoreTrendPoint {
  date:  string   // ISO 8601 date
  score: number
}

// ─── Archive Entry ────────────────────────────────────────────
interface ArchiveEntry {
  sessionId:     string
  date:          string     // ISO 8601
  role:          string     // Extracted from job description
  company:       string     // Extracted from job description
  score:         number
  status:        'evaluated' | 'pending'
}

// ─── Profile ─────────────────────────────────────────────────
interface Profile {
  user:          User
  preferences:   UserPreferences
  notifications: NotificationSettings
}

interface UserPreferences {
  preferredDuration:    number    // minutes: 30 | 45 | 60
  preferredDifficulty:  'easy' | 'medium' | 'hard'
  preferredDomains:     string[]
}

interface NotificationSettings {
  emailNotifications:  boolean
  reportNotifications: boolean
}
```

---

## 9. Component Architecture

### Component Responsibility Rules

- **Page components** (`pages/`) — Orchestrate layout, dispatch initial data fetches, read top-level Redux state. No direct API calls. No presentation logic beyond layout.
- **Feature components** (`components/simulation/`, etc.) — Tied to a specific feature domain. Receive data via props or `useSelector`. Dispatch actions.
- **Common components** (`components/common/`) — Fully generic. Accept only props. Zero Redux dependencies. Zero business logic.

---

### Common Components

**Button.jsx**
```jsx
// Props: variant ('primary' | 'secondary' | 'editorial' | 'ghost'), label, onClick, disabled, isLoading
// Renders the correct button variant from DESIGN.md
// isLoading prop swaps label for a minimal spinner
```

**Input.jsx**
```jsx
// Props: value, onChange, placeholder, type, hasError, errorMessage
// Renders borderless architectural input matching DESIGN.md
```

**AiCompilingLoader.jsx**
```jsx
// No props — reads uiSlice.isAiCompiling from Redux
// Renders the full-screen pulsating neural core loader
```

**LoadingScreen.jsx**
```jsx
// No props — used by Suspense fallback during lazy route loading
// Renders minimal full-screen dark background
```

**Modal.jsx**
```jsx
// Props: isOpen, onClose, children
// Portal-mounted. Backdrop click closes. Escape key closes.
// Used for: confirm delete account, confirm logout, etc.
```

---

### Navigation Components

**MenuTrigger.jsx**
```jsx
// Floating [ MENU ] text. Fixed positioned, top-right.
// Dispatches uiSlice.actions.openNavOverlay()
// Rendered inside AbyssLayout and IcyBlueLayout
```

**NavigationOverlay.jsx**
```jsx
// Reads uiSlice.isNavOverlayOpen
// Full-screen icyBlue overlay (as per DESIGN.md)
// Renders 4 nav items with hover dimming behavior
// Dispatches closeNavOverlay() on item click or close button
// Portal-mounted to document.body
```

---

### Layout Components

**AbyssLayout.jsx**
```jsx
// Wraps all Abyss-environment pages
// Renders: <MenuTrigger /> + <NavigationOverlay /> + {children}
```

**IcyBlueLayout.jsx**
```jsx
// Wraps Report page
// Renders: <MenuTrigger /> + <NavigationOverlay /> + {children}
```

**SimulationLayout.jsx**
```jsx
// Wraps Simulation page only
// No NavigationOverlay — distraction-free environment
// Renders: minimal top bar + {children}
```

---

## 10. Feature Module Structure

Each feature module is independently scalable. It owns its Redux slice, thunks, selectors, and service calls.

```
features/auth/
├── authSlice.js         Redux state, reducers, actions
├── authThunks.js        Async thunks (login, logout, recoverSession)
└── authSelectors.js     Memoized selectors (selectUser, selectIsAuthenticated)

features/interview/
├── interviewSlice.js    Session state, question state, answer buffer
├── interviewThunks.js   createInterview, fetchQuestions, submitAnswer, completeInterview
└── interviewSelectors.js  selectCurrentQuestion, selectProgress, selectSessionId

features/report/
├── reportSlice.js
├── reportThunks.js      fetchReport, exportReport
└── reportSelectors.js   selectReport, selectReportLoading

features/analytics/
├── analyticsSlice.js
├── analyticsThunks.js   fetchAnalytics
└── analyticsSelectors.js  selectSkillRadar, selectScoreTrend, selectReadinessEvolution

features/profile/
├── profileSlice.js
├── profileThunks.js     fetchProfile, updateProfile, exportData, deleteAccount
└── profileSelectors.js  selectPreferences, selectNotifications

features/ui/
└── uiSlice.js           isNavOverlayOpen, isAiCompiling, globalError, toast
```

### Selector Pattern (Example)

```js
// features/interview/interviewSelectors.js
import { createSelector } from '@reduxjs/toolkit'

export const selectInterview        = (state) => state.interview
export const selectQuestions        = (state) => state.interview.questions
export const selectCurrentIndex     = (state) => state.interview.currentIndex
export const selectTotalQuestions   = (state) => state.interview.totalQuestions

// Derived / memoized
export const selectCurrentQuestion = createSelector(
  [selectQuestions, selectCurrentIndex],
  (questions, index) => questions[index] ?? null
)

export const selectProgress = createSelector(
  [selectCurrentIndex, selectTotalQuestions],
  (current, total) => (total > 0 ? (current / total) * 100 : 0)
)
```

---

## 11. State Management Rules

### What belongs in Redux

- Authentication state (`user`, `token`, `isAuthenticated`)
- Interview session data (`sessionId`, `questions`, `answers`, `currentIndex`, `status`)
- Report data (fetched from API, needed across render cycles)
- Analytics data
- Profile data
- Global UI state (`isNavOverlayOpen`, `isAiCompiling`, `globalError`)

### What belongs in local state (`useState`)

- Form field values (controlled inputs before submission)
- UI toggle states scoped to a single component (e.g., password visibility toggle)
- Hover / focus states not needed outside the component
- Scroll position within a component

### What belongs in URL params

- `sessionId` — drives which interview or report is displayed
- Any resource identifier that must be shareable or bookmarkable

**Rule:** Never duplicate URL params in Redux. Read `sessionId` from `useParams()`, not from the store.

### What should come from the API (never hardcoded)

- Question content
- Report scores and evaluations
- Analytics data
- User profile data

---

## 12. Performance Strategy

### Code Splitting

All page components are lazy-loaded via `React.lazy()`. This means only the code for the current route is loaded on initial visit.

```js
const Simulation = lazy(() => import('../pages/Simulation'))
const Report     = lazy(() => import('../pages/Report'))
// ... all pages
```

### Route-Based Splitting Result

```
Bundle: main.js          ~  50kb  (App, store, common components)
Bundle: Landing.js       ~  30kb
Bundle: Simulation.js    ~  40kb
Bundle: Report.js        ~  35kb
Bundle: Analytics.js     ~  60kb  (chart libraries)
Bundle: Archive.js       ~  25kb
Bundle: Profile.js       ~  25kb
```

### Memoization

```js
// Expensive selectors: use createSelector (already shown above)

// Components that receive stable props but re-render unnecessarily:
const QuestionPanel = React.memo(({ question, sequenceNo }) => { ... })

// Callbacks passed as props:
const handleSubmit = useCallback(() => {
  dispatch(submitAnswerThunk(...))
}, [dispatch, sessionId, currentQuestion])
```

### Redux Optimization

- Use `createSelector` for all derived state to prevent unnecessary re-renders.
- Select the smallest slice needed: `useSelector(selectCurrentQuestion)` not `useSelector(state => state.interview)`.
- Avoid selecting entire feature slices in components — always use specific selectors.

### Caching Strategy

- Analytics and archive data: cache in Redux after first fetch. Add a `lastFetched` timestamp to the slice. Re-fetch only if stale (> 5 minutes).
- Report data: cache by `sessionId`. If `state.report.sessionId === params.sessionId`, skip re-fetch.

```js
// In Report.jsx
useEffect(() => {
  const isCached = report && reportSessionId === sessionId
  if (!isCached) dispatch(fetchReportThunk(sessionId))
}, [sessionId])
```

---

## 13. Error Handling Strategy

### API Error Structure

All API errors are normalized into a consistent shape before reaching Redux:

```js
// utils/errorUtils.js
export const normalizeError = (error) => {
  if (error.response) {
    // Backend responded with error status
    return {
      status:  error.response.status,
      message: error.response.data?.message ?? 'An error occurred.',
      type:    'api',
    }
  }
  if (error.request) {
    // Request made but no response received
    return { status: 0, message: 'Network error. Check your connection.', type: 'network' }
  }
  return { status: -1, message: error.message, type: 'unknown' }
}
```

### Error Handling Per Layer

| Layer | Strategy |
|---|---|
| Axios Interceptor | 401 → auto logout + redirect to `/login` |
| Async Thunks | `rejectWithValue(normalizeError(error))` in all catch blocks |
| Redux Slice | `extraReducers` handles `.rejected` — sets `slice.error` |
| Page Component | Reads `slice.error` via selector — renders error state UI |
| Global errors | Dispatched to `uiSlice.globalError` — shown app-wide |

### Thunk Error Pattern

```js
// Example in interviewThunks.js
export const createInterviewThunk = createAsyncThunk(
  'interview/create',
  async (jobDescription, { rejectWithValue }) => {
    try {
      const res = await interviewService.createInterview(jobDescription)
      return res.data
    } catch (error) {
      return rejectWithValue(normalizeError(error))
    }
  }
)
```

### Report Generation Failure

If report polling exceeds 60 seconds without a response:
- Show an error state on the Report page with a "Retry" option.
- Preserve `sessionId` in URL so user can retry without losing context.

---

## 14. Security Considerations

### JWT Handling

- Access token stored **in Redux memory only.** Never in `localStorage`, `sessionStorage`, or cookies accessible to JavaScript.
- Refresh token stored in `httpOnly, SameSite=Strict` cookie managed entirely by the backend.
- Token is attached to requests via the Axios request interceptor (reads from Redux state).
- On tab close, access token is lost. Session recovery via `recoverSessionThunk()` on next app load uses the httpOnly cookie.

### Protected Routes

- All protected routes are gated by `ProtectedRoute.jsx`.
- During session recovery (`isLoading: true`), a full-screen loader renders — no route content leaks.

### Input Sanitization

- All user-submitted text (Job Description, answers) must be sanitized before rendering in report feedback.
- Use `DOMPurify` to sanitize any AI-generated HTML content before `dangerouslySetInnerHTML`.
- Never trust AI-generated content as safe markup.

```js
import DOMPurify from 'dompurify'
const safeHtml = DOMPurify.sanitize(aiGeneratedContent)
```

### XSS Prevention

- Avoid `dangerouslySetInnerHTML` everywhere except AI-generated content (which must be sanitized first).
- All user-provided content is rendered as text nodes, not HTML.

### Rate Limiting Assumptions

The frontend assumes the backend enforces:
- Login attempt rate limiting (5 attempts / minute per IP)
- Interview creation rate limiting (prevent spam)
- Answer submission rate limiting

The frontend's responsibility: disable submit buttons during in-flight requests and show appropriate loading states to prevent duplicate submissions.

---

## 15. Future Scalability

The architecture is designed to absorb the following features without major refactoring:

### Voice Interviews

- Add `voiceSlice` to Redux.
- Add `voiceService.js` to services.
- The `Simulation` page receives a `mode` prop (`'text' | 'voice'`).
- `QuestionPanel` and `AnswerTextarea` are replaced by `VoiceQuestionPanel` and `VoiceRecorder` for voice mode.
- No changes to routing, auth, or report architecture.

### Video Interviews

- Same approach as Voice, extended with a `videoSlice`.
- Recording + upload logic isolated inside `features/video/`.
- Report architecture unchanged — backend handles video analysis.

### Real-Time AI Conversations (WebSocket / SSE)

- Replace polling in report generation with Server-Sent Events.
- Add `useSSE(url)` custom hook that wraps `EventSource`.
- Thunks dispatch partial updates to the report slice as events arrive.
- No changes to component structure.

### Multi-Language Support

- Add `i18n/` directory with `react-i18next` setup.
- All user-visible strings extracted to locale JSON files from the start.
- The `DESIGN.md` visual language is language-agnostic.

### Team Accounts

- Add `teamSlice` to Redux.
- Auth flow extended with `organizationId` in the JWT payload.
- ProtectedRoute extended to check team membership for certain routes.
- No architectural rewrites.

### Subscription Plans

- Add `subscriptionSlice` to Redux.
- A `PlanGate` component wraps premium features — reads plan tier from Redux.
- Sits alongside `ProtectedRoute` in the routing layer.

---

## 16. Development Standards

### Component Naming

```
PascalCase for all components:
  QuestionPanel.jsx     ✅
  questionPanel.jsx     ❌
  question-panel.jsx    ❌

Page components are named after their route:
  Landing.jsx, Simulation.jsx, Report.jsx    ✅
  HomePage.jsx, SimulationPage.jsx           ❌  (redundant suffix)
```

### Folder Naming

```
kebab-case for all folders:
  components/common/     ✅
  components/Common/     ❌
```

### Redux Naming

```
Slices:           camelCase noun    →  interviewSlice, authSlice
Actions:          camelCase verb    →  setCurrentIndex, saveAnswer, clearReport
Thunks:           camelCase + Thunk →  createInterviewThunk, fetchReportThunk
Selectors:        camelCase + select prefix → selectCurrentQuestion, selectProgress
```

### Hook Naming

```
All custom hooks start with "use":
  useAuth.js, useInterview.js, useScrollReveal.js    ✅
  auth.js, interviewHook.js                          ❌
```

### Service Naming

```
camelCase + Service suffix:
  authService.js, interviewService.js    ✅
  AuthService.js, auth-service.js        ❌
```

### File Naming

```
Components:  PascalCase.jsx       →  QuestionPanel.jsx
Hooks:       camelCase.js         →  useScrollReveal.js
Slices:      camelCase.js         →  interviewSlice.js
Services:    camelCase.js         →  interviewService.js
Utils:       camelCase.js         →  tokenUtils.js
Constants:   camelCase.js         →  apiEndpoints.js
```

### Import Order Convention

```js
// 1. React core
import { useState, useEffect, useCallback } from 'react'

// 2. Third-party libraries
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// 3. Internal: features / store
import { submitAnswerThunk } from '../features/interview/interviewThunks'
import { selectCurrentQuestion } from '../features/interview/interviewSelectors'

// 4. Internal: components
import QuestionPanel from '../components/simulation/QuestionPanel'
import Button from '../components/common/Button'

// 5. Internal: hooks / utils / constants
import { useTimer } from '../hooks/useTimer'
import { buildReportRoute } from '../constants/routes'
```
---

## 17. Environment Variables

All environment variables are prefixed with `VITE_` as required by Vite's env exposure system. Never use `process.env` in this project — always use `import.meta.env`.

### Variable Reference

| Variable | Purpose | Default | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Base URL for all Axios requests | *(none — required)* | `http://localhost:8080/api/v1` |
| `VITE_APP_NAME` | Application display name | `AI Interview Coach` | `AI Interview Coach` |
| `VITE_ENVIRONMENT` | Runtime environment identifier | `development` | `production` |
| `VITE_ENABLE_ANALYTICS` | Feature flag — enables/disables analytics module | `true` | `false` |
| `VITE_REPORT_POLL_INTERVAL` | Milliseconds between report status poll attempts | `3000` | `5000` |

### Usage in Code

```js
// services/axiosInstance.js
baseURL: import.meta.env.VITE_API_BASE_URL

// Feature flag check
const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'

// Poll interval
const POLL_INTERVAL = Number(import.meta.env.VITE_REPORT_POLL_INTERVAL) || 3000
```

### `.env.example`

Commit this file to the repository. Never commit `.env`.

```bash
# .env.example
# Copy this file to .env and fill in your values.

# ─── Required ────────────────────────────────────────────────
# Backend API base URL. No trailing slash.
VITE_API_BASE_URL=http://localhost:8080/api/v1

# ─── App Identity ─────────────────────────────────────────────
VITE_APP_NAME=AI Interview Coach
VITE_ENVIRONMENT=development

# ─── Feature Flags ────────────────────────────────────────────
# Set to "false" to disable the analytics module entirely.
VITE_ENABLE_ANALYTICS=true

# ─── Polling ──────────────────────────────────────────────────
# Interval in milliseconds for report generation status polling.
VITE_REPORT_POLL_INTERVAL=3000
```

### Rules

- `.env` is listed in `.gitignore` — never committed.
- `.env.example` is committed with placeholder/default values — always kept up to date.
- Boolean flags are strings (`"true"` / `"false"`). Always compare with `=== 'true'`, never cast directly to boolean.
- `VITE_API_BASE_URL` has no default — the app must fail loudly if it is missing.

---

## 18. Testing Strategy

**Testing Stack:** Vitest + React Testing Library

Vitest is chosen for its native Vite integration (zero config, same transform pipeline as the app). React Testing Library enforces testing behavior over implementation.

### Testing Folder Structure
src/
└── tests/
├── unit/
│   ├── reducers/          # Redux slice reducer tests
│   │   ├── authSlice.test.js
│   │   ├── interviewSlice.test.js
│   │   ├── reportSlice.test.js
│   │   └── uiSlice.test.js
│   ├── utils/             # Pure utility function tests
│   │   ├── tokenUtils.test.js
│   │   ├── errorUtils.test.js
│   │   └── scoreUtils.test.js
│   └── hooks/             # Custom hook tests
│       ├── useTimer.test.js
│       └── useScrollReveal.test.js
├── integration/           # Multi-layer flow tests
│   ├── loginFlow.test.jsx
│   ├── protectedRoute.test.jsx
│   ├── interviewSubmission.test.jsx
│   └── reportLoading.test.jsx
└── mocks/                 # Shared test utilities
├── handlers.js        # MSW request handlers
├── server.js          # MSW server setup
├── store.js           # Pre-configured test Redux store
└── fixtures/          # Static test data
├── user.js
├── interview.js
└── report.js


### Unit Testing

Unit tests cover pure logic in isolation: reducers, selectors, utility functions, and hooks.

**Redux Reducer Tests**

```js
// __tests__/unit/reducers/interviewSlice.test.js
import interviewReducer, {
  saveAnswer,
  setCurrentIndex,
  resetInterview,
} from '../../../features/interview/interviewSlice'

describe('interviewSlice reducers', () => {
  it('saves an answer by questionId', () => {
    const initial = { answers: {} }
    const next = interviewReducer(initial, saveAnswer({ questionId: 'q1', answer: 'My answer' }))
    expect(next.answers['q1']).toBe('My answer')
  })

  it('advances currentIndex', () => {
    const initial = { currentIndex: 0 }
    const next = interviewReducer(initial, setCurrentIndex(1))
    expect(next.currentIndex).toBe(1)
  })

  it('resets interview state fully', () => {
    const dirty = { sessionId: 'abc', currentIndex: 3, answers: { q1: 'test' } }
    const next = interviewReducer(dirty, resetInterview())
    expect(next.sessionId).toBeNull()
    expect(next.currentIndex).toBe(0)
    expect(next.answers).toEqual({})
  })
})
```

**Utility Function Tests**

```js
// __tests__/unit/utils/tokenUtils.test.js
import { isTokenExpired } from '../../../utils/tokenUtils'

describe('isTokenExpired', () => {
  it('returns true for an expired token', () => {
    const expiredToken = generateJwt({ exp: Math.floor(Date.now() / 1000) - 60 })
    expect(isTokenExpired(expiredToken)).toBe(true)
  })

  it('returns false for a valid token', () => {
    const validToken = generateJwt({ exp: Math.floor(Date.now() / 1000) + 3600 })
    expect(isTokenExpired(validToken)).toBe(false)
  })
})
```

**Hook Tests**

```js
// __tests__/unit/hooks/useTimer.test.js
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '../../../hooks/useTimer'

describe('useTimer', () => {
  it('increments elapsed seconds', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useTimer())
    act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current.elapsed).toBe(3)
    vi.useRealTimers()
  })
})
```

### Component Testing

Component tests verify that the correct UI renders for a given state and that user interactions trigger the correct dispatches.

**Login Form**

```jsx
// __tests__/integration/loginFlow.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { setupStore } from '../mocks/store'
import Login from '../../pages/Login'

describe('Login page', () => {
  it('renders email and password fields', () => {
    render(
      <Provider store={setupStore()}><MemoryRouter><Login /></MemoryRouter></Provider>
    )
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('disables submit button while request is in flight', async () => {
    // ... setup MSW handler with delayed response
    fireEvent.click(screen.getByRole('button', { name: /initiate/i }))
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

**QuestionPanel**

```jsx
// Verify question text renders at correct sequence number
// Verify SUBMIT RESPONSE button is present
// Verify textarea accepts input
// Verify AI loader renders when isAiCompiling is true
```

**Report Components**

```jsx
// MacroVerdict: verify score and summary text render from fixture data
// DiagnosticsPanel: verify both columns render the correct number of items
// QuestionBreakdown: verify each sequence renders aiEvaluation and correctiveAction
```

### Integration Testing

Integration tests wire together the Redux store, MSW API mocks, and React components to verify complete user flows.

**Login Flow**
Render Login page with real store
Fill email + password
MSW intercepts POST /auth/login → returns { token, user }
Assert: store.auth.isAuthenticated === true
Assert: navigate called with '/'

**Protected Route Flow**
Render ProtectedRoute wrapping a dummy component
Store state: isAuthenticated = false
Assert: redirected to /login
Update store: isAuthenticated = true
Assert: protected content renders

**Interview Submission Flow**
Render Simulation page with a seeded sessionId
MSW: GET /interviews/:id/questions → returns fixture questions
Assert: first question renders
User types answer → fireEvent
User clicks SUBMIT RESPONSE
MSW: POST /interviews/:id/answers → 200 OK
Assert: currentIndex advances in store
Assert: AiCompilingLoader appears then disappears

**Report Loading Flow**
Render Report page with sessionId
MSW: GET /reports/:id → returns fixture report
Assert: overall score renders
Assert: strengths list renders
Assert: question breakdown timeline renders
### Critical Test Coverage Checklist

The following flows **must** have integration test coverage before any production deployment:

| Flow | Test File | Priority |
|---|---|---|
| Authentication (login + token set) | `loginFlow.test.jsx` | P0 |
| Session Recovery on mount | `sessionRecovery.test.jsx` | P0 |
| Protected route redirect | `protectedRoute.test.jsx` | P0 |
| Interview creation + navigation | `interviewSubmission.test.jsx` | P0 |
| Answer submission per question | `interviewSubmission.test.jsx` | P0 |
| Interview completion → report redirect | `interviewSubmission.test.jsx` | P0 |
| Report fetch + render | `reportLoading.test.jsx` | P0 |
| Report polling on pending state | `reportLoading.test.jsx` | P1 |
| Analytics data fetch + render | `analyticsFlow.test.jsx` | P1 |
| Profile update + save | `profileUpdate.test.jsx` | P1 |
| Logout + credential clear | `loginFlow.test.jsx` | P0 |

### MSW Setup Pattern

```js
// __tests__/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { userFixture, reportFixture } from './fixtures'

export const handlers = [
  http.post('/auth/login', () => {
    return HttpResponse.json({ token: 'mock-token', user: userFixture })
  }),
  http.get('/reports/:sessionId', ({ params }) => {
    return HttpResponse.json({ ...reportFixture, sessionId: params.sessionId })
  }),
  // ... all critical endpoints
]

// __tests__/mocks/server.js
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)
```

```js
// vitest.setup.js (root level)
import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './__tests__/mocks/server'
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---


## 19. Build Order
### Phase 1 — Foundation & Authentication

**Goal:** Working app shell. Users can register and log in.

```
1. Project setup: Vite + React + Tailwind config + Redux store skeleton
2. axiosInstance.js with interceptors
3. authSlice + authThunks + authSelectors
4. authService.js
5. Login.jsx page (functional form)
6. ProtectedRoute.jsx + PublicRoute.jsx
7. App.jsx routing scaffold (all routes declared, pages stubbed)
8. Session recovery (recoverSessionThunk on App mount)
9. uiSlice (nav overlay, isAiCompiling)
10. NavigationOverlay.jsx + MenuTrigger.jsx
11. AbyssLayout.jsx + IcyBlueLayout.jsx
```

**Milestone:** Login → session recovery → protected routes work. Navigation overlay opens.

---

### Phase 2 — Landing Page

**Goal:** Public-facing scroll narrative.

```
1. Landing.jsx with 6 scroll scenes (static content, no API)
2. useScrollReveal hook (IntersectionObserver for scroll-triggered reveals)
3. AiCompilingLoader.jsx (built now, used in Phase 3)
4. Button.jsx common component
5. Scene 6 contrast shift (abyss → icyBlue on scroll threshold)
```

**Milestone:** Landing page fully interactive and scroll-driven.

---

### Phase 3 — Interview Engine (Core Feature)

**Goal:** Users can start, complete, and navigate through a simulation.

```
1. interviewSlice + interviewThunks + interviewSelectors
2. interviewService.js
3. Simulation.jsx page
4. SimulationLayout.jsx (no nav, focused)
5. QuestionPanel.jsx
6. AnswerTextarea.jsx
7. ProgressBar.jsx
8. SimulationTimer.jsx + useTimer hook
9. AI Compiling loading state between questions
10. completeInterviewThunk → navigate to /report/:sessionId
```

**Milestone:** Full interview session works end-to-end. Questions render, answers submit, session completes.

---

### Phase 4 — Readiness Report

**Goal:** Users receive and explore AI feedback.

```
1. reportSlice + reportThunks + reportSelectors
2. reportService.js
3. Report.jsx page (IcyBlueLayout)
4. MacroVerdict.jsx (score + summary)
5. DiagnosticsPanel.jsx (strengths / vulnerabilities two-column)
6. QuestionBreakdown.jsx (timeline of per-question analysis)
7. TerminusActions.jsx (NEW INTERVIEW / RETURN TO ARCHIVE / EXPORT REPORT)
8. exportReportThunk (blob download)
9. Report polling / retry logic
```

**Milestone:** Report renders completely from API data. Export works.

---

### Phase 5 — Analytics

**Goal:** Historical performance tracking.

```
1. analyticsSlice + analyticsThunks + analyticsSelectors
2. analyticsService.js
3. Analytics.jsx page
4. SkillRadar.jsx (SVG-based, neonBlue geometric radar)
5. ScoreTrendLine.jsx (edge-to-edge SVG line chart)
6. AreasEditorialSplit.jsx (strong / weak areas)
7. InterviewHistoryTimeline.jsx
8. ReadinessEvolution.jsx (AI narrative block)
9. Stale cache logic (re-fetch only if > 5 minutes old)
```

**Milestone:** Analytics page renders all 5 modules with real data.

---

### Phase 6 — Archive & Profile

**Goal:** Complete the remaining authenticated experiences.

```
Archive:
1. Archive.jsx + ArchiveTimeline.jsx
2. Reuses analyticsSlice.interviewHistory (already fetched)
3. Click-through to Report page

Profile:
1. profileSlice + profileThunks + profileSelectors
2. profileService.js
3. Profile.jsx
4. All configuration sections (preferences, notifications, security)
5. deleteAccountThunk + confirmation Modal
6. exportAccountDataThunk
```

**Milestone:** All 7 routes are fully functional.

---

### Phase 7 — Optimization & Hardening

**Goal:** Production-ready performance and error coverage.

```
1. Audit all useSelector calls — replace with specific selectors
2. Add React.memo to all list-rendering components
3. Add useCallback to all event handlers passed as props
4. Implement error boundaries per major page
5. Add DOMPurify to all AI-generated content renders
6. Audit bundle sizes — split large Analytics dependencies if needed
7. Add loading skeletons where blank states exist
8. End-to-end test critical flows (login, simulation, report)
9. Accessibility audit (keyboard navigation, focus management in overlays)
```

**Milestone:** Application is production-deployable.

---

## Final Engineering Principle

> Every architectural decision in this document serves one goal:  
> **The interview engine must be reliable, fast, and trustworthy.**  
>  
> The user is preparing for a career-defining moment.  
> The infrastructure must be invisible.
