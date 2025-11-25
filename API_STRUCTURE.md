# API Structure & Organization Guide

## Overview
This document explains the API organization, how to merge existing API files, and best practices for API development.

---

## Current API Structure

### API Files Location

```
ieee_ruet_sb/
├── lib/
│   └── api.js                    # Helper functions (currently unused/placeholder)
│
└── app/api/
    ├── events/
    │   └── route.js              # Events API (active)
    ├── gallery/
    │   └── route.js              # Gallery API (active, filesystem scan)
    └── featured/
        └── route.js              # Featured content API (active)
```

---

## API Files Analysis

### 1. `/lib/api.js`
**Status**: Placeholder/Template  
**Purpose**: Originally intended for centralized API helper functions

**Current Content**:
```javascript
export async function getExecutiveMembers() {
    // TODO: Replace with actual API call
    const { executiveMembers } = await import('@/data/executiveMembers');
    return executiveMembers;
}
```

**Issues**:
- Mostly TODOs and placeholders
- Not actually used by any components
- Overlaps with Next.js API routes in `/app/api/`

### 2. `/app/api/events/route.js`
**Status**: **Active and Functional**  
**Purpose**: Events API endpoint

**Features**:
- Query parameters: `type`, `year`, `featured`
- Returns filtered events from `data/eventsData.js`
- Helper functions: `getUpcomingEvents()`, `getPastEvents()`, etc.

### 3. `/app/api/gallery/route.js`
**Status**: **Active and Functional**  
**Purpose**: Gallery filesystem scanner

**Features**:
- Scans `/public/gallery/` directory
- Discovers years, events, images automatically
- Returns structured JSON
- No database required (fully dynamic)

### 4. `/app/api/featured/route.js`
**Status**: **Active and Functional**  
**Purpose**: Featured content API

**Features**:
- Query parameters: `id`
- Returns featured members/content
- Uses `data/featuredData.js`

---

## Recommended API Organization

### Option 1: Keep Current Structure (Recommended)

**Pros**:
- Clean separation of concerns
- Follows Next.js conventions
- Easy to find and maintain
- Scalable for growth

**Structure**:
```
app/api/
├── events/
│   └── route.js
├── gallery/
│   └── route.js
├── featured/
│   └── route.js
├── executive-committee/
│   └── route.js              # NEW: To be created
├── hall-of-fame/
│   └── route.js              # NEW: To be created
├── achievements/
│   └── route.js              # NEW: To be created
└── publications/
    └── route.js              # NEW: To be created
```

### Option 2: Unified API File

**Not Recommended** - Would create a massive single file that's hard to maintain.

---

## What to Do with `/lib/api.js`

### Recommendation: **Repurpose for Shared Utilities**

Instead of deleting, repurpose `/lib/api.js` for shared API utilities:

```javascript
// lib/api.js

/**
 * Shared API utility functions
 * Used by API routes in /app/api/
 */

// Base API URL (for client-side fetching)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Standard error response
export function errorResponse(message, status = 500) {
    return {
        success: false,
        error: message
    };
}

// Standard success response
export function successResponse(data, meta = {}) {
    return {
        success: true,
        ...data,
        ...meta
    };
}

// Pagination helper
export function paginate(array, page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
        data: array.slice(startIndex, endIndex),
        pagination: {
            page,
            limit,
            total: array.length,
            totalPages: Math.ceil(array.length / limit),
            hasNext: endIndex < array.length,
            hasPrev: page > 1
        }
    };
}

// Sorting helper
export function sortByDate(array, field = 'date', order = 'desc') {
    return [...array].sort((a, b) => {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
}

// Filter by date range
export function filterByDateRange(array, field = 'date', startDate, endDate) {
    return array.filter(item => {
        const itemDate = new Date(item[field]);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
}

// Search helper (case-insensitive)
export function search(array, fields, query) {
    const lowerQuery = query.toLowerCase();
    return array.filter(item => {
        return fields.some(field => {
            const value = item[field];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(lowerQuery);
            }
            return false;
        });
    });
}

// Client-side API fetch wrapper
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}

// Specific fetchers for frontend use
export async function fetchEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/events${query ? `?${query}` : ''}`);
}

export async function fetchGallery() {
    return apiFetch('/api/gallery');
}

export async function fetchFeatured(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/featured${query ? `?${query}` : ''}`);
}

export async function fetchExecutiveMembers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/executive-committee${query ? `?${query}` : ''}`);
}

export async function fetchAchievements(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/achievements${query ? `?${query}` : ''}`);
}

export async function fetchHallOfFame(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/hall-of-fame${query ? `?${query}` : ''}`);
}

export async function fetchPublications(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/publications${query ? `?${query}` : ''}`);
}
```

---

## API Route Template

Use this template for new API routes:

```javascript
// app/api/[resource]/route.js
import { NextResponse } from 'next/server';
import { successResponse, errorResponse, paginate } from '@/lib/api';

/**
 * GET /api/[resource]
 * Query params: page, limit, filter params
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Extract query parameters
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        
        // TODO: Fetch from database
        // const data = await YourModel.find({...});
        
        // For now, use mock data
        const { mockData } = await import('@/data/mockData');
        
        // Apply pagination
        const result = paginate(mockData, page, limit);
        
        return NextResponse.json(successResponse(result));

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            errorResponse('Failed to fetch data'),
            { status: 500 }
        );
    }
}

/**
 * POST /api/[resource]
 * Create new resource
 */
export async function POST(request) {
    try {
        const body = await request.json();
        
        // TODO: Validate data
        // TODO: Insert into database
        
        return NextResponse.json(
            successResponse({ message: 'Created successfully' }),
            { status: 201 }
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            errorResponse('Failed to create resource'),
            { status: 500 }
        );
    }
}

/**
 * PUT /api/[resource]
 * Update resource
 */
export async function PUT(request) {
    try {
        const body = await request.json();
        
        // TODO: Validate data
        // TODO: Update in database
        
        return NextResponse.json(
            successResponse({ message: 'Updated successfully' })
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            errorResponse('Failed to update resource'),
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/[resource]
 * Delete resource
 */
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        // TODO: Delete from database
        
        return NextResponse.json(
            successResponse({ message: 'Deleted successfully' })
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            errorResponse('Failed to delete resource'),
            { status: 500 }
        );
    }
}
```

---

## API Routes to Create

Based on backend integration guides, create these API routes:

### 1. Executive Committee
```
app/api/executive-committee/route.js
```
See: `BACKEND_EXECUTIVE.md`

### 2. Hall of Fame
```
app/api/hall-of-fame/route.js
```
See: `BACKEND_HALL_OF_FAME.md`

### 3. Achievements
```
app/api/achievements/route.js
```
See: `BACKEND_ACHIEVEMENTS.md`

### 4. Publications
```
app/api/publications/route.js
```

---

## Environment Variables

Create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database (MongoDB example)
MONGODB_URI=mongodb://localhost:27017/ieee_ruet_sb

# Database (PostgreSQL example)
DATABASE_URL=postgresql://user:password@localhost:5432/ieee_ruet_sb

# AWS S3 (for image uploads)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
S3_BUCKET=ieee-ruet-sb

# Cloudinary (alternative image hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Authentication (future)
ADMIN_SECRET=your_secret_key
```

---

## API Testing

### Using Thunder Client / Postman

**Get Events**:
```
GET http://localhost:3000/api/events
GET http://localhost:3000/api/events?type=upcoming
GET http://localhost:3000/api/events?year=2024
```

**Get Gallery**:
```
GET http://localhost:3000/api/gallery
```

**Get Featured**:
```
GET http://localhost:3000/api/featured
GET http://localhost:3000/api/featured?type=member
```

### Using cURL

```bash
# Get events
curl http://localhost:3000/api/events

# Get upcoming events
curl http://localhost:3000/api/events?type=upcoming

# Get gallery
curl http://localhost:3000/api/gallery
```

---

## Error Handling Best Practices

### Consistent Error Format

```javascript
{
    "success": false,
    "error": "Resource not found",
    "code": "NOT_FOUND",
    "details": {
        "resource": "event",
        "id": "event_123"
    }
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Caching Strategy

### Public, Cacheable Data
```javascript
return NextResponse.json(data, {
    headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
    }
});
```

### Frequently Changing Data
```javascript
headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
}
```

### No Cache (Admin endpoints)
```javascript
headers: {
    'Cache-Control': 'no-store, must-revalidate'
}
```

---

## CORS Configuration (if needed)

```javascript
// next.config.mjs
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
};
```

---

## Summary

### Keep
- ✅ `/app/api/events/route.js` - Active
- ✅ `/app/api/gallery/route.js` - Active
- ✅ `/app/api/featured/route.js` - Active

### Repurpose
- ✅ `/lib/api.js` - Convert to shared utilities

### Create
- ⭕ `/app/api/executive-committee/route.js`
- ⭕ `/app/api/hall-of-fame/route.js`
- ⭕ `/app/api/achievements/route.js`
- ⭕ `/app/api/publications/route.js`

### Structure
```
All API route files in /app/api/[resource]/route.js
Shared utilities in /lib/api.js
Mock data in /data/*.js
```

---

## Support

See related documentation:
- `BACKEND_*.md` - Individual resource integration guides
- `DATABASE_SCHEMA.md` - Complete database schema
- `DOCUMENTATION.md` - Overall website structure

---

**Last Updated**: January 2025
