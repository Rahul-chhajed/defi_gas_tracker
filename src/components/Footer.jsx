import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 py-6 px-4 text-center bg-black border-t border-purple-500 shadow-[0_0_20px_rgba(165,89,255,0.5)]">
      <p className="text-sm text-purple-300 drop-shadow-[0_0_4px_rgba(165,89,255,0.7)] mb-3">
        &copy; {new Date().getFullYear()} DeFi Gas Tracker. All rights reserved.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm mb-3">
        <a
          href="https://github.com/Rahul-chhajed"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition-all duration-200 drop-shadow-[0_0_6px_rgba(165,89,255,0.7)]"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/rahul-chhajed-896a3b317/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition-all duration-200 drop-shadow-[0_0_6px_rgba(165,89,255,0.7)]"
        >
          LinkedIn
        </a>
        <a
          href="mailto:rahulchhajed215@gmail.com"
          className="text-white hover:text-purple-400 transition-all duration-200 drop-shadow-[0_0_6px_rgba(165,89,255,0.7)]"
        >
          Email
        </a>
      </div>

      <p className="text-xs text-white/60">
        Built by Rahul Chhajed with ❤️ | Powered by Ethers.js, Zustand, and React
      </p>
    </footer>
  );
}
