import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { getEventById } from '@/data/eventsData';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        if (process.env.MONGODB_URI) {
            try {
                await connectDB();
                const event = await Event.findOne({ id: id }).lean();
                if (event) {
                    return NextResponse.json({ success: true, event });
                }
            } catch (e) {
                console.error('DB Error', e);
            }
        }

        // Fallback
        const event = getEventById(id);
        if (event) {
            return NextResponse.json({ success: true, event });
        }

        return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 });
        }

        const { id } = await params;
        const body = await request.json();

        await connectDB();
        
        // Don't allow changing the ID if it's the key
        // But here we use a custom 'id' field, so we might want to allow it or not.
        // Usually ID shouldn't change.
        
        const event = await Event.findOneAndUpdate({ id: id }, body, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, event });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 });
        }

        const { id } = await params;
        await connectDB();

        const event = await Event.findOneAndDelete({ id: id });

        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
