# Backend Integration Guide - Gallery System

## Overview
The gallery system automatically discovers and displays photos organized by year and event. It uses filesystem scanning in the current implementation, making it extremely easy to add new photos without code changes.

---

## Current Implementation

### How It Works

1. **Folder Structure**:
```
public/gallery/
  2025/
    ieee-day/
      1.jpg
      2.jpg
      3.jpg
    tech-fest/
      photo1.jpg
      photo2.jpg
  2024/
    robotics-workshop/
      img1.jpg
      img2.jpg
```

2. **API Route**: `app/api/gallery/route.js`
   - Scans `/public/gallery/` directory at runtime
   - Discovers years (folder names)
   - Discovers events within each year
   - Lists all images in each event folder
   - Returns structured JSON

3. **Frontend**: `app/gallery/page.js`
   - Fetches from `/api/gallery`
   - Populates year dropdown
   - Populates event dropdown based on selected year
   - Displays images in grid
   - Full-screen modal viewer with keyboard navigation

### API Response Format
```json
{
    "2025": {
        "ieee-day": {
            "name": "IEEE Day",
            "images": [
                "/gallery/2025/ieee-day/1.jpg",
                "/gallery/2025/ieee-day/2.jpg",
                "/gallery/2025/ieee-day/3.jpg"
            ]
        },
        "tech-fest": {
            "name": "Tech Fest",
            "images": [
                "/gallery/2025/tech-fest/photo1.jpg",
                "/gallery/2025/tech-fest/photo2.jpg"
            ]
        }
    },
    "2024": {
        "robotics-workshop": {
            "name": "Robotics Workshop",
            "images": [...]
        }
    }
}
```

---

## Database Schema

### MongoDB Schema

```javascript
// Gallery Events Collection
{
    _id: ObjectId("..."),
    year: 2025,                        // Number: Event year
    eventSlug: "ieee-day-2025",        // String: URL-friendly slug
    eventName: "IEEE Day 2025",        // String: Display name
    description: "Description...",     // String: Optional description
    date: ISODate("2025-10-01"),      // Date: Optional event date
    createdAt: ISODate("..."),        // Date: Auto-generated
    updatedAt: ISODate("...")         // Date: Auto-updated
}

// Gallery Images Collection
{
    _id: ObjectId("..."),
    eventId: ObjectId("..."),          // Reference to gallery_events
    fileName: "photo1.jpg",            // String: Original filename
    imagePath: "/gallery/2025/ieee-day-2025/photo1.jpg", // Full path or URL
    displayOrder: 1,                   // Number: For custom sorting
    caption: "Opening ceremony",       // String: Optional caption
    uploadedBy: "admin_user_id",       // String: User who uploaded
    uploadedAt: ISODate("..."),       // Date: Upload timestamp
    metadata: {                        // Object: Optional metadata
        width: 1920,
        height: 1080,
        size: 245760,                  // in bytes
        format: "jpg"
    }
}
```

### SQL Schema

```sql
-- Gallery Events table
CREATE TABLE gallery_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    event_slug VARCHAR(100) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_year_slug (year, event_slug),
    INDEX idx_year (year)
);

-- Gallery Images table
CREATE TABLE gallery_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    caption TEXT,
    uploaded_by VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON,
    FOREIGN KEY (event_id) REFERENCES gallery_events(id) ON DELETE CASCADE,
    INDEX idx_event_order (event_id, display_order)
);
```

---

## API Endpoints

### Current Endpoint

```
GET /api/gallery
```

Returns all years, events, and images.

### Required API Endpoints for Backend

#### 1. Get All Gallery Data
```
GET /api/gallery
```

**Response**: Same format as current (nested object by year)

#### 2. Get Years List
```
GET /api/gallery/years
```

**Response**:
```json
{
    "years": ["2025", "2024", "2023", ...]
}
```

#### 3. Get Events for a Year
```
GET /api/gallery/:year/events
GET /api/gallery?year=2025
```

**Response**:
```json
{
    "year": 2025,
    "events": [
        {
            "slug": "ieee-day-2025",
            "name": "IEEE Day 2025",
            "imageCount": 15,
            "thumbnail": "/gallery/2025/ieee-day-2025/1.jpg"
        }
    ]
}
```

#### 4. Get Images for an Event
```
GET /api/gallery/:year/:eventSlug
GET /api/gallery?year=2025&event=ieee-day-2025
```

**Response**:
```json
{
    "year": 2025,
    "eventSlug": "ieee-day-2025",
    "eventName": "IEEE Day 2025",
    "description": "...",
    "images": [
        {
            "id": "img_id_1",
            "path": "/gallery/2025/ieee-day-2025/1.jpg",
            "caption": "Opening ceremony",
            "order": 1
        }
    ]
}
```

---

## Backend Implementation

### MongoDB Example

```javascript
// app/api/gallery/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GalleryEvent from '@/models/GalleryEvent';
import GalleryImage from '@/models/GalleryImage';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const eventSlug = searchParams.get('event');

        if (year && eventSlug) {
            // Get specific event's images
            const event = await GalleryEvent.findOne({ year, eventSlug });
            if (!event) {
                return NextResponse.json({ error: 'Event not found' }, { status: 404 });
            }
            
            const images = await GalleryImage.find({ eventId: event._id })
                .sort({ displayOrder: 1 })
                .lean();
            
            return NextResponse.json({
                year: event.year,
                eventSlug: event.eventSlug,
                eventName: event.eventName,
                description: event.description,
                images: images.map(img => ({
                    id: img._id.toString(),
                    path: img.imagePath,
                    caption: img.caption,
                    order: img.displayOrder
                }))
            });
        }

        if (year) {
            // Get events for a year
            const events = await GalleryEvent.find({ year })
                .sort({ eventDate: -1 })
                .lean();
            
            const eventsWithImages = await Promise.all(
                events.map(async (event) => {
                    const imageCount = await GalleryImage.countDocuments({ eventId: event._id });
                    const firstImage = await GalleryImage.findOne({ eventId: event._id })
                        .sort({ displayOrder: 1 });
                    
                    return {
                        slug: event.eventSlug,
                        name: event.eventName,
                        imageCount,
                        thumbnail: firstImage?.imagePath || null
                    };
                })
            );
            
            return NextResponse.json({
                year: parseInt(year),
                events: eventsWithImages
            });
        }

        // Get all data (nested format for compatibility)
        const allEvents = await GalleryEvent.find({})
            .sort({ year: -1, eventDate: -1 })
            .lean();
        
        const galleryData = {};
        
        for (const event of allEvents) {
            const yearStr = event.year.toString();
            if (!galleryData[yearStr]) {
                galleryData[yearStr] = {};
            }
            
            const images = await GalleryImage.find({ eventId: event._id })
                .sort({ displayOrder: 1 })
                .lean();
            
            galleryData[yearStr][event.eventSlug] = {
                name: event.eventName,
                images: images.map(img => img.imagePath)
            };
        }
        
        return NextResponse.json(galleryData);

    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery' },
            { status: 500 }
        );
    }
}
```

### SQL Example (Prisma)

```javascript
// app/api/gallery/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const eventSlug = searchParams.get('event');

        if (year && eventSlug) {
            const event = await prisma.galleryEvent.findUnique({
                where: {
                    year_eventSlug: {
                        year: parseInt(year),
                        eventSlug: eventSlug
                    }
                },
                include: {
                    images: {
                        orderBy: { displayOrder: 'asc' }
                    }
                }
            });
            
            if (!event) {
                return NextResponse.json({ error: 'Event not found' }, { status: 404 });
            }
            
            return NextResponse.json({
                year: event.year,
                eventSlug: event.eventSlug,
                eventName: event.eventName,
                description: event.description,
                images: event.images.map(img => ({
                    id: img.id,
                    path: img.imagePath,
                    caption: img.caption,
                    order: img.displayOrder
                }))
            });
        }

        if (year) {
            const events = await prisma.galleryEvent.findMany({
                where: { year: parseInt(year) },
                include: {
                    images: {
                        take: 1,
                        orderBy: { displayOrder: 'asc' }
                    },
                    _count: {
                        select: { images: true }
                    }
                },
                orderBy: { eventDate: 'desc' }
            });
            
            return NextResponse.json({
                year: parseInt(year),
                events: events.map(event => ({
                    slug: event.eventSlug,
                    name: event.eventName,
                    imageCount: event._count.images,
                    thumbnail: event.images[0]?.imagePath || null
                }))
            });
        }

        // Get all data (nested format)
        const allEvents = await prisma.galleryEvent.findMany({
            include: {
                images: {
                    orderBy: { displayOrder: 'asc' }
                }
            },
            orderBy: [
                { year: 'desc' },
                { eventDate: 'desc' }
            ]
        });
        
        const galleryData = {};
        
        allEvents.forEach(event => {
            const yearStr = event.year.toString();
            if (!galleryData[yearStr]) {
                galleryData[yearStr] = {};
            }
            
            galleryData[yearStr][event.eventSlug] = {
                name: event.eventName,
                images: event.images.map(img => img.imagePath)
            };
        });
        
        return NextResponse.json(galleryData);

    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery' },
            { status: 500 }
        );
    }
}
```

---

## Admin Panel Features

### 1. Create Event
```
POST /api/admin/gallery/events
```

**Request Body**:
```json
{
    "year": 2025,
    "eventSlug": "ieee-day-2025",
    "eventName": "IEEE Day 2025",
    "description": "...",
    "eventDate": "2025-10-01"
}
```

### 2. Upload Images
```
POST /api/admin/gallery/events/:id/upload
```

**Request**: `multipart/form-data` with files

**Implementation**:
- Accept multiple files
- Upload to cloud storage (AWS S3, Cloudinary, etc.) or local `/public/gallery/`
- Create `GalleryImage` records
- Auto-increment `displayOrder`

**Example**:
```javascript
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request, { params }) {
    const formData = await request.formData();
    const files = formData.getAll('images');
    const eventId = params.id;
    
    // Get event details
    const event = await GalleryEvent.findById(eventId);
    if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    const uploadedImages = [];
    
    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create directory if doesn't exist
        const dir = path.join(process.cwd(), 'public', 'gallery', event.year.toString(), event.eventSlug);
        await mkdir(dir, { recursive: true });
        
        // Save file
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(dir, fileName);
        await writeFile(filePath, buffer);
        
        // Create database record
        const imagePath = `/gallery/${event.year}/${event.eventSlug}/${fileName}`;
        const image = await GalleryImage.create({
            eventId: event._id,
            fileName: file.name,
            imagePath,
            displayOrder: uploadedImages.length,
            uploadedBy: 'admin', // Get from auth
        });
        
        uploadedImages.push(image);
    }
    
    return NextResponse.json({
        success: true,
        count: uploadedImages.length,
        images: uploadedImages
    });
}
```

### 3. Reorder Images
```
PATCH /api/admin/gallery/events/:id/reorder
```

**Request Body**:
```json
{
    "imageIds": ["img1", "img3", "img2"]  // New order
}
```

### 4. Delete Image
```
DELETE /api/admin/gallery/images/:id
```

### 5. Update Image Caption
```
PATCH /api/admin/gallery/images/:id
```

**Request Body**:
```json
{
    "caption": "New caption text"
}
```

---

## Image Storage Options

### Option 1: Local Storage (Current)
- Images in `/public/gallery/`
- Served directly by Next.js
- Simple, no external dependencies
- **Limitation**: Not scalable for large galleries

### Option 2: Cloud Storage (Recommended)

#### AWS S3
```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

async function uploadToS3(file, key) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
    });
    
    await s3.send(command);
    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
}
```

#### Cloudinary
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadToCloudinary(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'ieee-gallery' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
}
```

---

## Event Name Formatting

The current API formats event folder names to display names:

```javascript
function formatEventName(folderName) {
    return folderName
        .split('_')
        .map(word => {
            // Uppercase known acronyms
            const acronyms = ['ieee', 'agm', 'ai', 'iot', 'pcb', 'ras', 'wie', 'pes', 'ict', 'ielts', 'matlab'];
            if (acronyms.includes(word.toLowerCase())) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
```

**Examples**:
- `ieee_day_2025` → "IEEE Day 2025"
- `tech_fest` → "Tech Fest"
- `ras_iot_workshop` → "RAS IOT Workshop"

When using a database, store both `eventSlug` (URL-friendly) and `eventName` (display name).

---

## Frontend Changes

Minimal changes needed. The gallery page already fetches from `/api/gallery`:

```javascript
// app/gallery/page.js
useEffect(() => {
    async function fetchGallery() {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setGalleryData(data);
    }
    fetchGallery();
}, []);
```

**When backend is ready**: Just replace the API route implementation. Frontend continues to work.

---

## Image Optimization

### Next.js Image Component
Already used in the gallery page:
```jsx
<Image
    src={image}
    alt={`${selectedEvent} ${index + 1}`}
    width={400}
    height={300}
    className="..."
/>
```

### For Cloud Storage
Update `next.config.mjs`:
```javascript
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'your-bucket.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ],
    },
};
```

---

## Testing Checklist

- [ ] Can fetch all gallery data
- [ ] Can fetch years list
- [ ] Can fetch events for a specific year
- [ ] Can fetch images for a specific event
- [ ] Year dropdown populates correctly
- [ ] Event dropdown updates when year changes
- [ ] Images display in grid
- [ ] Full-screen modal works
- [ ] Keyboard navigation works (left/right arrows, ESC)
- [ ] Can upload new images via admin
- [ ] Can create new events
- [ ] Can reorder images
- [ ] Can delete images
- [ ] Can add captions
- [ ] Images load with optimization

---

## Performance Considerations

### Lazy Loading
Images automatically lazy-load with Next.js Image component.

### Pagination
For events with many images (50+):
```
GET /api/gallery/:year/:event?page=1&limit=30
```

### Caching
```javascript
export async function GET(request) {
    return NextResponse.json(data, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        }
    });
}
```

### Image Thumbnails
Generate and store thumbnails for grid view:
```javascript
metadata: {
    thumbnail: "/gallery/2025/event/thumb_photo1.jpg"
}
```

---

## Migration Strategy

### From Filesystem to Database

1. **Scan existing files** and create script to import:
```javascript
import fs from 'fs';
import path from 'path';

async function migrateGallery() {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    const years = fs.readdirSync(galleryPath);
    
    for (const year of years) {
        const yearPath = path.join(galleryPath, year);
        const events = fs.readdirSync(yearPath);
        
        for (const eventSlug of events) {
            const eventPath = path.join(yearPath, eventSlug);
            const images = fs.readdirSync(eventPath)
                .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
            
            // Create event in database
            const event = await GalleryEvent.create({
                year: parseInt(year),
                eventSlug,
                eventName: formatEventName(eventSlug)
            });
            
            // Create image records
            for (let i = 0; i < images.length; i++) {
                await GalleryImage.create({
                    eventId: event._id,
                    fileName: images[i],
                    imagePath: `/gallery/${year}/${eventSlug}/${images[i]}`,
                    displayOrder: i
                });
            }
            
            console.log(`Migrated ${eventSlug} (${images.length} images)`);
        }
    }
}
```

2. **Run migration**: `node scripts/migrate-gallery.js`

3. **Verify data** in database

4. **Switch API** to use database instead of filesystem

---

## Support

For questions about gallery backend integration:
- `DOCUMENTATION.md` - Overall structure
- `API_STRUCTURE.md` - API organization
- `DATABASE_SCHEMA.md` - Complete schema

---

**Last Updated**: January 2025
