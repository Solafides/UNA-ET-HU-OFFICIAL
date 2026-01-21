import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#212935] text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">public</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white uppercase">
                UNA-ET-HU
              </h1>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The United Nations Association of Ethiopia - Hawassa University Chapter
              is committed to mobilizing youth for sustainable development.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Social Media"
              >
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Website"
              >
                <span className="material-symbols-outlined">language</span>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our History
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="hover:text-primary transition-colors"
                >
                  Executive Board
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Annual Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Upcoming Events
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Teams</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/mun"
                  className="hover:text-primary transition-colors"
                >
                  Model United Nations
                </Link>
              </li>
              <li>
                <Link
                  href="/teams/sdg-ambassadors"
                  className="hover:text-primary transition-colors"
                >
                  SDG Hub
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Communications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Outreach & Impact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">Newsletter</h5>
            <p className="text-sm mb-4">
              Stay updated on our latest diplomatic events and SDG workshops.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-slate-800 border-slate-700 rounded-lg text-sm px-4 py-2 focus:ring-primary focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © 2024 United Nations Association Ethiopia - HU Chapter. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}