# Events System - Implementation Guide

## Overview
The events system is designed to be truly dynamic and backend-ready, with automatic categorization of upcoming vs past events based on dates.

## Structure

### Pages
1. **Upcoming Events** (`/events/upcoming-events`)
   - Shows events with dates >= today
   - Displays "Stay Tuned" message if no upcoming events
   - Event cards with image, name, date, description

2. **Past Events** (`/events/past-events/[year]`)
   - Dynamic year parameter in URL
   - Year selector dropdown
   - Shows "No Events" if year has no events
   - Featured badge on featured events

3. **Event Details** (`/events/[eventId]`)
   - Full event details with hero image
   - Structured event information
   - Quick info sidebar
   - Facebook page link and contact button

### Navigation
- Navbar has "Events" dropdown with:
  - Upcoming Events
  - Past Events (links to 2025 by default)

## Data Structure

### Events Data (`/data/eventsData.js`)
```javascript
{
    year: [
        {
            id: "unique_event_id",
            name: "Event Name",
            date: "YYYY-MM-DD",
            image: "/events/year/image.jpg",
            featured: true/false,
            description: "Multi-line description...",
            details: {
                venue: "Location",
                time: "Time Range",
                // Any other key-value pairs
            }
        }
    ]
}
```

### Helper Functions
- `getUpcomingEvents()` - Auto-filters by date >= today
- `getPastEvents()` - Auto-filters by date < today
- `getEventsByYear(year)` - Get events for specific year
- `getEventById(id)` - Get single event
- `getFeaturedEvents()` - Get featured events only
- `formatEventDate(dateString)` - Format date for display

## API Route (`/app/api/events/route.js`)

### Query Parameters
- `type=upcoming` - Get upcoming events
- `type=past` - Get past events
- `year=2024` - Get events for specific year
- `featured=true` - Filter featured events only

### Response Format
```json
{
    "success": true,
    "count": 5,
    "events": [...],
    "years": ["2025", "2024", ...]
}
```

## Features

### Automatic Date Handling
- Events automatically move from "upcoming" to "past" when their date passes
- No manual categorization needed
- Comparison done at midnight (00:00:00)

### Featured Events
- Set `featured: true` in event data
- Yellow/orange badge displays on cards
- Can filter via API: `?featured=true`

### Responsive Design
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Cards have hover effects with elevation and scale

### Empty States
- **No Upcoming Events**: "Stay Tuned" message with links to past events
- **No Events in Year**: "No Events" message with year selector and alternative links

## Adding New Events

### 1. Add Event Data
Edit `/data/eventsData.js`:
```javascript
2026: [
    {
        id: "my_new_event",
        name: "My New Event",
        date: "2026-06-15",
        image: "/events/2026/my_event.jpg",
        featured: false,
        description: `Event description...

Format with blank lines for readability.

Key details stand out.`,
        details: {
            venue: "RUET Campus",
            registrationFee: "BDT 200",
            trainer: "Expert Name"
        }
    }
]
```

### 2. Add Event Image
Place image at: `/public/events/2026/my_event.jpg`

### 3. Done!
- Event automatically appears in correct category
- No code changes needed
- Description formatting preserved (blank lines, etc.)

## Backend Integration

When backend is ready:

### Option 1: Keep Mock Data Structure
Replace `/app/api/events/route.js` with database queries but maintain same response format

### Option 2: Database Schema
```sql
CREATE TABLE events (
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    date DATE,
    image VARCHAR,
    featured BOOLEAN,
    description TEXT,
    details JSONB,
    year INT GENERATED FROM date
);
```

### Frontend Compatibility
- Frontend fetches from `/api/events`
- Response format stays the same
- No frontend changes needed
- Automatic date categorization logic can move to backend

## Description Formatting Guidelines

### Best Practices
```javascript
description: `First paragraph introduces the event.

Second paragraph provides more details.

Registration Fee: BDT 500
Trainer: John Doe

Final paragraph with additional info.`
```

### Format for Impact
- Use blank lines before/after important details
- List format for multiple items
- Preserve user formatting exactly as entered
- Display with `whitespace-pre-line` CSS

## Styling Reference

### Buttons (Based on Chapters/AG Pages)
```jsx
// Primary action
<a className="btn bg-linear-to-r from-blue-600 to-blue-700 text-white border-none hover:shadow-xl">

// Secondary action  
<a className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
```

### Event Cards
- White background with shadow
- Hover: lift and increase shadow
- Image overlay on hover
- Truncate description to 3 lines

### Color Scheme
- Primary: Blue 600 to Cyan 500 gradient
- Featured badge: Yellow 400 to Orange 500
- Upcoming badge: Green 400 to Emerald 500
- Text: Gray 900 (headings), Gray 600 (body)

## Notes

- Events with dates in 2025 are currently "upcoming" (based on Nov 26, 2025 date)
- 2014 has no events (empty array) - shows "No Events" message
- Featured events are manually selected (3-5 major events per year)
- All event data from 2014-2025 is included with detailed descriptions
- Images should be landscape orientation, min 800x600px recommended
