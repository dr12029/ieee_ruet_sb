# Backend Integration Guide - Executive Committee

## Overview
The Executive Committee page displays current committee members with their positions, photos, contact information, and social media links.

---

## Current Implementation

### Data Structure
**File**: `data/executiveMembers.js`

```javascript
export const executiveMembers = [
    {
        id: 1,
        name: "Member Name",
        position: "Chairperson",
        department: "CSE",
        session: "2021-22",
        image: "/team/photo.jpg",
        email: "member@example.com",
        phone: "+880...",
        linkedin: "https://linkedin.com/in/username",
        facebook: "https://facebook.com/username"
    },
    // More members...
];
```

### Positions Hierarchy
1. Chairperson
2. Vice Chairperson
3. General Secretary
4. Treasurer
5. Joint Secretary
6. Organizing Secretary
7. Public Relations Officer
8. Technical Secretary
9. Design Secretary
10. Content Secretary

---

## Database Schema

### MongoDB Schema

```javascript
// Executive Members Collection
{
    _id: ObjectId("..."),
    name: "Member Name",                    // String: Full name
    position: "Chairperson",                // String: Position title
    positionOrder: 1,                       // Number: For sorting (1-10)
    department: "CSE",                      // String: Department code
    departmentFull: "Computer Science and Engineering", // String: Full name
    session: "2021-22",                     // String: Student session
    studentId: "1810012",                   // String: Optional student ID
    image: "/team/member_photo.jpg",        // String: Photo path or URL
    email: "member@example.com",            // String: Email
    phone: "+880...",                       // String: Phone number
    linkedin: "https://linkedin.com/in/...", // String: LinkedIn profile
    facebook: "https://facebook.com/...",   // String: Facebook profile
    twitter: "",                            // String: Optional Twitter
    instagram: "",                          // String: Optional Instagram
    bio: "Short biography...",              // String: Optional bio
    year: 2025,                             // Number: Committee year
    active: true,                           // Boolean: Currently active
    joinDate: ISODate("2024-01-15"),       // Date: When joined committee
    createdAt: ISODate("..."),             // Date: Auto-generated
    updatedAt: ISODate("...")              // Date: Auto-updated
}
```

### SQL Schema

```sql
-- Executive Members table
CREATE TABLE executive_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    position_order INT NOT NULL,
    department VARCHAR(10) NOT NULL,
    department_full VARCHAR(255),
    session VARCHAR(20),
    student_id VARCHAR(20),
    image VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(500),
    facebook VARCHAR(500),
    twitter VARCHAR(500),
    instagram VARCHAR(500),
    bio TEXT,
    year INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_active (active),
    INDEX idx_position_order (position_order)
);

-- Position hierarchy reference table (optional)
CREATE TABLE committee_positions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    position_name VARCHAR(100) UNIQUE NOT NULL,
    position_order INT UNIQUE NOT NULL,
    description TEXT
);

INSERT INTO committee_positions (position_name, position_order, description) VALUES
('Chairperson', 1, 'Leads the student branch'),
('Vice Chairperson', 2, 'Assists the Chairperson'),
('General Secretary', 3, 'Manages administrative tasks'),
('Treasurer', 4, 'Manages finances'),
('Joint Secretary', 5, 'Assists General Secretary'),
('Organizing Secretary', 6, 'Organizes events'),
('Public Relations Officer', 7, 'Manages communications'),
('Technical Secretary', 8, 'Handles technical activities'),
('Design Secretary', 9, 'Manages design and graphics'),
('Content Secretary', 10, 'Creates and manages content');
```

---

## API Endpoints

### Required Endpoints

#### 1. Get All Active Members
```
GET /api/executive-committee
GET /api/executive-committee?active=true
```

**Response**:
```json
{
    "success": true,
    "year": 2025,
    "count": 10,
    "members": [
        {
            "id": 1,
            "name": "Member Name",
            "position": "Chairperson",
            "positionOrder": 1,
            "department": "CSE",
            "session": "2021-22",
            "image": "/team/photo.jpg",
            "email": "member@example.com",
            "phone": "+880...",
            "linkedin": "https://...",
            "facebook": "https://..."
        }
    ]
}
```

#### 2. Get Members by Year
```
GET /api/executive-committee?year=2024
```

**Response**: Same as above, filtered by year

#### 3. Get Member by ID
```
GET /api/executive-committee/:id
```

**Response**:
```json
{
    "success": true,
    "member": {
        "id": 1,
        "name": "...",
        "position": "...",
        "bio": "Full biography...",
        ...
    }
}
```

#### 4. Get All Years
```
GET /api/executive-committee/years
```

**Response**:
```json
{
    "years": [2025, 2024, 2023, ...]
}
```

---

## Backend Implementation

### MongoDB Example

```javascript
// app/api/executive-committee/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ExecutiveMember from '@/models/ExecutiveMember';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const active = searchParams.get('active');
        const id = searchParams.get('id');

        if (id) {
            const member = await ExecutiveMember.findById(id).lean();
            if (!member) {
                return NextResponse.json(
                    { error: 'Member not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, member });
        }

        let query = {};
        
        if (active === 'true' || (!year && !active)) {
            query.active = true;
        }
        
        if (year) {
            query.year = parseInt(year);
        }

        const members = await ExecutiveMember.find(query)
            .sort({ positionOrder: 1 })  // Sort by position hierarchy
            .lean();

        // Get current year from most recent member
        const currentYear = members[0]?.year || new Date().getFullYear();

        return NextResponse.json({
            success: true,
            year: currentYear,
            count: members.length,
            members
        });

    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}
```

### SQL Example (Prisma)

```javascript
// app/api/executive-committee/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const active = searchParams.get('active');
        const id = searchParams.get('id');

        if (id) {
            const member = await prisma.executiveMember.findUnique({
                where: { id: parseInt(id) }
            });
            
            if (!member) {
                return NextResponse.json(
                    { error: 'Member not found' },
                    { status: 404 }
                );
            }
            
            return NextResponse.json({ success: true, member });
        }

        let where = {};
        
        if (active === 'true' || (!year && !active)) {
            where.active = true;
        }
        
        if (year) {
            where.year = parseInt(year);
        }

        const members = await prisma.executiveMember.findMany({
            where,
            orderBy: { positionOrder: 'asc' }
        });

        const currentYear = members[0]?.year || new Date().getFullYear();

        return NextResponse.json({
            success: true,
            year: currentYear,
            count: members.length,
            members
        });

    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}
```

---

## Admin Panel Features

### 1. Create Member
```
POST /api/admin/executive-committee
```

**Request Body**:
```json
{
    "name": "New Member",
    "position": "Chairperson",
    "positionOrder": 1,
    "department": "CSE",
    "session": "2021-22",
    "email": "member@example.com",
    "phone": "+880...",
    "image": "/team/photo.jpg",
    "linkedin": "https://...",
    "facebook": "https://...",
    "year": 2025,
    "active": true
}
```

### 2. Update Member
```
PUT /api/admin/executive-committee/:id
PATCH /api/admin/executive-committee/:id
```

### 3. Delete Member
```
DELETE /api/admin/executive-committee/:id
```

### 4. Upload Photo
```
POST /api/admin/executive-committee/:id/upload-photo
```

**Implementation**:
```javascript
export async function POST(request, { params }) {
    const formData = await request.formData();
    const file = formData.get('photo');
    const memberId = params.id;
    
    // Upload to storage (S3, Cloudinary, or local)
    const photoUrl = await uploadPhoto(file, `team/member_${memberId}`);
    
    // Update member record
    await ExecutiveMember.findByIdAndUpdate(memberId, {
        image: photoUrl
    });
    
    return NextResponse.json({ success: true, image: photoUrl });
}
```

### 5. Bulk Import
```
POST /api/admin/executive-committee/import
```

For importing CSV or JSON with multiple members.

### 6. Archive Year
```
POST /api/admin/executive-committee/archive-year
```

**Request Body**:
```json
{
    "year": 2024
}
```

Sets `active: false` for all members of that year.

---

## Frontend Integration

### Current Page
**File**: `app/executive-committee/page.js`

Currently imports from `data/executiveMembers.js`:
```javascript
import { executiveMembers } from '@/data/executiveMembers';
```

### Update to Use API

```javascript
'use client';

import { useState, useEffect } from 'react';
import MemberCard from '@/components/MemberCard';

export default function ExecutiveCommittee() {
    const [members, setMembers] = useState([]);
    const [year, setYear] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const res = await fetch('/api/executive-committee');
                const data = await res.json();
                
                if (data.success) {
                    setMembers(data.members);
                    setYear(data.year);
                }
            } catch (error) {
                console.error('Error fetching members:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchMembers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-16">
            <h1>Executive Committee {year}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}
```

---

## Position Order Reference

| Position | Order | Typical Count |
|----------|-------|---------------|
| Chairperson | 1 | 1 |
| Vice Chairperson | 2 | 1 |
| General Secretary | 3 | 1 |
| Treasurer | 4 | 1 |
| Joint Secretary | 5 | 1-2 |
| Organizing Secretary | 6 | 1-2 |
| Public Relations Officer | 7 | 1 |
| Technical Secretary | 8 | 1 |
| Design Secretary | 9 | 1 |
| Content Secretary | 10 | 1 |

Total: ~10-12 members per committee

---

## Data Validation

### Required Fields
- `name` (string, 2-100 chars)
- `position` (string, must be from approved list)
- `positionOrder` (number, 1-10)
- `department` (string, 2-10 chars)
- `year` (number, current or upcoming year)

### Optional Fields
- `session`, `studentId`, `email`, `phone`
- `linkedin`, `facebook`, `twitter`, `instagram`
- `bio`, `image`

### Email Validation
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
}
```

### Phone Validation
```javascript
// Bangladesh phone format
const phoneRegex = /^\+880[1-9]\d{9}$/;
if (!phoneRegex.test(phone)) {
    throw new Error('Invalid phone number format');
}
```

---

## Image Handling

### Photo Requirements
- **Format**: JPG, PNG
- **Size**: Max 2MB
- **Dimensions**: Recommended 800x800px (1:1 ratio)
- **Background**: Solid color or removed

### Image Upload Flow

1. **Admin uploads photo**
2. **Resize and optimize** (Sharp library)
3. **Upload to storage** (S3, Cloudinary, local)
4. **Generate thumbnail** (for performance)
5. **Update database** with URL

**Example with Sharp**:
```javascript
import sharp from 'sharp';

async function processPhoto(file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Resize to 800x800 and optimize
    const processed = await sharp(buffer)
        .resize(800, 800, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toBuffer();
    
    // Upload processed image
    return await uploadToStorage(processed);
}
```

---

## Archive System

### Purpose
Keep historical records of past committees.

### Implementation

**Set Previous Year Inactive**:
```javascript
async function archiveYear(year) {
    await ExecutiveMember.updateMany(
        { year: year },
        { $set: { active: false } }
    );
}
```

**View Archive**:
```
GET /api/executive-committee?year=2024&active=false
```

**Admin UI**: Dropdown to select and view past years.

---

## Organization Hierarchy Display

Current page shows a table with positions. When using backend:

```javascript
const positions = [
    { name: "Chairperson", count: 1 },
    { name: "Vice Chairperson", count: 1 },
    { name: "General Secretary", count: 1 },
    // ... fetch from database or hardcode
];
```

Or query from database:
```javascript
const hierarchy = await prisma.executiveMember.groupBy({
    by: ['position'],
    where: { active: true },
    _count: { position: true },
    orderBy: { positionOrder: 'asc' }
});
```

---

## Testing Checklist

- [ ] Can fetch all active members
- [ ] Members sorted by position order
- [ ] Can filter by year
- [ ] Can get single member details
- [ ] Member cards display correctly
- [ ] Photos load properly
- [ ] Social links work
- [ ] Can create new member (admin)
- [ ] Can update member info (admin)
- [ ] Can upload/change photo (admin)
- [ ] Can delete member (admin)
- [ ] Can archive past year (admin)
- [ ] Can view archived committees
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Position hierarchy maintained

---

## Performance Considerations

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

### Optimize Images
- Use Next.js Image component
- Serve WebP format
- Lazy load images

### Database Indexing
- Index on `year` and `active` fields
- Index on `positionOrder` for sorting

---

## Support

For questions:
- `DOCUMENTATION.md` - Overall structure
- `API_STRUCTURE.md` - API organization
- `DATABASE_SCHEMA.md` - Complete schema

---

**Last Updated**: January 2025
