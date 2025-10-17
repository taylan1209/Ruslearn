import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  type Firestore,
  collection,
  getDocs,
  query,
  limit
} from "firebase/firestore";
import type { DashboardData, Flashcard, QuizQuestion } from "@/types/dashboard";

let firebaseApp: FirebaseApp | undefined;
let firestore: Firestore | undefined;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseApp) {
    if (!firebaseConfig.projectId) {
      throw new Error("Missing Firebase configuration. Check environment variables.");
    }

    firebaseApp = getApps().length
      ? getApps()[0]!
      : initializeApp(firebaseConfig);
  }

  return firebaseApp;
};

export const getFirebaseDb = (): Firestore => {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp());
  }
  return firestore;
};

export const fetchDashboardSnapshot = async (): Promise<DashboardData> => {
  const db = getFirebaseDb();

  const [flashcardSnapshot, quizSnapshot, activitySnapshot, metricSnapshot] =
    await Promise.all([
      getDocs(query(collection(db, "flashcards"), limit(1))),
      getDocs(query(collection(db, "quizQuestions"), limit(1))),
      getDocs(query(collection(db, "activities"), limit(10))),
      getDocs(query(collection(db, "metrics"), limit(4)))
    ]);

  const flashcardDoc = flashcardSnapshot.docs[0];
  const flashcard = flashcardDoc
    ? ({ id: flashcardDoc.id, ...flashcardDoc.data() } as Flashcard)
    : undefined;
  const quizDoc = quizSnapshot.docs[0];
  const quizQuestion = quizDoc
    ? ({ id: quizDoc.id, ...quizDoc.data() } as QuizQuestion)
    : undefined;

  return {
    flashcard:
      flashcard ??
      (() => {
        throw new Error("No flashcard documents found in Firestore.");
      })(),
    quizQuestion:
      quizQuestion ??
      (() => {
        throw new Error("No quiz documents found in Firestore.");
      })(),
    activities: activitySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data()
        }) as DashboardData["activities"][number]
    ),
    metrics: metricSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data()
        }) as DashboardData["metrics"][number]
    )
  };
};
