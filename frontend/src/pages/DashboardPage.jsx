import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { t, locale, language } = useLanguage();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const artistId = user?.id || user?._id;
  const formatDh = (value) => `${Number(value).toLocaleString(locale)} DH`;

  useEffect(() => {
    if (!artistId) {
      setLoading(false);
      return;
    }

    fetchArtworks(artistId);
  }, [artistId]);

  const fetchArtworks = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/art/artist/${id}`);
      setArtworks(response.data.artworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artId) => {
    try {
      await axios.delete(`/api/art/${artId}`);
      setArtworks(artworks.filter(art => art._id !== artId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  const formatDate = (value) => new Date(value).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const totalViews = artworks.reduce((sum, art) => sum + art.views, 0);
  const totalForSale = artworks.filter((art) => art.isForSale).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 md:p-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.dashboard.title}</h1>
            <p className="text-gray-200 mt-2">{t.dashboard.subtitle}</p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition"
          >
            {t.dashboard.uploadNew}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider">{t.dashboard.totalArtworks}</p>
          <p className="text-4xl font-black text-gray-900 mt-2">{artworks.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider">{t.dashboard.totalViews}</p>
          <p className="text-4xl font-black text-gray-900 mt-2">{totalViews.toLocaleString(locale)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
          <p className="text-gray-500 text-sm uppercase tracking-wider">{t.dashboard.forSale}</p>
          <p className="text-4xl font-black text-gray-900 mt-2">{totalForSale.toLocaleString(locale)}</p>
        </div>
      </div>

      {/* Artworks List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            </div>
          ) : artworks.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <p className="mb-4">{t.dashboard.noArtworks}</p>
              <Link
                to="/upload"
                className="inline-block bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
              >
                {t.dashboard.uploadFirst}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {artworks.map((art) => (
                <div key={art._id} className="border border-gray-100 rounded-2xl p-4 md:p-5 hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full sm:w-28 h-48 sm:h-28 rounded-xl object-cover bg-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-gray-900 truncate">{art.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {t.dashboard.publishedOn} {formatDate(art.createdAt)}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold capitalize">
                          {t.dashboard.category}: {art.category}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                          {t.dashboard.views}: {art.views.toLocaleString(locale)}
                        </span>
                        {art.isForSale ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                            {t.dashboard.forSaleBadge} - {formatDh(art.price)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                            {t.dashboard.notForSale}
                          </span>
                        )}
                      </div>

                      <div className={`mt-4 flex items-center gap-4 ${language === 'ar' ? 'sm:justify-end' : ''}`}>
                        <Link
                          to={`/art/${art._id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
                          {t.dashboard.view}
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(art._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold"
                        >
                          {t.dashboard.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.dashboard.deleteTitle}</h3>
            <p className="text-gray-600 mb-6">{t.dashboard.deleteText}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                {t.dashboard.cancel}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                {t.dashboard.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
