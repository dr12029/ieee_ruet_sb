import { NextResponse } from 'next/server';
import { eventsData, getUpcomingEvents, getPastEvents, getEventsByYear, getEventYears, getPastEventYears } from '@/data/eventsData';

/**
 * GET /api/events
 * Returns events data with optional filtering
 * Query params:
 * - type: 'upcoming' | 'past' | 'all'
 * - year: specific year (e.g., '2024')
 * - featured: 'true' to get only featured events
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const year = searchParams.get('year');
        const featured = searchParams.get('featured');

        let events;
        let availableYears;

        if (type === 'upcoming') {
            events = getUpcomingEvents();
            availableYears = getEventYears();
        } else if (type === 'past') {
            events = getPastEvents();
            availableYears = getPastEventYears(); // Use past event years only
        } else if (year) {
            events = getEventsByYear(year).map(event => ({ ...event, year }));
            availableYears = getEventYears();
        } else {
            // Return all events with year info
            events = [];
            for (const yr in eventsData) {
                eventsData[yr].forEach(event => {
                    events.push({ ...event, year: yr });
                });
            }
            // Sort by date descending
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            availableYears = getEventYears();
        }

        // Filter by featured if requested
        if (featured === 'true') {
            events = events.filter(event => event.featured);
        }

        return NextResponse.json({
            success: true,
            count: events.length,
            events,
            years: availableYears
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
