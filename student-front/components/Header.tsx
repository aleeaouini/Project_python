"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // To get current URL for active link styling

export default function Header() {
  const pathname = usePathname(); // Get current pathname for active link detection

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">EduPlatform</Link>
        </div>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              href="/"
              className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/formations"
              className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                pathname.startsWith("/formations") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Formations
            </Link>
          </li>
          <li>
            <Link
              href="/favoris"
              className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/favoris" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Favoris
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/profil" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/connexion" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}