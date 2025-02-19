import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user } = await authService.login({
        identifier,
        password,
        role: role as 'member' | 'admin'
      });

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      login(user);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/member-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('login.error.invalid'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('login.title')}</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-full">
                <Lock className="w-8 h-8 text-black" />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900 border border-red-700 text-white rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Email ou identifiant</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">{t('login.form.password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-gray-400">
                    {t('login.form.remember')}
                  </label>
                </div>
                <a href="/reset-password" className="text-blue-400 hover:text-blue-300">
                  {t('login.form.forgot')}
                </a>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="member"
                    name="role"
                    value="member"
                    checked={role === 'member'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="member" className="text-gray-400">
                    Membre
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="admin" className="text-gray-400">
                    Administrateur
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded font-bold transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? t('login.form.loading') : t('login.form.submit')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {t('login.form.noAccount')}{' '}
                <a href="/inscription" className="text-blue-400 hover:text-blue-300">
                  {t('login.form.register')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};