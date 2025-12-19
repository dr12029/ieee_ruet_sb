# Backend Integration Guide - Achievements

## Overview
Achievements page displays IEEE RUET SB's accomplishments, awards, competitions, and milestones organized by year.

---

## Current Implementation

### Data Structure
**File**: `data/achievementsData.js`

```javascript
export const achievementsData = {
    2025: [
        {
            id: "achievement_2025_1",
            title: "Achievement Title",
            description: "Detailed description of the achievement",
            image: "/achievements/2025/image.jpg",
            date: "January 15, 2025",
            category: "Competition",  // Competition, Award, Recognition, etc.
        }
    ],
    2024: [...],
    2023: [...]
};
```

---

## Database Schema

### MongoDB Schema

```javascript
{
    _id: ObjectId("..."),
    id: "achievement_2025_1",              // String: Unique ID
    title: "First Place in Robotics",      // String: Achievement title
    description: "Full description...",     // String: Details
    image: "/achievements/2025/award.jpg",  // String: Image path/URL
    date: "January 15, 2025",              // String: Display date
    actualDate: ISODate("2025-01-15"),     // Date: For sorting
    year: 2025,                            // Number: Auto-extracted from date
    category: "Competition",                // String: Category
    tags: ["robotics", "competition"],      // Array: Tags for filtering
    featured: false,                        // Boolean: Featured achievement
    participants: [                         // Array: Team members (optional)
        "Member 1",
        "Member 2"
    ],
    externalLink: "https://...",           // String: Related link (optional)
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL Schema

```sql
CREATE TABLE achievements (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    date_display VARCHAR(50),
    actual_date DATE NOT NULL,
    year INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM actual_date)) STORED,
    category VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    external_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_date (actual_date)
);

CREATE TABLE achievement_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    achievement_id VARCHAR(100) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    INDEX idx_tag (tag)
);

CREATE TABLE achievement_participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    achievement_id VARCHAR(100) NOT NULL,
    participant_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);
```

---

## API Endpoints

### 1. Get All Achievements
```
GET /api/achievements
```

**Response**:
```json
{
    "success": true,
    "count": 45,
    "achievements": [
        {
            "id": "achievement_2025_1",
            "title": "First Place",
            "description": "...",
            "image": "/achievements/2025/award.jpg",
            "date": "January 15, 2025",
            "year": 2025,
            "category": "Competition"
        }
    ],
    "years": [2025, 2024, 2023, ...]
}
```

### 2. Get Achievements by Year
```
GET /api/achievements?year=2024
```

### 3. Get Featured Achievements
```
GET /api/achievements?featured=true
```

### 4. Get by Category
```
GET /api/achievements?category=Competition
```

### 5. Get Single Achievement
```
GET /api/achievements/:id
```

---

## Backend Implementation

### MongoDB Example

```javascript
// app/api/achievements/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Achievement from '@/models/Achievement';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const id = searchParams.get('id');

        if (id) {
            const achievement = await Achievement.findOne({ id }).lean();
            return NextResponse.json({ success: true, achievement });
        }

        let query = {};
        
        if (year) {
            query.year = parseInt(year);
        }
        
        if (category) {
            query.category = category;
        }
        
        if (featured === 'true') {
            query.featured = true;
        }

        const achievements = await Achievement.find(query)
            .sort({ actualDate: -1 })  // Sort by date descending
            .lean();

        // Get available years
        const years = await Achievement.distinct('year');
        years.sort((a, b) => b - a);

        // Get available categories
        const categories = await Achievement.distinct('category');

        return NextResponse.json({
            success: true,
            count: achievements.length,
            achievements,
            years,
            categories
        });

    } catch (error) {
        console.error('Error fetching achievements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch achievements' },
            { status: 500 }
        );
    }
}
```

### SQL Example (Prisma)

```javascript
// app/api/achievements/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const id = searchParams.get('id');

        if (id) {
            const achievement = await prisma.achievement.findUnique({
                where: { id },
                include: {
                    tags: true,
                    participants: true
                }
            });
            return NextResponse.json({ success: true, achievement });
        }

        let where = {};
        
        if (year) where.year = parseInt(year);
        if (category) where.category = category;
        if (featured === 'true') where.featured = true;

        const achievements = await prisma.achievement.findMany({
            where,
            include: {
                tags: true,
                participants: true
            },
            orderBy: { actualDate: 'desc' }
        });

        const years = await prisma.achievement.findMany({
            select: { year: true },
            distinct: ['year'],
            orderBy: { year: 'desc' }
        });

        const categories = await prisma.achievement.findMany({
            select: { category: true },
            distinct: ['category']
        });

        return NextResponse.json({
            success: true,
            count: achievements.length,
            achievements,
            years: years.map(y => y.year),
            categories: categories.map(c => c.category)
        });

    } catch (error) {
        console.error('Error fetching achievements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch achievements' },
            { status: 500 }
        );
    }
}
```

---

## Categories

Recommended achievement categories:
- **Competition** - Contest wins, rankings
- **Award** - Formal recognitions, certificates
- **Publication** - Research papers, articles
- **Event** - Successfully hosted events
- **Recognition** - External acknowledgments
- **Milestone** - Organizational milestones
- **Collaboration** - Partnership achievements

---

## Admin Panel Features

### CRUD Operations

```
POST   /api/admin/achievements           # Create achievement
PUT    /api/admin/achievements/:id       # Update achievement
DELETE /api/admin/achievements/:id       # Delete achievement
POST   /api/admin/achievements/:id/image # Upload image
```

### Bulk Import
```
POST   /api/admin/achievements/import
```

Import multiple achievements from CSV/JSON.

---

## Frontend Integration

### Update Page to Use API

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function Achievements() {
    const [achievementsByYear, setAchievementsByYear] = useState({});
    const [years, setYears] = useState([]);
    
    useEffect(() => {
        async function fetchAchievements() {
            const res = await fetch('/api/achievements');
            const data = await res.json();
            
            if (data.success) {
                // Group by year
                const grouped = data.achievements.reduce((acc, achievement) => {
                    if (!acc[achievement.year]) acc[achievement.year] = [];
                    acc[achievement.year].push(achievement);
                    return acc;
                }, {});
                
                setAchievementsByYear(grouped);
                setYears(data.years);
            }
        }
        fetchAchievements();
    }, []);

    return (
        <div className="py-16 mt-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Our <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Achievements</span>
            </h1>
            
            {years.map(year => (
                <div key={year} className="mb-16">
                    <h2 className="text-4xl font-bold mb-8 text-gray-900">{year}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievementsByYear[year]?.map(achievement => (
                            <div key={achievement.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                                {achievement.image && (
                                    <img src={achievement.image} alt={achievement.title} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-6">
                                    <span className="text-sm text-blue-600 font-semibold">{achievement.category}</span>
                                    <h3 className="text-2xl font-bold mt-2">{achievement.title}</h3>
                                    <p className="text-gray-600 mt-2">{achievement.description}</p>
                                    <p className="text-sm text-gray-500 mt-4">{achievement.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
```

---

## Home Page Integration

The home page shows 3 featured achievements:

```javascript
// Fetch featured achievements for home page
const res = await fetch('/api/achievements?featured=true');
const data = await res.json();
const featuredAchievements = data.achievements.slice(0, 3);
```

---

## Image Organization

Store images in `/public/achievements/YEAR/`:
```
public/achievements/
  2025/
    award1.jpg
    competition1.jpg
  2024/
    award2.jpg
```

Or use cloud storage and store full URLs.

---

## Testing Checklist

- [ ] Can fetch all achievements
- [ ] Can filter by year
- [ ] Can filter by category
- [ ] Can fetch featured achievements
- [ ] Achievements grouped by year on page
- [ ] Images display correctly
- [ ] Category badges show
- [ ] Can create/edit/delete (admin)
- [ ] Featured achievements appear on home page
- [ ] Tags work correctly
- [ ] Participants display if present

---

## Performance

### Caching
```javascript
headers: {
    'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
}
```

### Pagination
For large datasets (100+ achievements):
```
GET /api/achievements?page=1&limit=20
```

---

## Support

See: `DOCUMENTATION.md`, `API_STRUCTURE.md`, `DATABASE_SCHEMA.md`

---

**Last Updated**: January 2025
