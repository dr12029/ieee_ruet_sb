# Gallery Data Generator Helper

This document explains how to automatically generate gallery data when you have images organized in folders.

## Auto-Generate Gallery Data (Future Enhancement)

For backend integration, you can create an API endpoint that scans the gallery folder and returns the data structure automatically.

### Example API Endpoint (`/api/gallery/scan`)

```javascript
// app/api/gallery/scan/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const galleryPath = path.join(process.cwd(), 'public', 'gallery');
  const galleryData = {};

  try {
    // Read all year folders
    const years = fs.readdirSync(galleryPath);
    
    years.forEach(year => {
      if (fs.statSync(path.join(galleryPath, year)).isDirectory()) {
        galleryData[year] = {};
        
        // Read all event folders for this year
        const events = fs.readdirSync(path.join(galleryPath, year));
        
        events.forEach(event => {
          const eventPath = path.join(galleryPath, year, event);
          if (fs.statSync(eventPath).isDirectory()) {
            // Read all images in this event folder
            const images = fs.readdirSync(eventPath)
              .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
              .map(file => `/gallery/${year}/${event}/${file}`);
            
            if (images.length > 0) {
              galleryData[year][event] = {
                name: formatEventName(event),
                images: images.sort(), // Sort alphabetically
              };
            }
          }
        });
      }
    });

    return NextResponse.json(galleryData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan gallery' }, { status: 500 });
  }
}

// Helper function to convert slug to display name
function formatEventName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

### For Database Backend

When using a database, structure your gallery table like this:

```sql
CREATE TABLE gallery_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  year INT NOT NULL,
  event_slug VARCHAR(100) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES gallery_events(id)
);
```

### API Endpoints Needed

1. **GET /api/gallery/years** - Get all available years
2. **GET /api/gallery/:year/events** - Get events for a year
3. **GET /api/gallery/:year/:event** - Get images for an event
4. **POST /api/gallery/upload** - Upload new images (admin only)

### Example API Integration

Update `data/galleryData.js`:

```javascript
export async function getGalleryYears() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/years`);
  if (!res.ok) throw new Error('Failed to fetch years');
  return res.json();
}

export async function getEventOptions(year) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${year}/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function getEventImages(year, eventSlug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${year}/${eventSlug}`);
  if (!res.ok) throw new Error('Failed to fetch images');
  const data = await res.json();
  return data.images;
}
```

## Manual Data Entry Template

If adding events manually, use this template in `data/galleryData.js`:

```javascript
"event-slug": {
  name: "Display Name of Event",
  images: [
    "/gallery/YEAR/event-slug/1.jpg",
    "/gallery/YEAR/event-slug/2.jpg",
    "/gallery/YEAR/event-slug/3.jpg",
  ],
},
```

## Admin Panel Features (Future)

For the admin panel, you'll want to build:

1. **Upload Interface**: Drag-and-drop image upload
2. **Event Manager**: Create/edit/delete events
3. **Image Manager**: Reorder, delete, add captions to images
4. **Year Manager**: Add new years
5. **Bulk Upload**: Upload multiple images at once

### Example Upload Component

```javascript
// components/admin/GalleryUpload.js
'use client';

import { useState } from 'react';

export default function GalleryUpload() {
  const [year, setYear] = useState('2025');
  const [eventSlug, setEventSlug] = useState('');
  const [eventName, setEventName] = useState('');
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('year', year);
    formData.append('eventSlug', eventSlug);
    formData.append('eventName', eventName);
    
    files.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    const res = await fetch('/api/gallery/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Images uploaded successfully!');
      // Reset form
      setFiles([]);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Upload Gallery Images</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Event Slug</label>
          <input
            type="text"
            value={eventSlug}
            onChange={(e) => setEventSlug(e.target.value)}
            placeholder="e.g., tech-talk"
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Tech Talk 2025"
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="border rounded px-4 py-2 w-full"
          />
          <p className="text-sm text-gray-600 mt-1">
            Selected: {files.length} files
          </p>
        </div>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Upload Images
        </button>
      </div>
    </div>
  );
}
```

This will make gallery management much easier for your team!
