# Events System - Backend Integration Guide

## Overview
The events system uses a manual `upcoming` flag to categorize events as upcoming or past. This design makes it easy for backend developers to control event visibility without manipulating dates.

## Event Data Structure

Each event in `data/eventsData.js` has the following key properties:

```javascript
{
    id: "event_id_2025",
    name: "Event Name",
    date: "2025-03-15",
    image: "/events/2025/event_image.jpg",
    featured: true,        // Boolean: Display in featured sections
    upcoming: true,        // Boolean: TRUE for upcoming, FALSE for past
    description: `...`,
    details: { ... }
}
```

## How to Toggle Events Between Upcoming and Past

### Making an Event "Upcoming"
Simply set `upcoming: true`:

```javascript
{
    id: "new_event_2025",
    name: "New Workshop 2025",
    date: "2025-06-20",
    featured: false,
    upcoming: true,  // ← This makes it appear in "Upcoming Events"
    description: `...`,
    details: { ... }
}
```

### Making an Event "Past"
Simply set `upcoming: false`:

```javascript
{
    id: "old_event_2024",
    name: "Previous Conference",
    date: "2024-05-15",
    featured: true,
    upcoming: false,  // ← This makes it appear in "Past Events"
    description: `...`,
    details: { ... }
}
```

## Important Notes

1. **Manual Control**: The `upcoming` flag is NOT automatically calculated from dates. You have full control over whether an event appears as upcoming or past.

2. **Easy Toggle**: To move an event from upcoming to past (e.g., after the event happens):
   - Change `upcoming: true` to `upcoming: false`
   - No need to modify dates or any other fields

3. **Featured Flag**: The `featured` flag is independent of `upcoming`:
   - `featured: true` - Event appears in featured sections
   - `upcoming: true/false` - Controls upcoming vs past categorization

4. **Year Organization**: Events are still organized by year in the data file for better structure, but the `upcoming` flag is what determines categorization.

## Adding New Events

When adding a new event:

```javascript
2025: [
    // ... existing events
    {
        id: "your_new_event_2025",
        name: "Your Event Name",
        date: "2025-09-01",
        image: "/events/2025/your_image.jpg",
        featured: false,  // true if you want it featured
        upcoming: true,   // true for upcoming, false for past
        description: `Event description here...`,
        details: {
            venue: "Event Location",
            time: "Event Time"
        }
    }
]
```

## API Filtering

The API route (`app/api/events/route.js`) uses these helper functions:

- `getUpcomingEvents()` - Returns all events with `upcoming: true`
- `getPastEvents()` - Returns all events with `upcoming: false`
- `getEventsByYear(year)` - Returns all events for a specific year
- `getFeaturedEvents()` - Returns all events with `featured: true`

## Example Workflow

1. **Before Event**: Set `upcoming: true`
2. **After Event**: Change to `upcoming: false`
3. **That's it!** The event automatically moves from the upcoming page to the past events page.

## Backend Integration

When you integrate this with your backend:

- Store the `upcoming` boolean field in your database
- Provide an admin interface to toggle this flag
- No complex date logic needed - just a simple boolean toggle
- Frontend automatically handles the categorization based on this flag

This simple flag-based approach makes event management straightforward and prevents issues with timezone calculations or date comparisons.
