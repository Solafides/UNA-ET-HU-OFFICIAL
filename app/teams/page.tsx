import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function TeamsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Page Heading */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-primary pl-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-black leading-tight tracking-tight mb-4">
                Our Leadership & Teams
              </h1>
              <p className="text-[#5e808d] dark:text-gray-400 text-lg leading-relaxed">
                Meet the changemakers at Hawassa University. Our structure reflects our
                commitment to diplomacy, the Sustainable Development Goals, and tangible
                local impact.
              </p>
            </div>
            <button className="bg-[#f0f3f5] dark:bg-gray-800 text-[#101618] dark:text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined text-sm">account_tree</span>
              View Structure
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex border-b border-[#dae3e7] dark:border-gray-800 gap-8 min-w-max">
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-4 pt-2"
            >
              <span className="text-sm font-bold tracking-wide">All Members</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#5e808d] hover:text-primary pb-4 pt-2 transition-colors"
            >
              <span className="text-sm font-bold tracking-wide">Executive Board</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#5e808d] hover:text-primary pb-4 pt-2 transition-colors"
            >
              <span className="text-sm font-bold tracking-wide">Diplomacy (MUN)</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#5e808d] hover:text-primary pb-4 pt-2 transition-colors"
            >
              <span className="text-sm font-bold tracking-wide">SDG Ambassadors</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#5e808d] hover:text-primary pb-4 pt-2 transition-colors"
            >
              <span className="text-sm font-bold tracking-wide">Innovation</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#5e808d] hover:text-primary pb-4 pt-2 transition-colors"
            >
              <span className="text-sm font-bold tracking-wide">Social Impact</span>
            </a>
          </div>
        </div>

        {/* Executive Board Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black">Executive Board</h2>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-gray-800"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* President */}
            <div className="group flex flex-col gap-5 p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-primary/30 transition-all">
              <div
                className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop")',
                }}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  Abebe Kebede
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mt-1">
                  President
                </p>
                <div className="mt-4 flex items-center gap-4 text-gray-400">
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">link</span> LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">alternate_email</span>{' '}
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            {/* VP */}
            <div className="group flex flex-col gap-5 p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-primary/30 transition-all">
              <div
                className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop")',
                }}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  Helen Tadesse
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mt-1">
                  Vice President
                </p>
                <div className="mt-4 flex items-center gap-4 text-gray-400">
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">link</span> LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">alternate_email</span>{' '}
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            {/* Secretary */}
            <div className="group flex flex-col gap-5 p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-primary/30 transition-all">
              <div
                className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop")',
                }}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  Samuel Girma
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mt-1">
                  Secretary
                </p>
                <div className="mt-4 flex items-center gap-4 text-gray-400">
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">link</span> LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">alternate_email</span>{' '}
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-black mb-4 relative z-10">Ready to lead change?</h2>
          <p className="text-[#5e808d] dark:text-gray-400 max-w-xl mx-auto mb-8 relative z-10">
            Join UNA-ET-HU and become part of a global movement. We&apos;re looking for
            passionate students to join our four main pillars and drive impact in our
            community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/auth/signup"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              Apply to Join a Team
            </Link>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              Our Impact Report
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}