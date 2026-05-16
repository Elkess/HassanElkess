import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    artistName: '',
    bio: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      website: ''
    },
    showcasesPastText: '',
    showcasesUpcomingText: ''
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        artistName: user.artistName || '',
        bio: user.bio || '',
        socialLinks: user.socialLinks || {
          instagram: '',
          twitter: '',
          website: ''
        },
        showcasesPastText: (user.showcasesPast || []).join('\n'),
        showcasesUpcomingText: (user.showcasesUpcoming || []).join('\n')
      });
      setPreviewImage(user.profileImage);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('artistName', formData.artistName);
      data.append('bio', formData.bio);
      data.append('socialLinks', JSON.stringify(formData.socialLinks));

      const showcasesPast = formData.showcasesPastText
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean);

      const showcasesUpcoming = formData.showcasesUpcomingText
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean);

      data.append('showcasesPast', JSON.stringify(showcasesPast));
      data.append('showcasesUpcoming', JSON.stringify(showcasesUpcoming));

      if (profileImageFile) {
        data.append('profileImage', profileImageFile);
      }

      await updateProfile(data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profile Picture
          </label>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Artist Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Name
          </label>
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Your artist name"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Tell us about yourself and your art..."
          />
        </div>

        {/* Social Links */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                name="social_instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                name="social_twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Website
              </label>
              <input
                type="url"
                name="social_website"
                value={formData.socialLinks.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Showcases */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Showcases & Exhibitions</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Past Showcases (one per line)
            </label>
            <textarea
              name="showcasesPastText"
              value={formData.showcasesPastText}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Casablanca Art Week 2024 - Khat Arabi Collection"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upcoming Showcases (one per line)
            </label>
            <textarea
              name="showcasesUpcomingText"
              value={formData.showcasesUpcomingText}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Rabat Contemporary Art Salon 2026 - New Khat Arabi Series"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
