import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                'linear-gradient(rgba(26, 26, 26, 0.6), rgba(26, 26, 26, 0.6)), url("https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=1920&h=1080&fit=crop")',
            }}
          ></div>
          <div className="relative z-10 text-center px-4 max-w-[800px]">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-normal leading-relaxed mb-10 max-w-2xl mx-auto italic">
              &quot;Empowering youth through diplomatic excellence and global
              cooperation.&quot;
            </p>
            <button className="inline-flex items-center justify-center rounded-lg h-14 px-8 bg-white text-[#121517] text-base font-bold hover:bg-gray-100 transition-colors shadow-xl">
              Read Our Charter
            </button>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-24 px-6 bg-white dark:bg-[#1a1a1a]">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-[#CED4DA]/50"></div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">
                Introduction
              </span>
              <div className="h-[1px] flex-1 bg-[#CED4DA]/50"></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10 text-[#121517] dark:text-white">
              Who We Are
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                The UNA-ET-HU chapter is a prestigious academic and diplomatic collective
                dedicated to fostering international cooperation and understanding among
                students and young professionals. Our organization serves as a vital bridge
                between theoretical international relations and practical global engagement,
                providing a platform for rigorous dialogue and leadership development.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Rooted in the core values of the United Nations, we aim to cultivate a
                generation of informed global citizens who are prepared to tackle the
                complex challenges of the 21st century. Through our diverse membership, we
                represent a multifaceted perspective on peace, security, and sustainable
                development, grounded in the unique cultural context of our university
                community.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                We believe that by engaging with global issues today, we are shaping the
                diplomatic landscape of tomorrow. Our initiatives range from Model UN
                simulations and academic seminars to active participation in international
                forums, ensuring our members gain comprehensive exposure to the mechanisms
                of global governance.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#222]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                The guiding principles that inform our collective actions and individual
                growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white dark:bg-[#1a1a1a] p-10 border border-[#CED4DA]/30 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Integrity</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upholding the highest ethical standards in all our deliberations,
                  research, and organizational management.
                </p>
              </div>
              {/* Value 2 */}
              <div className="bg-white dark:bg-[#1a1a1a] p-10 border border-[#CED4DA]/30 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">public</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Diplomacy</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Fostering inclusive dialogue and mutual understanding across cultural and
                  ideological boundaries.
                </p>
              </div>
              {/* Value 3 */}
              <div className="bg-white dark:bg-[#1a1a1a] p-10 border border-[#CED4DA]/30 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">insights</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Impact</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Driving measurable change through actionable advocacy and
                  community-driven initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section className="py-24 px-6 bg-white dark:bg-[#1a1a1a]">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-4xl font-bold text-center mb-20">Chapter History</h2>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#CED4DA] before:to-transparent">
              {/* Timeline Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="material-symbols-outlined text-sm">flag</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded border border-[#CED4DA]/20 bg-gray-50 dark:bg-[#1a1a1a]/50">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-xl font-display">2018</div>
                  </div>
                  <div className="text-lg font-bold mb-1">Inception</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Formal chartering of the UNA-ET-HU chapter by a group of passionate
                    political science students.
                  </div>
                </div>
              </div>
              {/* Timeline Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="material-symbols-outlined text-sm">groups</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded border border-[#CED4DA]/20 bg-gray-50 dark:bg-[#1a1a1a]/50">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-xl font-display">2020</div>
                  </div>
                  <div className="text-lg font-bold mb-1">First Regional Summit</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Hosted the Inter-University Model UN Summit, bringing together 15
                    chapters from across the region.
                  </div>
                </div>
              </div>
              {/* Timeline Item 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="material-symbols-outlined text-sm">travel_explore</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded border border-[#CED4DA]/20 bg-gray-50 dark:bg-[#1a1a1a]/50">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-xl font-display">2022</div>
                  </div>
                  <div className="text-lg font-bold mb-1">Geneva Delegation</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Sent our first student delegation to the Palais des Nations for an
                    official briefing on Sustainable Development.
                  </div>
                </div>
              </div>
              {/* Timeline Item 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="material-symbols-outlined text-sm">star</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded border border-[#CED4DA]/20 bg-gray-50 dark:bg-[#1a1a1a]/50">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-primary text-xl font-display">Present</div>
                  </div>
                  <div className="text-lg font-bold mb-1">Global Leadership Hub</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Operating as a leading voice for youth diplomacy with over 200 active
                    members and 10+ ongoing projects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}