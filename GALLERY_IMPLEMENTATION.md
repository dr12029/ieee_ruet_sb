# Gallery - Truly Dynamic Implementation

## Overview
The gallery system has been redesigned to be **truly dynamic** - it automatically scans the filesystem at runtime to discover years, events, and images without any hardcoded values.

## How It Works

### 1. API Route (`/app/api/gallery/route.js`)
- **Purpose**: Server-side filesystem scanning
- **Process**:
  1. Scans `/public/gallery` directory for year folders
  2. For each year, scans for event subfolders
  3. For each event, finds all image files (jpg, jpeg, png, gif, webp)
  4. Sorts images naturally (1.jpg, 2.jpg, ..., 10.jpg, 11.jpg, etc.)
  5. Returns structured JSON: `{ year: { event: { name, images[] } } }`

- **Key Features**:
  - Automatically excludes empty folders (0 images)
  - Formats event names intelligently (e.g., `ieee_day_2019` → "IEEE Day 2019")
  - Handles acronyms (IEEE, AGM, IoT, etc.) with uppercase
  - Natural sorting for filenames with numbers

### 2. Gallery Page (`/app/gallery/page.js`)
- **Purpose**: Client-side rendering and user interaction
- **Process**:
  1. Fetches gallery data from `/api/gallery` on mount
  2. Populates year dropdown with discovered years
  3. Updates event dropdown based on selected year
  4. Displays images for selected event
  5. Provides full-screen modal viewer with navigation

- **Features**:
  - Loading state with spinner
  - Responsive 3-column grid (1 col mobile, 2 col tablet, 3 col desktop)
  - Last row centered when < 3 images
  - Full-screen image viewer with keyboard navigation (arrows, ESC)

### 3. File Structure Expected
```
public/
  gallery/
    2025/
      ieee_day/
        1.jpg
        2.jpg
        ...
      tech_fest/
        photo1.jpg
        photo2.jpg
        ...
    2024/
      ...
```

## Adding New Images/Events

### To add a new event:
1. Create folder: `/public/gallery/{year}/{event_name}/`
2. Add images (any name, will be sorted alphabetically)
3. **That's it!** No code changes needed

### To add images to existing event:
1. Add image files to `/public/gallery/{year}/{event_name}/`
2. **That's it!** No code changes needed

## Image Naming Recommendations

### Option 1: Numbered (Current Standard)
```
1.jpg, 2.jpg, 3.jpg, ..., 10.jpg
```
✅ Simple, clean, natural sorting works perfectly

### Option 2: Descriptive Names
```
opening_ceremony.jpg
guest_speech.jpg
team_photo.jpg
```
✅ Self-documenting, alphabetically sorted

### Option 3: Timestamped
```
2024-01-15_event_001.jpg
2024-01-15_event_002.jpg
```
✅ Preserves chronological order, unique names

## Event Name Formatting
Event folder names are automatically formatted:
- `ieee_day_2019` → "IEEE Day 2019"
- `mobile_app_development` → "Mobile App Development"
- `ras_iot` → "RAS IOT"
- `latex_pcb` → "LaTeX PCB"

**Recognized acronyms** (auto-uppercased):
IEEE, AGM, AI, IoT, PCB, RAS, WIE, PES, ICT, IELTS, MATLAB

## Backend Integration Ready

When backend is ready, simply:
1. Replace `/api/gallery/route.js` with database query
2. Return same JSON structure:
```json
{
  "2025": {
    "event_key": {
      "name": "Display Name",
      "images": ["/path/to/image1.jpg", "/path/to/image2.jpg"]
    }
  }
}
```
3. Frontend will work without any changes

## Performance Notes
- API route runs server-side (no client bundle impact)
- Filesystem scan is fast (hundreds of files in milliseconds)
- Data fetched once on page load
- Images lazy-loaded by Next.js Image component
- Consider caching/memoization if gallery grows very large (1000+ images)

## Testing
Visit: `http://localhost:3000/gallery`
- Select different years → events populate dynamically
- Select events → images display from filesystem
- Click images → full-screen modal with navigation
- Add new folder with images → refresh page → appears automatically
