import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch
} from "firebase/firestore";

type CollectionSeed = Record<string, Array<Record<string, unknown>>>;

const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID"
] as const;

requiredEnvVars.forEach((envKey) => {
  if (!process.env[envKey]) {
    throw new Error(
      `Missing environment variable: ${envKey}. Please verify your .env.local file.`
    );
  }
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const nowIso = () => new Date().toISOString();

const seedData: CollectionSeed = {
  flashcards: [
    {
      id: "spasibo",
      term: "спасибо",
      stressMark: "спаси́бо",
      translations: { tr: "thank you (Turkish translation)", en: "thank you" },
      example: {
        sentence: "Спасибо за помощь!",
        translationTr: "Turkish translation: thanks for the help!",
        translationEn: "Thanks for the help!"
      },
      hints: [
        "Stress falls on the second syllable.",
        "A core phrase in daily conversation.",
        "Fits both formal and informal contexts."
      ],
      difficulty: "easy",
      tags: ["greetings", "everyday"],
      createdAt: nowIso()
    },
    {
      id: "privet",
      term: "привет",
      stressMark: "приве́т",
      translations: { tr: "hello (Turkish translation)", en: "hello" },
      example: {
        sentence: "Привет, как дела?",
        translationTr: "Turkish translation: hello, how are you?",
        translationEn: "Hi, how are you?"
      },
      hints: [
        "Casual greeting used with friends.",
        "Too informal for strangers or formal settings.",
        "Formal variant: «Здравствуйте»."
      ],
      difficulty: "easy",
      tags: ["greetings", "everyday"],
      createdAt: nowIso()
    },
    {
      id: "pozhaluysta",
      term: "пожалуйста",
      stressMark: "пожалу́йста",
      translations: {
        tr: "please / you're welcome (Turkish translation)",
        en: "please / you're welcome"
      },
      example: {
        sentence: "Пожалуйста, приходите завтра.",
        translationTr: "Turkish translation: please come tomorrow.",
        translationEn: "Please come tomorrow."
      },
      hints: [
        "Carries both request and response meanings.",
        "Useful for politeness drills and dialogs.",
        "Pairs well with listening dictations."
      ],
      difficulty: "medium",
      tags: ["politeness"],
      createdAt: nowIso()
    },
    {
      id: "do-svidaniya",
      term: "до свидания",
      stressMark: "до свида́ния",
      translations: { tr: "goodbye (Turkish translation)", en: "goodbye" },
      example: {
        sentence: "До свидания, до завтра!",
        translationTr: "Turkish translation: goodbye, see you tomorrow!",
        translationEn: "Goodbye, see you tomorrow!"
      },
      hints: [
        "Appropriate across formal and informal contexts.",
        "Literal meaning: “until we meet again”."
      ],
      difficulty: "easy",
      tags: ["greetings", "everyday"],
      createdAt: nowIso()
    },
    {
      id: "vstrecha",
      term: "встреча",
      stressMark: "встре́ча",
      translations: { tr: "meeting (Turkish translation)", en: "meeting" },
      example: {
        sentence: "У нас сегодня важная встреча с партнёрами.",
        translationTr:
          "Turkish translation: we have an important meeting with partners today.",
        translationEn: "We have an important meeting with partners today."
      },
      hints: [
        "Common in professional and academic contexts.",
        "Verb form: «встречаться» — to meet."
      ],
      difficulty: "medium",
      tags: ["business", "professional"],
      createdAt: nowIso()
    },
    {
      id: "uspekh",
      term: "успех",
      stressMark: "успе́х",
      translations: { tr: "success (Turkish translation)", en: "success" },
      example: {
        sentence: "Труд и упорство ведут к успеху.",
        translationTr:
          "Turkish translation: effort and perseverance lead to success.",
        translationEn: "Work and perseverance lead to success."
      },
      hints: [
        "Noun, singular.",
        "Often appears in the phrase «добиться успеха» — to achieve success."
      ],
      difficulty: "hard",
      tags: ["abstract", "motivation"],
      createdAt: nowIso()
    }
  ],
  quizQuestions: [
    {
      id: "quiz-greeting-01",
      prompt: "How do you say “hello” in Russian?",
      type: "comprehension",
      skillFocus: "Greetings & basic conversation",
      choices: [
        {
          id: "privet",
          label: "привет",
          explanationTr: "Turkish explanation: correct everyday greeting.",
          explanationEn: "Correct option: informal hello.",
          example: "Привет, как дела?",
          correct: true
        },
        {
          id: "spasibo",
          label: "спасибо",
          explanationTr:
            "Turkish explanation: translates to thank you, not hello.",
          explanationEn: "Means thank you, not a greeting.",
          example: "Спасибо за подарок.",
          correct: false
        },
        {
          id: "pozhaluysta",
          label: "пожалуйста",
          explanationTr:
            "Turkish explanation: means please / you're welcome.",
          explanationEn: "Means please / you're welcome.",
          example: "Пожалуйста, заходи.",
          correct: false
        },
        {
          id: "do-svidaniya",
          label: "до свидания",
          explanationTr:
            "Turkish explanation: corresponds to goodbye or see you later.",
          explanationEn: "Goodbye or see you later.",
          example: "До свидания, до завтра.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-grammar-01",
      prompt: "Fill in the blank: «Мы ___ в Москве вчера».",
      type: "grammar",
      skillFocus: "Past tense verb conjugation",
      choices: [
        {
          id: "byli",
          label: "были",
          explanationTr:
            "Turkish explanation: plural past tense of the verb «быть».",
          explanationEn: "Correct plural past tense of «быть».",
          example: "Мы были в театре.",
          correct: true
        },
        {
          id: "byl",
          label: "был",
          explanationTr:
            "Turkish explanation: used for singular masculine subjects.",
          explanationEn: "Used for singular masculine subjects.",
          example: "Он был в Москве.",
          correct: false
        },
        {
          id: "byla",
          label: "была",
          explanationTr:
            "Turkish explanation: used for singular feminine subjects.",
          explanationEn: "Used for singular feminine subjects.",
          example: "Она была в Москве.",
          correct: false
        },
        {
          id: "budem",
          label: "будем",
          explanationTr:
            "Turkish explanation: future tense form, does not fit the sentence.",
          explanationEn: "Future tense form; doesn't match the sentence.",
          example: "Мы будем в Москве завтра.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-listening-01",
      prompt:
        "Listening: what does «Пожалуйста, повторите ещё раз.» mean in English?",
      type: "listening",
      skillFocus: "Listening comprehension",
      audioUrl: "https://storage.googleapis.com/ruslearn-demo/audio/repeat-please.mp3",
      choices: [
        {
          id: "repeat",
          label: "Please repeat that.",
          explanationTr: "Turkish explanation: correct translation.",
          explanationEn: "Correct translation.",
          example: "Пожалуйста, повторите ещё раз, я не услышал.",
          correct: true
        },
        {
          id: "wait",
          label: "Please wait.",
          explanationTr:
            "Turkish explanation: would require the verb «подождать».",
          explanationEn: "Would require the verb «подождать».",
          example: "Пожалуйста, подождите.",
          correct: false
        },
        {
          id: "speak-louder",
          label: "Could you speak louder?",
          explanationTr:
            "Turkish explanation: needs the phrase «Говорите громче».",
          explanationEn: "Needs «Говорите громче».",
          example: "Говорите, пожалуйста, громче.",
          correct: false
        },
        {
          id: "goodbye",
          label: "Goodbye.",
          explanationTr:
            "Turkish explanation: corresponds to «до свидания».",
          explanationEn: "Means «до свидания».",
          example: "До свидания, до встречи.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-production-01",
      prompt: "Choose the Russian equivalent of “thank you”.",
      type: "production",
      skillFocus: "Active vocabulary recall",
      choices: [
        {
          id: "spasibo",
          label: "спасибо",
          explanationTr: "Turkish explanation: the correct translation.",
          explanationEn: "Correct translation.",
          example: "Спасибо, это было вкусно.",
          correct: true
        },
        {
          id: "pozhaluysta",
          label: "пожалуйста",
          explanationTr:
            "Turkish explanation: translates to please / you're welcome.",
          explanationEn: "Means please / you're welcome.",
          example: "Пожалуйста, не опаздывай.",
          correct: false
        },
        {
          id: "zdravstvuyte",
          label: "здравствуйте",
          explanationTr: "Turkish explanation: formal greeting.",
          explanationEn: "Formal greeting.",
          example: "Здравствуйте, меня зовут Анна.",
          correct: false
        },
        {
          id: "do-svidaniya",
          label: "до свидания",
          explanationTr: "Turkish explanation: means goodbye.",
          explanationEn: "Means goodbye.",
          example: "До свидания, до встречи.",
          correct: false
        }
      ],
      createdAt: nowIso()
    }
  ],
  metrics: [
    {
      id: "wordsLearned",
      value: "1,247",
      label: "Words Learned",
      delta: "+32 today",
      status: "up",
      hint: "18% above the global average.",
      createdAt: nowIso()
    },
    {
      id: "accuracy",
      value: "89%",
      label: "Accuracy Rate",
      delta: "+4% this week",
      status: "up",
      createdAt: nowIso()
    },
    {
      id: "dailyStreak",
      value: "23",
      label: "Day Streak",
      delta: "Previous streak: 18 days",
      status: "stable",
      createdAt: nowIso()
    },
    {
      id: "focusTime",
      value: "45 min",
      label: "Focus Time Today",
      delta: "+15 min above target",
      status: "up",
      createdAt: nowIso()
    }
  ],
  activities: [
    {
      id: "activity-daily-set",
      description: "Daily vocabulary set completed",
      timestamp: "32 minutes ago",
      xp: 50,
      type: "flashcard",
      createdAt: nowIso()
    },
    {
      id: "activity-content-import",
      description: "New content added: “Travel Expressions”",
      timestamp: "1 hour ago",
      xp: 20,
      type: "content",
      createdAt: nowIso()
    },
    {
      id: "activity-quiz-record",
      description: "Quiz record: 95% accuracy",
      timestamp: "3 hours ago",
      xp: 100,
      type: "quiz",
      createdAt: nowIso()
    },
    {
      id: "activity-speaking",
      description: "Speaking drill: repeated 10 sentences",
      timestamp: "6 hours ago",
      xp: 35,
      type: "practice",
      createdAt: nowIso()
    },
    {
      id: "activity-listening",
      description: "Listening dictation completed",
      timestamp: "Yesterday",
      xp: 40,
      type: "practice",
      createdAt: nowIso()
    }
  ],
  clozeExercises: [
    {
      id: "cloze-001",
      sentence: "___, как тебя зовут?",
      answer: "Привет",
      translations: {
        tr: "Turkish translation: hello, what's your name?",
        en: "Hi, what's your name?"
      },
      hints: ["Set phrase that follows a casual greeting."],
      createdAt: nowIso()
    },
    {
      id: "cloze-002",
      sentence: "Большое спасибо за ___ помощь.",
      answer: "вашу",
      translations: {
        tr: "Turkish translation: thank you very much for your help.",
        en: "Thank you very much for your help."
      },
      hints: ["Requires the polite possessive form."],
      createdAt: nowIso()
    }
  ],
  matchingSets: [
    {
      id: "matching-greetings",
      title: "Greetings",
      items: [
        { ru: "привет", tr: "hello (Turkish translation)" },
        { ru: "здравствуйте", tr: "hello (formal, Turkish translation)" },
        { ru: "до свидания", tr: "goodbye (Turkish translation)" },
        { ru: "спасибо", tr: "thank you (Turkish translation)" }
      ],
      createdAt: nowIso()
    }
  ],
  listeningDrills: [
    {
      id: "listening-repetition-1",
      prompt: "Listen to the audio and transcribe the sentence in Cyrillic.",
      audioUrl: "https://storage.googleapis.com/ruslearn-demo/audio/privet.mp3",
      answer: "Привет! Как дела?",
      createdAt: nowIso()
    }
  ],
  speakingPrompts: [
    {
      id: "speaking-001",
      prompt:
        "Greet someone and introduce yourself. Hint: «Привет! Меня зовут ...»",
      focus: "Greetings and self-introduction",
      createdAt: nowIso()
    },
    {
      id: "speaking-002",
      prompt:
        "Politely ask someone to repeat. Hint: «Пожалуйста, повторите ещё раз.»",
      focus: "Polite requests",
      createdAt: nowIso()
    }
  ],
  wordFamilies: [
    {
      id: "word-family-delat",
      base: "делать",
      derivatives: [
        {
          word: "сделать",
          tr: "to do / to complete (Turkish translation)",
          en: "to do / complete"
        },
        {
          word: "поделать",
          tr: "to do for a while (Turkish translation)",
          en: "to do for a while"
        },
        {
          word: "переделать",
          tr: "to redo (Turkish translation)",
          en: "to redo"
        }
      ],
      notes: "Mini module on how prefixes shift the meaning of «делать».",
      createdAt: nowIso()
    }
  ],
  frequencyDecks: [
    {
      id: "frequency-top25",
      title: "Top 25 High-Frequency Words",
      description: "Core vocabulary that appears most often in daily dialogs.",
      difficulty: "easy",
      flashcardIds: ["spasibo", "privet", "pozhaluysta", "do-svidaniya"],
      createdAt: nowIso()
    },
    {
      id: "theme-travel",
      title: "Travel Theme",
      description: "Russian words and phrases that simplify your trips.",
      difficulty: "medium",
      flashcardIds: ["vstrecha", "spasibo", "pozhaluysta"],
      createdAt: nowIso()
    }
  ]
};

const seedFirestore = async () => {
  const collectionNames = Object.keys(seedData) as Array<keyof typeof seedData>;

  for (const name of collectionNames) {
    const items = seedData[name];
    console.log(`→ Writing ${items.length} records to the ${name} collection...`);

    const batch = writeBatch(db);
    const colRef = collection(db, name);

    items.forEach((item) => {
      const { id, ...rest } = item;
      if (typeof id !== "string" || !id.trim()) {
        throw new Error(
          `Items in the ${name} collection must include a non-empty 'id' field.`
        );
      }
      const docRef = doc(colRef, id);
      batch.set(docRef, { id, ...rest });
    });

    await batch.commit();
  }
};

seedFirestore()
  .then(() => {
    console.log("✅ Firestore seed data written successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Firestore seeding failed:", error);
    process.exit(1);
  });
