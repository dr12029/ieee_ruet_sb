# Backend Integration Guide - Events System

## Overview
This guide explains how to integrate a backend database with the events system. The events system handles upcoming and past events with dynamic categorization, event details, and filtering.

---

## Current Implementation

### Data Structure
**File**: `data/eventsData.js`

Events are organized by year:
```javascript
export const eventsData = {
    2025: [
        {
            id: "unique_event_id_2025",
            name: "Event Name",
            date: "2025-03-15",
            image: "/events/2025/event_image.jpg",
            featured: true,        // Boolean: Show in featured sections
            upcoming: true,        // Boolean: TRUE for upcoming, FALSE for past
            description: `Multi-line description...
            
            Can include blank lines for formatting.
            
            Key Details:
            - Registration Fee: BDT 500
            - Trainer: Expert Name`,
            details: {
                venue: "RUET Campus",
                time: "10:00 AM - 5:00 PM",
                registrationFee: "BDT 500",
                trainer: "Expert Name",
                // Any other key-value pairs
            }
        }
    ],
    2024: [...],
    2023: [...]
}
```

### Helper Functions
```javascript
getUpcomingEvents()        // Returns events with upcoming: true
getPastEvents()            // Returns events with upcoming: false
getEventsByYear(year)      // Returns all events for a year
getEventById(id)           // Returns single event by ID
getFeaturedEvents()        // Returns events with featured: true
getEventYears()            // Returns array of available years
getPastEventYears()        // Returns years with past events only
formatEventDate(dateStr)   // Formats date for display
```

---

## Database Schema

### MongoDB Schema

```javascript
// Event Collection
{
    _id: ObjectId("..."),
    id: "unique_event_id_2025",        // String: URL-friendly unique ID
    name: "Workshop on AI",             // String: Event name
    date: ISODate("2025-03-15"),       // Date: Event date
    year: 2025,                        // Number: Auto-extracted from date
    image: "/events/2025/ai_workshop.jpg", // String: Image path
    featured: true,                    // Boolean: Featured flag
    upcoming: true,                    // Boolean: Upcoming vs Past
    description: "Full description...", // String: Multi-line description
    details: {                         // Object: Additional details
        venue: "RUET Campus",
        time: "10:00 AM - 5:00 PM",
        registrationFee: "BDT 500",
        trainer: "Dr. Expert Name",
        // Flexible key-value pairs
    },
    createdAt: ISODate("..."),         // Date: Auto-generated
    updatedAt: ISODate("...")          // Date: Auto-updated
}
```

### SQL Schema

```sql
-- Events table
CREATE TABLE events (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    year INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM date)) STORED,
    image VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    upcoming BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_upcoming (upcoming),
    INDEX idx_featured (featured),
    INDEX idx_date (date)
);

-- Event details table (for flexible key-value pairs)
CREATE TABLE event_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_key (event_id, key)
);
```

---

## API Endpoints

### Current API Route
**File**: `app/api/events/route.js`

Currently returns data from `data/eventsData.js`. You need to replace with database queries.

### Required Endpoints

#### 1. Get All Events
```
GET /api/events
GET /api/events?type=all
```

**Response**:
```json
{
    "success": true,
    "count": 45,
    "events": [
        {
            "id": "event_id_2025",
            "name": "Event Name",
            "date": "2025-03-15",
            "year": "2025",
            "image": "/events/2025/image.jpg",
            "featured": true,
            "upcoming": true,
            "description": "...",
            "details": {...}
        }
    ],
    "years": ["2025", "2024", "2023", ...]
}
```

#### 2. Get Upcoming Events
```
GET /api/events?type=upcoming
```

**Filter**: `upcoming: true`

**Response**: Same format as above, filtered

#### 3. Get Past Events
```
GET /api/events?type=past
```

**Filter**: `upcoming: false`

**Response**: Same format, with `years` array containing only years with past events

#### 4. Get Events by Year
```
GET /api/events?year=2024
```

**Filter**: Events where `year == 2024`

#### 5. Get Featured Events
```
GET /api/events?featured=true
```

**Filter**: `featured: true`

Can combine with other filters:
- `GET /api/events?type=upcoming&featured=true`

#### 6. Get Single Event
```
GET /api/events?id=event_id_2025
```

OR create dedicated route:
```
GET /api/events/[id]
```

**Response**:
```json
{
    "success": true,
    "event": {
        "id": "...",
        "name": "...",
        ...
    }
}
```

---

## Backend Implementation

### Replace API Route

**File**: `app/api/events/route.js`

#### MongoDB Example

```javascript
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // Your MongoDB connection
import Event from '@/models/Event';        // Your Mongoose model

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const year = searchParams.get('year');
        const featured = searchParams.get('featured');
        const id = searchParams.get('id');

        let query = {};
        
        // Build query based on parameters
        if (type === 'upcoming') {
            query.upcoming = true;
        } else if (type === 'past') {
            query.upcoming = false;
        }
        
        if (year) {
            query.year = parseInt(year);
        }
        
        if (featured === 'true') {
            query.featured = true;
        }
        
        if (id) {
            query.id = id;
        }

        // Fetch events
        const events = await Event.find(query)
            .sort({ date: -1 })  // Sort by date descending
            .lean();             // Return plain objects

        // Get available years
        const allEvents = await Event.find({}).select('year').lean();
        const years = [...new Set(allEvents.map(e => e.year.toString()))]
            .sort((a, b) => b - a);

        return NextResponse.json({
            success: true,
            count: events.length,
            events,
            years
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
```

#### SQL Example (PostgreSQL with Prisma)

```javascript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const year = searchParams.get('year');
        const featured = searchParams.get('featured');
        const id = searchParams.get('id');

        let where = {};
        
        if (type === 'upcoming') {
            where.upcoming = true;
        } else if (type === 'past') {
            where.upcoming = false;
        }
        
        if (year) {
            where.year = parseInt(year);
        }
        
        if (featured === 'true') {
            where.featured = true;
        }
        
        if (id) {
            where.id = id;
        }

        // Fetch events with details
        const events = await prisma.event.findMany({
            where,
            include: {
                details: true  // Include related event_details
            },
            orderBy: {
                date: 'desc'
            }
        });

        // Transform details array to object
        const transformedEvents = events.map(event => ({
            ...event,
            details: event.details.reduce((acc, detail) => {
                acc[detail.key] = detail.value;
                return acc;
            }, {})
        }));

        // Get available years
        const yearsList = await prisma.event.findMany({
            select: { year: true },
            distinct: ['year'],
            orderBy: { year: 'desc' }
        });
        const years = yearsList.map(y => y.year.toString());

        return NextResponse.json({
            success: true,
            count: transformedEvents.length,
            events: transformedEvents,
            years
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
```

---

## Admin Panel Features

### Required CRUD Operations

#### 1. Create Event
```
POST /api/admin/events
```

**Request Body**:
```json
{
    "id": "unique_id",
    "name": "Event Name",
    "date": "2025-06-15",
    "image": "/events/2025/image.jpg",
    "featured": false,
    "upcoming": true,
    "description": "Description...",
    "details": {
        "venue": "Location",
        "time": "10 AM - 5 PM"
    }
}
```

#### 2. Update Event
```
PUT /api/admin/events/[id]
PATCH /api/admin/events/[id]
```

**Request Body**: Same as create (partial updates for PATCH)

#### 3. Delete Event
```
DELETE /api/admin/events/[id]
```

#### 4. Toggle Upcoming Status
```
PATCH /api/admin/events/[id]/toggle-upcoming
```

Quick endpoint to flip `upcoming` flag.

#### 5. Upload Event Image
```
POST /api/admin/events/[id]/upload-image
```

Handle file upload and update `image` field.

---

## Data Migration

### From Mock Data to Database

**Option 1: Script Import**

```javascript
// scripts/import-events.js
const { eventsData } = require('./data/eventsData.js');
const mongoose = require('mongoose');
const Event = require('./models/Event');

async function importEvents() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    for (const year in eventsData) {
        const events = eventsData[year].map(event => ({
            ...event,
            year: parseInt(year)
        }));
        
        await Event.insertMany(events);
        console.log(`Imported ${events.length} events from ${year}`);
    }
    
    console.log('Import complete!');
    process.exit(0);
}

importEvents();
```

**Run**: `node scripts/import-events.js`

**Option 2: Admin Interface Import**

Create an admin page with file upload that accepts JSON and imports into database.

---

## Frontend Changes (Minimal)

The frontend is already designed to work with APIs. When backend is ready:

### Pages That Fetch Events

1. **Upcoming Events Page** (`app/events/upcoming-events/page.js`)
   - Already fetches from `/api/events?type=upcoming`
   - No changes needed

2. **Past Events Page** (`app/events/past-events/[year]/page.js`)
   - Already fetches from `/api/events?type=past` and `/api/events?year={year}`
   - No changes needed

3. **Event Details Page** (`app/events/[eventId]/page.js`)
   - Currently uses `getEventById()` from data file
   - Update to fetch from `/api/events?id={eventId}`

4. **Home Page** (`app/page.js`)
   - Uses `UpcomingEventsSection` component
   - Component already fetches from API
   - No changes needed

---

## Important Notes

### 1. The `upcoming` Flag
- **Manual Control**: Not automatically calculated from dates
- **Purpose**: Gives admins control over visibility
- **Usage**: After an event, admin manually changes `upcoming: true` → `upcoming: false`

### 2. Description Formatting
- Store as multi-line string with `\n` for line breaks
- Display with `whitespace-pre-line` CSS
- Preserves blank lines and formatting

### 3. Details Object
- Flexible key-value structure
- No fixed schema (different events have different details)
- Can add any fields: `venue`, `time`, `trainer`, `fee`, etc.

### 4. Image Handling
- Store path in database: `/events/YEAR/filename.jpg`
- Actual images stored in `/public/events/YEAR/` folder
- For cloud storage: Store full URL

### 5. Featured Events
- Maximum 3-5 featured events recommended
- Displayed prominently on home page
- Can be filtered via API

---

## Testing Checklist

After backend integration:

- [ ] Can fetch all events
- [ ] Can filter upcoming events
- [ ] Can filter past events
- [ ] Can filter by year
- [ ] Can filter featured events
- [ ] Can get single event by ID
- [ ] Upcoming events page displays correctly
- [ ] Past events page with year selector works
- [ ] Event details page loads
- [ ] Home page upcoming events section works
- [ ] Image paths resolve correctly
- [ ] Description formatting preserved
- [ ] Details object displays properly
- [ ] Featured badge appears on featured events
- [ ] Year dropdown populated with correct years
- [ ] Empty states handled (no upcoming events, no events in year)

---

## Performance Considerations

### Database Indexing
- Index on `year` field (for year filtering)
- Index on `upcoming` field (for type filtering)
- Index on `featured` field (for featured filtering)
- Index on `date` field (for sorting)

### Caching
Consider caching API responses:
```javascript
export async function GET(request) {
    return NextResponse.json(data, {
        headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
    });
}
```

### Pagination
If you have many events (100+), implement pagination:
```
GET /api/events?page=1&limit=20
```

---

## Example Admin UI Features

### Event Management Dashboard

Features to build:
1. **Event List Table**
   - All events with edit/delete buttons
   - Quick toggle for `upcoming` status
   - Quick toggle for `featured` status
   - Search and filter

2. **Create/Edit Event Form**
   - All fields with validation
   - Image upload
   - Rich text editor for description
   - Dynamic details fields (add/remove key-value pairs)

3. **Bulk Actions**
   - Mark multiple events as past
   - Delete multiple events
   - Bulk import from JSON

4. **Analytics**
   - Total events count
   - Upcoming vs past count
   - Events by year chart

---

## Support

For questions about events backend integration, refer to:
- `DOCUMENTATION.md` - Overall website structure
- `API_STRUCTURE.md` - API organization
- `DATABASE_SCHEMA.md` - Complete database schema

---

**Last Updated**: January 2025
