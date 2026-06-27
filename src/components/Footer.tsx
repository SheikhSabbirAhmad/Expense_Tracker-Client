import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">
            Expense Tracker
          </h3>

          <p className="text-sm text-gray-500">
            Track your daily expenses with ease and stay in control of your
            finances.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Built with</span>

            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />

            <span>using Next.js, TypeScript & Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Heart size={16} />

            <span>© {new Date().getFullYear()} Expense Tracker</span>
          </div>
        </div>
      </div>
    </footer>
  );
}