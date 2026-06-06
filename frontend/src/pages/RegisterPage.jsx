import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const buttonContent = loading ? (
    <span className="flex items-center justify-center">
      <Spinner />
      {t.register.creatingAccount}
    </span>
  ) : (
    t.register.getStarted
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password, artistName);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-gray-100 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{t.register.createAccount}</h2>
          <p className="text-gray-500 font-medium">{t.register.joinCommunity}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <p className="text-rose-700 text-sm font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-6 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none text-gray-900 font-medium"
              placeholder="e.g. art_lover"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Artist Name
            </label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none text-gray-900 font-medium"
              placeholder="Your public name"
            />
          </div>

          <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                {t.auth.emailAddress}
              </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none text-gray-900 font-medium"
              placeholder={t.auth.placeholderEmail}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none text-gray-900 font-medium text-lg"
                placeholder={t.auth.placeholderPassword}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Confirm
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all outline-none text-gray-900 font-medium text-lg"
                placeholder={t.auth.placeholderPassword}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {buttonContent}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
