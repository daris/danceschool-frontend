## DanceSchool Frontend

Modern frontend for managing dance school operations, built with Next.js App Router, Redux Toolkit, and Material UI. It provides authentication flows, course browsing, and integration points for the accompanying backend APIs.

### Features
- **Authentication:** Login and registration forms backed by async thunks and axios interceptors, with protected routes gating private views.
- **Course Management:** Course listings and detail pages wired for RTK Query data fetching.
- **User Management** 
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

### Available Scripts
- `pnpm dev` / `npm run dev` – start Next.js dev server
- `pnpm build` / `npm run build` – create production build
- `pnpm start` / `npm run start` – serve the production build
