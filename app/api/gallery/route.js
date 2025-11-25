import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Formats event folder name into a readable display name
 * @param {string} folderName - The folder name (e.g., "ieee_day_2019")
 * @returns {string} Formatted name (e.g., "IEEE Day 2019")
 */
function formatEventName(folderName) {
    return folderName
        .split('_')
        .map(word => {
            // Uppercase known acronyms
            const acronyms = ['ieee', 'agm', 'ai', 'iot', 'pcb', 'ras', 'wie', 'pes', 'ict', 'ielts', 'matlab'];
            if (acronyms.includes(word.toLowerCase())) {
                return word.toUpperCase();
            }
            // Capitalize first letter of other words
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

/**
 * GET /api/gallery
 * Scans the gallery directory and returns structured data with all years, events, and images
 */
export async function GET() {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    const galleryData = {};

    try {
        // Check if gallery directory exists
        if (!fs.existsSync(galleryPath)) {
            console.warn('Gallery directory not found:', galleryPath);
            return NextResponse.json({});
        }

        // Read all year folders
        const years = fs.readdirSync(galleryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)

        years.forEach(year => {
            const yearPath = path.join(galleryPath, year);
            galleryData[year] = {};

            // Read all event folders within this year
            const events = fs.readdirSync(yearPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)
                .sort(); // Sort alphabetically

            events.forEach(event => {
                const eventPath = path.join(yearPath, event);

                // Read all image files in this event folder
                const images = fs.readdirSync(eventPath)
                    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // Natural sort
                    .map(file => `/gallery/${year}/${event}/${file}`);

                // Only include events that have at least one image
                if (images.length > 0) {
                    galleryData[year][event] = {
                        name: formatEventName(event),
                        images: images,
                    };
                }
            });

            // Remove year if it has no events with images
            if (Object.keys(galleryData[year]).length === 0) {
                delete galleryData[year];
            }
        });

        return NextResponse.json(galleryData);
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        return NextResponse.json({ error: 'Failed to load gallery data' }, { status: 500 });
    }
}
