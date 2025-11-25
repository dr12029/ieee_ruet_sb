# Gallery Images Guide

## How to Add Gallery Images

### Directory Structure
Place your images in the following structure:
```
public/gallery/[year]/[event-slug]/
```

Example:
```
public/gallery/2025/agm/1.jpg
public/gallery/2025/agm/2.jpg
public/gallery/2025/tech-talk/1.jpg
```

### Adding a New Event

1. **Create Event Folder**: Create a folder under the year (e.g., `public/gallery/2025/new-event/`)
2. **Add Images**: Place your images in the folder (JPG, PNG, WebP supported)
3. **Update Data File**: Edit `data/galleryData.js` and add the event:

```javascript
2025: {
  "new-event": {
    name: "Event Display Name",
    images: [
      "/gallery/2025/new-event/1.jpg",
      "/gallery/2025/new-event/2.jpg",
      "/gallery/2025/new-event/3.jpg",
    ],
  },
  // ... other events
}
```

### Adding a New Year

1. **Create Year Folder**: Create a folder under `public/gallery/` (e.g., `public/gallery/2026/`)
2. **Add Event Folders**: Create event folders inside
3. **Update Data File**: Add the new year to `data/galleryData.js`:

```javascript
export const galleryData = {
  2026: {
    "first-event": {
      name: "First Event 2026",
      images: [
        "/gallery/2026/first-event/1.jpg",
        "/gallery/2026/first-event/2.jpg",
      ],
    },
  },
  2025: {
    // ... existing events
  },
  // ... other years
};
```

**Note**: Years are automatically sorted in descending order, so new years will appear first!

### Image Naming Conventions

- Use lowercase filenames
- Use hyphens for spaces (e.g., `tech-talk`, not `Tech Talk`)
- Number images sequentially (1.jpg, 2.jpg, etc.)
- Recommended formats: JPG, PNG, WebP
- Recommended size: 1200x800px or larger

### Event Slug Naming

Event slugs should be:
- Lowercase
- Use hyphens instead of spaces
- Descriptive but concise
- Examples: `agm`, `tech-talk`, `ieee-day`, `school-visit`

## Dynamic Features

### Auto-Detection of Years
When you add a new year to the data, it will automatically appear in the year selector dropdown.

### Auto-Detection of Events
When you add events to a year, they will automatically appear in the event selector dropdown.

### Backend Integration
When backend is ready, update the helper functions in `data/galleryData.js` to fetch from API:

```javascript
export async function getGalleryYears() {
  const res = await fetch('/api/gallery/years');
  return res.json();
}

export async function getEventImages(year, eventSlug) {
  const res = await fetch(`/api/gallery/${year}/${eventSlug}`);
  return res.json();
}
```

## Current Gallery Structure

```
public/gallery/
├── 2025/
│   ├── agm/
│   ├── expedition/
│   ├── school-visit/
│   ├── tech-trajectory/
│   └── yp-talk/
├── 2024/
│   ├── ap_anniversary/
│   ├── ieee_day/
│   └── inception/
├── 2023/
├── 2022/
├── 2021/
├── 2020/
├── 2019/
├── 2018/
├── 2017/
├── 2016/
└── 2015/
```

## Features

✅ **Dynamic Year Selection** - Automatically shows all available years
✅ **Dynamic Event Selection** - Shows events for selected year
✅ **Full-Screen Viewer** - Click any image to view in full screen
✅ **Navigation** - Use arrow keys or buttons to navigate between images
✅ **Responsive Gallery** - Justified grid layout that adapts to screen size
✅ **Centered Last Row** - If last row isn't full, images are centered
✅ **Click Outside to Close** - Click outside the image to close full-screen view
✅ **Image Counter** - Shows current image number and total count

## Tips

- Keep image file sizes optimized (compress before uploading)
- Maintain consistent aspect ratios within an event
- Use descriptive event names
- Always update both the folder structure AND the data file
- Test the gallery page after adding new images
