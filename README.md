# Google Developer Groups, RBU — Website

Frontend Web Developer task for the **GDG RBU Recruitment 2026–27**. A responsive single-page website built from the supplied Figma design, with light/dark themes, scroll animations and an AI assistant.

- **Live site:** https://gdg-frontend-rbu.vercel.app
- **Repository:** https://github.com/pratikshabhatt2007/GDG-RBU-Frontend-Task-Pratiksha-Bhatt
- **Author:** Pratiksha Bhatt

## Screenshots

### Desktop — Dark Mode

![GDG RBU Website — Desktop Dark Mode](https://github.com/user-attachments/assets/07dc98b4-0d09-4db8-aaee-012bbfdcbe07)

Desktop — Light Mode
(https://github.com/user-attachments/assets/0173c5e5-d9cb-4e0e-b3dc-0a2df8da68cf) 

## Features

- **Pages/sections:** Hero, Upcoming Event, Meet the Team, FAQs and Footer, matching the supplied Figma frame.
- **Light / dark mode:** toggle in the navbar. The choice is saved in `localStorage`, and the first visit follows the system setting. Boxes and the hero shape invert with the theme (white boxes in dark mode, black boxes in light mode).
- **Responsive:** layouts for mobile, tablet and desktop, with no horizontal scrolling.
- **Animations:** hero entrance, scroll-reveal sections, smooth FAQ accordion, hover states, a scroll-depth (parallax) effect on the hero with smooth scrolling, and an animated data-rain canvas background. All motion is switched off for visitors who set `prefers-reduced-motion`.
- **Accessibility:** semantic HTML, skip link, visible focus outlines, keyboard-operable accordion and chat, ARIA labels on icon buttons.
- **Ask GDG assistant (AI bonus):** a chat widget that answers questions about the chapter (see below).
- **TypeScript (bonus):** the whole frontend and the API function are written in TypeScript.

## Tech stack

| Area | Tools |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Plain CSS with design tokens (CSS variables) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll), canvas data-rain |
| AI | Google Gemini API through a Vercel serverless function |
| Hosting | Vercel |

## Getting started

### Prerequisites
- Node.js 18 or newer and npm
- (Only to test the chat locally) a Gemini API key and the Vercel CLI (`npx vercel`)

### Install and run
```bash
npm install
npm run dev          # http://localhost:5173
```

### Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run build` | Type-check and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

> `npm run dev` serves only the website. The chat answers come from the `api/` function, which needs `vercel dev` (below). Without it the chat shows a friendly "cannot reach" message.

### Environment variables
| Variable | Required | Meaning |
|---|---|---|
| `GEMINI_API_KEY` | For the chat | Your Gemini API key. Keep it server-side only. |
| `GEMINI_MODEL` | No | Overrides the model name. A list of fallback models is built in. |

Create a `.env.local` file in the project root (it is git-ignored):
```
GEMINI_API_KEY=your_key_here
```
Then run the site together with the API function:
```bash
npx vercel dev       # http://localhost:3000
```
Never commit your key.

## Ask GDG assistant

- The widget (`src/components/AskGDG.tsx`) sends the conversation to `POST /api/chat`.
- `api/chat.ts` calls the Gemini API and streams the answer back. It tries a fast model first, remembers the one that works, and falls back to non-streaming if streaming fails.
- The assistant is told to answer **only** from the facts written in `api/chat.ts` (chapter details, the upcoming event, address and email). If it doesn't know, it points to gdso@rknec.edu.
- Basic protection: the API key stays on the server, input length is capped, and there is a simple per-IP rate limit.
- **Privacy note:** visitors' questions are sent to Google's Gemini service to produce answers.

## Project structure

```
.
├── api/
│   └── chat.ts                    # Vercel serverless function (Gemini)
├── public/
│   ├── favicon.svg
│   └── team.jpg
├── src/
│   ├── components/
│   │   ├── AskGDG.tsx             # chat widget
│   │   └── ui/
│   │       ├── data-rain.tsx      # canvas background effect
│   │       └── parallax-scrolling.tsx  # scroll-depth + smooth scroll
│   ├── App.tsx                    # page sections (Header, Hero, Events, Team, FAQs, Footer)
│   ├── index.css                  # design tokens, themes and styles
│   └── main.tsx
├── index.html
├── vercel.json
├── package.json
└── tsconfig.json
```

## Deployment (Vercel)

1. Push the repository to GitHub.
2. In Vercel choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Under **Settings → Environment Variables** add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`).
5. Deploy. Environment variable changes only apply to new deployments, so redeploy after changing them.

## Notes and known limitations

- Built from the supplied Figma frames. Fonts, colours and the logo were matched by eye from the design images, so small differences are possible. Only the home frame was provided: Gallery and Portfolio scroll to existing sections rather than separate pages.
- **Next.js bonus not used.** The project uses Vite + React, which meets the core requirement; migrating late risked breaking a working site.
- The parallax component was adapted: it keeps the same GSAP + Lenis approach but applies depth to the hero elements instead of using stock images.
- Some FAQ answers and the social media links are placeholders until the final content is available.
- Lint and automated tests are not set up; checks run so far are `npm run typecheck` and `npm run build`.

## Credits

Design by GDG RBU. Implemented by Pratiksha Bhatt for the GDG RBU Recruitment 2026–27.
