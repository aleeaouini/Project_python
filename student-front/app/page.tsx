import Link from 'next/link';
import { ArrowRight, UserCircle, LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-16 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">StudentPortal</h2>
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">À propos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-col items-center text-center sm:text-left sm:items-start">
          <div className="mb-12 sm:mb-16 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Bienvenue sur le portail<br className="hidden sm:block" />
              <span className="text-indigo-600 dark:text-indigo-400">des étudiants</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Accédez à vos informations académiques, gérez votre profil et restez connecté avec la communauté étudiante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            {[{
              href: '/login',
              icon: <LogIn className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
              title: 'Se connecter',
              desc: 'Accédez à votre espace personnel',
              bg: 'bg-indigo-100 dark:bg-indigo-900/50',
              textColor: 'text-indigo-600 dark:text-indigo-400',
              hoverBorder: 'hover:border-indigo-200 dark:hover:border-indigo-800'
            }, {
              href: '/register',
              icon: <UserPlus className="h-8 w-8 text-green-600 dark:text-green-400" />,
              title: "S'inscrire",
              desc: 'Créez un nouveau compte étudiant',
              bg: 'bg-green-100 dark:bg-green-900/50',
              textColor: 'text-green-600 dark:text-green-400',
              hoverBorder: 'hover:border-green-200 dark:hover:border-green-800'
            }, {
              href: '/profile',
              icon: <UserCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
              title: 'Voir le profil',
              desc: 'Consultez vos informations personnelles',
              bg: 'bg-purple-100 dark:bg-purple-900/50',
              textColor: 'text-purple-600 dark:text-purple-400',
              hoverBorder: 'hover:border-purple-200 dark:hover:border-purple-800'
            }].map(({href, icon, title, desc, bg, textColor, hoverBorder}) => (
              <Link
                key={href}
                href={href}
                className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 ${hoverBorder}`}
              >
                <div className={`${bg} rounded-full p-4 mb-4`}>
                  {icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{desc}</p>
                <span className={`${textColor} flex items-center text-sm font-medium group-hover:gap-2 transition-all`}>
                  Continuer <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-24 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} StudentPortal. Tous droits réservés.
          </p>
        </footer>
      </div>
    </div>
  );
}
