## DanceSchool Frontend

Modern frontend for managing dance school operations, built with Next.js App Router, Redux Toolkit, and Material UI. It provides authentication flows, course browsing, and integration points for the accompanying backend APIs.

### Features
- **Authentication:** Login and registration forms backed by async thunks and axios interceptors, with protected routes gating private views.
- **Course Management:** Course listings and detail pages wired for RTK Query data fetching.
- **User Management:** Centralized Redux store with slices for users, courses, authentication, and counter examples.
- **Responsive UI:** Material UI components and custom styling for a polished experience.

### Tech Stack
- Next.js (App Router, TypeScript)
- React 18 + Redux Toolkit (`combineSlices`, RTK Query-ready store)
- Material UI + Emotion styling
- Axios with auto token injection and 401 handling

### Getting Started
1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```
2. **Configure environment**
   Create `.env.local` and define the API base URL:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/
   ```
   The axios client falls back to `http://localhost:8080/` if unset.
3. **Run the dev server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   Open `http://localhost:3000`.
4. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

### Project Structure
```
app/
  components/         # Reusable UI, forms, protected routing
  courses/            # Course pages (index + dynamic slug)
  login/, register/   # Auth pages
  styles/             # Global and layout styles
lib/
  api/axios.ts        # Axios instance with auth interceptors
  features/           # Redux slices (auth, courses, users, counter)
  store.ts            # Store configuration & provider helpers
public/               # Static assets (logos, icons)
```

### Authentication Flow
- `lib/features/auth/authSlice.ts` defines the login thunk and reducers. Upon success, tokens and user info are persisted to `localStorage`.
- `lib/api/axios.ts` attaches the bearer token on requests and triggers `logout` automatically on 401 responses.
- `app/components/ProtectedRoute.tsx` redirects unauthenticated users to `/login` and hides content until a token exists.

### Available Scripts
- `pnpm dev` / `npm run dev` – start Next.js dev server
- `pnpm build` / `npm run build` – create production build
- `pnpm start` / `npm run start` – serve the production build

### Testing & QA
Automated tests are not yet included. Recommended next steps:
- Add unit tests for Redux slices and async thunks.
- Implement integration tests for auth flows using Playwright or Cypress.

### Contributing
1. Fork and clone the repo.
2. Create a feature branch.
3. Run the dev server and ensure linting/tests (when added) pass.
4. Submit a PR with a clear description of changes.

### License
This project currently has no explicit license. Add one (e.g., MIT) before distributing or accepting external contributions.

