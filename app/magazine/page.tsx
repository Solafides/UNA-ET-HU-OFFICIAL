'use client';

import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Dynamically import the FlipBook component with SSR disabled
const MagazineFlipBook = dynamic(() => import('../components/MagazineFlipBook'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#5e5f8d] dark:text-gray-400">Loading Magazine Player...</p>
        </div>
    ),
});

export default function MagazinePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8] dark:bg-[#0f0f23]">
            <Navigation />

            <main className="flex-1 flex flex-col items-center py-12 px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-[#101618] dark:text-white mb-4">
                        HU-Times Magazine
                    </h1>
                    <p className="text-[#5e5f8d] dark:text-gray-400 max-w-2xl mx-auto">
                        Volume 7 - Official Publication of UNA-ET-HU
                    </p>
                </div>

                <div className="w-full max-w-7xl flex justify-center items-center bg-white dark:bg-[#1a1d23] rounded-2xl shadow-xl overflow-hidden p-1 md:p-8 border border-gray-200 dark:border-gray-800">
                    <MagazineFlipBook />
                </div>

            </main>

            <Footer />
        </div>
    );
}
