<h1 align="center">STELLA</h1>

<p align="center"><b>An AI-Powered Student Calendar Companion for Scheduling, Schedule Analysis and Study Task Generation</b></p>

<p align="center"><i>Plan your week before it plans you.</i></p>

<p align="center">
A calendar companion that keeps a student's events and tasks in one place, then lets two AI agents help them plan: the <b>Analyzer</b> answers questions about their schedule, and the <b>Task Generator</b> turns upcoming events into study tasks with a priority, a complexity and a time slot.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Flutter%20(planned)-02569B?logo=flutter&logoColor=white" alt="Frontend: Flutter (planned)" />
  <img src="https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white" alt="Backend: NestJS" />
  <img src="https://img.shields.io/badge/Database-Supabase%20%C2%B7%20Prisma-3ECF8E?logo=supabase&logoColor=white" alt="Database: Supabase and Prisma" />
  <img src="https://img.shields.io/badge/AI-n8n%20agents-EA4B71?logo=n8n&logoColor=white" alt="AI: n8n agents" />
  <img src="https://img.shields.io/badge/Stage-In%20development-FFD54F" alt="Stage: In development" />
  <img src="https://img.shields.io/badge/License-MIT-555555" alt="License: MIT" />
</p>

## Architecture

```
Flutter app (planned)
   │  REST (JWT)            WebSocket (socket.io)
   ▼                        ▼
NestJS backend ─────────────────────► n8n agents (Analyzer, Task Generator)
   │                                     │
   ├── PostgreSQL via Prisma (Supabase)  └── OpenRouter model
   └── Redis (sessions)
```

| Layer | Tech |
| --- | --- |
| Frontend | Flutter (planned) |
| Backend | NestJS 11, TypeScript |
| Database | PostgreSQL on Supabase, Prisma 7 |
| Sessions | Redis |
| Realtime chat | socket.io gateway (`@nestjs/websockets`) |
| AI agents | n8n workflows calling an OpenRouter model |

## Features

- Register and log in with a password or a Google account
- Create and list events
- Create and list tasks, each with a priority, a complexity and an optional link to an event
- Chat with the Analyzer and the Task Generator over WebSocket
- Rate limiting on every route

## Project structure

```
backend/
├── prisma/
│   ├── schema.prisma        # User, Event, Task, AnalyzerMessage, GeneratorMessage
│   └── migrations/
├── src/
│   ├── auth/                # JWT guard and auth module
│   ├── user/                # Registration and login
│   ├── event/               # Event endpoints
│   ├── task/                # Task endpoints
│   ├── session/             # Redis session store
│   ├── companion/           # WebSocket gateway to the n8n agents
│   ├── app.module.ts
│   └── main.ts
└── test/
```

## API

Routes marked 🔒 need an `Authorization: Bearer <token>` header.

### Users

| Method | Route | Description |
| --- | --- | --- |
| POST | `/users/v1/google/register` | Start a Google registration (`googleId`, `email`) |
| POST | `/users/v1/google/register/:id` | Finish registration (`google_uid`, `email`, `username`, `password`, `occupation`) |
| POST | `/users/v1/login?type=password\|google` | Log in with `username` plus `password` or `google_uid` |

### Events

| Method | Route | Description |
| --- | --- | --- |
| GET 🔒 | `/events/v1` | List the user's events |
| POST 🔒 | `/events/v1` | Create an event (`title`, `description?`, `start_time`, `end_time`) |

### Tasks

| Method | Route | Description |
| --- | --- | --- |
| GET 🔒 | `/tasks/v1` | List the user's tasks |
| POST 🔒 | `/tasks/v1` | Create a task (`task_name`, `task_detail?`, `event_id?`, `priority`, `complexity`, `start_time`, `end_time`) |

Times are ISO 8601 strings. `complexity` is `easy`, `medium` or `hard`.

### Companion (WebSocket)

Connect with a socket.io client to the server root.

| Event | Payload | Reply event |
| --- | --- | --- |
| `analyze` | `{ id, agent, message }` | `analyze` |
| `generate` | `{ id, agent, message }` | `generate` |

The backend forwards the message to the n8n webhook for that user and agent and sends back the agent's reply.

## Data model

- **User**: account details, Google UID, user type (`user` or `admin`)
- **Event**: title, description, start and end time
- **Task**: name, detail, priority, complexity, start and end time, optional event
- **AnalyzerMessage / GeneratorMessage**: chat history for each agent

## Frontend (planned)

The client will be built in Flutter and will talk to this backend through the REST routes above and a socket.io client for the companion chat. It will cover sign in, the calendar, the dashboard, add and edit pages for tasks and events, and the Analyzer and Task Generator chats.

## License

MIT. See [LICENSE](LICENSE).
