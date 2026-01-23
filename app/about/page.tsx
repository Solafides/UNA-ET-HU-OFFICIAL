import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Data for Presidency (2 members)
const presidency = [
  {
    name: "Abebe Kebede",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Helen Tadesse",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
];

// Data for Team Heads (5 members) - Uses Black&White to Color hover effect
const teamHeads = [
  {
    name: "Martha Yoseph",
    role: "MUN Coordinator",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1GYx-P3f0E6U58pbItggBdyuiBDX8OqM-E4927xJ2atODrHQFGjaMcN00Ao5YIf94wUjEpyL8-M1a6KnM1g5dcA8Jw1WdgUlTN9UBxRvjlt4LVyrtH0gmkDHppKgm5faXu3M_HDgx41EkPa6Hbq-pJ7hGi_lpYhjXVRcHZ51DencqV0ikLVXQNdhm9cuYTcIztk8_3YOUbIP3yL_Wvzfd25SyGsauJIcO-GHgKGlDsOu5fJq9414xw4HfsMJx3tjOdZu_5WlQ8ujT",
  },
  {
    name: "Dawit Belay",
    role: "Head of Delegates",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi5nf8oViN_Y7kxSH5YfEA3E-W_YUV33_AfW6g2lsuH_nEt2eK7To33gA4xnCBRWudkJ4_d3sZgfScBzNUjN87mb8Ifnymf4d275NfAYxhPzyeJEhy_Ce-bQjfmIwq-J8eb0ALlMw6oxqFUqQ1fvbyNMKX75-apAedog0xWmOYdk0NUNuNLmPeVngPTQsn8bfwL-bwJqyjqW0Vd4uNVjm6qeIrKy5HJPcqwRtRRZyX5mYz1X74ZEdh5z4uDQhOhirfNfyMq9gROAXB",
  },
  {
    name: "Lulit Mesfin",
    role: "Research Lead",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmvlebazCi9SebIq1cgUgfhGSebv3IPXKNQoGuF1eiEVVAZKehDcZLI2T4fcR50m1xfBqjE5ZtuNt6fbFbfnSyHz9t-ZPkmhDUkO5rkWamS0w7dgblsfF_x3K5KH3oIilJ8XEZeJULj5w_QX7GbtQi9LNTQP-pUL0sG9LfGpejYj9NmcCeGhI4VJwT4VjS7najz-9s0YgZH-KmvOe5cW2NixPVgUuyIJmjNuTDPV942xZy4R0EDi7wjFJ8j7ZIxqiCClBWb6DceN-t",
  },
  {
    name: "Yonas Kebede",
    role: "Public Speaking Coach",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5xpjSyeUaPoCVLcRYGacSX1urxylS_yAlDzmbvROCYS-2c4Gf0eKDbZ22t8LCG-3WbBFaEe-N3NXGYUJMLI6QKA1qlq6A8plPdP36KimOuBYnKQvMCrOJqMedN0vnHC76hXcTMwy2lcXj4mrdcO_PLd01S-dqkDLnZkkLXb9IMWDzW6mRKuGhI-CnipdYpJ4BRzKkF3IlYtDeMK5zrrQA1B_8keTh-FdUgTUpdEo9DmMVSDrzwK5BRyTQk8-6yZVmwNZNVcT1vOa",
  },
  {
    name: "Bethelhem Assefa", // Placeholder
    role: "Events & Logistics Head",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
];

// Data for Executives (6 members)
const executives = [
  {
    name: "Samuel Girma",
    role: "Secretary General",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Hanna Mekonnen", // Placeholder
    role: "Director of Finance",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "Kirubel Tefera", // Placeholder
    role: "Director of Marketing",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  },
  {
    name: "Rahwa Tadesse", // Placeholder
    role: "Director of HR",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    name: "Eyob Alemu", // Placeholder
    role: "Director of Partnerships",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    name: "Saron Bekele", // Placeholder
    role: "Director of Communications",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  },
];

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

        {/* Leadership & Teams Section */}
        <section id="leadership" className="py-24 px-6 bg-gray-50 dark:bg-[#222]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-[#101618] dark:text-white">
                Our Leadership & Teams
              </h2>
              <p className="text-[#5e808d] dark:text-gray-400 text-lg leading-relaxed">
                Meet the changemakers at Hawassa University. Our structure reflects our
                commitment to diplomacy, the Sustainable Development Goals, and tangible
                local impact.
              </p>
            </div>

            {/* 1. Presidency Section (2 Columns) */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
                <h2 className="text-2xl font-black text-center uppercase tracking-wider text-primary">The Presidency</h2>
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {presidency.map((member) => (
                  <div key={member.name} className="group relative">
                    <div
                      className="mb-4 aspect-square w-full rounded-2xl bg-cover bg-center shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1"
                      style={{ backgroundImage: `url("${member.image}")` }}
                    />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#101618] dark:text-white leading-tight mb-2">
                        {member.name}
                      </h3>
                      <span className="text-primary font-bold text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Team Heads Section (5 Columns) - Black & White Hover Effect */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
                <h2 className="text-xl font-black text-center uppercase tracking-wider text-[#101618] dark:text-white">Heads of Teams</h2>
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                {teamHeads.map((member) => (
                  <div key={member.name} className="group relative">
                    <div
                      className="mb-4 aspect-square w-full rounded-xl bg-cover bg-center grayscale transition-all duration-500 group-hover:grayscale-0 shadow-sm hover:shadow-md"
                      style={{ backgroundImage: `url("${member.image}")` }}
                    />
                    <div className="text-center">
                      <p className="text-base font-bold text-[#101618] dark:text-white leading-tight mb-1">{member.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5e808d] dark:text-gray-500">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Executives Section (6 Columns) */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
                <h2 className="text-xl font-black text-center uppercase tracking-wider text-[#101618] dark:text-white">Executive Board</h2>
                <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-5">
                {executives.map((member) => (
                  <div key={member.name} className="group">
                    <div
                      className="mb-3 aspect-square rounded-xl bg-cover bg-center shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1"
                      style={{ backgroundImage: `url("${member.image}")` }}
                    />
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#101618] dark:text-white leading-tight mb-1">{member.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}