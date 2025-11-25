# Backend Integration Guide - Hall of Fame

## Overview
Hall of Fame showcases notable alumni who have made significant contributions to IEEE RUET SB and achieved success in their careers.

---

## Current Implementation

### Data Structure
**File**: `data/hallOfFameData.js`

```javascript
export const hallOfFameMembers = [
    {
        id: 1,
        name: "Alumni Name",
        role: "Former Chairperson",
        year: "2020",
        tenure: "2019-2020",
        achievement: "Notable achievement or contribution",
        image: "/team/alumni_photo.jpg",
        currentPosition: "Software Engineer at Company",
        linkedin: "https://linkedin.com/in/...",
        facebook: "https://facebook.com/..."
    }
];
```

---

## Database Schema

### MongoDB Schema

```javascript
{
    _id: ObjectId("..."),
    name: "Alumni Name",                    // String: Full name
    role: "Former Chairperson",             // String: Role in RUET SB
    year: "2020",                          // String: Graduation/active year
    tenure: "2019-2020",                   // String: Committee tenure
    achievement: "Description...",          // String: Main achievement
    achievements: [                         // Array: Multiple achievements
        "Achievement 1",
        "Achievement 2"
    ],
    image: "/team/alumni.jpg",             // String: Photo path/URL
    currentPosition: "Job Title at Company", // String: Current role
    company: "Company Name",                // String: Current company
    linkedin: "https://...",               // String: LinkedIn profile
    facebook: "https://...",               // String: Facebook profile
    twitter: "",                           // String: Twitter (optional)
    bio: "Full biography...",              // String: Detailed bio
    highlights: [                          // Array: Key highlights
        "Published research papers",
        "Won competitions"
    ],
    featuredOrder: 0,                      // Number: Display order (0 = not featured)
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL Schema

```sql
CREATE TABLE hall_of_fame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    year VARCHAR(20),
    tenure VARCHAR(50),
    achievement TEXT,
    image VARCHAR(500),
    current_position VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(500),
    facebook VARCHAR(500),
    twitter VARCHAR(500),
    bio TEXT,
    featured_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_featured (featured_order)
);

CREATE TABLE hall_of_fame_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    achievement TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (member_id) REFERENCES hall_of_fame(id) ON DELETE CASCADE
);

CREATE TABLE hall_of_fame_highlights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    highlight TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (member_id) REFERENCES hall_of_fame(id) ON DELETE CASCADE
);
```

---

## API Endpoints

### 1. Get All Hall of Fame Members
```
GET /api/hall-of-fame
```

**Response**:
```json
{
    "success": true,
    "count": 15,
    "members": [
        {
            "id": 1,
            "name": "Alumni Name",
            "role": "Former Chairperson",
            "year": "2020",
            "achievement": "...",
            "currentPosition": "...",
            "image": "/team/photo.jpg"
        }
    ]
}
```

### 2. Get Featured Members
```
GET /api/hall-of-fame?featured=true
```

### 3. Get Member by ID
```
GET /api/hall-of-fame/:id
```

### 4. Get Members by Year
```
GET /api/hall-of-fame?year=2020
```

---

## Backend Implementation

### MongoDB Example

```javascript
// app/api/hall-of-fame/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HallOfFameMember from '@/models/HallOfFameMember';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');
        const year = searchParams.get('year');
        const id = searchParams.get('id');

        if (id) {
            const member = await HallOfFameMember.findById(id).lean();
            return NextResponse.json({ success: true, member });
        }

        let query = {};
        
        if (featured === 'true') {
            query.featuredOrder = { $gt: 0 };
        }
        
        if (year) {
            query.year = year;
        }

        const members = await HallOfFameMember.find(query)
            .sort({ 
                featuredOrder: featured ? 1 : -1,
                year: -1 
            })
            .lean();

        return NextResponse.json({
            success: true,
            count: members.length,
            members
        });

    } catch (error) {
        console.error('Error fetching Hall of Fame:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}
```

---

## Admin Panel Features

### CRUD Operations

```
POST   /api/admin/hall-of-fame          # Create member
PUT    /api/admin/hall-of-fame/:id      # Update member
DELETE /api/admin/hall-of-fame/:id      # Delete member
POST   /api/admin/hall-of-fame/:id/photo # Upload photo
```

### Featured Members Management

Admin can set `featuredOrder`:
- 0 = Not featured
- 1, 2, 3, ... = Featured (display order)

---

## Frontend Integration

### Update Page to Use API

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function HallOfFame() {
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        async function fetchMembers() {
            const res = await fetch('/api/hall-of-fame');
            const data = await res.json();
            if (data.success) {
                setMembers(data.members);
            }
        }
        fetchMembers();
    }, []);

    return (
        <div className="py-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Hall of <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Fame</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {members.map(member => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-xl p-6">
                        <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-gray-600">{member.role} ({member.year})</p>
                        <p className="mt-4 text-gray-700">{member.achievement}</p>
                        <p className="mt-2 text-blue-600 font-semibold">{member.currentPosition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## Testing Checklist

- [ ] Can fetch all members
- [ ] Can fetch featured members
- [ ] Can fetch by year
- [ ] Member cards display correctly
- [ ] Photos load properly
- [ ] Social links work
- [ ] Can create/edit/delete members (admin)
- [ ] Featured order can be set
- [ ] Achievements display properly

---

## Support

See: `DOCUMENTATION.md`, `API_STRUCTURE.md`, `DATABASE_SCHEMA.md`

---

**Last Updated**: January 2025
