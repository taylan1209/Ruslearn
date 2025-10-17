import type { DashboardData } from "@/types/dashboard";

export const mockDashboardData: DashboardData = {
  flashcard: {
    id: "spasibo",
    term: "спасибо",
    stressMark: "спаси́бо",
    translations: {
      tr: "thank you (Turkish translation)",
      en: "thank you"
    },
    example: {
      sentence: "Спасибо за помощь!",
      translationTr: "Turkish translation: thanks for the help!",
      translationEn: "Thanks for the help!"
    },
    hints: [
      "Stress falls on the second syllable.",
      "Used constantly in everyday conversations.",
      "Appropriate in both formal and casual contexts."
    ],
    difficulty: "easy"
  },
  quizQuestion: {
    id: "greeting",
    prompt: "How do you say “hello” in Russian?",
    type: "comprehension",
    skillFocus: "Greetings & basic conversation",
    choices: [
      {
        id: "privet",
        label: "привет",
        explanationTr: "Turkish explanation: the correct everyday greeting.",
        explanationEn: "Correct: informal hello / hi.",
        example: "Привет, как дела?",
        correct: true
      },
      {
        id: "spasibo",
        label: "спасибо",
        explanationTr:
          "Turkish explanation: means thank you, not a greeting.",
        explanationEn: "Means thank you, not a greeting.",
        example: "Спасибо за подарок.",
        correct: false
      },
      {
        id: "pozhaluysta",
        label: "пожалуйста",
        explanationTr:
          "Turkish explanation: translates to please / you're welcome.",
        explanationEn: "Means please / you're welcome.",
        example: "Пожалуйста, заходи.",
        correct: false
      },
      {
        id: "dosvidaniya",
        label: "до свидания",
        explanationTr:
          "Turkish explanation: corresponds to goodbye or see you later.",
        explanationEn: "Goodbye or see you later.",
        example: "До свидания, до завтра.",
        correct: false
      }
    ]
  },
  metrics: [
    {
      id: "wordsLearned",
      value: "1,247",
      label: "Words Learned",
      delta: "+32 today",
      status: "up",
      hint: "18% above the global average."
    },
    {
      id: "accuracy",
      value: "89%",
      label: "Accuracy Rate",
      delta: "+4% this week",
      status: "up"
    },
    {
      id: "dailyStreak",
      value: "23",
      label: "Day Streak",
      delta: "Previous streak: 18 days",
      status: "stable"
    },
    {
      id: "focusTime",
      value: "45 min",
      label: "Focus Time Today",
      delta: "+15 min over goal",
      status: "up"
    }
  ],
  activities: [
    {
      id: "daily-set",
      description: "Daily word set completed",
      timestamp: "32 minutes ago",
      xp: 50,
      type: "flashcard"
    },
    {
      id: "content-import",
      description: "New content added: “Travel Expressions”",
      timestamp: "1 hour ago",
      xp: 20,
      type: "content"
    },
    {
      id: "quiz",
      description: "Quiz milestone: 95% accuracy",
      timestamp: "3 hours ago",
      xp: 100,
      type: "quiz"
    }
  ]
};
