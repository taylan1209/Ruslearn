"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/quiz", label: "Quiz" },
  { href: "/progress", label: "Progress" }
];

export const TopNav = () => {
  const pathname = usePathname();

  const activeSegment = useMemo(() => {
    if (pathname === "/") return "/";
    const [, segment] = pathname.split("/");
    return `/${segment ?? ""}`;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary">
            RL
          </span>
          <span className="text-lg font-semibold text-slate-800">
            RusLearn
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              activeSegment === link.href ||
              (link.href !== "/" && activeSegment.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:text-primary ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary/30 hover:text-primary">
            Geri Bildirim
          </button>
          <div className="h-10 w-10 rounded-full border border-primary/30 bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-card" />
        </div>
      </div>
    </header>
  );
};
