# Citizen Vigilante ($VIG) — Setup & Deployment Guide

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 10+ | `npm install -g pnpm` |
| Git | any | https://git-scm.com |

---

## 1. Clone & Install

```bash
# Clone the repo
git clone <your-repo-url>
cd <repo-folder>

# Install all workspace dependencies
pnpm install
```

---

## 2. Environment Variables

```bash
# Copy the example env file
cp artifacts/vig-website/.env.example artifacts/vig-website/.env
```

Open `artifacts/vig-website/.env` and fill in your values:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get these from:  
**Supabase Dashboard → Your Project → Settings → API**

---

## 3. Database Setup (Supabase)

1. Go to https://app.supabase.com and create a new project.
2. Open **SQL Editor** in the left sidebar.
3. Run the full contents of **`sql.md`** (all CREATE TABLE + RLS + trigger statements).
4. Enable **Email Auth** under **Authentication → Providers**.

---

## 4. Local Development

```bash
# Start just the VIG website (hot reload)
pnpm --filter @workspace/vig-website run dev

# Start the API server (if needed)
pnpm --filter @workspace/api-server run dev

# Start both together (from root)
pnpm --filter @workspace/vig-website run dev & pnpm --filter @workspace/api-server run dev
```

App will be at → **http://localhost:25980** (or the port shown in terminal)

---

## 5. TypeScript Check

```bash
# Check vig-website for type errors
pnpm --filter @workspace/vig-website run typecheck

# Check all packages
pnpm run typecheck
```

---

## 6. Build for Production

```bash
# Build the vig-website (outputs to artifacts/vig-website/dist)
pnpm --filter @workspace/vig-website run build

# Preview the production build locally
pnpm --filter @workspace/vig-website run serve
```

---

## 7. Deploy to Vercel

### Option A — Vercel CLI (recommended for first deploy)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy from the vig-website directory
cd artifacts/vig-website
vercel

# Follow the prompts:
#   Set up and deploy → Yes
#   Which scope → your account
#   Link to existing project → No (first time)
#   Project name → citizen-vigilante-vig
#   Directory → ./  (you're already in artifacts/vig-website)
#   Build command → pnpm run build
#   Output directory → dist
#   Install command → (leave blank — handled by root pnpm)
```

### Option B — Vercel Dashboard (Git integration)

1. Push your repo to GitHub / GitLab.
2. Go to https://vercel.com/new and import the repo.
3. Set **Root Directory** to `artifacts/vig-website`.
4. Vercel auto-detects Vite — confirm:
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install` (run from repo root)
5. Add environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**:
   ```
   VITE_SUPABASE_URL       = https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY  = eyJ...
   ```
6. Click **Deploy**.

### vercel.json (SPA routing fix)

Create `artifacts/vig-website/vercel.json` so client-side routes (like `/gallery`, `/support`) don't 404:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 8. Useful pnpm Commands Reference

| Command | What it does |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm --filter @workspace/vig-website run dev` | Start VIG website dev server |
| `pnpm --filter @workspace/vig-website run build` | Production build |
| `pnpm --filter @workspace/vig-website run serve` | Preview production build |
| `pnpm --filter @workspace/vig-website run typecheck` | TypeScript check |
| `pnpm --filter @workspace/api-server run dev` | Start API server |
| `pnpm run typecheck` | Full workspace typecheck |
| `pnpm run build` | Build all packages |

---

## 9. Project Structure

```
artifacts/
  vig-website/
    .env                  ← your local env (gitignored)
    .env.example          ← template — commit this
    vercel.json           ← SPA routing for Vercel
    src/
      lib/
        supabase.ts       ← Supabase client singleton
      pages/              ← one file per route
      components/         ← sections per page
      index.css           ← global styles + Google Fonts
      App.tsx             ← router + layout
sql.md                    ← all SQL for Supabase
setup.md                  ← this file
```

---

## 10. Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page on Vercel | Check `vercel.json` rewrites exist |
| Supabase 401 errors | Re-check `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars |
| `pnpm: command not found` | Run `npm install -g pnpm` |
| Port already in use | Kill the process: `lsof -ti:25980 \| xargs kill` |
| Build fails on Vercel (monorepo) | Set **Root Directory** to `artifacts/vig-website` in Vercel settings |
| `VITE_` prefix missing | All frontend env vars **must** start with `VITE_` |
