<h1 align="center">STELLA</h1>

<p align="center"><b>An AI-Powered Student Calendar Companion for Scheduling, Schedule Analysis and Study Task Generation</b></p>

<p align="center"><i>Plan your week before it plans you.</i></p>

<p align="center">
A calendar companion that keeps a student's events and tasks in one place, then lets AI agents help them plan: the <b>Analyzer</b> answers questions about their schedule, the <b>Task Generator</b> turns upcoming events into study tasks with a priority, a complexity and a time slot, and the <b>Agent Overview</b> writes a short summary of the day for the dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-SwiftUI-F05138?logo=swift&logoColor=white" alt="Frontend: SwiftUI" />
  <img src="https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white" alt="Backend: NestJS" />
  <img src="https://img.shields.io/badge/Database-Supabase%20%C2%B7%20Prisma-3ECF8E?logo=supabase&logoColor=white" alt="Database: Supabase and Prisma" />
  <img src="https://img.shields.io/badge/Auth-Firebase%20%C2%B7%20JWT-FFCA28?logo=firebase&logoColor=black" alt="Auth: Firebase and JWT" />
  <img src="https://img.shields.io/badge/Sessions-Redis-DC382D?logo=redis&logoColor=white" alt="Sessions: Redis" />
  <img src="https://img.shields.io/badge/AI-n8n%20agents-EA4B71?logo=n8n&logoColor=white" alt="AI: n8n agents" />
  <img src="https://img.shields.io/badge/Stage-In%20development-FFD54F" alt="Stage: In development" />
  <img src="https://img.shields.io/badge/License-MIT-555555" alt="License: MIT" />
</p>

## Architecture

```
iOS app (Swift, SwiftUI)
   │  Google sign in (Firebase) ──► Firebase ID token
   │
   │  REST (Bearer JWT)          WebSocket (socket.io)
   ▼                             ▼
NestJS backend ──────────────────────────► n8n agents
   │                                         ├── Analyzer + Task Generator (shared webhook)
   ├── Firebase Admin (verifies id_token)    └── Agent Overview (summary webhook)
   ├── PostgreSQL via Prisma (Supabase)            │
   └── Redis (remember me sessions)                └── OpenRouter model
```

| Layer | Tech |
| --- | --- |
| Frontend | iOS app in Swift and SwiftUI ([IOS-Final-Project](https://github.com/IKairuu/IOS-Final-Project)) |
| Backend | NestJS 11, TypeScript |
| Auth | Firebase Admin for Google ID tokens, own JWT (`@nestjs/jwt`) for the API |
| Database | PostgreSQL on Supabase, Prisma 7 (`@prisma/adapter-pg`) |
| Sessions | Redis |
| Realtime chat | socket.io gateway (`@nestjs/websockets`) |
| AI agents | n8n workflows calling an OpenRouter model |

## Features

- Sign in with Google: the backend verifies the Firebase ID token and issues its own JWT
- Log in with a username or email and password
- "Remember me" sessions stored in Redis for 30 days
- Create, list, edit and delete events
- Create, list, edit and delete tasks, each with a priority, a complexity and an optional link to an event
- Overlapping tasks are rejected with `409 Conflict`
- Save a whole batch of generated tasks in one request
- Load the Analyzer and Task Generator chat history
- Chat with the Analyzer and the Task Generator, and get a daily summary, over WebSocket
- Rate limiting on every route

## Project structure

```
Project-Stella/
├── agent/                   # n8n exports: Stella AI Analyzer, Stella Task Generator
├── workflow/                # n8n export: Stella Workflow
└── backend/
    ├── prisma/
    │   ├── schema.prisma    # User, Event, Task, AnalyzerMessage, GeneratorMessage
    │   └── migrations/
    ├── src/
    │   ├── auth/            # JWT guard, Firebase ID token check
    │   ├── user/            # Google registration and login
    │   ├── session/         # Redis session store
    │   ├── event/           # Event endpoints
    │   ├── task/            # Task endpoints, bulk create
    │   ├── message/         # Chat history endpoint
    │   ├── companion/       # WebSocket gateway to the n8n agents
    │   ├── prisma.ts
    │   ├── app.module.ts
    │   └── main.ts
    └── test/
```

## Data model

- **User**: account details, Google UID, user type (`user` or `admin`)
- **Event**: title, description, start and end time
- **Task**: name, detail, priority, complexity, start and end time, optional event
- **AnalyzerMessage**: Analyzer chat history
- **GeneratorMessage**: Task Generator chat history, with an optional `generated_tasks` JSON field that keeps the generated tasks apart from the agent's message

## Frontend

The current client is an iOS app built with Swift and SwiftUI, in [IKairuu/IOS-Final-Project](https://github.com/IKairuu/IOS-Final-Project). It covers Google sign in with "Remember me", the calendar, the dashboard with the Stella AI summary, add, edit and delete for tasks and events, and the Analyzer and Task Generator chats with their history.

A Flutter client is planned for later.

## License

MIT. See [LICENSE](LICENSE).
