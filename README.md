# Habit Tracker

A full-stack habit tracking application built with React and NestJS.

The project allows users to create and manage habits, mark habits as completed each day, and track their progress through streaks and completion history.

## Features

- User registration and login
- JWT-based authentication
- Create, edit, and delete habits
- Mark habits as completed for the current day
- Undo daily completion
- Current and longest streak tracking
- 14-day habit completion history
- User-specific habit data
- Responsive dashboard UI
- PostgreSQL database with Prisma ORM

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- React Hook Form
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Passport
- bcrypt
- class-validator

### Infrastructure

- Docker
- Docker Compose

## Project Structure

```text
habit-tracker/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── habits/
│   │   ├── habit-logs/
│   │   ├── health/
│   │   └── prisma/
│   └── prisma/
├── frontend/
│   └── src/
│       ├── api/
│       ├── auth/
│       ├── components/
│       ├── pages/
│       └── routes/
└── docker-compose.yml