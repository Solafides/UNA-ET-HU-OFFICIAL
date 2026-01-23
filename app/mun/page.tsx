"use client";

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Award, BookOpen, PlayCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Components ---

function MUNHero() {
  return (
    <header className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10" />
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRcNbo_xf8xjs17oSvEe-uHey6xqpKdBTCGc3qrsBJUpW7rOnTRA6kPtE0W00c7PdVJipO1ABO3AydMUSCjqUOjAcjSuKvQIi7c9qL2eKQYfwiD1WPA2BWCI7Aci-Yf4cCF3y60lOnpWol4P3R1eaiOHOySQ4srX0BvjaGiYZdjwOOkKKx4pma0dkzMy7bb81cnZb8t4U615I8aRN3KRKn4luK6dTzEeQOvNBCmZnldQc4VTJDrZ1iUkG42ll8UAVY5RyHU1HEf-Yx')`,
          }}
        />
      </div>
      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Excellence in Diplomacy
          </span>
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-4xl">
          Model United <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            Nations
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-gray-200 sm:text-xl">
          Empowering the next generation of global leaders through rigorous debate,
          collaborative problem-solving, and international cooperation.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" className="font-bold shadow-xl shadow-primary/20">
            Register for Next MUN
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold backdrop-blur-sm"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            View Schedule
          </Button>
        </div>
      </div>
    </header>
  );
}

const stats = [
  { value: "300+", label: "Delegates" },
  { value: "12", label: "Councils" },
  { value: "24", label: "Resolutions" },
]

function PastSuccess() {
  return (
    <section className="bg-card py-20 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#1a2b3c] text-white">
          <div className="grid grid-cols-1 gap-6 sm:gap-0 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-4 sm:p-8 md:p-12 lg:p-16">
              <div className="mb-4 sm:mb-6 flex items-center gap-2">
                <Award className="size-4 sm:size-5 text-amber-400" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400">
                  Historical Milestone
                </span>
              </div>
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
                2022 Diplomatic Conference
              </h2>
              <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base leading-relaxed text-gray-300">
                Reflecting on the monumental success of the 2022 summit held in
                Budapest, where over 300 delegates from 45 universities
                collaborated on revolutionary resolutions for maritime security.
              </p>

              <div className="mb-6 sm:mb-10 grid grid-cols-3 gap-4 sm:gap-6 border-y border-white/10 py-4 sm:py-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-0.5 sm:mb-1 font-serif text-xl sm:text-2xl md:text-3xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="sm"
                className="w-fit bg-amber-500 px-4 sm:px-8 py-2 sm:py-4 font-bold text-xs sm:text-base text-[#1a2b3c] hover:bg-amber-500/90"
              >
                <Link href="#">
                  Read the 2022 Report
                  <BookOpen className="ml-2 size-3 sm:size-4" />
                </Link>
              </Button>
            </div>

            <div className="relative hidden min-h-[300px] sm:min-h-[400px] lg:block">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAY13UuIr5P_XmSLOkOUYe8fPcL3zTdWdwlJAmOhBGc0WlKvaTvsl3kWp8ML7HDMXZvL0Y-SzEcMtkeBkgQiggt9DQEZh8VIH4u78j9lI6fwcbc2ZIOISu7mURLUIgmnoFAuEtdHLEHLIhmKRJszPBKTgwtROYhL2m8yPyILbZfGewO1njnq-w5Qgar1NZqxNrxXdhR2IHspUjho0f4Nm2Uj5gdTWdAZ3Vtrr7HTHhaMkcAOMSQhH51nLKgEDfZi345_9z2dQzmcWgU')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a2b3c]/20 lg:to-[#1a2b3c]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Main Page Component ---

export default function MUNPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <MUNHero />

        <div className="max-w-7xl mx-auto px-6 pt-16">
          {/* Upcoming Conferences */}
          <section className="mb-20">
            <div className="flex items-end justify-between mb-8 px-2">
              <div>
                <h2 className="text-3xl font-bold mb-2">Upcoming Conferences</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Join our upcoming sessions and represent a nation.
                </p>
              </div>
              <a
                href="#"
                className="text-primary font-bold text-sm flex items-center gap-1 group"
              >
                View full calendar
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Conference Card 1 */}
              <div className="group bg-white dark:bg-[#16191d] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop")',
                  }}
                >
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#16191d]/90 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary">
                    Registration Open
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    Oct 12-15, 2024
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Addis Ababa MUN 2024
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    Theme: &quot;Resilient Infrastructure for a Sustainable Future in the Horn
                    of Africa.&quot;
                  </p>
                  <button className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
                    Details & Registration
                  </button>
                </div>
              </div>

              {/* Conference Card 2 */}
              <div className="group bg-white dark:bg-[#16191d] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop")',
                  }}
                >
                  <div className="absolute top-4 right-4 bg-gray-100/90 dark:bg-gray-800/90 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    Dec 05, 2024
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Global Leadership Summit
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    A focus on youth representation in peace-building and diplomatic
                    mediation.
                  </p>
                  <button className="w-full py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-400 font-bold text-sm cursor-not-allowed">
                    Notify Me
                  </button>
                </div>
              </div>

              {/* Conference Card 3 */}
              <div className="group bg-white dark:bg-[#16191d] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop")',
                  }}
                >
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#16191d]/90 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary">
                    Registration Open
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    Jan 20, 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Youth Assembly
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    Simulating the UN General Assembly to address urgent climate policy.
                  </p>
                  <button className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
                    Details & Registration
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Past Success Section (Moved Below) */}
        <PastSuccess />

        <div className="max-w-7xl mx-auto px-6">
          {/* Final CTA */}
          <section className="text-center py-20 px-6">
            <h2 className="text-4xl font-bold mb-4">Ready to take your seat?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join our network of diplomats and start building the skills that will shape
              your professional career and the world&apos;s future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3">
                Register for Next MUN
                <span className="material-symbols-outlined">person_add</span>
              </button>
              <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                Contact Organizer
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}