# IEEE RUET Student Branch Website

## Current Setup (January 2026)

**Events pages now use static data from `eventsData.js` directly (no API calls).**
**Other pages (Executive Members, Gallery, Hall of Fame, etc.) still use MongoDB.**

This allows the website to work with:
- ✅ Historical events data (2009-2025) from `eventsData.js`
- ✅ MongoDB for Executive Members, Gallery, Hall of Fame, etc.

---

## To Re-enforce MongoDB for Events (When Backend Developer Returns)

When you want events to use MongoDB again instead of `eventsData.js`:

### Files to Modify:

#### 1. `app/events/past-events/[year]/page.js`
**Change FROM:**
```javascript
import { eventsData, getPastEventYears } from '@/data/eventsData';
// ... and the useEffect that loads from eventsData
```
**Change TO:**
```javascript
// Remove the eventsData import and restore API fetch:
useEffect(() => {
    async function fetchEvents() {
        const response = await fetch('/api/events?type=past');
        const data = await response.json();
        setYears(data.years || []);
        const yearEvents = data.events.filter(e => e.year.toString() === year.toString());
        setEvents(yearEvents);
        setLoading(false);
    }
    fetchEvents();
}, [year]);
```

#### 2. `app/events/upcoming-events/page.js`
**Change FROM:**
```javascript
import { getUpcomingEvents } from '@/data/eventsData';
// ... and the useEffect that loads from eventsData
```
**Change TO:**
```javascript
// Remove the eventsData import and restore API fetch:
useEffect(() => {
    async function fetchEvents() {
        const response = await fetch('/api/events?type=upcoming');
        const data = await response.json();
        setEvents(data.events || []);
        setLoading(false);
    }
    fetchEvents();
}, []);
```

#### 3. `app/events/[eventId]/page.js`
**Change FROM:**
```javascript
import { getEventById } from '@/data/eventsData';
// ... and the useEffect that loads from eventsData
```
**Change TO:**
```javascript
// Remove the eventsData import and restore API fetch:
useEffect(() => {
    async function fetchEvent() {
        const response = await fetch('/api/events');
        const data = await response.json();
        const foundEvent = data.events.find(e => e.id === eventId);
        // ... rest of the original code
    }
    fetchEvent();
}, [eventId, router]);
```

#### 4. `components/UpcomingEventsSection.js`
**Change FROM:**
```javascript
import { getUpcomingEvents } from '@/data/eventsData';
```
**Change TO:**
```javascript
// Remove the eventsData import and restore API fetch
```

#### 5. `components/RecentEventsSection.js`
**Change FROM:**
```javascript
import { getFeaturedEvents } from '@/data/eventsData';
```
**Change TO:**
```javascript
// Remove the eventsData import and restore API fetch for featured events
```

---

## MongoDB Configuration

- `lib/mongodb.js` - MongoDB connection utility (currently active)
- `.env.local` - Must have `MONGODB_URI` defined
- Vercel Environment Variables - Must have `MONGODB_URI` set