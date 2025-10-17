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
      `Ortam değişkeni eksik: ${envKey}. Lütfen .env.local dosyanızı kontrol edin.`
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
      translations: { tr: "teşekkür ederim", en: "thank you" },
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
      difficulty: "easy",
      tags: ["selamlaşma", "gündelik"],
      createdAt: nowIso()
    },
    {
      id: "privet",
      term: "привет",
      stressMark: "приве́т",
      translations: { tr: "merhaba", en: "hello" },
      example: {
        sentence: "Привет, как дела?",
        translationTr: "Merhaba, nasılsın?",
        translationEn: "Hi, how are you?"
      },
      hints: [
        "Samimi selamlaşma.",
        "Yabancılara karşı resmi değil.",
        "Resmi versiyon: «Здравствуйте»."
      ],
      difficulty: "easy",
      tags: ["selamlaşma", "gündelik"],
      createdAt: nowIso()
    },
    {
      id: "pozhaluysta",
      term: "пожалуйста",
      stressMark: "пожалу́йста",
      translations: { tr: "lütfen / rica ederim", en: "please / you're welcome" },
      example: {
        sentence: "Пожалуйста, приходите завтра.",
        translationTr: "Lütfen yarın gelin.",
        translationEn: "Please come tomorrow."
      },
      hints: [
        "Hem lütfen hem de rica ederim anlamında.",
        "Çok kiplik bağlamında kullanılır.",
        "Dinleme alıştırmaları için uygun."
      ],
      difficulty: "medium",
      tags: ["nazik ifadeler"],
      createdAt: nowIso()
    },
    {
      id: "do-svidaniya",
      term: "до свидания",
      stressMark: "до свида́ния",
      translations: { tr: "hoşça kalın", en: "goodbye" },
      example: {
        sentence: "До свидания, до завтра!",
        translationTr: "Hoşça kalın, yarın görüşürüz!",
        translationEn: "Goodbye, see you tomorrow!"
      },
      hints: [
        "Resmi ve samimi bağlamlarda uygun.",
        "Kelime kelime çeviri: 'görüşene kadar'."
      ],
      difficulty: "easy",
      tags: ["selamlaşma", "günlük"],
      createdAt: nowIso()
    },
    {
      id: "vstrecha",
      term: "встреча",
      stressMark: "встре́ча",
      translations: { tr: "toplantı", en: "meeting" },
      example: {
        sentence: "У нас сегодня важная встреча с партнёрами.",
        translationTr: "Bugün partnerlerle önemli bir toplantımız var.",
        translationEn: "We have an important meeting with partners today."
      },
      hints: [
        "İş ve akademik bağlamlarda sık geçer.",
        "Fiil hâli: «встречаться» - buluşmak."
      ],
      difficulty: "medium",
      tags: ["iş", "profesyonel"],
      createdAt: nowIso()
    },
    {
      id: "uspekh",
      term: "успех",
      stressMark: "успе́х",
      translations: { tr: "başarı", en: "success" },
      example: {
        sentence: "Труд и упорство ведут к успеху.",
        translationTr: "Emek ve azim başarıya götürür.",
        translationEn: "Work and perseverance lead to success."
      },
      hints: [
        "İsim, tekil.",
        "Sıklıkla «добиться успеха» kalıbında kullanılır."
      ],
      difficulty: "hard",
      tags: ["soyut", "motivasyon"],
      createdAt: nowIso()
    }
  ],
  quizQuestions: [
    {
      id: "quiz-greeting-01",
      prompt: "\"Merhaba\" Rusça'da nasıl söylenir?",
      type: "comprehension",
      skillFocus: "Selamlaşma & temel konuşma",
      choices: [
        {
          id: "privet",
          label: "привет",
          explanationTr: "Doğru cevap: günlük konuşmalarda merhaba demek için.",
          explanationEn: "Correct option: informal hello.",
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
          id: "do-svidaniya",
          label: "до свидания",
          explanationTr: "Bu görüşürüz / hoşça kal demektir.",
          explanationEn: "Goodbye or see you later.",
          example: "До свидания, до завтра.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-grammar-01",
      prompt: "Aşağıdaki cümlede boşluğu doğru doldurun: «Мы ___ в Москве вчера».",
      type: "grammar",
      skillFocus: "Geçmiş zaman fiil çekimi",
      choices: [
        {
          id: "byli",
          label: "были",
          explanationTr: "Doğru: Çoğul özne için geçmiş zaman «быть» fiilinin şekli.",
          explanationEn: "Correct plural past tense of «быть».",
          example: "Мы были в театре.",
          correct: true
        },
        {
          id: "byl",
          label: "был",
          explanationTr: "Erkek tekil özneler için kullanılır.",
          explanationEn: "Used for singular masculine subjects.",
          example: "Он был в Москве.",
          correct: false
        },
        {
          id: "byla",
          label: "была",
          explanationTr: "Dişil tekil özneler için geçerlidir.",
          explanationEn: "Used for singular feminine subjects.",
          example: "Она была в Москве.",
          correct: false
        },
        {
          id: "budem",
          label: "будем",
          explanationTr: "Gelecek zaman çekimi, cümleye uymaz.",
          explanationEn: "Future tense form; doesn't match the sentence.",
          example: "Мы будем в Москве завтра.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-listening-01",
      prompt: "Dinleme: «Пожалуйста, повторите ещё раз.» cümlesi ne anlama gelir?",
      type: "listening",
      skillFocus: "Dinlediğini anlama",
      audioUrl: "https://storage.googleapis.com/ruslearn-demo/audio/repeat-please.mp3",
      choices: [
        {
          id: "repeat",
          label: "Lütfen tekrar eder misiniz?",
          explanationTr: "Doğru çeviri.",
          explanationEn: "Correct translation.",
          example: "Пожалуйста, повторите ещё раз, я не услышал.",
          correct: true
        },
        {
          id: "wait",
          label: "Lütfen bekleyin.",
          explanationTr: "Fiil «подождать» olmalıydı.",
          explanationEn: "Would require the verb «подождать».",
          example: "Пожалуйста, подождите.",
          correct: false
        },
        {
          id: "speak-louder",
          label: "Daha yüksek sesle konuşur musunuz?",
          explanationTr: "Bu anlam için «Говорите громче» gerekir.",
          explanationEn: "Needs «Говорите громче».",
          example: "Говорите, пожалуйста, громче.",
          correct: false
        },
        {
          id: "goodbye",
          label: "Hoşça kalın.",
          explanationTr: "Bu «до свидания» anlamına gelir.",
          explanationEn: "Means «до свидания».",
          example: "До свидания, до встречи.",
          correct: false
        }
      ],
      createdAt: nowIso()
    },
    {
      id: "quiz-production-01",
      prompt: "\"Teşekkür ederim\" ifadesinin Rusça karşılığını seçin.",
      type: "production",
      skillFocus: "Aktif kelime kullanımı",
      choices: [
        {
          id: "spasibo",
          label: "спасибо",
          explanationTr: "Doğru karşılık.",
          explanationEn: "Correct translation.",
          example: "Спасибо, это было вкусно.",
          correct: true
        },
        {
          id: "pozhaluysta",
          label: "пожалуйста",
          explanationTr: "Bu rica ederim / lütfen demek.",
          explanationEn: "Means please / you're welcome.",
          example: "Пожалуйста, не опаздывай.",
          correct: false
        },
        {
          id: "zdravstvuyte",
          label: "здравствуйте",
          explanationTr: "Resmi selamlaşma.",
          explanationEn: "Formal greeting.",
          example: "Здравствуйте, меня зовут Анна.",
          correct: false
        },
        {
          id: "do-svidaniya",
          label: "до свидания",
          explanationTr: "Hoşça kalın anlamına gelir.",
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
      label: "Öğrenilen Kelime",
      delta: "+32 bugün",
      status: "up",
      hint: "Dünya ortalamasının %18 üzerinde.",
      createdAt: nowIso()
    },
    {
      id: "accuracy",
      value: "89%",
      label: "Doğruluk Oranı",
      delta: "+4% bu hafta",
      status: "up",
      createdAt: nowIso()
    },
    {
      id: "dailyStreak",
      value: "23",
      label: "Günlük Seri",
      delta: "Son seri: 18 gün",
      status: "stable",
      createdAt: nowIso()
    },
    {
      id: "focusTime",
      value: "45dk",
      label: "Bugünkü Çalışma",
      delta: "+15dk hedefin üzerinde",
      status: "up",
      createdAt: nowIso()
    }
  ],
  activities: [
    {
      id: "activity-daily-set",
      description: "Günlük kelimeler seti tamamlandı",
      timestamp: "32 dakika önce",
      xp: 50,
      type: "flashcard",
      createdAt: nowIso()
    },
    {
      id: "activity-content-import",
      description: "Yeni içerik eklendi: \"Seyahat Terimleri\"",
      timestamp: "1 saat önce",
      xp: 20,
      type: "content",
      createdAt: nowIso()
    },
    {
      id: "activity-quiz-record",
      description: "Quiz rekoru: %95 doğruluk",
      timestamp: "3 saat önce",
      xp: 100,
      type: "quiz",
      createdAt: nowIso()
    },
    {
      id: "activity-speaking",
      description: "Konuşma pratiği: 10 cümle tekrar edildi",
      timestamp: "6 saat önce",
      xp: 35,
      type: "practice",
      createdAt: nowIso()
    },
    {
      id: "activity-listening",
      description: "Dinleme-yazma alıştırması tamamlandı",
      timestamp: "Dün",
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
        tr: "Merhaba, adın ne?",
        en: "Hi, what's your name?"
      },
      hints: ["Selamlaşmadan sonra kullanılan kalıp"],
      createdAt: nowIso()
    },
    {
      id: "cloze-002",
      sentence: "Большое спасибо за ___ помощь.",
      answer: "вашу",
      translations: {
        tr: "Yardımınız için çok teşekkürler.",
        en: "Thank you very much for your help."
      },
      hints: ["Saygılı hitap eki kullanılır"],
      createdAt: nowIso()
    }
  ],
  matchingSets: [
    {
      id: "matching-greetings",
      title: "Selamlaşmalar",
      items: [
        { ru: "привет", tr: "merhaba" },
        { ru: "здравствуйте", tr: "merhaba (resmi)" },
        { ru: "до свидания", tr: "hoşça kalın" },
        { ru: "спасибо", tr: "teşekkür ederim" }
      ],
      createdAt: nowIso()
    }
  ],
  listeningDrills: [
    {
      id: "listening-repetition-1",
      prompt: "Seslendirmeyi dinleyip cümleyi Kiril alfabesiyle yazın.",
      audioUrl: "https://storage.googleapis.com/ruslearn-demo/audio/privet.mp3",
      answer: "Привет! Как дела?",
      createdAt: nowIso()
    }
  ],
  speakingPrompts: [
    {
      id: "speaking-001",
      prompt:
        "Merhaba deyip kendinizi tanıtın. İpucu: «Привет! Меня зовут ...»",
      focus: "Selamlaşma ve öz tanıtım",
      createdAt: nowIso()
    },
    {
      id: "speaking-002",
      prompt:
        "Birinden nazikçe tekrar etmesini isteyin. İpucu: «Пожалуйста, повторите ещё раз.»",
      focus: "Kibar istekler",
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
          tr: "yapmak (tamamlamak)",
          en: "to do/complete"
        },
        {
          word: "поделать",
          tr: "bir süre yapmak",
          en: "to do for a while"
        },
        {
          word: "переделать",
          tr: "tekrar yapmak / yeniden yapmak",
          en: "redo"
        }
      ],
      notes: "Öneklerle anlam değişimi üzerine mini modül.",
      createdAt: nowIso()
    }
  ],
  frequencyDecks: [
    {
      id: "frequency-top25",
      title: "İlk 25 yüksek frekanslı kelime",
      description: "Günlük diyaloglarda en sık karşılaşılan kelimeler.",
      difficulty: "easy",
      flashcardIds: ["spasibo", "privet", "pozhaluysta", "do-svidaniya"],
      createdAt: nowIso()
    },
    {
      id: "theme-travel",
      title: "Seyahat Teması",
      description: "Seyahat ederken işinize yarayacak Rusça kelime ve kalıplar.",
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
    console.log(`→ ${name} koleksiyonuna ${items.length} kayıt yazılıyor...`);

    const batch = writeBatch(db);
    const colRef = collection(db, name);

    items.forEach((item) => {
      const { id, ...rest } = item;
      if (typeof id !== "string" || !id.trim()) {
        throw new Error(
          `${name} koleksiyonundaki öğeler 'id' alanına sahip olmalıdır.`
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
    console.log("✅ Firestore örnek verileri başarıyla yazıldı.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Firestore veri yazma sırasında hata oluştu:", error);
    process.exit(1);
  });
