# IEEE RUET Student Branch Website - Complete Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [All Pages](#all-pages)
- [Components](#components)
- [Data Layer](#data-layer)
- [Styling & Design System](#styling--design-system)
- [Getting Started](#getting-started)

---

## Overview

This is the official website for IEEE RUET Student Branch built with Next.js 16 and React 19. The website showcases the organization's activities, members, events, achievements, publications, and more.

**Live URL**: TBD  
**Framework**: Next.js 16 (App Router)  
**Styling**: Tailwind CSS 4  
**Deployment**: Vercel (recommended)

---

## Technology Stack

- **Framework**: Next.js 16.0.1
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **Image Optimization**: Next.js Image component
- **Linting**: ESLint
- **Package Manager**: npm/yarn/pnpm

---

## Project Structure

```
ieee_ruet_sb/
├── app/                          # Next.js App Router pages
│   ├── page.js                   # Home page
│   ├── layout.js                 # Root layout with Navbar & Footer
│   ├── globals.css               # Global styles & Tailwind imports
│   ├── about/                    # About section pages
│   │   ├── ieee/                 # About IEEE
│   │   ├── ruet-sb/              # About RUET SB
│   │   ├── bangladesh-section/   # About Bangladesh Section
│   │   ├── region-10/            # About Region 10
│   │   └── membership/           # IEEE Membership info
│   ├── achievements/             # Achievements page
│   ├── affinity-groups/          # Affinity groups
│   │   └── wie/                  # Women in Engineering
│   ├── api/                      # API routes
│   │   ├── events/               # Events API
│   │   ├── gallery/              # Gallery API (filesystem scan)
│   │   └── featured/             # Featured content API
│   ├── chapters/                 # Society chapters
│   │   ├── cs/                   # Computer Society
│   │   ├── ias/                  # Industry Applications Society
│   │   ├── ras/                  # Robotics & Automation Society
│   │   └── sps/                  # Signal Processing Society
│   ├── contact/                  # Contact page
│   ├── events/                   # Events section
│   │   ├── upcoming-events/      # Upcoming events
│   │   ├── past-events/[year]/   # Past events by year
│   │   └── [eventId]/            # Event details page
│   ├── executive-committee/      # Executive committee page
│   ├── gallery/                  # Photo gallery
│   ├── hall-of-fame/             # Hall of Fame page
│   └── publications/             # Publications page
│
├── components/                   # Reusable React components
│   ├── Navbar.js                 # Navigation bar
│   ├── Footer.js                 # Footer
│   ├── HeroSection.js            # Home page hero
│   ├── FeaturedMembersCarousel.js # Featured members carousel
│   ├── VisionMission.js          # Vision & Mission section
│   ├── AchievementsSection.js    # Achievements showcase
│   ├── UpcomingEventsSection.js  # Upcoming events cards
│   ├── RecentEventsSection.js    # Recent events grid
│   ├── PublicationsSection.js    # Publications showcase
│   ├── StatisticsSection.js      # Statistics with counters
│   ├── MemberCard.js             # Member display card
│   └── OrganizationTable.js      # Organization hierarchy table
│
├── data/                         # Mock data (JSON-like JS files)
│   ├── achievementsData.js       # Achievements data
│   ├── eventsData.js             # Events data by year
│   ├── executiveMembers.js       # Executive committee members
│   ├── featuredData.js           # Featured members/content
│   ├── galleryData.js            # Gallery (legacy, API replaced)
│   ├── hallOfFameData.js         # Hall of Fame members
│   ├── homePageData.js           # Home page sections data
│   └── publicationsData.js       # Publications data
│
├── lib/                          # Utility functions
│   └── api.js                    # API helper functions
│
├── public/                       # Static assets
│   ├── about/                    # About section images
│   ├── achievements/             # Achievement images by year
│   ├── events/                   # Event images by year
│   ├── gallery/                  # Gallery images by year/event
│   ├── publications/             # Publication images & PDFs
│   ├── team/                     # Team member photos
│   ├── ruet-sb.png              # Main logo
│   └── IMAGES_README.md          # Image guidelines
│
├── DOCUMENTATION.md              # This file
├── BACKEND_*.md                  # Backend integration guides (6 files)
├── API_STRUCTURE.md              # API organization guide
├── DATABASE_SCHEMA.md            # Database schema
├── package.json                  # Dependencies
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── README.md                     # Getting started guide
```

---

## All Pages

### 1. **Home Page** (`/`)
**File**: `app/page.js`

**Sections**:
- Hero Section with animated background
- Featured Members Carousel
- Vision & Mission (tabbed interface)
- Achievements Section (3 featured achievements)
- Upcoming Events Section
- Recent Iconic Events Section
- Publications Section
- Statistics Section (animated counters)

**Data Sources**:
- `data/homePageData.js` - All home page content
- `data/featuredData.js` - Featured members

**Components Used**:
- `HeroSection`, `FeaturedMembersCarousel`, `VisionMission`
- `AchievementsSection`, `UpcomingEventsSection`, `RecentEventsSection`
- `PublicationsSection`, `StatisticsSection`

---

### 2. **About Pages** (`/about/*`)

#### a. About IEEE (`/about/ieee`)
**File**: `app/about/ieee/page.js`  
Content about IEEE organization, its history, mission, and global impact.

#### b. About RUET SB (`/about/ruet-sb`)
**File**: `app/about/ruet-sb/page.js`  
Information about IEEE RUET Student Branch, founding, mission, activities.

#### c. Bangladesh Section (`/about/bangladesh-section`)
**File**: `app/about/bangladesh-section/page.js`  
Details about IEEE Bangladesh Section.

#### d. Region 10 (`/about/region-10`)
**File**: `app/about/region-10/page.js`  
Information about IEEE Region 10 (Asia-Pacific).

#### e. Membership (`/about/membership`)
**File**: `app/about/membership/page.js`  
IEEE membership benefits, how to join, membership types.

**Design Pattern**: All about pages use consistent header styling:
- White background
- Gradient text titles (blue → cyan → purple)
- `text-5xl md:text-6xl` font size
- `py-16 mt-16` spacing

---

### 3. **Chapters Pages** (`/chapters/*`)

#### a. Computer Society (`/chapters/cs`)
**File**: `app/chapters/cs/page.js`  
CS chapter activities, events, team, social media links.

#### b. Industry Applications Society (`/chapters/ias`)
**File**: `app/chapters/ias/page.js`  
IAS chapter details and activities.

#### c. Robotics & Automation Society (`/chapters/ras`)
**File**: `app/chapters/ras/page.js`  
RAS chapter information, robotics projects.

#### d. Signal Processing Society (`/chapters/sps`)
**File**: `app/chapters/sps/page.js`  
SPS chapter details.

**Features**:
- Social media links (Facebook, LinkedIn, Instagram, YouTube)
- Chapter-specific color themes
- Team member sections
- Past activities showcase

---

### 4. **Affinity Groups** (`/affinity-groups/*`)

#### Women in Engineering (`/affinity-groups/wie`)
**File**: `app/affinity-groups/wie/page.js`  
WIE affinity group activities, mission, team, social links.

---

### 5. **Events Section** (`/events/*`)

#### a. Upcoming Events (`/events/upcoming-events`)
**File**: `app/events/upcoming-events/page.js`  
Displays all events with `upcoming: true` flag.

**Features**:
- Event cards with images
- Date, venue, description
- "View Event" button
- Empty state: "Stay Tuned" message

**API**: `GET /api/events?type=upcoming`

#### b. Past Events (`/events/past-events/[year]`)
**File**: `app/events/past-events/[year]/page.js`  
Dynamic year-based past events page.

**Features**:
- Year selector dropdown
- Featured badge on important events
- Filtered by `upcoming: false`
- Event cards grid (3 columns)

**API**: `GET /api/events?type=past&year=2025`

#### c. Event Details (`/events/[eventId]`)
**File**: `app/events/[eventId]/page.js`  
Individual event detail page.

**Features**:
- Hero image
- Full description (preserves formatting)
- Quick info sidebar (venue, time, etc.)
- Social share buttons
- Contact button

**Data Source**: `data/eventsData.js` → `getEventById()`

---

### 6. **Achievements** (`/achievements`)
**File**: `app/achievements/page.js`

**Features**:
- Timeline of achievements by year
- Achievement cards with images
- Organized by year (descending)
- Trophy/award themed design

**Data Source**: `data/achievementsData.js`

**Structure**:
```javascript
{
  year: [
    {
      id: "unique_id",
      title: "Achievement Title",
      description: "Details...",
      image: "/achievements/year/image.jpg",
      date: "Month Day, Year"
    }
  ]
}
```

---

### 7. **Gallery** (`/gallery`)
**File**: `app/gallery/page.js`

**Features**:
- Dynamic year selector
- Dynamic event selector (based on year)
- Image grid (3 columns, responsive)
- Full-screen modal viewer
- Keyboard navigation (arrows, ESC)
- Auto-discovery of images via filesystem

**API**: `GET /api/gallery` - Scans `/public/gallery/` directory

**Folder Structure**:
```
public/gallery/
  2025/
    event-name/
      1.jpg
      2.jpg
  2024/
    another-event/
      photo1.jpg
```

**How It Works**:
1. API scans filesystem for year folders
2. For each year, finds event subfolders
3. For each event, lists image files
4. Returns structured JSON
5. Frontend displays dropdowns and images

---

### 8. **Executive Committee** (`/executive-committee`)
**File**: `app/executive-committee/page.js`

**Features**:
- Hero section with gradient background
- Organization hierarchy table
- Member cards with photos
- Positions: Chairperson, Vice Chair, General Secretary, Treasurer, etc.
- Social links for each member

**Data Source**: `data/executiveMembers.js`

**Structure**:
```javascript
[
  {
    id: 1,
    name: "Member Name",
    position: "Chairperson",
    department: "CSE",
    session: "2021-22",
    image: "/team/photo.jpg",
    email: "email@example.com",
    phone: "+880...",
    linkedin: "https://linkedin.com/in/...",
    facebook: "https://facebook.com/..."
  }
]
```

---

### 9. **Hall of Fame** (`/hall-of-fame`)
**File**: `app/hall-of-fame/page.js`

**Features**:
- Showcases notable alumni
- Member cards with photos
- Achievements and current positions
- Organized by year or achievement

**Data Source**: `data/hallOfFameData.js`

**Structure**:
```javascript
[
  {
    id: 1,
    name: "Alumni Name",
    role: "Former Chairperson",
    year: "2020",
    achievement: "Notable achievement",
    image: "/team/alumni.jpg",
    currentPosition: "Current job/position"
  }
]
```

---

### 10. **Publications** (`/publications`)
**File**: `app/publications/page.js`

**Features**:
- Magazine/newsletter showcase
- Large publication covers
- Issue numbers and dates
- Download buttons (PDF)
- Grid layout

**Data Source**: `data/publicationsData.js`

**Structure**:
```javascript
[
  {
    id: 1,
    title: "Publication Title",
    issue: "Issue #1",
    date: "Month Year",
    description: "Description...",
    coverImage: "/publications/cover.jpg",
    pdfUrl: "/publications/pdf/file.pdf"
  }
]
```

---

### 11. **Contact** (`/contact`)
**File**: `app/contact/page.js`

**Features**:
- Contact form (name, email, message)
- Social media links
- Office address and map
- Email and phone numbers

---

## Components

### Navigation & Layout

#### `Navbar.js`
- Responsive navigation bar
- Dropdown menus for About, Chapters, Events
- Mobile hamburger menu
- Sticky header with scroll effect

#### `Footer.js`
- Footer with links
- Social media icons
- Copyright information
- Quick links to important pages

---

### Home Page Components

#### `HeroSection.js`
- Animated gradient background
- Main tagline and CTA buttons
- Floating decorative elements

#### `FeaturedMembersCarousel.js`
- Auto-rotating carousel
- Member cards with images
- Position and department info
- Navigation dots

#### `VisionMission.js`
- Tabbed interface (What, Why, Who)
- Animated tab transitions
- Gradient button states
- IEEE logo display

#### `AchievementsSection.js`
- 3 featured achievements
- Trophy-themed design (gold/amber gradients)
- Hover animations
- "View All" button

#### `UpcomingEventsSection.js`
- Upcoming events cards
- Large event images
- Empty state handling
- "View Event" buttons

#### `RecentEventsSection.js`
- 3 recent past events
- Numbered badges (1, 2, 3)
- Date display
- Grid layout

#### `PublicationsSection.js`
- 2 recent publications
- Large magazine covers
- "NEW" ribbon badges
- Perspective hover effect

#### `StatisticsSection.js`
- Animated counters (scroll-triggered)
- 4 statistics cards
- Glass morphism design
- Purple gradient background

---

### Utility Components

#### `MemberCard.js`
- Reusable member display card
- Photo, name, position
- Social links
- Hover effects

#### `OrganizationTable.js`
- Hierarchical organization chart
- Position names and counts
- Responsive table design

---

## Data Layer

All data is stored in `/data` folder as JavaScript files that export objects/arrays.

### Current Data Files:

1. **achievementsData.js** - Achievements by year
2. **eventsData.js** - Events data with helper functions
3. **executiveMembers.js** - Current executive committee
4. **featuredData.js** - Featured members for carousel
5. **hallOfFameData.js** - Hall of Fame alumni
6. **homePageData.js** - Home page sections content
7. **publicationsData.js** - Publications/magazines

### Helper Functions (eventsData.js):
- `getUpcomingEvents()` - Returns events with `upcoming: true`
- `getPastEvents()` - Returns events with `upcoming: false`
- `getEventsByYear(year)` - Returns events for specific year
- `getEventById(id)` - Returns single event
- `getFeaturedEvents()` - Returns featured events
- `getEventYears()` - Returns array of years
- `formatEventDate(date)` - Formats date string

---

## Styling & Design System

### Color Palette

**Primary Colors**:
- Blue: `#2563eb` (blue-600)
- Cyan: `#06b6d4` (cyan-500)
- Purple: `#9333ea` (purple-600)

**Gradients**:
- Primary: `bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600`
- Hero: `bg-linear-to-br from-blue-900 via-blue-800 to-purple-900`
- Gold: `bg-linear-to-r from-yellow-400 to-orange-500`
- Green: `bg-linear-to-r from-green-500 to-teal-500`

**Text Colors**:
- Headings: `text-gray-900`
- Body: `text-gray-600`, `text-gray-700`
- Light: `text-gray-400`, `text-gray-500`

### Typography

**Headings**:
- H1 (Page Title): `text-5xl md:text-6xl font-bold`
- H2 (Section): `text-4xl md:text-5xl font-bold`
- H3 (Subsection): `text-3xl md:text-4xl font-bold`

**Body Text**:
- Large: `text-xl`
- Regular: `text-lg`
- Small: `text-base`

### Spacing

**Page Sections**:
- Padding: `py-16` (vertical), `px-4 sm:px-6 lg:px-8` (horizontal)
- Top Margin: `mt-16` (for non-hero sections)
- Max Width: `max-w-6xl mx-auto`

**Component Spacing**:
- Card Padding: `p-6` or `p-8`
- Gap: `gap-4`, `gap-6`, `gap-8`

### Buttons

**Primary Button**:
```jsx
<button className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all">
```

**Secondary Button**:
```jsx
<button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
```

**Button Classes Used**:
- `btn-primary` (custom class)
- `btn-secondary` (custom class)
- `btn-secondary-2` (for social links)

### Cards

**Standard Card**:
```jsx
<div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
```

**Gradient Card**:
```jsx
<div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
```

### Animations

**Hover Effects**:
- Scale: `hover:scale-105`
- Lift: `hover:-translate-y-2`
- Shadow: `hover:shadow-2xl`

**Transitions**:
- Standard: `transition-all duration-300`
- Slow: `transition-all duration-500`

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ieee_ruet_sb

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit pages**: Files in `app/` auto-reload
3. **Edit components**: Files in `components/` auto-reload
4. **Update data**: Edit files in `data/`
5. **Add images**: Place in `public/` folders
6. **Check errors**: Browser console and terminal

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start

# Deploy to Vercel
vercel --prod
```

---

## Important Notes

### Image Requirements
- **Events**: Place in `/public/events/YEAR/`
- **Achievements**: Place in `/public/achievements/YEAR/`
- **Gallery**: Place in `/public/gallery/YEAR/EVENT_NAME/`
- **Team Photos**: Place in `/public/team/`
- **Publications**: Place in `/public/publications/`

See `public/IMAGES_README.md` for detailed specifications.

### Data Updates
- All content is in `/data` files
- No database required for development
- Easy to update without code changes
- Backend integration ready

### Styling Rules
- Use Tailwind utility classes
- Maintain consistent spacing (`py-16`, `mt-16`)
- Follow gradient color scheme
- Use `next/image` for all images
- Keep responsive design (mobile-first)

---

## Next Steps

1. **Add Images**: Upload event, achievement, and team photos
2. **Update Content**: Edit data files with real information
3. **Test Pages**: Check all pages on different devices
4. **Backend Integration**: See `BACKEND_*.md` files for guides
5. **Deploy**: Deploy to Vercel or your hosting platform

---

## Support & Documentation

- **Backend Integration**: See `BACKEND_*.md` files
- **API Structure**: See `API_STRUCTURE.md`
- **Database Schema**: See `DATABASE_SCHEMA.md`
- **Image Guidelines**: See `public/IMAGES_README.md`

---

## License

© 2025 IEEE RUET Student Branch. All rights reserved.
