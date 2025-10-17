export interface Flashcard {
  id: string;
  term: string;
  stressMark?: string;
  transliteration?: string;
  translations: {
    tr: string;
    en: string;
  };
  example: {
    sentence: string;
    translationTr: string;
    translationEn: string;
  };
  hints?: string[];
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizChoice {
  id: string;
  label: string;
  explanationTr: string;
  explanationEn: string;
  example: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  type: "comprehension" | "production" | "listening" | "grammar";
  choices: QuizChoice[];
  skillFocus: string;
}

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  xp: number;
  type: "flashcard" | "quiz" | "content" | "practice";
}

export interface MetricCard {
  id: string;
  value: string;
  label: string;
  delta?: string;
  status?: "up" | "stable" | "down";
  hint?: string;
}

export interface DashboardData {
  flashcard: Flashcard;
  quizQuestion: QuizQuestion;
  activities: ActivityItem[];
  metrics: MetricCard[];
}
