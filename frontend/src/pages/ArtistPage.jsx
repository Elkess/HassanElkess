import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistAndWorks();
  }, [artistId]);

  const fetchArtistAndWorks = async () => {
    try {
      setLoading(true);
      const [artistResponse, artworksResponse] = await Promise.all([
        axios.get(`/api/auth/artist/${artistId}`),
        axios.get('/api/art', { params: { artistId, limit: 50 } })
      ]);

      setArtist(artistResponse.data);
      setArtworks(artworksResponse.data.artworks || []);
    } catch (error) {
      console.error('Error fetching artist:', error);
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

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Artist not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Artist Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8">
            {artist.profileImage && (
              <img
                src={artist.profileImage}
                alt={artist.artistName}
                className="w-32 h-32 rounded-full"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{artist.artistName}</h1>
              <p className="text-gray-400 mb-4">@{artist.username}</p>
              {artist.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{artist.bio}</p>
              )}
              {artist.socialLinks && (
                <div className="flex space-x-4">
                  {artist.socialLinks.instagram && (
                    <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300">Instagram</a>
                  )}
                  {artist.socialLinks.twitter && (
                    <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300">Twitter</a>
                  )}
                  {artist.socialLinks.website && (
                    <a href={artist.socialLinks.website} target="_blank" rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300">Website</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artworks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Past Showcases</h3>
            {artist.showcasesPast?.length ? (
              <ul className="space-y-2 text-gray-700">
                {artist.showcasesPast.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-2 mr-2 w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No past showcases added yet.</p>
            )}
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Showcases</h3>
            {artist.showcasesUpcoming?.length ? (
              <ul className="space-y-2 text-gray-700">
                {artist.showcasesUpcoming.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-2 mr-2 w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming showcases announced yet.</p>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Artworks ({artworks.length})</h2>
        
        {artworks.length === 0 ? (
          <p className="text-gray-600 text-center py-12">This artist hasn't uploaded any artwork yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((art) => (
              <Link
                key={art._id}
                to={`/art/${art._id}`}
                className="group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 h-64">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 truncate">{art.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
