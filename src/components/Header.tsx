"use client";

import { Wallet } from "lucide-react";

type Props = {
  totalExpenses: number;
  totalAmount: number;
};

export default function Header({
  totalExpenses,
  totalAmount,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur shadow-sm">
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="rounded-xl bg-blue-50 px-5 py-3 text-center shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Total Expenses
            </p>

            <h2 className="mt-1 text-2xl font-bold text-blue-600">
              {totalExpenses}
            </h2>
          </div>

          <div className="rounded-xl bg-green-50 px-5 py-3 text-center shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase">
              Total Amount
            </p>

            <h2 className="mt-1 text-2xl font-bold text-green-600">
              ৳ {totalAmount.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}