'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false); // For Desktop Teams Dropdown
  const [isMobileTeamsOpen, setIsMobileTeamsOpen] = useState(false); // For Mobile Teams Submenu
  const dropdownRef = useRef<HTMLDivElement>(null);
  const teamsDropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (teamsDropdownRef.current && !teamsDropdownRef.current.contains(event.target as Node)) {
        setIsTeamsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const loadingToast = toast.loading('Signing out...');
    try {
      await signOut({ redirect: false });
      toast.success('Signed out successfully', { id: loadingToast });
      window.location.href = '/';
    } catch (error) {
      toast.error('Failed to sign out', { id: loadingToast });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const canGoBack = pathname !== '/';

  const teamLinks = [
    { name: 'Our Teams Overview', href: '/teams', icon: 'groups' },
    { name: 'MUN', href: '/mun', icon: 'public' },
    { name: 'SDGs', href: '/sdg', icon: 'eco' }, // New SDG Page
    { name: 'Innovation', href: '/innovation', icon: 'lightbulb' }, // Placeholder
    { name: 'Project Team', href: '/projects', icon: 'engineering' }, // Placeholder
    { name: 'Debate Team', href: '/debate', icon: 'record_voice_over' }, // Placeholder
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#212935]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button
                onClick={() => router.back()}
                className="mr-1 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1d23] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 w-9 h-9"
                aria-label="Go back"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
            )}
            <Link href="/" className="flex items-center gap-3">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">public</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                UNA-ET-HU
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-semibold text-primary"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              About Us
            </Link>

            {/* Teams Dropdown */}
            <div className="relative" ref={teamsDropdownRef}>
              <button
                onClick={() => setIsTeamsDropdownOpen(!isTeamsDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors focus:outline-none"
              >
                Teams
                <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${isTeamsDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {isTeamsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#1a1d23] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {teamLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsTeamsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg text-primary">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/gallery" // New Gallery Page
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            {(session as any)?.user?.role === 'SUPER_ADMIN' && (
              <Link
                href="/admin"
                className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                Super Admin
              </Link>
            )}
            {(session as any)?.user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right side: desktop account / auth + mobile menu button */}
          <div className="flex items-center gap-2">
            {status === 'loading' ? (
              <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            ) : session ? (
              // Show user avatar and dropdown when logged in
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <span className="hidden sm:block text-sm font-semibold text-slate-900 dark:text-white">
                    {session.user?.name}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user?.name || 'User'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(session.user?.name || 'User')
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a1d23] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {session.user?.email}
                      </p>
                    </div>

                    <div className="py-1">
                      {(session.user as any)?.role === 'SUPER_ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-semibold"
                        >
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Super Admin Dashboard
                        </Link>
                      )}
                      {(session.user as any)?.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">dashboard</span>
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">person</span>
                        My Profile
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">settings</span>
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Show Login and Join Us buttons when not logged in
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary px-4 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2 rounded-lg transition-all shadow-md shadow-primary/20"
                >
                  Join Us
                </Link>
              </div>
            )}

            {/* Mobile hamburger button */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#212935] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-primary py-1"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 py-1"
              >
                About Us
              </Link>

              {/* Mobile Teams Submenu */}
              <div>
                <button
                  onClick={() => setIsMobileTeamsOpen(!isMobileTeamsOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-slate-700 dark:text-slate-200 py-1"
                >
                  Teams
                  <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${isMobileTeamsOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {isMobileTeamsOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-700 ml-1">
                    {teamLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 py-1"
                      >
                        <span className="material-symbols-outlined text-base text-primary/70">{link.icon}</span>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 py-1"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 py-1"
              >
                Gallery
              </Link>
              {(session as any)?.user?.role === 'SUPER_ADMIN' && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 py-1"
                >
                  <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                  Super Admin Dashboard
                </Link>
              )}
              {(session as any)?.user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-primary flex items-center gap-1 py-1"
                >
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  Admin Dashboard
                </Link>
              )}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user?.name || 'User'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(session.user?.name || 'User')
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {session.user?.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 text-red-600 dark:text-red-400 px-4 py-2 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-sm font-bold text-white px-4 py-2 shadow-md shadow-primary/20 transition-colors"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

