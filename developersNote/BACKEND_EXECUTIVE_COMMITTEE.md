# Executive Committee Backend API Documentation

## Overview
This document describes the API endpoints for managing IEEE RUET SB Executive Committee members. The system supports both current executive committee members and historical members (Hall of Fame).

**Status:** ✅ Implemented and Integrated

---

## Model Schema

### ExecutiveCommittee Model
**File:** `models/ExecutiveCommittee.js`

```javascript
{
  // Basic Information
  name: String (required, max 100 chars)
  position: String (required, max 100 chars) // e.g., "Chair", "Secretary", "Advisor", "Counselor"
  organization: String (required, enum) // Organization type
  
  // Session/Year Information
  session: String (required, indexed) // e.g., "2024-25"
  
  // Academic/Professional Information
  designation: String // e.g., "Professor", "Associate Professor"
  department: String // e.g., "Dept. of EEE"
  university: String // Default: "Rajshahi University of Engineering & Technology"
  
  // Contact Information
  email: String (lowercase)
  phone: String
  
  // Social Media & Web Links
  linkedin: String
  facebook: String
  website: String
  
  // Media
  image: String // Image URL or path (optional)
  
  // Display Settings
  displayOrder: Number (default: 0) // For controlling display order
  featured_member: Boolean (default: false)
  isActive: Boolean (default: true) // true = current committee, false = hall of fame
  
  // Timestamps
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Organization Types
- `IEEE RUET SB`
- `IEEE RUET IAS SB Chapter`
- `IEEE RUET RAS SB Chapter`
- `IEEE CS RUET SB Chapter`
- `IEEE RUET WIE SB AG`
- `IEEE RUET SPS SB Chapter`

---

## API Endpoints

### 1. Get Executive Committee Members
**Endpoint:** `GET /api/executive-committee`

**File:** `app/api/executive-committee/route.js`

**Description:** Retrieves executive committee members with optional filtering.

**Query Parameters:**
- `session` (string, optional) - Filter by session year (e.g., "2024-25")
- `organization` (string, optional) - Filter by organization
- `isActive` (boolean, optional) - Filter by active status
  - `true` - Current committee members
  - `false` - Hall of fame members (past sessions)
- `featured` (boolean, optional) - Filter featured members only

**Response:**
```json
{
  "success": true,
  "count": 50,
  "members": [
    {
      "_id": "65f4a3b2c1234567890abcde",
      "name": "John Doe",
      "position": "Chair",
      "organization": "IEEE RUET SB",
      "session": "2024-25",
      "email": "john@example.com",
      "phone": "+8801234567890",
      "image": "/team/john-doe.jpg",
      "displayOrder": 1,
      "featured_member": true,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "sessions": ["2024-25", "2023-24", "2022-23"],
  "organizations": ["IEEE RUET SB", "IEEE RUET IAS SB Chapter", ...]
}
```

**Example Requests:**
```bash
# Get all current executive committee members
GET /api/executive-committee?isActive=true

# Get hall of fame members for a specific session
GET /api/executive-committee?session=2023-24&isActive=false

# Get all members from IEEE RUET SB
GET /api/executive-committee?organization=IEEE RUET SB

# Get all featured members
GET /api/executive-committee?featured=true
```

**Fallback Behavior:**
If MongoDB is not available, the API falls back to static data from:
- `/data/executiveMembers.js` (for current members)
- `/data/hallOfFameData.js` (for hall of fame)

---

### 2. Create Executive Committee Member
**Endpoint:** `POST /api/executive-committee`

**File:** `app/api/executive-committee/route.js`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "position": "Secretary",
  "organization": "IEEE RUET SB",
  "session": "2024-25",
  "department": "Dept. of CSE",
  "email": "jane@example.com",
  "phone": "+8801234567891",
  "linkedin": "https://linkedin.com/in/janesmith",
  "image": "/team/jane-smith.jpg",
  "displayOrder": 2,
  "featured_member": false,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "member": {
    "_id": "65f4a3b2c1234567890abcdf",
    "name": "Jane Smith",
    "position": "Secretary",
    ...
  }
}
```

---

### 3. Get Single Member
**Endpoint:** `GET /api/executive-committee/[id]`

**File:** `app/api/executive-committee/[id]/route.js`

**Response:**
```json
{
  "success": true,
  "member": { ... }
}
```

---

### 4. Update Executive Committee Member
**Endpoint:** `PUT /api/executive-committee/[id]`

**File:** `app/api/executive-committee/[id]/route.js`

**Authentication:** Required (Admin only)

**Request Body:** (partial update supported)
```json
{
  "position": "Vice Chair",
  "displayOrder": 2
}
```

---

### 5. Delete Executive Committee Member
**Endpoint:** `DELETE /api/executive-committee/[id]`

**File:** `app/api/executive-committee/[id]/route.js`

**Authentication:** Required (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Member deleted successfully"
}
```

---

## Admin Panel

### Admin Page
**Path:** `/admin/executive-committee`

**File:** `app/admin/executive-committee/page.js`

### Features
- ✅ View all members in table format
- ✅ Filter by session, organization, and active status
- ✅ Add new members via inline form
- ✅ Edit existing members
- ✅ Delete members
- ✅ Mark members as featured
- ✅ Toggle active status (move to hall of fame)
- ✅ Control display order

### Interface Components
1. **Filters Section**
   - Session dropdown
   - Organization dropdown
   - Active/Hall of Fame toggle
   - Clear filters button

2. **Add Member Form**
   - All required and optional fields
   - Validation
   - Organization and member type selectors
   - Featured member checkbox
   - Active status checkbox

3. **Members Table**
   - Name with featured indicator
   - Position and member type
   - Organization
   - Session
   - Active status badge
   - Edit and Delete actions

---

## Frontend Pages

### 1. Executive Committee Page
**Path:** `/executive-committee`

**File:** `app/executive-committee/page.js`

**Description:** Displays current executive committee members grouped by organization.

**Data Source:** `GET /api/executive-committee?isActive=true`

**Features:**
- ✅ Grouped display by organization
- ✅ Shows advisors and counselors in Leadership & Guidance section (identified by position)
- ✅ Responsive grid layout using MemberCard component
- ✅ Loading state
- ✅ Error handling with retry
- ✅ Automatic grouping by organization

**Sections:**
1. Leadership & Guidance (Counselor + Advisors)
2. IEEE RUET Student Branch
3. IEEE RUET IAS SB Chapter
4. IEEE RUET RAS SB Chapter
5. IEEE CS RUET SB Chapter
6. IEEE RUET WIE SB AG
7. IEEE RUET SPS SB Chapter

---

### 2. Hall of Fame Page
**Path:** `/hall-of-fame`

**File:** `app/hall-of-fame/page.js`

**Description:** Displays past executive committee members organized by session.

**Data Source:** `GET /api/executive-committee?session={year}&isActive=false`

**Features:**
- ✅ Session selector dropdown
- ✅ Table view grouped by organization
- ✅ Color-coded chapters
- ✅ Loading state
- ✅ Error handling
- ✅ Historical data preservation

**Display Format:**
- Tables organized by chapter/organization
- Shows: Display Order, Position, Name
- Color variants for visual distinction

---

## Usage Examples

### Frontend Integration

#### Fetching Current Executive Committee
```javascript
const fetchCurrentCommittee = async () => {
  try {
    const res = await fetch('/api/executive-committee?isActive=true');
    const data = await res.json();
    
    if (data.success) {
      // Group members by organization
      const groupedMembers = {};
      data.members.forEach(member => {
        if (!groupedMembers[member.organization]) {
          groupedMembers[member.organization] = [];
        }
        groupedMembers[member.organization].push(member);
      });
      
      return groupedMembers;
    }
  } catch (error) {
    console.error('Error fetching committee:', error);
  }
};
```

#### Creating a New Member (Admin)
```javascript
const createMember = async (memberData) => {
  try {
    const res = await fetch('/api/executive-committee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberData),
    });
    
    const data = await res.json();
    
    if (data.success) {
      alert('Member created successfully!');
      return data.member;
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error creating member:', error);
  }
};
```

---

## Data Migration

### Migration Script

**File:** `scripts/migrate-executive-committee.js`

A comprehensive migration script is available to transfer all static data to MongoDB.

#### Quick Start

```bash
# Preview migration (dry run)
node scripts/migrate-executive-committee.js --dry-run

# Perform actual migration
node scripts/migrate-executive-committee.js

# Clear and migrate with custom session
node scripts/migrate-executive-committee.js --clear --session=2025-26
```

#### Options

- `--dry-run` - Preview without inserting data
- `--clear` - Delete existing records before migration
- `--session=YYYY-YY` - Specify current session (default: 2025-26)

#### What Gets Migrated

**Current Members** (from `data/executiveMembers.js`):
- Counselor
- Advisors (all)
- SB Executives (all)
- Chapter Advisors and Executives (IAS, RAS, CS, WIE, SPS)
- **Sets**: `isActive: true`, `session: current`

**Hall of Fame** (from `data/hallOfFameData.js`):
- All past sessions with complete data
- **Sets**: `isActive: false`, `session: respective year`

#### Migration Process

1. **Connects to MongoDB** using `MONGODB_URI` from `.env`
2. **Optionally clears** existing data if `--clear` flag is used
3. **Transforms current members**:
   - Extracts from executiveMembers.js structure
   - Assigns sequential display orders
   - Sets current session and isActive: true
4. **Transforms hall of fame**:
   - Iterates through all sessions
   - Maps organization keys to full names
   - Sets isActive: false
5. **Inserts in batches** with duplicate handling
6. **Reports statistics** on completion

#### Expected Output

```
🚀 Executive Committee Data Migration
============================================================
✅ Connected to MongoDB

📋 Migrating Current Executive Committee Members...
   Session: 2025-26
   Found 47 current members to migrate
   ✅ Inserted 47 current members

🏆 Migrating Hall of Fame Data...
   Session: 2024-25
   Found 35 members for session 2024-25
   ✅ Inserted 35 members
   ...

============================================================
📊 Migration Statistics
============================================================
Current Members:      47
Hall of Fame Members: 234
Total:                281
Errors:               0
Skipped:              0
============================================================

✅ Migration completed successfully!
```

#### Verification After Migration

```bash
# Check current members
curl http://localhost:3000/api/executive-committee?isActive=true

# Check hall of fame
curl http://localhost:3000/api/executive-committee?session=2024-25&isActive=false

# Visit admin panel
# http://localhost:3000/admin/executive-committee
```

**Full documentation**: See [scripts/README.md](scripts/README.md) for detailed usage instructions.

---

## Migration from Static Data (Legacy)

### Current Static Files:**
- `data/executiveMembers.js` - Current committee
- `data/hallOfFameData.js` - Past committees

These files remain as fallback data when MongoDB is unavailable.

---

## File Structure

```
ieee_ruet_sb/
├── models/
│   └── ExecutiveCommittee.js          ✅ Model definition
├── app/
│   ├── api/
│   │   └── executive-committee/
│   │       ├── route.js               ✅ GET all, POST create
│   │       └── [id]/
│   │           └── route.js           ✅ GET, PUT, DELETE single
│   ├── admin/
│   │   └── executive-committee/
│   │       └── page.js                ✅ Admin management UI
│   ├── executive-committee/
│   │   └── page.js                    ✅ Public current committee page
│   └── hall-of-fame/
│       └── page.js                    ✅ Public hall of fame page
├── scripts/
│   ├── migrate-executive-committee.js ✅ Migration script
│   └── README.md                      ✅ Migration documentation
├── data/
│   ├── executiveMembers.js            📌 Static fallback (current)
│   └── hallOfFameData.js              📌 Static fallback (hall of fame)
└── BACKEND_EXECUTIVE_COMMITTEE.md     ✅ This documentation
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Best Practices

1. ✅ Always check `success` field in API responses
2. ✅ Handle fallback gracefully when MongoDB is unavailable
3. ✅ Validate data on frontend before sending to API
4. ✅ Use `displayOrder` to control member ordering
5. ✅ Set `isActive` appropriately:
   - `true` for current committee
   - `false` when archiving to hall of fame
6. ✅ Featured members should be limited to key positions
7. ✅ Use position names like "Advisor" or "Counselor" for leadership roles
8. ✅ Image paths are optional but recommended for better display

---

## Testing Checklist

### API Endpoints
- [ ] GET all members (with filters)
- [ ] GET single member
- [ ] POST create member (authenticated)
- [ ] PUT update member (authenticated)
- [ ] DELETE member (authenticated)

### Admin Panel
- [ ] View all members
- [ ] Filter by session
- [ ] Filter by organization
- [ ] Filter by active status
- [ ] Create new member
- [ ] Edit existing member
- [ ] Delete member
- [ ] Toggle featured status
- [ ] Toggle active status

### Frontend Pages
- [ ] Executive committee page loads current members
- [ ] Members grouped correctly by organization
- [ ] Hall of fame page loads with sessions
- [ ] Session selector works
- [ ] Hall of fame displays past members correctly
- [ ] Loading states display
- [ ] Error handling works
- [ ] Fallback to static data works

---

## Next Steps

1. ✅ **Backend Setup** - Model, API routes, and admin page created
2. ✅ **Frontend Integration** - Pages updated to use API
3. ✅ **Migration Script** - Script created to migrate static data to MongoDB
4. ⏳ **Run Migration** - Execute the migration script with your MongoDB connection
5. ⏳ **Testing** - Comprehensive testing of all features
6. ⏳ **Documentation** - User guide for admin panel

---

## Support

For questions or issues related to the Executive Committee backend:
- Check this documentation
- Review the API error messages
- Test with fallback static data
- Contact the development team

---

**Last Updated:** December 20, 2025  
**Version:** 1.0.0  
**Status:** Production Ready (pending data migration)
