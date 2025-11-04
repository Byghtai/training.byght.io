import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import ByghtLogo from '../assets/byght-logo.svg';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Load language from localStorage or default to 'de'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('training-language');
    return savedLanguage || 'de';
  });
  
  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('training-language', language);
  }, [language]);
  
  // Translations
  const translations = {
    de: {
      title: 'Byght Training',
      welcome: 'Willkommen',
      signIn: 'Bitte melden Sie sich an',
      password: 'Passwort',
      passwordPlaceholder: 'Ihr Passwort',
      signingIn: 'Anmeldung läuft...',
      signInButton: 'Anmelden',
      loginFailed: 'Anmeldung fehlgeschlagen'
    },
    en: {
      title: 'Byght Training',
      welcome: 'Welcome',
      signIn: 'Please sign in',
      password: 'Password',
      passwordPlaceholder: 'Your password',
      signingIn: 'Signing in...',
      signInButton: 'Sign In',
      loginFailed: 'Login failed'
    }
  };
  
  const t = translations[language];
  
  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(password);
    
    if (result.success) {
      navigate('/training');
    } else {
      // Translate error message if it's the default German error
      const errorMessage = result.error || t.loginFailed;
      if (errorMessage === 'Login fehlgeschlagen') {
        setError(t.loginFailed);
      } else {
        setError(errorMessage);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-byght-turquoise/10 via-white to-byght-lightgray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-2xl shadow-sm mb-4 p-3">
            <img src={ByghtLogo} alt="Byght Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold text-byght-gray">{t.title}</h1>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-byght-gray hover:text-byght-turquoise transition-colors p-1"
              title={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
            >
              <span className="text-xl">{language === 'de' ? '🇬🇧' : '🇩🇪'}</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-byght-gray">{t.welcome}</h2>
            <p className="text-sm text-gray-600 mt-1">{t.signIn}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-byght-gray mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder={t.passwordPlaceholder}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{t.signingIn}</span>
                </div>
              ) : (
                t.signInButton
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            © 2025 Byght GmbH
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;