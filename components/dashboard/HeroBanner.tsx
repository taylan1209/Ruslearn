import Link from "next/link";

export const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6457ff] via-[#7a6aff] to-[#4736d6] p-8 text-white shadow-card">
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4 md:max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide">
            Rusça Öğrenme Platformu
          </span>
          <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
            Metinlerinizi kopyala-yapıştır ile anında öğrenilebilir flashcard ve
            quiz setlerine dönüştürün.
          </h1>
          <p className="max-w-2xl text-base text-white/90">
            Uyarlanabilir zorluk, aralıklı tekrar, dinleme-yazma ve konuşma
            pratikleriyle öğrenme deneyimini zenginleştirin.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#content-input"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-primary/30 transition hover:bg-slate-100"
            >
              Yeni İçerik Ekle
            </Link>
            <Link
              href="#interactive-modes"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Öğrenmeye Başla
            </Link>
          </div>
        </div>
        <div className="relative flex min-h-[200px] flex-1 items-center justify-center">
          <div className="absolute inset-0 animate-float rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex h-48 w-64 rotate-6 items-center justify-center rounded-2xl bg-gradient-to-br from-white/90 via-white to-white/80 shadow-2xl shadow-primary/40 backdrop-blur">
            <div className="space-y-2 text-center text-slate-800">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Örnek Kart
              </p>
              <div className="text-2xl font-semibold text-slate-900">
                спасибо
              </div>
              <p className="text-sm text-slate-500">teşekkür ederim</p>
              <div className="rounded-xl bg-primary/10 px-3 py-2 text-xs text-primary">
                Seslendirme & vurgu desteği aktif!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-16 top-8 hidden h-20 w-20 animate-pulseCard rounded-2xl border border-white/40 bg-white/30 blur-xl md:block" />
      <div className="absolute -left-10 bottom-4 hidden h-28 w-28 rounded-full border-2 border-dashed border-white/40 md:block" />
    </section>
  );
};
