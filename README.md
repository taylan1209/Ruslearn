# RusLearn Dashboard (Next.js + Firebase)

Rusça kelime ve cümlelerinizi kopyala-yapıştır yöntemiyle içeri aktarıp oyunlaştırılmış öğrenme deneyimleri sunan RusLearn platformunun taslak Next.js arayüzü.

## Özellikler

- 🎯 **Dashboard odaklı tasarım:** Flashcard ve quiz önizlemeleri, metin içe aktarma iş akışı, öğrenme metriği kartları ve aktivite akışı.
- 🂠 **Animasyonlu flashcard:** Kartı çevirme, vurgu gösterimi, Web Speech API ile tek tık TTS.
- ❓ **Açıklamalı 4 şıklı quiz:** Yanlış seçimlerde çift dilli açıklamalar ve örnek cümleler.
- ⚙️ **Firebase entegrasyonu:** Firestore’dan dashboard anlık görüntüsü çekmek için hazır servis katmanı.
- 🎨 **Tailwind temelli stil:** Taslak görselle uyumlu gradient, cam efekti ve gölgeler.

## Kurulum

```bash
npm install
npm run dev
```

Geliştirme sunucusu `http://localhost:3000` adresinde hizmet verir.

## Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden bir web uygulaması oluşturun.
2. Firestore veritabanını etkinleştirin.
3. `.env.example` dosyasını `.env.local` adıyla kopyalayın ve Firebase projenize ait değerleri doldurun:

```bash
cp .env.example .env.local
```

Geliştirme ortamında Firestore verisi bulunamazsa veya istemci Firestore’a bağlanamazsa uygulama otomatik olarak `lib/mockData.ts` içindeki örnek verileri kullanır.

### Firestore Örnek Verileri

Projeye ait temel veri yapısını hızlıca oluşturmak için hazır bir tohumlama (seed) betiği bulunur:

```bash
npm run seed
```

Komut Firestore’da aşağıdaki koleksiyonları oluşturup doldurur:

- `flashcards` – vurgu, örnek cümle ve ipucu alanlarıyla kelime kartları
- `quizQuestions` – açıklamalı dört şıklı quiz soruları
- `metrics` – dashboard metriği kartları
- `activities` – XP ve zaman damgası içeren aktivite akışı
- `clozeExercises`, `matchingSets`, `listeningDrills`, `speakingPrompts`, `wordFamilies`, `frequencyDecks` – ek alıştırma modülleri ve tematik setler

> **Not:** Komut `scripts/seedFirestore.ts` içerisinde istemci SDK’sı ile Firestore’a bağlanır. Çalıştırmadan önce ağ erişiminizin ve Firebase güvenlik kurallarınızın uygun olduğundan emin olun.

## Proje Betikleri

- `npm run dev` – Geliştirme sunucusu
- `npm run build` – Production derlemesi
- `npm start` – Production build’i sunar
- `npm run lint` – ESLint denetimi
- `npm run type-check` – TypeScript tür kontrolü

## Dosya Yapısı (Özet)

```
app/
  layout.tsx      → Global layout ve meta
  page.tsx        → Dashboard ana sayfası
  globals.css     → Tailwind + genel stiller
components/
  dashboard/*     → Dashboard bileşenleri
  layout/TopNav   → Üst navigasyon
  ui/*            → Küçük UI yardımcıları
lib/
  firebase.ts     → Firebase init & Firestore helper
  dashboardService.ts → Firebase/mock veri seçici
  mockData.ts     → Offline demo verileri
types/
  dashboard.ts    → Ortak veri tipleri
```

## Sonraki Adımlar

- İçerik içe aktarma akışı için Firebase yazma işlemlerini eklemek.
- Dinleme-yazma ve konuşma pratikleri için ek modüller hazırlamak.
- Kullanıcı bazlı uyarlanabilirlik için Firestore güvenlik kuralları ve kullanıcı kimliği yönetimini dahil etmek.
