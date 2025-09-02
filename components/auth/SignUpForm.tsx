'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, Mail, Lock, User, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

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

  const passwordValidation = validatePassword(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-semibold text-gray-900">Check your email</h3>
        <p className="text-gray-600">
          We&apos;ve sent you a confirmation link at <strong>{formData.email}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Please click the link in the email to activate your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange('fullName')}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="signup-email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange('email')}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange('password')}
              className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {formData.password && (
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
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                formData.confirmPassword && !passwordsMatch 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.email || !passwordValidation.isValid || !passwordsMatch}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Create Account
      </button>

      <div className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
          Privacy Policy
        </a>
      </div>
    </form>
  );
}