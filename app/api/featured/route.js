import { NextResponse } from 'next/server';
import { getFeaturedItems, getFeaturedItemById } from '@/data/featuredData';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            // Get specific featured item by ID
            const item = getFeaturedItemById(id);
            if (!item) {
                return NextResponse.json(
                    { error: 'Featured item not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ data: item });
        }

        // Get all featured items
        const items = getFeaturedItems();
        return NextResponse.json({ data: items });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch featured items' },
            { status: 500 }
        );
    }
}
