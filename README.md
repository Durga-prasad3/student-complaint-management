# SmartCampus Complaint Management

SmartCampus is a role-based campus complaint management application. Students can report campus issues, while staff and administrators have separate dashboards for handling and reviewing complaints.

## Features

- Student, staff, and administrator areas protected by role-based routes.
- Student registration and login screens, dashboards, complaint history, notifications, and settings.
- Staff complaint and dashboard screens.
- Administrator complaint management, analytics, dashboard, notifications, and settings.
- PHP JSON API for authentication and complaint operations, backed by MySQL.
- Browser-based demo fallback for authentication and complaint data.

> **Current integration status:** The client attempts to authenticate through the PHP API, then falls back to browser `localStorage` when the API is unavailable. Complaint submission and the client complaint lists currently use `localStorage`; they are not yet wired to the PHP complaint endpoints. Browser-stored demo data is local to that browser and is not shared with the MySQL database.

## Technology

- Client: React 19, Vite 8, React Router, Bootstrap, Recharts, and React Icons.
- API: PHP with PDO.
- Database: MySQL.

## Requirements

- Node.js and npm.
- PHP with the PDO MySQL extension.
- MySQL. XAMPP can provide PHP, Apache, and MySQL on Windows.

## Run Locally

### 1. Start the database and API

Start MySQL (and Apache if using XAMPP), then import `server/schema.sql` into MySQL. The schema creates the `smart_campus` database and its tables.

The default database configuration is `localhost`, database `smart_campus`, user `root`, and an empty password. Override it with `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` if needed.

From the `student-compliant-management` directory, start PHP's built-in server:

```powershell
php -S localhost:8000 -t server server/index.php
```

With XAMPP's PHP executable, for example:

```powershell
C:\xampp\php\php.exe -S localhost:8000 -t .\server .\server\index.php
```

The API health check is `http://localhost:8000/?path=health`. The API allows the Vite origin `http://localhost:5173` by default; configure `CORS_ORIGINS` as a comma-separated list to allow other origins.

### 2. Start the client

In a second terminal, from the `student-compliant-management/client` directory:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

The client currently targets the API at `http://localhost:8000` in `src/context/AuthContext.jsx`.

## Available Scripts

Run these commands from `client/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `client/dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Roles and Access

Public registration creates student accounts only. The API does not allow public users to grant themselves staff or administrator access. To create a trusted staff or administrator account for API-backed login, update that account's `role` in the MySQL `users` table.

The client includes a local demo student account in its authentication context: `test@gmail.com` with password `123456`. This account is for local demonstration only; do not use these credentials for a deployed environment. Demo users and sessions are stored in browser `localStorage`.

## API Overview

All API responses are JSON. Protected endpoints require `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/?path=auth&action=register` | Register a student account. |
| `POST` | `/?path=auth&action=login` | Authenticate and return a bearer token. |
| `GET` | `/?path=auth&action=me` | Get the authenticated user. |
| `POST` | `/?path=auth&action=logout` | Revoke the current token. |
| `GET` | `/?path=complaints` | List complaints visible to the authenticated role. Supports `status`, `priority`, `category`, `department`, and `search` filters. |
| `POST` | `/?path=complaints` | Create a complaint; an optional PNG/JPEG image up to 5 MB is supported. |
| `GET` | `/?path=complaints&id=123` | Get a complaint and its status history. |
| `PATCH` | `/?path=complaints&id=123` | Update complaint status or priority; administrators can also update department and assignee. |
| `GET` | `/?path=health` | Check that the API is running. |

See [server/README.md](server/README.md) for backend setup details and endpoint notes.

## Project Layout

```text
student-compliant-management/
├── client/                 # React and Vite application
│   └── src/
│       ├── components/     # Shared UI and route protection
│       ├── context/        # Authentication and theme state
│       ├── layouts/        # Student, staff, and admin layouts
│       ├── pages/          # Public and role-specific screens
│       └── utils/          # Client-side complaint demo storage
└── server/                 # PHP API and MySQL schema
    ├── config/
    ├── controllers/
    └── routes/
```

## Production Notes

- Replace the local demo authentication and complaint storage with the intended API-backed flows before relying on shared or persistent application data.
- Configure database credentials and allowed CORS origins for the deployment environment; do not expose development credentials.
- The bundled demo credentials and browser `localStorage` are not suitable for production authentication or sensitive complaint data.