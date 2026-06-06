import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-50 rounded-full blur-3xl opacity-60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
            {t.home.tag}
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
            HASSAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">
              ELKESS
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-12 leading-relaxed">
            {t.home.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/gallery"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
            >
              {t.home.exploreGallery}
            </Link>
            {!user ? (
              <Link
                to="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border-2 border-gray-100 text-gray-900 px-10 py-4 rounded-full font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all"
              >
                {t.home.viewFullCollection}
              </Link>
            ) : (
              <Link
                to="/upload"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-50 text-indigo-700 px-10 py-4 rounded-full font-bold hover:bg-indigo-100 transition-all"
              >
                {t.home.uploadNewWork}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Artist Facts */}
      <section className="py-12 border-y border-gray-50 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Specialty', value: 'Khat Arabi Painting' },
              { label: 'Portfolio Type', value: 'Personal Archive' },
              { label: 'Base', value: 'Morocco' },
              { label: 'Work Status', value: 'Active Practice' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{t.home.artisticPhilosophy}</h2>
            <p className="text-gray-500 text-lg">{t.home.heroDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: t.home.features.digitalMastery,
                desc: 'Exploring the boundaries of digital mediums to create immersive visual experiences.',
                icon: '🪄',
                color: 'bg-rose-50'
              },
              {
                title: t.home.features.khatArabi,
                desc: 'Original works built from Arabic calligraphy strokes, layered texture, and expressive motion.',
                icon: '📱',
                color: 'bg-indigo-50'
              },
              {
                title: t.home.features.creativeVision,
                desc: 'Transforming abstract concepts into tangible art that speaks to the soul.',
                icon: '🔒',
                color: 'bg-emerald-50'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Discover the latest work <br className="hidden md:block" /> by Hassan Elkess
            </h2>
            <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10">
              Explore original paintings rooted in Arabic calligraphy and evolving Khat Arabi practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!user ? (
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all"
                >
                  {t.home.browseCollection}
                </Link>
              ) : (
                <Link
                  to="/upload"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all"
                >
                  {t.home.managePortfolio}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
