import type { DashboardData } from "@/types/dashboard";

export const mockDashboardData: DashboardData = {
  flashcard: {
    id: "spasibo",
    term: "спасибо",
    stressMark: "спаси́бо",
    translations: {
      tr: "teşekkür ederim",
      en: "thank you"
    },
    example: {
      sentence: "Спасибо за помощь!",
      translationTr: "Yardım için teşekkür ederim!",
      translationEn: "Thanks for the help!"
    },
    hints: [
      "Vurgu ikinci hecede.",
      "Günlük ifadelerde sık kullanılır.",
      "Resmi ve samimi bağlamlarda geçerlidir."
    ],
    difficulty: "easy"
  },
  quizQuestion: {
    id: "greeting",
    prompt: "\"Merhaba\" Rusça'da nasıl söylenir?",
    type: "comprehension",
    skillFocus: "Selamlaşma & temel konuşma",
    choices: [
      {
        id: "privet",
        label: "привет",
        explanationTr: "Doğru cevap: günlük konuşmalarda merhaba demek için.",
        explanationEn: "Correct: informal hello / hi.",
        example: "Привет, как дела?",
        correct: true
      },
      {
        id: "spasibo",
        label: "спасибо",
        explanationTr: "Bu teşekkür ederim demek, selamlama değil.",
        explanationEn: "Means thank you, not a greeting.",
        example: "Спасибо за подарок.",
        correct: false
      },
      {
        id: "pozhaluysta",
        label: "пожалуйста",
        explanationTr: "Rica ederim / lütfen; selamlama için kullanılmaz.",
        explanationEn: "Means please / you're welcome.",
        example: "Пожалуйста, заходи.",
        correct: false
      },
      {
        id: "dosvidaniya",
        label: "до свидания",
        explanationTr: "Bu görüşürüz / hoşça kal demektir.",
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
      label: "Öğrenilen Kelime",
      delta: "+32 bugün",
      status: "up",
      hint: "Dünya ortalamasının %18 üzerinde."
    },
    {
      id: "accuracy",
      value: "89%",
      label: "Doğruluk Oranı",
      delta: "+4% bu hafta",
      status: "up"
    },
    {
      id: "dailyStreak",
      value: "23",
      label: "Günlük Seri",
      delta: "Son seri: 18 gün",
      status: "stable"
    },
    {
      id: "focusTime",
      value: "45dk",
      label: "Bugünkü Çalışma",
      delta: "+15dk hedefin üzerinde",
      status: "up"
    }
  ],
  activities: [
    {
      id: "daily-set",
      description: "Günlük kelimeler seti tamamlandı",
      timestamp: "32 dakika önce",
      xp: 50,
      type: "flashcard"
    },
    {
      id: "content-import",
      description: "Yeni içerik eklendi: \"Seyahat Terimleri\"",
      timestamp: "1 saat önce",
      xp: 20,
      type: "content"
    },
    {
      id: "quiz",
      description: "Quiz rekoru: %95 doğruluk",
      timestamp: "3 saat önce",
      xp: 100,
      type: "quiz"
    }
  ]
};
