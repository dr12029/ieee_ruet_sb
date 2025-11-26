'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa';
import YearSelector from '@/components/YearSelector';
import ImageModal from '@/components/ImageModal';

export default function GalleryPage() {
    const [galleryData, setGalleryData] = useState({});
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch gallery data on component mount
    useEffect(() => {
        async function fetchGalleryData() {
            try {
                const response = await fetch('/api/gallery');
                const data = await response.json();
                setGalleryData(data);

                const availableYears = Object.keys(data).sort((a, b) => b.localeCompare(a));
                setYears(availableYears);
                setSelectedYear(availableYears[0] || '');
            } catch (error) {
                console.error('Error fetching gallery data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchGalleryData();
    }, []);

    // Update event options when year changes
    useEffect(() => {
        if (selectedYear && galleryData[selectedYear]) {
            const eventKeys = Object.keys(galleryData[selectedYear]).sort();
            if (eventKeys.length > 0) {
                setSelectedEvent(eventKeys[0]);
            }
        }
    }, [selectedYear, galleryData]);

    // Update images when year or event changes
    useEffect(() => {
        if (selectedYear && selectedEvent && galleryData[selectedYear]?.[selectedEvent]) {
            setImages(galleryData[selectedYear][selectedEvent].images);
        } else {
            setImages([]);
        }
    }, [selectedYear, selectedEvent, galleryData]);

    const eventOptions = selectedYear && galleryData[selectedYear]
        ? Object.keys(galleryData[selectedYear])
            .sort()
            .map(eventKey => ({
                value: eventKey,
                label: galleryData[selectedYear][eventKey].name,
            }))
        : [];

    const eventName = selectedYear && selectedEvent && galleryData[selectedYear]?.[selectedEvent]
        ? galleryData[selectedYear][selectedEvent].name
        : '';

    const openImageModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImageIndex(null);
    };

    const goToNextImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const goToPreviousImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="mt-4 text-gray-600">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Image Modal */}
            {selectedImageIndex !== null && (
                <ImageModal
                    imageSrc={images[selectedImageIndex]}
                    images={images}
                    currentIndex={selectedImageIndex}
                    onClose={closeImageModal}
                    onNext={goToNextImage}
                    onPrevious={goToPreviousImage}
                />
            )}

            {/* Hero Section */}
            <section className="bg-white text-gray-900 py-16 mt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Gallery</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Capturing Moments of Innovation and Excellence
                        </p>
                    </div>
                </div>
            </section>

            {/* Selection Section */}
            <section className="py-6 bg-white border-b-2 border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto">
                        {/* Year Selection - Left Side */}
                        <YearSelector
                            years={years}
                            selectedYear={selectedYear}
                            onYearChange={setSelectedYear}
                            label="Select Year:"
                        />

                        {/* Event Selection - Right Side */}
                        <div className="flex items-center gap-4">
                            <label htmlFor="event-select" className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                                Select Event:
                            </label>
                            <select
                                id="event-select"
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="px-4 py-2.5 text-base font-medium text-gray-900 bg-white border-2 border-purple-300 rounded-lg shadow-sm hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer min-w-[250px]"
                            >
                                {eventOptions.map((event) => (
                                    <option key={event.value} value={event.value}>
                                        {event.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Title */}
            {
                eventName && (
                    <section className="py-8 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-7xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {eventName}
                                </h2>
                                <div className="w-24 h-1 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto mt-4"></div>
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Gallery Grid */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        {images.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md aspect-square cursor-pointer group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        onClick={() => openImageModal(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${eventName} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-white font-semibold text-sm px-3 py-1 bg-blue-600 rounded-full">
                                                Click to view
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <FaImages className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                                <p className="text-xl text-gray-500 font-medium">
                                    No images available for this event
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main >
    );
}
