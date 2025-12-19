import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { galleryData } from '@/data/galleryData';

// GET all gallery items
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const eventSlug = searchParams.get('eventSlug');
    const isPublished = searchParams.get('isPublished');

    let query = {};

    if (year) {
      query.year = year;
    }

    if (eventSlug) {
      query.eventSlug = eventSlug;
    }

    if (isPublished !== null && isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    const galleries = await Gallery.find(query).sort({ year: -1, displayOrder: 1, eventName: 1 });

    // Get unique years and event slugs for filters
    const years = [...new Set(galleries.map(g => g.year))].sort((a, b) => b.localeCompare(a));
    const eventSlugs = [...new Set(galleries.map(g => g.eventSlug))].sort();

    // Transform to frontend-expected format
    const galleryByYear = {};
    galleries.forEach(item => {
      if (!galleryByYear[item.year]) {
        galleryByYear[item.year] = {};
      }
      galleryByYear[item.year][item.eventSlug] = {
        name: item.eventName,
        images: item.images,
      };
    });

    return NextResponse.json({
      success: true,
      galleries: galleryByYear,
      items: galleries, // Also return flat list for admin
      years,
      eventSlugs,
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    
    // Fallback to static data
    const years = Object.keys(galleryData).sort((a, b) => b.localeCompare(a));
    const eventSlugs = [];
    Object.values(galleryData).forEach(yearData => {
      eventSlugs.push(...Object.keys(yearData));
    });

    return NextResponse.json({
      success: true,
      galleries: galleryData,
      items: [],
      years,
      eventSlugs: [...new Set(eventSlugs)].sort(),
      fallback: true,
    });
  }
}

// POST create new gallery item
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { eventId, year, eventSlug, eventName, images, displayOrder, isPublished } = body;

    console.log('API received eventId:', eventId); // Debug log

    // Validation
    if (!year || !eventSlug || !eventName) {
      return NextResponse.json(
        { success: false, error: 'Year, event slug, and event name are required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await Gallery.findOne({ year, eventSlug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery item with this year and event slug already exists' },
        { status: 400 }
      );
    }

    const gallery = await Gallery.create({
      eventId: eventId || null,
      year,
      eventSlug,
      eventName,
      images: images || [],
      displayOrder: displayOrder || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    console.log('Created gallery with eventId:', gallery.eventId); // Debug log

    return NextResponse.json({
      success: true,
      gallery,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
