"use client";

import { Wallet } from "lucide-react";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <Wallet size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Expense Tracker
            </h1>
            <p className="text-sm text-gray-500">
              Manage your daily expenses efficiently
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="hidden text-right md:block">
          <p className="text-sm text-gray-500">Today</p>
          <p className="font-semibold text-gray-800">{today}</p>
        </div>
      </div>
    </header>
  );
}