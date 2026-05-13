# CoupleScheduler - Antigravity Scheduler for Two

A full-stack, multi-page app built with Next.js (TypeScript) + Express (TypeScript) that lets you and your girlfriend plan everything together.

- Study sessions, workouts, water, lunch, dinner, and any custom activity.
- Activities are marked with an owner (`me` or `gf`) so you can instantly see who is doing what.
- Daily motivational quotes on the dashboard and dedicated quotes page.
- Pomodoro timer with a glowing Lottie animation.
- Rich motion graphics: neon gradient background, particle cursor trail, hover cards, page transitions, and animated buttons.
- No external services - data is stored only in local `server/data/db.json`.

## Features at a glance

| Feature | Implementation |
|---------|----------------|
| Multi-page routing (`/`, `/schedule/[date]`, `/quotes`) | Next.js file-system routing |
| REST API (`/api/schedule`) | Express + `uuid` + file-backed JSON DB |
| Dark mode toggle | Tailwind `dark:` utilities |
| Neon and glitch visuals | Tailwind animate + custom SVG filter |
| Lottie timer | `lottie-react` + local timer JSON |
| Daily quotes | Local static array with random pick |
| Responsive layout | Tailwind grid and flex utilities |
| Type safety | TypeScript across frontend and backend |

## Getting started (local)

```bash
git clone <repo-url>
cd couple-scheduler
npm i
```

Run backend and frontend in separate terminals:

```bash
npm run dev:server
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run export
```

## Assets and credits

- Hero/background visuals: free stock placeholders in `public/images`.
- Lottie timer JSON: local file under `public/images/lottie`.
- Icons: Heroicons and emoji-based activity badges.
