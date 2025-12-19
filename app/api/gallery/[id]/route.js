import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET single gallery item
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update gallery item
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;
    const body = await request.json();
    const { year, eventSlug, eventName, images, displayOrder, isPublished } = body;

    // Validation
    if (!year || !eventSlug || !eventName) {
      return NextResponse.json(
        { success: false, error: 'Year, event slug, and event name are required' },
        { status: 400 }
      );
    }

    // Check for duplicate (excluding current item)
    const existing = await Gallery.findOne({ 
      year, 
      eventSlug,
      _id: { $ne: id }
    });
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery item with this year and event slug already exists' },
        { status: 400 }
      );
    }

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      {
        year,
        eventSlug,
        eventName,
        images: images || [],
        displayOrder: displayOrder || 0,
        isPublished: isPublished !== undefined ? isPublished : true,
      },
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE gallery item
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;
    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
