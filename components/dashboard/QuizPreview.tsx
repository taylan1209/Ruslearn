"use client";

import { useMemo, useState } from "react";
import type { QuizChoice, QuizQuestion } from "@/types/dashboard";

interface QuizPreviewProps {
  question: QuizQuestion;
}

export const QuizPreview = ({ question }: QuizPreviewProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedChoice = useMemo<QuizChoice | undefined>(() => {
    return question.choices.find((choice) => choice.id === selected);
  }, [question.choices, selected]);

  return (
    <section className="glass-panel flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Açıklamalı 4 Şıklı Quiz
          </h2>
          <p className="text-sm text-slate-500">Yanlış cevapta anında açıklama</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
          {question.skillFocus}
        </span>
      </div>
      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner">
        {question.prompt}
      </p>
      <form className="grid gap-3">
        {question.choices.map((choice) => {
          const isActive = selected === choice.id;
          const isCorrect = choice.correct && selected !== null;
          return (
            <label
              key={choice.id}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="quiz-choice"
                  className="h-4 w-4 border-2 border-primary accent-primary"
                  checked={selected === choice.id}
                  onChange={() => setSelected(choice.id)}
                />
                <span>{choice.label}</span>
              </div>
              {isCorrect ? (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                  Doğru
                </span>
              ) : null}
            </label>
          );
        })}
      </form>
      <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4 text-sm text-slate-600">
        {selectedChoice ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-semibold text-slate-800">
                {selectedChoice.correct
                  ? "Harika! Doğru yanıt."
                  : "Bu seçenek neden yanlış?"}
              </p>
              <p>
                <span className="font-medium">TR:</span>{" "}
                {selectedChoice.explanationTr}
              </p>
              <p>
                <span className="font-medium">EN:</span>{" "}
                {selectedChoice.explanationEn}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Örnek Kullanım
              </p>
              <p className="text-slate-700">{selectedChoice.example}</p>
            </div>
          </div>
        ) : (
          <p className="text-slate-600">
            Bir seçenek seçtiğinizde hem doğru cevabın gerekçesini hem de diğer
            seçeneklerin neden hatalı olduğunu Türkçe ve İngilizce açıdan
            göreceksiniz.
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark">
          Quiz&apos;e Başla
        </button>
        <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary">
          Detaylı Rapor
        </button>
      </div>
    </section>
  );
};
