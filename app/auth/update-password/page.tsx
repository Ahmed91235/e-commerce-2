'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    // Check if we have the proper tokens from the URL
    const accessToken = searchParams?.get('access_token');
    const refreshToken = searchParams?.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      setError('Invalid or expired reset link. Please request a new password reset.');
      return;
    }

    // Set the session with the tokens
    const supabase = createClient();
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }, [searchParams]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!passwordValidation.isValid) {
      setError('Password does not meet security requirements');
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Password updated!</h1>
              <p className="text-gray-600 mb-6">
                Your password has been successfully updated.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Redirecting you to sign in...
              </p>
              <Link
                href="/login"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Continue to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ECommerce</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Update your password</h1>
          <p className="mt-2 text-gray-600">
            Enter your new password below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {password && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordValidation.minLength ? 'bg-green-600' : 'bg-gray-300'}`} />
                    At least 8 characters
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-600' : 'bg-gray-300'}`} />
                    One uppercase letter
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordValidation.hasLowerCase ? 'bg-green-600' : 'bg-gray-300'}`} />
                    One lowercase letter
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordValidation.hasNumbers ? 'bg-green-600' : 'bg-gray-300'}`} />
                    One number
                  </div>
                  <div className={`text-xs flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-green-600' : 'bg-gray-300'}`} />
                    One special character
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    confirmPassword && !passwordsMatch 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || !passwordsMatch}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}