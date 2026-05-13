import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Layout({ children }: { children: React.ReactNode }) {
  const toggleDark = () => document.documentElement.classList.toggle("dark");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-100 overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="hero background"
        fill
        className="opacity-30 pointer-events-none object-cover"
        priority
      />

      <header className="flex justify-between items-center p-4 z-10 relative">
        <h1 className="text-2xl font-bold neon">CoupleScheduler</h1>
        <button
          onClick={toggleDark}
          className="p-2 rounded hover:bg-gray-200/20 transition"
          aria-label="Toggle dark mode"
        >
          <SunIcon className="h-5 w-5 hidden dark:inline-block" />
          <MoonIcon className="h-5 w-5 dark:hidden inline-block" />
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 relative z-10">{children}</main>

      <footer className="text-center py-4 text-sm text-gray-300 relative z-10">
        © {new Date().getFullYear()} CoupleScheduler - all data lives locally.
      </footer>
    </div>
  );
}
