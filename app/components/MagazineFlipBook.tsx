'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// CSS for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function MagazineFlipBook() {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const bookRef = useRef<any>(null);
    const soundRef = useRef<HTMLAudioElement | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const playFlipSound = useCallback(() => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play().catch((e) => {
                // Ignore auto-play errors
            });
        }
    }, []);

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    const goToPrevPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    };

    const goToNextPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    // Calculate dynamic dimensions based on window size
    const [dimensions, setDimensions] = useState({ width: 400, height: 565 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            setIsMobile(mobile);

            if (mobile) {
                // Mobile: Single page, larger width
                const availableWidth = Math.min(width * 0.95, 600);
                const pageHeight = availableWidth * 1.414;
                setDimensions({ width: availableWidth, height: pageHeight });
            } else {
                // Desktop: Double page spread
                // Total width for spread = 80% to 90% of screen, max 1200px
                // Page width = Total width / 2
                const availableWidth = Math.min(width * 0.9, 1400);
                const pageWidth = availableWidth / 2;
                const pageHeight = pageWidth * 1.414;
                setDimensions({ width: pageWidth, height: pageHeight });
            }
        };

        handleResize(); // Initial calc
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            {/* Audio Element - Hidden */}
            <audio ref={soundRef} src="/page-flip.mp3" preload="auto" />

            <div className="relative flex justify-center items-center w-full overflow-hidden">
                <Document
                    file="/hu-times-vol7.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex flex-col items-center gap-4 py-20">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[#5e5f8d] dark:text-gray-400">Loading Magazine...</p>
                        </div>
                    }
                    error={
                        <div className="text-center p-8 text-red-500">
                            <p>Failed to load PDF.</p>
                        </div>
                    }
                    className="flex justify-center"
                >
                    {/* 
                @ts-ignore: HTMLFlipBook types issue
            */}
                    <HTMLFlipBook
                        width={dimensions.width}
                        height={dimensions.height}
                        showCover={true}
                        onFlip={onFlip}
                        ref={bookRef}
                        className="magazine-book shadow-2xl"
                        style={{ margin: '0 auto' }}
                        startPage={0}
                        size="fixed"
                        minWidth={300}
                        maxWidth={1000}
                        minHeight={400}
                        maxHeight={1500}
                        drawShadow={true}
                        flippingTime={1000}
                        usePortrait={isMobile}
                        startZIndex={0}
                        autoSize={true}
                        maxShadowOpacity={0.5}
                        mobileScrollSupport={true}
                        swipeDistance={30}
                        clickEventForward={true}
                        useMouseEvents={true}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        onChangeState={(e: any) => {
                            if (e.data === 'flipping') {
                                playFlipSound();
                            }
                        }}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={`page_${index + 1}`} className="bg-white overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center bg-white">
                                    <Page
                                        pageNumber={index + 1}
                                        width={dimensions.width}
                                        onLoadSuccess={index === 0 ? onPageLoadSuccess : undefined}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="shadow-inner"
                                    />
                                </div>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </HTMLFlipBook>
                </Document>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-10">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a1d23] hover:bg-gray-50 dark:hover:bg-gray-800 text-[#101618] dark:text-white rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 font-bold"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Previous
                </button>
                <span className="text-[#5e5f8d] dark:text-gray-400 font-medium">
                    Page {currentPage} of {numPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === numPages}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a1d23] hover:bg-gray-50 dark:hover:bg-gray-800 text-[#101618] dark:text-white rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700 font-bold"
                >
                    Next
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
