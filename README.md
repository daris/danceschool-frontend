# Dance School Frontend

This repository contains the **frontend for the Dance School application**, built with **Next.js**, **Redux Toolkit**, **TypeScript**, and **Material-UI (MUI)**. It integrates with the **Dance School Spring Boot REST API** to provide user registration, login, and attendance management.

## Project Description

The frontend provides a modern interface for students and administrators of a Dance School to manage courses, attendance, and user accounts. It communicates with the backend API using **Axios**, and uses **JWT authentication** for secure access to protected endpoints.

### Key Features

- **User Registration and Login**
    - Register new accounts.
    - Login using JWT-based authentication.
    - Persist user data and tokens in `localStorage` and Redux store.

- **JWT Authentication**
    - Secure endpoints are accessible only with a valid JWT.
    - Token automatically sent with Axios requests to backend.

- **Attendance Management**
    - View and update attendance for lessons.
    - Add participants to courses.

- **Course and User Management**
    - Display available courses.
    - List participants and manage their enrollment.

- **Material-UI Components**
    - Styled forms, tables, and buttons for a responsive UI.

- **Redux Toolkit + RTK Query**
    - Centralized state management.
    - Async API calls handled via RTK Query slices.

- **Protected Routes**
    - Dashboard and course management pages require login.
    - Redirects to login page if user is not authenticated.

## Backend Integration

This frontend connects to the **Dance School Spring Boot API**, which provides:

- **User registration and login** with JWT.
- **JWT-based authentication** for secure endpoints.
- **Password hashing** using BCrypt.
- **Attendance and pass management**.
- **Swagger UI** for API documentation and testing.

### Backend Base URL

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> Make sure the backend is running and accessible with CORS enabled.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/daris/danceschool-frontend.git
cd danceschool-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

## Usage

- **Register** a new user via the registration form.
- **Login** to receive a JWT token.
- Access **protected pages** like dashboard and course management.
- **Manage attendance** and participants for courses.
- State is persisted in Redux + `localStorage` to maintain session.

## Deployment

You can deploy this frontend to **Vercel** or any hosting provider:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Ensure the backend API is accessible and CORS is properly configured.

## License

This project is open-source and available under the **MIT License**.