# AI-interview-coach
A full-stack AI interview simulator that generates role-specific technical questions from job descriptions and evaluates user answers. Built with React and Spring Boot.

## The Vision: A Flight Simulator for Job Seekers
Practicing for technical interviews is usually frustrating. You either stare at static lists of generic questions, or you try to practice in a mirror without receiving any feedback. 

This project solves interview anxiety by building an **on-demand, tireless AI interviewer** that gives users a realistic, tailored practice run before the actual big day.

## 🚀 How It Works
1. **The Setup:** Paste a target job description into the application.
2. **The Customization:** The app dynamically generates 5-10 highly specific technical questions based *only* on the requirements of that specific role.
3. **The Hot Seat:** Answer the generated questions one by one in a simulated technical screen environment.
4. **The Feedback Loop:** Receive targeted, senior-level feedback on your answers (e.g., *"Your explanation of React Hooks was spot on,"* or *"You missed the mark on API routing"*), along with a final readiness score.
## 🗄️ Database Architecture

The application uses a relational **MySQL** database structured to efficiently track user sessions and AI evaluations. 

* **Strict 1-to-Many Relationships:** A single user can have multiple mock interview sessions, and each session contains multiple dynamically generated Q&A pairs.
* **State Management:** The `status` enum within the session table acts as a clean switch to control frontend routing (tracking whether an interview is `IN_PROGRESS` or `COMPLETED`).
* **Ordered Retrieval:** A dedicated `question_number` column ensures the frontend always renders the interview flow in the exact sequence intended by the AI.

```mermaid
erDiagram
  USERS ||--o{ INTERVIEW_SESSIONS : "has"
  INTERVIEW_SESSIONS ||--o{ SESSION_QNA : "contains"

  USERS {
    BIGINT id PK
    VARCHAR name
    VARCHAR email
    TIMESTAMP created_at
  }

  INTERVIEW_SESSIONS {
    BIGINT id PK
    BIGINT user_id FK
    VARCHAR job_title
    TEXT job_description
    INT overall_score
    ENUM status
    TIMESTAMP created_at
  }

  SESSION_QNA {
    BIGINT id PK
    BIGINT session_id FK
    INT question_number
    TEXT question_text
    TEXT user_answer
    TEXT ai_feedback
    INT score
    TIMESTAMP created_at
  }
  ```
