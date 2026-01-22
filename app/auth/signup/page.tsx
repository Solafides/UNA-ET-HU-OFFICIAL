'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navigation from '@/app/components/Navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      // Create account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to create account', { id: loadingToast });
        setLoading(false);
        return;
      }

      toast.success('Account created successfully!', { id: loadingToast });

      // Auto sign in after successful signup
      const signInToast = toast.loading('Signing you in...');
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Account created but failed to sign in. Please try signing in.', { id: signInToast });
      } else if (result?.ok) {
        toast.success('Welcome aboard!', { id: signInToast });
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    toast.loading('Redirecting to Google...');
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#21242c] flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center w-full max-w-[460px] mx-auto py-12">
          {/* Branding Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg
                className="size-7"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#101618] dark:text-white text-2xl font-extrabold tracking-tight">
              UNA-ET-HU
            </h2>
          </div>

          {/* Central Auth Card (Sign Up) */}
          <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d23] w-full rounded-xl p-8 shadow-sm">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-[#101618] dark:text-white text-2xl font-bold leading-tight mb-2">
                Create an account
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Join the UNA-ET-HU platform
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full mb-4 flex items-center justify-center gap-3 bg-white dark:bg-[#2d3139] border border-gray-200 dark:border-gray-700 text-[#101618] dark:text-white rounded-lg h-12 font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-[#3d4149] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#1a1d23] text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#101618] dark:text-gray-200 text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  disabled={loading || googleLoading}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f4f6f8] dark:bg-[#2d3139] text-[#101618] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary h-11 px-4 transition-all outline-none placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#101618] dark:text-gray-200 text-sm font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  disabled={loading || googleLoading}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f4f6f8] dark:bg-[#2d3139] text-[#101618] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary h-11 px-4 transition-all outline-none placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#101618] dark:text-gray-200 text-sm font-semibold">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  disabled={loading || googleLoading}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f4f6f8] dark:bg-[#2d3139] text-[#101618] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary h-11 px-4 transition-all outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#101618] dark:text-gray-200 text-sm font-semibold">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  disabled={loading || googleLoading}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-[#f4f6f8] dark:bg-[#2d3139] text-[#101618] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary h-11 px-4 transition-all outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex items-start gap-2 py-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  disabled={loading || googleLoading}
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer size-4 disabled:opacity-50"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed cursor-pointer"
                >
                  I agree to the{' '}
                  <a href="#" className="text-primary font-semibold hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary font-semibold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-12 font-bold tracking-wide transition-colors shadow-md shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-primary font-bold hover:underline ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        </div>
      </div>
    </div>
  );
}
