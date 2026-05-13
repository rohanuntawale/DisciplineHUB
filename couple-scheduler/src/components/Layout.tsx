import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import DynamicBackground from "./DynamicBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  const toggleDark = () => document.documentElement.classList.toggle("dark");

  return (
    <DynamicBackground>
      <header className="flex justify-between items-center p-4 z-20 relative bg-black/30 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white neon">CoupleScheduler</h1>
        <button
          onClick={toggleDark}
          className="p-2 rounded hover:bg-white/10 transition text-white"
          aria-label="Toggle dark mode"
        >
          <SunIcon className="h-5 w-5 hidden dark:inline-block" />
          <MoonIcon className="h-5 w-5 dark:hidden inline-block" />
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 relative z-10">{children}</main>

      <footer className="text-center py-4 text-sm text-white/70 relative z-20">
        © {new Date().getFullYear()} CoupleScheduler – all data lives locally.
      </footer>
    </DynamicBackground>
  );
}
