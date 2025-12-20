# Executive Committee Data Migration

This directory contains scripts for migrating data to the MongoDB database.

## Migration Script: `migrate-executive-committee.js`

Migrates static executive committee data from:
- `data/executiveMembers.js` → Current committee members (isActive: true)
- `data/hallOfFameData.js` → Past committees (isActive: false)

### Prerequisites

1. **MongoDB Connection**: Ensure `MONGODB_URI` is set in your `.env` file
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

2. **Node.js**: Version 14 or higher with ES modules support

### Usage

#### Basic Migration
```bash
node scripts/migrate-executive-committee.js
```

#### Dry Run (Preview without inserting)
```bash
node scripts/migrate-executive-committee.js --dry-run
```

#### Clear Existing Data Before Migration
```bash
node scripts/migrate-executive-committee.js --clear
```

#### Specify Current Session
```bash
node scripts/migrate-executive-committee.js --session=2025-26
```

#### Combine Options
```bash
# Dry run with custom session
node scripts/migrate-executive-committee.js --dry-run --session=2024-25

# Clear and migrate with custom session
node scripts/migrate-executive-committee.js --clear --session=2025-26
```

### Options

| Option | Description |
|--------|-------------|
| `--dry-run` | Preview what will be migrated without actually inserting data |
| `--clear` | Delete all existing executive committee records before migration |
| `--session=YYYY-YY` | Specify the session year for current members (default: 2025-26) |

### What Gets Migrated

#### Current Members (from `executiveMembers.js`)
- **Session**: Specified session (default: 2025-26)
- **isActive**: true
- **Fields**: name, position, organization, designation, department, email, linkedin, facebook, website, image, featured_member, displayOrder

Includes:
- Counselor
- Advisors
- SB Executives
- Chapter Executives (IAS, RAS, CS, WIE, SPS)
- Chapter Advisors

#### Hall of Fame (from `hallOfFameData.js`)
- **Session**: As specified in the data (e.g., 2024-25, 2023-24, etc.)
- **isActive**: false
- **Fields**: name, position (from designation), organization, session, displayOrder

### Example Output

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

   Session: 2023-24
   Found 29 members for session 2023-24
   ✅ Inserted 29 members

   ... (more sessions)

   Total hall of fame members processed: 234

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

👋 Database connection closed
```

### Error Handling

The script handles:
- **Duplicate entries**: Skips duplicates gracefully
- **Connection errors**: Exits with error message
- **Missing environment variables**: Exits with error message
- **Invalid data**: Logs warnings for unknown organizations

### After Migration

1. **Verify data** in MongoDB:
   ```bash
   # Using MongoDB shell or Compass
   db.executivecommittees.find({ isActive: true })
   db.executivecommittees.find({ isActive: false }).limit(10)
   ```

2. **Test the API**:
   ```bash
   # Get current members
   curl http://localhost:3000/api/executive-committee?isActive=true

   # Get hall of fame
   curl http://localhost:3000/api/executive-committee?isActive=false
   ```

3. **Access admin panel**: Visit `/admin/executive-committee` to verify the data

### Troubleshooting

**Error: MONGODB_URI is not defined**
- Add `MONGODB_URI` to your `.env` file

**Error: Cannot find module**
- Make sure you're running from the project root
- Ensure `package.json` has `"type": "module"`

**Duplicate key errors**
- Run with `--clear` flag to remove existing data first

**Some records not inserted**
- Check for validation errors in console output
- Verify organization names match the enum values

### Data Transformation

#### Current Members
```javascript
// From executiveMembers.js
{
  id: 1,
  name: "Dr. Name",
  position: "Advisor",
  organization: "IEEE RUET SB",
  email: "email@example.com",
  // ... other fields
}

// Transformed to
{
  name: "Dr. Name",
  position: "Advisor",
  organization: "IEEE RUET SB",
  session: "2025-26",
  isActive: true,
  // ... other fields
}
```

#### Hall of Fame
```javascript
// From hallOfFameData.js
{
  '2024-25': {
    sb: [
      { no: 1, designation: 'Chair', name: 'John Doe' }
    ]
  }
}

// Transformed to
{
  name: "John Doe",
  position: "Chair",
  organization: "IEEE RUET SB",
  session: "2024-25",
  displayOrder: 1,
  isActive: false
}
```

### Notes

- The script uses `insertMany` with `ordered: false` to continue on duplicates
- Display order is automatically assigned based on the order in the source data
- Current members get sequential display orders starting from 0
- Hall of fame members use the `no` field from the source data as display order
- All hall of fame members have minimal data (name, position, organization, session)
- Current members retain all available information from the source data

### Support

For issues or questions:
1. Check MongoDB connection and credentials
2. Verify the data files exist and are properly formatted
3. Run with `--dry-run` first to preview the migration
4. Check the console output for specific error messages
