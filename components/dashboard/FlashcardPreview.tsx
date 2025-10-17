"use client";

import { useState, useCallback, useMemo } from "react";
import type { Flashcard } from "@/types/dashboard";

interface FlashcardPreviewProps {
  flashcard: Flashcard;
}

export const FlashcardPreview = ({ flashcard }: FlashcardPreviewProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const speakTerm = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(flashcard.term);
    utterance.lang = "ru-RU";
    speechSynthesis.speak(utterance);
  }, [flashcard.term]);

  const difficultyLabel = useMemo(() => {
    switch (flashcard.difficulty) {
      case "easy":
        return "Easy";
      case "medium":
        return "Medium";
      case "hard":
        return "Hard";
      default:
        return "Unknown";
    }
  }, [flashcard.difficulty]);

  return (
    <section
      id="interactive-modes"
      className="glass-panel flex flex-col gap-6 p-6 lg:flex-row"
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Animated Flashcards
            </h2>
            <p className="text-sm text-slate-500">
              Learn vocabulary through interactive cards.
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
            {difficultyLabel}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFlipped((state) => !state)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary"
          >
            Flip card
          </button>
          <button
            onClick={speakTerm}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            Play audio
          </button>
        </div>
        <div className="relative h-64 w-full perspective-1000">
          <div
            className={`relative h-full w-full transform transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <figure className="card-gradient absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl p-6 text-center text-white shadow-card [backface-visibility:hidden]">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                Front
              </p>
              <p className="text-4xl font-semibold">{flashcard.term}</p>
              {flashcard.stressMark ? (
                <p className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
                  {flashcard.stressMark}
                </p>
              ) : null}
            </figure>

            <figure className="card-gradient-soft absolute inset-0 flex flex-col justify-between rounded-3xl p-6 text-slate-800 shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Back
                </p>
                <div className="text-2xl font-semibold text-slate-800">
                  {flashcard.translations.tr}
                </div>
                <div className="text-sm text-slate-500">
                  {flashcard.translations.en}
                </div>
              </header>
              <div className="space-y-2 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-inner">
                <p className="font-medium text-slate-700">Example</p>
                <p className="text-slate-900">{flashcard.example.sentence}</p>
                <div className="grid gap-1 text-xs text-slate-500">
                  <span>TR: {flashcard.example.translationTr}</span>
                  <span>EN: {flashcard.example.translationEn}</span>
                </div>
              </div>
              {flashcard.hints?.length ? (
                <ul className="space-y-1 text-xs text-slate-500">
                  {flashcard.hints.map((hint) => (
                    <li key={hint} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </figure>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-[#ff6b6b] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f25858]">
            I Don&apos;t Know
          </button>
          <button className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00b49c]">
            I Know
          </button>
          <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary">
            Start
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft lg:max-w-sm">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-800">
            Learning Progress
          </h3>
          <p className="text-sm text-slate-500">
            Our spaced-repetition engine schedules the optimal review order for you.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Last review</span>
            <span>2h ago</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Result</span>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
              100% correct
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
              <span>Next review</span>
              <span>in 6h</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Adaptive Modes
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Switch to listen-and-type drills</li>
            <li>• Activate microphone for speaking reps</li>
            <li>• Explore word families and prefix nuances</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
