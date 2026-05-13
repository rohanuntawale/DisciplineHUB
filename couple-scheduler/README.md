# CoupleScheduler - Antigravity Scheduler for Two

A full-stack, multi-page app built with Next.js (TypeScript) + Express (TypeScript) that lets you and your girlfriend plan everything together.

- Study sessions, workouts, water, lunch, dinner, and any custom activity.
- Activities are marked with an owner (`me` or `gf`) so you can instantly see who is doing what.
- Daily motivational quotes on the dashboard and dedicated quotes page.
- Pomodoro timer with a glowing Lottie animation.
- Rich motion graphics: neon gradient background, particle cursor trail, hover cards, page transitions, and animated buttons.
- **Full-screen dynamic WebGL background** that reacts to mouse movement (with Vanta.js fallback for low-end devices).
- No external services - data is stored only in local `server/data/db.json`.

## 🎆 Dynamic Background – a living, breathing canvas

The site now features a **full-screen, WebGL-driven nebula/wave effect** that rolls gently in the background and reacts to mouse movement, giving the feeling of floating in space.

- **Primary implementation:** `react-three-fiber` + custom GLSL shader (see `src/components/DynamicBackground.tsx`).
- **Fallback for low-end devices:** Vanta.js *waves* animation (`vanta` npm package) – automatically activated if the browser cannot initialise WebGL.
- **Performance notes:** runs at ~30 fps on most laptops; uses `requestIdleCallback` for cleanup, and the shader is lightweight (no external textures).

### References & Inspiration

| # | Demo / Site | What we borrowed |
|---|-------------|------------------|
| 1️⃣ | **Awwwards – Nebula** – https://www.awwwards.com/sites/nebula | Full‑screen GLSL nebula, subtle color palette |
| 2️⃣ | **Vanta.js – Waves** – https://vanta.net/#waves | Low‑weight fallback when WebGL isn't available |
| 3️⃣ | **Rive Interactive** – https://rive.app/ | Idea of vector‑based, mouse‑reactive animation |
| 4️⃣ | **Three‑Fiber Floating Islands** – https://codesandbox.io/s/three-fiber-floating-islands-9x7v5 | React‑Three‑Fiber project setup pattern |
| 5️⃣ | **Particles.js** – https://vincentgarreau.com/particles.js/ | Optional tiny particles added via `react-tsparticles` |

You can tweak the visual style by editing `src/lib/motionConfig.ts` – change rotation speed, colours, wave height, etc.

## Features at a glance

| Feature | Implementation |
|---------|----------------|
| Multi-page routing (`/`, `/schedule/[date]`, `/quotes`) | Next.js file-system routing |
| REST API (`/api/schedule`) | Express + `uuid` + file-backed JSON DB |
| Dark mode toggle | Tailwind `dark:` utilities |
| Neon and glitch visuals | Tailwind animate + custom SVG filter |
| Full-screen dynamic background | react-three-fiber + Vanta.js fallback |
| Lottie timer | `lottie-react` + local timer JSON |
| Daily quotes | Local static array with random pick |
| Responsive layout | Tailwind grid and flex utilities |
| Type safety | TypeScript across frontend and backend |

## 📦 How to run locally

```bash
git clone <repo-url>
cd couple-scheduler
npm i                     # installs both frontend + backend deps (including three, vanta, react-three-fiber, etc.)
npm run dev:bg            # start both Express API on port 4000 and Next dev server (http://localhost:3000)
```

Alternatively, run backend and frontend in separate terminals:

```bash
npm run dev:server        # start Express API on port 4000
npm run dev               # start Next dev server (http://localhost:3000)
```

Open `http://localhost:3000`. The page will show a **moving nebula** behind every UI element, while still keeping the schedule, Pomodoro timer, daily quotes, and all offline functionality.

## Build

```bash
npm run build
npm run export
```

## Assets and credits

- Hero/background visuals: WebGL nebula + Vanta.js fallback (dynamically generated).
- Lottie timer JSON: local file under `public/images/lottie`.
- Icons: Heroicons and emoji-based activity badges.

