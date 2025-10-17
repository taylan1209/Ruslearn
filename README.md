# RusLearn Dashboard (Next.js + Firebase)

Welcome to the RusLearn prototype! This Next.js app turns copy‑pasted Russian text into playful learning experiences. The interface mirrors the design mock from the brief and is wired to Firestore with a safety net of mock data, so you can explore the UI even before your backend is ready.

## Why You’ll Like This Project

- 🎯 **Dashboard focus:** Flashcard and quiz previews, content ingestion flow, XP metrics, and recent activity cards in a single, glanceable layout.
- 🂠 **Animated flashcards:** Smooth flip animation, stress mark highlight, and one‑click Text‑to‑Speech for Russian terms.
- ❓ **Explained quizzes:** Four-choice questions with instant Turkish + English feedback and example sentences for every option.
- ⚙️ **Firebase friendly:** Firestore + Analytics bootstrap helpers, plus graceful fallback to mock data when credentials are missing.
- 🎨 **Refined styling:** Tailwind-based gradients, glassmorphism panels, and motion accents echoing the supplied visual reference.

## Getting Started

```bash
npm install
npm run dev
```

The development server will spin up on `http://localhost:3000`.

## Firebase Setup

1. Create (or reuse) a Firebase project and add a web app from the [Firebase console](https://console.firebase.google.com/).
2. Enable Firestore in “Start in test mode” while prototyping.
3. Copy `README.md`’s sample environment configuration:
   ```bash
   cp .env.example .env.local
   ```
4. Paste your Firebase keys into `.env.local`. The repo already includes the credentials you shared (`ruslearn-81be8`), but feel free to swap them out with your own project.

> Tip: The app falls back to `lib/mockData.ts` if Firestore can’t be reached, so you can still demo the UI offline.

## Load Demo Data into Firestore

Need realistic data without typing everything by hand? Run the seed script once your `.env.local` is in place:

```bash
npm run seed
```

The script uses the client SDK to populate collections such as `flashcards`, `quizQuestions`, `activities`, `metrics`, `clozeExercises`, `matchingSets`, `listeningDrills`, `speakingPrompts`, `wordFamilies`, and `frequencyDecks`. Each record mirrors the types in `types/dashboard.ts`, so you can extend them confidently.

> Heads‑up: Because the script uses the browser SDK, any strict Firestore security rules or IP restrictions must allow your local machine during seeding.

## Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm start` – Serve the production build.
- `npm run lint` – Run ESLint checks.
- `npm run type-check` – Run TypeScript without emitting files.
- `npm run seed` – Populate Firestore with sample content.

## Project Structure (Snapshot)

```
app/
  layout.tsx                Global layout + meta
  page.tsx                  Dashboard entry point
  globals.css               Tailwind + shared styles
components/
  dashboard/*               Dashboard-specific UI
  layout/TopNav.tsx         Header navigation
  ui/*                      Reusable UI helpers
lib/
  firebase.ts               Firebase app + Firestore helpers
  firebaseAnalytics.ts      Opt-in Analytics bootstrapper
  dashboardService.ts       Chooses Firestore or mock data
  mockData.ts               Offline demo dataset
types/
  dashboard.ts              Shared TypeScript types
scripts/
  seedFirestore.ts          Firestore seeding utility
```

## What’s Next?

- Hook up the “Import” button to parse user text and write flashcards/quizzes into Firestore.
- Extend adaptive logic: personalize streaks, difficulty, and review cadence per user.
- Gate advanced practice modes (dictation, speaking, word families) behind feature flags or user roles.
- When you’re ready, initialize a repo (`git init`), commit your changes, add a GitHub remote, and push to share your progress.

Happy shipping! If you get stuck or want to brainstorm new learning modes, just ask. 🚀
