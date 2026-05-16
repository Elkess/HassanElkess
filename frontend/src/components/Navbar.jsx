import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
              HASSAN <span className="text-indigo-600">ELKESS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              {['fr', 'ar', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition ${
                    language === lang ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Link to="/gallery" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              {t.nav.gallery}
            </Link>
            {user ? (
              <>
                <Link to="/upload" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  {t.nav.upload}
                </Link>
                <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  {t.nav.dashboard}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span>{user.username}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700">
                      {t.nav.profile}
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  {t.nav.login}
                </Link>
                <Link to="/register" className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all">
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="px-4 py-2">
              <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                {['fr', 'ar', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition ${
                      language === lang ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/gallery" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t.nav.gallery}
            </Link>
            {user ? (
              <>
                <Link to="/upload" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  {t.nav.upload}
                </Link>
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  {t.nav.dashboard}
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  {t.nav.profile}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  {t.nav.login}
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-black text-white rounded">
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
