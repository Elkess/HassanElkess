import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ArtDetailPage() {
  const { artId } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, locale } = useLanguage();
  const formatDh = (value) => `${Number(value).toLocaleString(locale)} DH`;

  useEffect(() => {
    fetchArtwork();
  }, [artId]);

  const fetchArtwork = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/art/${artId}`);
      setArt(response.data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{t.art.notFound}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Image */}
        <div className="md:col-span-2">
          <img
            src={art.image}
            alt={art.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{art.title}</h1>

          {/* Artist Info */}
          <Link
            to={`/artist/${art.artist._id}`}
            className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            {art.artist.profileImage && (
              <img
                src={art.artist.profileImage}
                alt={art.artist.artistName}
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">{art.artist.artistName}</p>
              <p className="text-sm text-gray-600">@{art.artist.username}</p>
            </div>
          </Link>

          {/* Metadata */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">{t.art.category}</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{art.category}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">{t.art.views}</p>
              <p className="text-lg font-semibold text-gray-900">{art.views}</p>
            </div>

            {art.price && art.isForSale && (
              <div>
                <p className="text-sm text-gray-600">{t.art.price}</p>
                <p className="text-lg font-semibold text-gray-900">{formatDh(art.price)}</p>
              </div>
            )}

            {art.tags && art.tags.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">{t.art.tags}</p>
                <div className="flex flex-wrap gap-2">
                  {art.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {art.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{t.art.description}</h3>
              <p className="text-gray-700">{art.description}</p>
            </div>
          )}

          {/* Action Button */}
          {art.isForSale && art.price && (
            <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              {t.art.contactArtist}
            </button>
          )}
        </div>
      </div>

      {/* More from artist */}
      <div className="mt-16 pt-12 border-t">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.art.moreFromArtist}</h2>
        {/* You can add similar artworks here */}
      </div>
    </div>
  );
}
