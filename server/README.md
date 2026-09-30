# SmartCampus PHP API

## Setup

1. Open the XAMPP Control Panel and start **Apache** and **MySQL**. Apache serves phpMyAdmin; MySQL stores the application data.
2. Open `http://localhost/phpmyadmin`, choose **Import**, select `server/schema.sql`, and click **Import**. The script creates and selects the `smart_campus` database and creates the required tables.
3. The default PDO settings match a standard XAMPP install: host `localhost`, database `smart_campus`, username `root`, and an empty password. Set `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` if your MySQL credentials differ.
4. From the workspace root, start the PHP API using XAMPP's PHP executable:

```powershell
C:\xampp\php\php.exe -S localhost:8000 -t .\student-compliant-management\server .\student-compliant-management\server\index.php
```

The PHP API is at `http://localhost:8000/?path=...`. phpMyAdmin manages the MySQL database; it does not serve the API. The Vite origin `http://localhost:5173` is allowed by default; set comma-separated `CORS_ORIGINS` to change it.

New account registration always creates a student account. Create trusted staff/admin accounts by changing the `role` value directly in the `users` table; public registration cannot grant elevated roles.

## Endpoints

All responses are JSON. Authenticated routes require `Authorization: Bearer <token>`.

| Method | URL | Purpose |
| --- | --- | --- |
| POST | `/?path=auth&action=register` | Register student; accepts `name`, `email`, `password`, optional `phone` and `department` |
| POST | `/?path=auth&action=login` | Login with `email`, `password`, optional expected `role`; returns user and bearer token |
| GET | `/?path=auth&action=me` | Return the authenticated user |
| POST | `/?path=auth&action=logout` | Revoke the current token |
| GET | `/?path=complaints` | List complaints; students see their own, staff see their department, admins see all |
| POST | `/?path=complaints` | Submit a complaint as a student; multipart requests may include optional `image` (PNG/JPEG, max 5 MB) |
| GET | `/?path=complaints&id=123` | Get one complaint and its status history |
| PATCH | `/?path=complaints&id=123` | Staff/admin update status or priority; admins may also update department and `assigned_to` |
| GET | `/?path=health` | Health check |

Complaint list filters are optional query parameters: `status`, `priority`, `category`, `department`, and `search`.