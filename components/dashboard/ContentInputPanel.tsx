"use client";

import { useState } from "react";
import { CharacterProgress } from "@/components/ui/CharacterProgress";
import { SectionTitle } from "@/components/ui/SectionTitle";

const MAX_CHAR = 5000;

const processingSteps = [
  "Clean and tokenize text",
  "Generate Turkish and English translations",
  "Produce sample sentences",
  "Rank by difficulty, then prepare quiz items"
];

export const ContentInputPanel = () => {
  const [value, setValue] = useState(
    "Hello! Paste Russian words or sentences here to build a learning set instantly."
  );

  const chars = value.length;
  const progress = Math.min((chars / MAX_CHAR) * 100, 100);

  return (
    <section
      id="content-input"
      className="glass-panel flex flex-col gap-6 lg:flex-row"
    >
      <div className="flex-1 space-y-4 p-6">
        <SectionTitle
          title="Content Intake"
          description="Paste any Russian text or vocabulary list; RusLearn will analyze it for you."
        />
        <textarea
          className="min-h-[220px] w-full resize-none rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={value}
          maxLength={MAX_CHAR}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Example: Привет, как дела? ..."
        />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CharacterProgress value={chars} limit={MAX_CHAR} progress={progress} />
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark">
              Import
            </button>
            <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary">
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="glass-panel mx-6 mb-6 flex max-w-sm flex-col gap-5 rounded-3xl border border-primary/10 bg-primary/5 p-6 text-sm text-slate-600 lg:mx-0 lg:my-6">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-800">
            Processing Steps
          </h3>
          <ul className="space-y-2 text-sm">
            {processingSteps.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-800">Tips</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Separate words with commas or line breaks.</li>
            <li>• Sentences are segmented automatically.</li>
            <li>• Keep punctuation to preserve context and stress clues.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
