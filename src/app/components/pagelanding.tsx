'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-slate-800 to-sky-400 flex flex-col items-center justify-center text-white font-[Cinzel]">
      <h1 className="text-6xl md:text-100xl lg:text-8xl drop-shadow-lg outline-text">Smartcity</h1>

      <div className="mt-4 animate-spin">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      </div>

      <Link href="/login">
        <button className="absolute bottom-20 right-40 flex items-center gap-2 rounded-xl px-10 py-2 bg-white text-black text-2xl font-bold hover:opacity-80 shadow-md">
          Login
        </button>
      </Link>
    </div>
  );
}
