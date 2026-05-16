import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchArtworks();
  }, [page]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/art', {
        params: {
          page,
          limit: 12
        }
      });
      setArtworks(response.data.artworks);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Art Gallery</h1>

      {/* Artworks Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No artworks found</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-sm text-gray-600 truncate">
                  by {art.artist.artistName}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
