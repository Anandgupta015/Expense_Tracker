import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 rounded-2xl
      bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400
      shadow-[0_0_30px_rgba(56,189,248,0.45)]">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Expense Tracker
        </h1>
        <p className="text-sm text-cyan-100">
          Track your expenses quickly and easily
        </p>
      </div>

      <div className="text-right">
        <span className="text-xs uppercase tracking-widest text-cyan-200">
          Powered by
        </span>
        <p className="text-sm font-semibold text-white">
          MERN <span className="text-teal-200">+</span> Tailwind
        </p>
      </div>
    </header>
  );
}
