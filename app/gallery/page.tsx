"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// --- Components ---

const categories = ["All", "MUN", "Outreach", "SDGs"];

function GalleryHeader({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (c: string) => void }) {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Community <span className="text-primary italic font-serif">Yearbook</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            A visual journey through our {"chapter's"} impact. From diplomatic debates to
                            community grassroots movements, this is the story of our collective action.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                    ? "bg-primary text-primary-foreground text-white"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80 bg-gray-100 dark:bg-gray-800"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
        alt: "Students in diplomatic debate",
        category: "MUN",
        height: "tall",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        alt: "Planning session with sticky notes",
        category: "Outreach",
        height: "medium",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
        alt: "Sustainability planting initiative",
        category: "SDGs",
        height: "short",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
        alt: "Public speaking at conference",
        category: "MUN",
        height: "tall",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        alt: "Community hiking activity",
        category: "Outreach",
        height: "tall",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        alt: "Blood donation drive",
        category: "SDGs",
        height: "medium",
    },
];

function GalleryGrid({ activeCategory }: { activeCategory: string }) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filteredImages = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Masonry Grid */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="break-inside-avoid relative group overflow-hidden rounded-xl"
                        >
                            <div
                                className={`relative ${image.height === "tall"
                                    ? "h-96"
                                    : image.height === "medium"
                                        ? "h-72"
                                        : "h-48"
                                    }`}
                            >
                                <Image
                                    src={image.src || "/placeholder.svg"}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-12">
                    <Button variant="outline" className="gap-2 bg-transparent text-black dark:text-white border-black/20 dark:border-white/20">
                        <ChevronDown className="h-4 w-4" />
                        Show More Activities
                    </Button>
                </div>

                {/* Scroll to Top */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}

// --- Main Page Component ---

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <>
            <Navigation />
            <main>
                <GalleryHeader activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <GalleryGrid activeCategory={activeCategory} />
            </main>
            <Footer />
        </>
    );
}
