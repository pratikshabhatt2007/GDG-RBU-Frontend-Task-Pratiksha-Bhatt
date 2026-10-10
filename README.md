# Google Developer Groups, RBU — Recruitment Task 2026–27

Responsive single-page site (Home, Upcoming Event, Team, FAQs, Footer) built from the supplied Figma frames.

## Stack
React 18, TypeScript, Vite, plain CSS with design tokens (CSS variables).

## Features
Entrance and scroll-reveal animations, smooth FAQ expand. Light/dark mode (saved in localStorage, follows system preference on first visit), responsive layout, accessible FAQ accordion, skip link, visible focus states, `prefers-reduced-motion` support.

## Run
```bash
npm install
npm run dev        # development
npm run typecheck  # type-check
npm run build      # production build -> dist/
npm run preview
```

## Structure
`src/App.tsx` (components), `src/index.css` (tokens + styles), `vercel.json`, `index.html`.

## Deploy on Vercel
1. Push to GitHub. 2. Vercel → Add New Project → import the repo. 3. Framework Vite, build `npm run build`, output `dist`. 4. Deploy.

## TODO (fill in)
- Team photo: low-resolution crop in `public/team.jpg`; replace with the original Figma export
- Member name, social links, remaining FAQ answers (marked `TODO`)
- Replace the approximate logo SVG and confirm fonts against Figma
- Screenshots: _add after running locally_
- Live URL / repo URL: _add yours_
