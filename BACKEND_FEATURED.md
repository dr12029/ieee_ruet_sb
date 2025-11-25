# Backend Integration Guide - Featured Content

## Overview
Featured content system displays highlighted members, events, or articles on the home page carousel and other prominent sections.

---

## Current Implementation

### Data Structure
**File**: `data/featuredData.js`

```javascript
export const featuredMembers = [
    {
        id: 1,
        name: "Member Name",
        position: "Chairperson",
        department: "CSE",
        session: "2021-22",
        image: "/team/member.jpg",
        quote: "Inspiring quote or message",
        achievements: [
            "Achievement 1",
            "Achievement 2"
        ]
    }
];

export function getFeaturedItems() {
    return featuredMembers;
}

export function getFeaturedItemById(id) {
    return featuredMembers.find(item => item.id === parseInt(id));
}
```

---

## Database Schema

### MongoDB Schema

```javascript
{
    _id: ObjectId("..."),
    id: "featured_001",                    // String: Unique ID
    type: "member",                        // String: member, event, article
    
    // For members
    name: "Member Name",                   // String: Name
    position: "Chairperson",               // String: Position
    department: "CSE",                     // String: Department
    session: "2021-22",                    // String: Session
    quote: "Inspiring quote",              // String: Quote/message
    achievements: [                        // Array: Key achievements
        "Achievement 1",
        "Achievement 2"
    ],
    
    // For events
    eventId: ObjectId("..."),              // Reference: To events collection
    eventTitle: "Event Title",             // String: Event name
    eventDate: ISODate("..."),            // Date: Event date
    
    // For articles/posts
    title: "Article Title",                // String: Article title
    excerpt: "Brief description...",       // String: Short excerpt
    link: "/path/to/article",             // String: Link
    
    // Common fields
    image: "/path/to/image.jpg",          // String: Featured image
    displayOrder: 1,                       // Number: Order in carousel (1-5)
    active: true,                          // Boolean: Currently active
    startDate: ISODate("..."),            // Date: When to start showing
    endDate: ISODate("..."),              // Date: When to stop showing (optional)
    
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL Schema

```sql
CREATE TABLE featured_content (
    id VARCHAR(100) PRIMARY KEY,
    type ENUM('member', 'event', 'article') NOT NULL,
    
    -- Member fields
    name VARCHAR(255),
    position VARCHAR(100),
    department VARCHAR(50),
    session VARCHAR(20),
    quote TEXT,
    
    -- Event fields
    event_id VARCHAR(100),
    event_title VARCHAR(255),
    event_date DATE,
    
    -- Article fields
    title VARCHAR(255),
    excerpt TEXT,
    link VARCHAR(500),
    
    -- Common fields
    image VARCHAR(500),
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_type (type),
    INDEX idx_active (active),
    INDEX idx_order (display_order),
    INDEX idx_dates (start_date, end_date)
);

CREATE TABLE featured_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featured_id VARCHAR(100) NOT NULL,
    achievement TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (featured_id) REFERENCES featured_content(id) ON DELETE CASCADE
);
```

---

## API Endpoints

### 1. Get All Active Featured Items
```
GET /api/featured
GET /api/featured?active=true
```

**Response**:
```json
{
    "success": true,
    "count": 5,
    "items": [
        {
            "id": "featured_001",
            "type": "member",
            "name": "Member Name",
            "position": "Chairperson",
            "department": "CSE",
            "quote": "...",
            "image": "/team/member.jpg",
            "achievements": ["..."],
            "displayOrder": 1
        }
    ]
}
```

### 2. Get Featured Items by Type
```
GET /api/featured?type=member
GET /api/featured?type=event
GET /api/featured?type=article
```

### 3. Get Single Featured Item
```
GET /api/featured/:id
```

---

## Backend Implementation

### MongoDB Example

```javascript
// app/api/featured/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import FeaturedContent from '@/models/FeaturedContent';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');
        const active = searchParams.get('active');

        if (id) {
            const item = await FeaturedContent.findOne({ id }).lean();
            if (!item) {
                return NextResponse.json(
                    { error: 'Featured item not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, item });
        }

        let query = {};
        
        // Default to active items
        if (active !== 'false') {
            query.active = true;
            
            // Check date range
            const now = new Date();
            query.$or = [
                { startDate: { $lte: now }, endDate: { $gte: now } },
                { startDate: { $lte: now }, endDate: null }
            ];
        }
        
        if (type) {
            query.type = type;
        }

        const items = await FeaturedContent.find(query)
            .sort({ displayOrder: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            count: items.length,
            items
        });

    } catch (error) {
        console.error('Error fetching featured content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch featured items' },
            { status: 500 }
        );
    }
}
```

### SQL Example (Prisma)

```javascript
// app/api/featured/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');
        const active = searchParams.get('active');

        if (id) {
            const item = await prisma.featuredContent.findUnique({
                where: { id },
                include: { achievements: true }
            });
            
            if (!item) {
                return NextResponse.json(
                    { error: 'Featured item not found' },
                    { status: 404 }
                );
            }
            
            return NextResponse.json({ 
                success: true, 
                item: {
                    ...item,
                    achievements: item.achievements.map(a => a.achievement)
                }
            });
        }

        let where = {};
        
        if (active !== 'false') {
            where.active = true;
            const now = new Date();
            where.OR = [
                {
                    AND: [
                        { startDate: { lte: now } },
                        { endDate: { gte: now } }
                    ]
                },
                {
                    AND: [
                        { startDate: { lte: now } },
                        { endDate: null }
                    ]
                }
            ];
        }
        
        if (type) {
            where.type = type;
        }

        const items = await prisma.featuredContent.findMany({
            where,
            include: { achievements: true },
            orderBy: { displayOrder: 'asc' }
        });

        const transformedItems = items.map(item => ({
            ...item,
            achievements: item.achievements.map(a => a.achievement)
        }));

        return NextResponse.json({
            success: true,
            count: transformedItems.length,
            items: transformedItems
        });

    } catch (error) {
        console.error('Error fetching featured content:', error);
        return NextResponse.json(
            { error: 'Failed to fetch featured items' },
            { status: 500 }
        );
    }
}
```

---

## Admin Panel Features

### CRUD Operations

```
POST   /api/admin/featured              # Create featured item
PUT    /api/admin/featured/:id          # Update featured item
DELETE /api/admin/featured/:id          # Delete featured item
PATCH  /api/admin/featured/:id/toggle   # Toggle active status
POST   /api/admin/featured/reorder      # Reorder items
```

### Reorder Items
```
POST /api/admin/featured/reorder
```

**Request Body**:
```json
{
    "itemIds": ["featured_003", "featured_001", "featured_002"]
}
```

Updates `displayOrder` based on array position.

---

## Frontend Integration

### Home Page Carousel
**File**: `app/page.js`

Currently uses component:
```javascript
import FeaturedMembersCarousel from '@/components/FeaturedMembersCarousel';

<FeaturedMembersCarousel />
```

### Update Component to Use API

```javascript
// components/FeaturedMembersCarousel.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FeaturedMembersCarousel() {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch('/api/featured?type=member');
                const data = await res.json();
                
                if (data.success) {
                    setFeaturedItems(data.items);
                }
            } catch (error) {
                console.error('Error fetching featured members:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchFeatured();
    }, []);

    useEffect(() => {
        if (featuredItems.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [featuredItems]);

    if (loading) return <div>Loading...</div>;
    if (featuredItems.length === 0) return null;

    const currentMember = featuredItems[currentIndex];

    return (
        <div className="relative bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Featured <span className="text-blue-600">Members</span>
                </h2>
                
                <div className="flex items-center gap-8">
                    <div className="w-1/3">
                        <Image
                            src={currentMember.image}
                            alt={currentMember.name}
                            width={300}
                            height={400}
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                    
                    <div className="w-2/3">
                        <h3 className="text-3xl font-bold">{currentMember.name}</h3>
                        <p className="text-xl text-gray-600">{currentMember.position}</p>
                        <p className="text-gray-500">{currentMember.department} | {currentMember.session}</p>
                        
                        {currentMember.quote && (
                            <blockquote className="mt-6 text-lg italic text-gray-700">
                                "{currentMember.quote}"
                            </blockquote>
                        )}
                        
                        {currentMember.achievements && currentMember.achievements.length > 0 && (
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Key Achievements:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {currentMember.achievements.map((achievement, idx) => (
                                        <li key={idx} className="text-gray-700">{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {featuredItems.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
```

---

## Date Range Feature

Featured items can have start and end dates:

```javascript
{
    "startDate": "2025-01-01",  // Start showing on Jan 1
    "endDate": "2025-12-31"     // Stop showing after Dec 31
}
```

Use cases:
- Temporary promotions
- Seasonal content
- Time-limited features

---

## Display Order

Items are sorted by `displayOrder` field (1, 2, 3, ...):

- Lower numbers appear first in carousel
- Admin can drag-and-drop to reorder
- Automatically rotates through items in order

---

## Testing Checklist

- [ ] Can fetch all featured items
- [ ] Can filter by type (member/event/article)
- [ ] Carousel rotates automatically
- [ ] Navigation dots work
- [ ] Manual navigation works
- [ ] Items respect date ranges
- [ ] Inactive items don't show
- [ ] Can create/edit/delete items (admin)
- [ ] Can reorder items (admin)
- [ ] Images load correctly
- [ ] Achievements display properly

---

## Performance

### Caching
```javascript
headers: {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
}
```

### Preload Images
```javascript
<link rel="preload" as="image" href={featuredItems[0]?.image} />
```

---

## Support

See: `DOCUMENTATION.md`, `API_STRUCTURE.md`, `DATABASE_SCHEMA.md`

---

**Last Updated**: January 2025
