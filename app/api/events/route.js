import { NextResponse } from 'next/server';
import { eventsData, getUpcomingEvents, getPastEvents, getEventsByYear, getEventYears, getPastEventYears } from '@/data/eventsData';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * GET /api/events
 * Returns events data with optional filtering
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const year = searchParams.get('year');
        const featured = searchParams.get('featured');

        // Try MongoDB first
        if (process.env.MONGODB_URI) {
            try {
                await connectDB();
                let query = {};

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (type === 'upcoming') {
                    query.upcoming = true;
                } else if (type === 'past') {
                    query.$or = [
                        { upcoming: false },
                        { date: { $lt: today } }
                    ];
                }

                if (year) {
                    query.year = parseInt(year);
                }

                if (featured === 'true') {
                    query.featured = true;
                }

                const events = await Event.find(query).sort({ date: -1 }).lean();
                
                // Get years from DB
                const allEvents = await Event.find({}, 'year').lean();
                const years = [...new Set(allEvents.map(e => e.year?.toString()))].filter(Boolean).sort((a, b) => b - a);

                return NextResponse.json({
                    success: true,
                    count: events.length,
                    events,
                    years
                });
            } catch (dbError) {
                console.error('MongoDB connection failed, falling back to static data:', dbError);
                // Fallback to static data below
            }
        }

        // Fallback to static data
        let events;
        let availableYears;

        if (type === 'upcoming') {
            events = getUpcomingEvents();
            availableYears = getEventYears();
        } else if (type === 'past') {
            events = getPastEvents();
            availableYears = getPastEventYears();
        } else if (year) {
            events = getEventsByYear(year).map(event => ({ ...event, year }));
            availableYears = getEventYears();
        } else {
            events = [];
            for (const yr in eventsData) {
                eventsData[yr].forEach(event => {
                    events.push({ ...event, year: yr });
                });
            }
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            availableYears = getEventYears();
        }

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

/**
 * POST /api/events
 * Create a new event
 */
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 });
        }

        await connectDB();
        const body = await request.json();
        
        const event = await Event.create(body);

        return NextResponse.json({
            success: true,
            event
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create event' },
            { status: 500 }
        );
    }
}
