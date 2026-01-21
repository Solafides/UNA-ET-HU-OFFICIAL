"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// --- Components ---

function SDGHero() {
    return (
        <header className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10" />
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
                    }}
                />
            </div>
            <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Active Chapter
                    </span>
                </div>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-4xl">
                    Championing the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">
                        Global Goals
                    </span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-gray-200 sm:text-xl">
                    The dedicated ambassadors of UNA-ET-HU driving sustainable change across our communities
                    through the 17 Sustainable Development Goals.
                </p>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Button size="lg" className="font-bold shadow-xl shadow-primary/20">
                        See Our Impact
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold backdrop-blur-sm"
                    >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Video
                    </Button>
                </div>
            </div>
        </header>
    );
}

const sdgGoals = [
    {
        number: 1,
        title: "No Poverty",
        color: "#E5243B",
        description: "Eliminating poverty ensures economic stability and equal opportunities, reducing inequality worldwide.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/1.png"
    },
    {
        number: 2,
        title: "Zero Hunger",
        color: "#DDA63A",
        description: "Ending hunger and ensuring food security improves global health and productivity.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/2.png"
    },
    {
        number: 3,
        title: "Good Health and Well-being",
        color: "#4C9F38",
        description: "Universal healthcare access promotes longer, healthier lives and reduces disease burdens.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/3.png"
    },
    {
        number: 4,
        title: "Quality Education",
        color: "#C5192D",
        description: "Providing inclusive and equitable education empowers individuals and drives social and economic progress.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/4.png"
    },
    {
        number: 5,
        title: "Gender Equality",
        color: "#FF3A21",
        description: "Achieving gender equality fosters social justice and enhances economic and political inclusion.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/5.png"
    },
    {
        number: 6,
        title: "Clean Water and Sanitation",
        color: "#26BDE2",
        description: "Universal access to water and sanitation prevents diseases and supports sustainable living.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/6.png"
    },
    {
        number: 7,
        title: "Affordable and Clean Energy",
        color: "#FCC30B",
        description: "Renewable energy adoption reduces reliance on fossil fuels and mitigates climate change.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/7.png"
    },
    {
        number: 8,
        title: "Decent Work and Economic Growth",
        color: "#A21942",
        description: "Sustainable economic growth ensures fair wages, productivity, and social welfare.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/8.png"
    },
    {
        number: 9,
        title: "Industry, Innovation, and Infrastructure",
        color: "#FD6925",
        description: "Building resilient infrastructure promotes innovation, economic stability, and job creation.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/9.png"
    },
    {
        number: 10,
        title: "Reduced Inequalities",
        color: "#DD1367",
        description: "Ensuring social, economic, and political inclusion strengthens communities and global cooperation.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/10.png"
    },
    {
        number: 11,
        title: "Sustainable Cities and Communities",
        color: "#FD9D24",
        description: "Urban planning for sustainability reduces pollution, traffic, and housing crises.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/11.png"
    },
    {
        number: 12,
        title: "Responsible Consumption and Production",
        color: "#BF8B2E",
        description: "Circular economy practices minimize waste and reduce environmental footprints.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/12.png"
    },
    {
        number: 13,
        title: "Climate Action",
        color: "#3F7E44",
        description: "Mitigating climate change prevents extreme weather events and protects biodiversity.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/13.png"
    },
    {
        number: 14,
        title: "Life Below Water",
        color: "#0A97D9",
        description: "Ocean conservation ensures sustainable fisheries and protects marine ecosystems.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/14.png"
    },
    {
        number: 15,
        title: "Life on Land",
        color: "#56C02B",
        description: "Forest conservation, biodiversity protection, and land restoration maintain ecological balance.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/15.png"
    },
    {
        number: 16,
        title: "Peace, Justice, and Strong Institutions",
        color: "#00689D",
        description: "Transparent governance and justice systems reduce corruption and conflict.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/16.png"
    },
    {
        number: 17,
        title: "Partnerships for the Goals",
        color: "#19486A",
        description: "Global cooperation among governments, businesses, and civil society drives SDG success.",
        icon: "https://open-sdg.github.io/sdg-translations/assets/img/goals/en/17.png"
    },
];

function SDGGrid() {
    const [selectedGoal, setSelectedGoal] = useState<(typeof sdgGoals)[0] | null>(null);

    // Close modal when clicking outside or on close button
    const closeModal = () => setSelectedGoal(null);

    return (
        <section className="py-20 bg-card relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Our Commitment: The 17 Goals
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Click on any goal to learn more about its impact and our vision.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold cursor-pointer group">
                        <span>View Strategic Plan</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                    {sdgGoals.map((goal) => (
                        <div
                            key={goal.number}
                            onClick={() => setSelectedGoal(goal)}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] bg-white dark:bg-slate-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                        >
                            <div className="absolute inset-0 p-2">
                                <Image
                                    src={goal.icon}
                                    alt={goal.title}
                                    fill
                                    className="object-contain p-2"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal / Detail View */}
            {selectedGoal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="relative w-full max-w-lg bg-white dark:bg-[#1a1d23] rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div
                                className="w-24 h-24 relative mb-6 rounded-lg overflow-hidden shadow-md"
                                style={{ backgroundColor: selectedGoal.color }}
                            >
                                <Image
                                    src={selectedGoal.icon}
                                    alt={selectedGoal.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                                {selectedGoal.number}. {selectedGoal.title}
                            </h3>

                            <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>

                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {selectedGoal.description}
                            </p>

                            <Button onClick={closeModal} className="mt-8 font-bold">
                                Close
                            </Button>
                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
                </div>
            )}
        </section>
    );
}

function SDGCta() {
    return (
        <section className="bg-[#212935] py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to make an impact?
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                    Join a global network of changemakers. Whether you have 2 hours a week or 20, there is a
                    place for you in our movement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="font-bold">
                        Become an Ambassador
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white/20 text-white hover:bg-white/10 font-bold"
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
}

const ambassadors = [
    {
        name: "Sarah Ahmed",
        role: "Chapter President",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        sdgs: [1, 2],
    },
    {
        name: "David Chen",
        role: "Head of Projects",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        sdgs: [3, 4],
    },
    {
        name: "Elara Vance",
        role: "Community Lead",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        sdgs: [5, 10, 16],
    },
    {
        name: "Marcus Johnson",
        role: "Partnerships",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        sdgs: [13, 17],
    },
];

const sdgColors: Record<number, string> = {
    1: "#E5243B",
    2: "#DDA63A",
    3: "#4C9F38",
    4: "#C5192D",
    5: "#FF3A21",
    10: "#DD1367",
    13: "#3F7E44",
    16: "#00689D",
    17: "#19486A",
};

function LeadAmbassadors() {
    return (
        <section className="py-24 bg-card">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">The Team</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Meet the Lead Ambassadors
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                        Passionate individuals dedicating their time and skills to advance the Global Goals in
                        our region.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {ambassadors.map((ambassador) => (
                        <div key={ambassador.name} className="text-center group">
                            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-muted group-hover:ring-primary/30 transition-all">
                                <Image
                                    src={ambassador.image || "/placeholder.svg"}
                                    alt={ambassador.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg">{ambassador.name}</h3>
                            <p className="text-primary text-sm font-medium">{ambassador.role}</p>
                            <div className="flex justify-center gap-1 mt-3">
                                {ambassador.sdgs.map((sdg) => (
                                    <span
                                        key={sdg}
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: sdgColors[sdg] }}
                                        title={`SDG ${sdg}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const initiatives = [
    {
        title: "Green Hiking at Mt. Tabor",
        description:
            "Promoting eco-tourism and mental well-being while cleaning up trails. A monthly event that combines physical health with environmental stewardship.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        goals: [15, 3],
    },
    {
        title: "Autism Center Visits",
        description:
            "Regular visits to support local autism centers, fostering inclusivity and reducing inequalities through education, play, and community support.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        goals: [10, 3],
    },
    {
        title: "Climate Change Monday",
        description:
            "Weekly awareness campaigns on campus to educate students on carbon footprints and small actionable steps to combat climate change.",
        image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&q=80",
        goals: [13],
    },
];

const goalColors: Record<number, string> = {
    3: "#4C9F38",
    10: "#DD1367",
    13: "#3F7E44",
    15: "#56C02B",
};

function ImpactInitiatives() {
    return (
        <section className="bg-muted py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">In Action</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Impact Initiatives</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {initiatives.map((initiative) => (
                        <div
                            key={initiative.title}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-xl"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    {initiative.goals.map((goal) => (
                                        <span
                                            key={goal}
                                            className="inline-flex items-center rounded-md px-2 py-1 text-xs font-bold text-white"
                                            style={{ backgroundColor: goalColors[goal] }}
                                        >
                                            Goal {goal}
                                        </span>
                                    ))}
                                </div>
                                <Image
                                    src={initiative.image || "/placeholder.svg"}
                                    alt={initiative.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col flex-grow p-6">
                                <h3 className="text-xl font-bold mb-3">{initiative.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                                    {initiative.description}
                                </p>
                                <a
                                    href="#"
                                    className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-sm group/link"
                                >
                                    Read Story
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Main Page Component ---

export default function SDGPage() {
    return (
        <>
            <Navigation />
            <main>
                <SDGHero />
                <SDGGrid />
                <ImpactInitiatives />
                <LeadAmbassadors />
                <SDGCta />
            </main>
            <Footer />
        </>
    );
}
