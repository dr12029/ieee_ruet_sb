'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * ImageModal - Full-screen image viewer with navigation
 * @param {Object} props
 * @param {string} props.imageSrc - Current image source
 * @param {string[]} props.images - Array of all image sources
 * @param {number} props.currentIndex - Current image index
 * @param {Function} props.onClose - Close modal callback
 * @param {Function} props.onNext - Navigate to next image
 * @param {Function} props.onPrevious - Navigate to previous image
 */
export default function ImageModal({ imageSrc, images, currentIndex, onClose, onNext, onPrevious }) {
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrevious();
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, onNext, onPrevious]);

    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < images.length - 1;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-3 transition-all duration-300 z-20 shadow-xl hover:scale-110"
                aria-label="Close"
            >
                <FaTimes className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full font-semibold z-20">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            {hasPrevious && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-all duration-300 z-20 shadow-xl hover:scale-110"
                    aria-label="Previous image"
                >
                    <FaChevronLeft className="w-6 h-6" />
                </button>
            )}

            {/* Next Button */}
            {hasNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-all duration-300 z-20 shadow-xl hover:scale-110"
                    aria-label="Next image"
                >
                    <FaChevronRight className="w-6 h-6" />
                </button>
            )}

            {/* Image Container */}
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={imageSrc}
                        alt={`Gallery image ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                    />
                </div>
            </div>

            {/* Navigation Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium z-20 hidden md:block">
                Use arrow keys or buttons to navigate • ESC or click outside to close
            </div>
        </div>
    );
}
