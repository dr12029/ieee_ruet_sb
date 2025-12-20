# Database Schema - Complete Reference

## Overview
This document provides complete database schemas for both **MongoDB** and **SQL** (PostgreSQL/MySQL) implementations.

---

## Table of Contents
1. [Events](#1-events)
2. [Gallery](#2-gallery)
3. [Executive Committee](#3-executive-committee)
4. [Hall of Fame](#4-hall-of-fame)
5. [Achievements](#5-achievements)
6. [Featured Content](#6-featured-content)
7. [Publications](#7-publications)
8. [Relationships](#relationships)
9. [Indexes](#indexes)
10. [Sample Data](#sample-data)

---

## 1. Events

### MongoDB

```javascript
// Collection: events
{
    _id: ObjectId("..."),
    id: "event_id_2025",               // String: URL-friendly unique ID
    name: "Workshop on AI",             // String: Event name
    date: ISODate("2025-03-15"),       // Date: Event date
    year: 2025,                        // Number: Auto-extracted from date
    image: "/events/2025/ai.jpg",      // String: Image path or URL
    featured: true,                    // Boolean: Featured flag
    upcoming: true,                    // Boolean: Upcoming vs Past
    description: "Full description...", // String: Multi-line description
    details: {                         // Object: Flexible key-value pairs
        venue: "RUET Campus",
        time: "10:00 AM - 5:00 PM",
        registrationFee: "BDT 500",
        trainer: "Dr. Expert Name"
    },
    facebookLink: "https://...",       // String: Optional FB event link
    createdAt: ISODate("..."),         // Date: Auto-generated
    updatedAt: ISODate("...")          // Date: Auto-updated
}
```

### SQL

```sql
CREATE TABLE events (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    year INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM date)) STORED,
    image VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    upcoming BOOLEAN DEFAULT TRUE,
    description TEXT,
    facebook_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE event_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id VARCHAR(100) NOT NULL,
    detail_key VARCHAR(100) NOT NULL,
    detail_value TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_key (event_id, detail_key)
);

CREATE INDEX idx_events_year ON events(year);
CREATE INDEX idx_events_upcoming ON events(upcoming);
CREATE INDEX idx_events_featured ON events(featured);
CREATE INDEX idx_events_date ON events(date);
```

---

## 2. Gallery

### MongoDB

```javascript
// Collection: gallery_events
{
    _id: ObjectId("..."),
    year: 2025,                        // Number: Event year
    eventSlug: "ieee-day-2025",        // String: URL-friendly slug
    eventName: "IEEE Day 2025",        // String: Display name
    description: "Description...",     // String: Optional description
    eventDate: ISODate("2025-10-01"), // Date: Optional event date
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}

// Collection: gallery_images
{
    _id: ObjectId("..."),
    eventId: ObjectId("..."),          // Reference to gallery_events
    fileName: "photo1.jpg",            // String: Original filename
    imagePath: "/gallery/2025/ieee-day/photo1.jpg", // String: Path or URL
    displayOrder: 1,                   // Number: Custom sorting
    caption: "Opening ceremony",       // String: Optional caption
    uploadedBy: "admin_user_id",       // String: User who uploaded
    uploadedAt: ISODate("..."),       // Date: Upload timestamp
    metadata: {                        // Object: Image metadata
        width: 1920,
        height: 1080,
        size: 245760,
        format: "jpg"
    }
}
```

### SQL

```sql
CREATE TABLE gallery_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    event_slug VARCHAR(100) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_year_slug (year, event_slug)
);

CREATE TABLE gallery_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    caption TEXT,
    uploaded_by VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON,
    FOREIGN KEY (event_id) REFERENCES gallery_events(id) ON DELETE CASCADE
);

CREATE INDEX idx_gallery_year ON gallery_events(year);
CREATE INDEX idx_gallery_images_event ON gallery_images(event_id, display_order);
```

---

## 3. Executive Committee

### MongoDB

```javascript
// Collection: executive_members
{
    _id: ObjectId("..."),
    name: "Member Name",                // String: Full name
    position: "Chairperson",            // String: Position title
    positionOrder: 1,                   // Number: Hierarchy (1-10)
    department: "CSE",                  // String: Department code
    departmentFull: "Computer Science and Engineering",
    session: "2021-22",                 // String: Student session
    studentId: "1810012",               // String: Optional student ID
    image: "/team/member.jpg",          // String: Photo path/URL
    email: "member@example.com",        // String: Email
    phone: "+880...",                   // String: Phone number
    linkedin: "https://...",            // String: LinkedIn profile
    facebook: "https://...",            // String: Facebook profile
    twitter: "",                        // String: Optional
    instagram: "",                      // String: Optional
    bio: "Short biography...",          // String: Optional bio
    year: 2025,                         // Number: Committee year
    active: true,                       // Boolean: Currently active
    joinDate: ISODate("2024-01-15"),   // Date: When joined
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL

```sql
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_exec_year ON executive_members(year);
CREATE INDEX idx_exec_active ON executive_members(active);
CREATE INDEX idx_exec_position ON executive_members(position_order);
```

---

## 4. Hall of Fame

### MongoDB

```javascript
// Collection: hall_of_fame
{
    _id: ObjectId("..."),
    name: "Alumni Name",                // String: Full name
    role: "Former Chairperson",         // String: Role in RUET SB
    year: "2020",                      // String: Graduation/active year
    tenure: "2019-2020",               // String: Committee tenure
    achievement: "Main achievement",    // String: Primary achievement
    achievements: [                     // Array: Multiple achievements
        "Achievement 1",
        "Achievement 2"
    ],
    image: "/team/alumni.jpg",         // String: Photo path/URL
    currentPosition: "Software Engineer", // String: Current role
    company: "Company Name",            // String: Current company
    linkedin: "https://...",           // String: LinkedIn profile
    facebook: "https://...",           // String: Facebook
    twitter: "",                       // String: Optional
    bio: "Full biography...",          // String: Detailed bio
    highlights: [                      // Array: Key highlights
        "Published research papers",
        "Won competitions"
    ],
    featuredOrder: 1,                  // Number: Display order (0 = not featured)
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

CREATE INDEX idx_hof_year ON hall_of_fame(year);
CREATE INDEX idx_hof_featured ON hall_of_fame(featured_order);
```

---

## 5. Achievements

### MongoDB

```javascript
// Collection: achievements
{
    _id: ObjectId("..."),
    id: "achievement_2025_1",          // String: Unique ID
    title: "First Place in Robotics",  // String: Achievement title
    description: "Full description...", // String: Details
    image: "/achievements/2025/award.jpg", // String: Image path/URL
    date: "January 15, 2025",          // String: Display date
    actualDate: ISODate("2025-01-15"), // Date: For sorting
    year: 2025,                        // Number: Year
    category: "Competition",            // String: Category
    tags: ["robotics", "competition"],  // Array: Tags
    featured: false,                    // Boolean: Featured
    participants: [                     // Array: Team members
        "Member 1",
        "Member 2"
    ],
    externalLink: "https://...",       // String: Related link
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE achievement_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    achievement_id VARCHAR(100) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);

CREATE TABLE achievement_participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    achievement_id VARCHAR(100) NOT NULL,
    participant_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);

CREATE INDEX idx_ach_year ON achievements(year);
CREATE INDEX idx_ach_category ON achievements(category);
CREATE INDEX idx_ach_featured ON achievements(featured);
CREATE INDEX idx_ach_tags_tag ON achievement_tags(tag);
```

---

## 6. Featured Content

### MongoDB

```javascript
// Collection: featured_content
{
    _id: ObjectId("..."),
    id: "featured_001",                // String: Unique ID
    type: "member",                    // String: member, event, article
    
    // Member fields
    name: "Member Name",
    position: "Chairperson",
    department: "CSE",
    session: "2021-22",
    quote: "Inspiring quote",
    achievements: ["Achievement 1", "Achievement 2"],
    
    // Event fields
    eventId: ObjectId("..."),          // Reference
    eventTitle: "Event Title",
    eventDate: ISODate("..."),
    
    // Article fields
    title: "Article Title",
    excerpt: "Brief description...",
    link: "/path/to/article",
    
    // Common fields
    image: "/path/to/image.jpg",
    displayOrder: 1,                   // Number: Order in carousel
    active: true,                      // Boolean: Currently active
    startDate: ISODate("..."),        // Date: When to start showing
    endDate: ISODate("..."),          // Date: When to stop (optional)
    
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL

```sql
CREATE TABLE featured_content (
    id VARCHAR(100) PRIMARY KEY,
    type ENUM('member', 'event', 'article') NOT NULL,
    
    -- Member fields
    name VARCHAR(255),
    position VARCHAR(100),
    department VARCHAR(50),
    session VARCHAR(20),
    quote TEXT,
    
    -- Event fields
    event_id VARCHAR(100),
    event_title VARCHAR(255),
    event_date DATE,
    
    -- Article fields
    title VARCHAR(255),
    excerpt TEXT,
    link VARCHAR(500),
    
    -- Common fields
    image VARCHAR(500),
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE featured_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featured_id VARCHAR(100) NOT NULL,
    achievement TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (featured_id) REFERENCES featured_content(id) ON DELETE CASCADE
);

CREATE INDEX idx_feat_type ON featured_content(type);
CREATE INDEX idx_feat_active ON featured_content(active);
CREATE INDEX idx_feat_order ON featured_content(display_order);
CREATE INDEX idx_feat_dates ON featured_content(start_date, end_date);
```

---

## 7. Publications

### MongoDB

```javascript
// Collection: publications
{
    _id: ObjectId("..."),
    id: "publication_001",             // String: Unique ID
    title: "INSPIRA Magazine",         // String: Publication title
    issue: "Issue #5",                 // String: Issue number
    date: "December 2024",             // String: Display date
    actualDate: ISODate("2024-12-01"), // Date: For sorting
    year: 2024,                        // Number: Year
    description: "Description...",     // String: Details
    coverImage: "/publications/inspira_5.jpg", // String: Cover image
    pdfUrl: "/publications/pdf/inspira_5.pdf", // String: PDF file
    pages: 48,                         // Number: Page count
    category: "Magazine",              // String: Magazine, Newsletter, etc.
    featured: true,                    // Boolean: Featured
    downloadCount: 0,                  // Number: Download counter
    createdAt: ISODate("..."),
    updatedAt: ISODate("...")
}
```

### SQL

```sql
CREATE TABLE publications (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issue VARCHAR(50),
    date_display VARCHAR(50),
    actual_date DATE NOT NULL,
    year INT GENERATED ALWAYS AS (EXTRACT(YEAR FROM actual_date)) STORED,
    description TEXT,
    cover_image VARCHAR(500),
    pdf_url VARCHAR(500),
    pages INT,
    category VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_pub_year ON publications(year);
CREATE INDEX idx_pub_category ON publications(category);
CREATE INDEX idx_pub_featured ON publications(featured);
CREATE INDEX idx_pub_date ON publications(actual_date);
```

---

## Relationships

### Entity Relationship Diagram (ERD)

```
events
  └─── event_details (1:N)

gallery_events
  └─── gallery_images (1:N)

executive_members (standalone)

hall_of_fame
  ├─── hall_of_fame_achievements (1:N)
  └─── hall_of_fame_highlights (1:N)

achievements
  ├─── achievement_tags (1:N)
  └─── achievement_participants (1:N)

featured_content
  ├─── featured_achievements (1:N)
  └─── [references events via eventId] (optional)

publications (standalone)
```

---

## Indexes

### Essential Indexes

**Performance-critical indexes**:
```sql
-- Events
CREATE INDEX idx_events_year ON events(year);
CREATE INDEX idx_events_upcoming_date ON events(upcoming, date);
CREATE INDEX idx_events_featured ON events(featured);

-- Gallery
CREATE INDEX idx_gallery_year ON gallery_events(year);
CREATE INDEX idx_gallery_images_event_order ON gallery_images(event_id, display_order);

-- Executive Members
CREATE INDEX idx_exec_year_active ON executive_members(year, active);
CREATE INDEX idx_exec_position_order ON executive_members(position_order);

-- Achievements
CREATE INDEX idx_ach_year_date ON achievements(year, actual_date);
CREATE INDEX idx_ach_featured ON achievements(featured);

-- Featured Content
CREATE INDEX idx_feat_active_order ON featured_content(active, display_order);
CREATE INDEX idx_feat_dates ON featured_content(start_date, end_date);
```

---

## Sample Data

### Events
```sql
INSERT INTO events (id, name, date, image, featured, upcoming, description) VALUES
('event_2025_ai', 'AI Workshop', '2025-06-15', '/events/2025/ai.jpg', true, true, 'Learn AI fundamentals');

INSERT INTO event_details (event_id, detail_key, detail_value) VALUES
('event_2025_ai', 'venue', 'RUET Campus'),
('event_2025_ai', 'time', '10:00 AM - 5:00 PM'),
('event_2025_ai', 'fee', 'BDT 500');
```

### Executive Members
```sql
INSERT INTO executive_members (name, position, position_order, department, session, year, active, email, image) VALUES
('John Doe', 'Chairperson', 1, 'CSE', '2021-22', 2025, true, 'john@example.com', '/team/john.jpg'),
('Jane Smith', 'Vice Chairperson', 2, 'EEE', '2021-22', 2025, true, 'jane@example.com', '/team/jane.jpg');
```

### Publications
```sql
INSERT INTO publications (id, title, issue, date_display, actual_date, cover_image, pdf_url, featured) VALUES
('pub_inspira_5', 'INSPIRA Magazine', 'Issue #5', 'December 2024', '2024-12-01', '/publications/inspira_5.jpg', '/publications/pdf/inspira_5.pdf', true);
```

---

## Database Setup Scripts

### MongoDB (Mongoose Models Location)
```
models/
├── Event.js
├── GalleryEvent.js
├── GalleryImage.js
├── ExecutiveMember.js
├── HallOfFameMember.js
├── Achievement.js
├── FeaturedContent.js
└── Publication.js
```

### SQL (Migration Files)
```
prisma/migrations/
├── 001_create_events.sql
├── 002_create_gallery.sql
├── 003_create_executive_members.sql
├── 004_create_hall_of_fame.sql
├── 005_create_achievements.sql
├── 006_create_featured_content.sql
└── 007_create_publications.sql
```

---

## Support

For implementation details:
- `BACKEND_EVENTS.md` - Events integration
- `BACKEND_GALLERY.md` - Gallery integration
- `BACKEND_EXECUTIVE.md` - Executive members
- `BACKEND_HALL_OF_FAME.md` - Hall of Fame
- `BACKEND_ACHIEVEMENTS.md` - Achievements
- `BACKEND_FEATURED.md` - Featured content
- `API_STRUCTURE.md` - API organization

---

**Last Updated**: January 2025
