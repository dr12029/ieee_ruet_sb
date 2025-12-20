# Quick Start: Executive Committee Migration

## Prerequisites Check

✅ MongoDB connection string in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

✅ Node.js version 14+ installed

✅ Project dependencies installed:
```bash
npm install
```

## Migration Commands

### 1. Preview First (Recommended)
```bash
node scripts/migrate-executive-committee.js --dry-run
```
This shows what will be migrated without actually inserting data.

### 2. Run Migration
```bash
node scripts/migrate-executive-committee.js
```
Migrates all data to MongoDB.

### 3. Clear and Migrate (Fresh Start)
```bash
node scripts/migrate-executive-committee.js --clear
```
⚠️ **Warning**: This deletes all existing executive committee data before migrating!

### 4. Custom Session
```bash
node scripts/migrate-executive-committee.js --session=2025-26
```
Specify the current session year for active members.

## What to Expect

### Successful Migration
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
   
   [... more sessions ...]

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

### Data Count Expectations
- **Current Members**: ~40-50 (depends on executiveMembers.js)
- **Hall of Fame**: ~200-300 (depends on hallOfFameData.js sessions)

## After Migration

### 1. Verify in Browser
Visit: `http://localhost:3000/admin/executive-committee`

You should see:
- Current members with session 2025-26
- Hall of fame members from multiple past sessions
- Filter working by session and organization

### 2. Test API Endpoints

**Get current members:**
```bash
curl http://localhost:3000/api/executive-committee?isActive=true
```

**Get hall of fame:**
```bash
curl http://localhost:3000/api/executive-committee?isActive=false
```

**Get specific session:**
```bash
curl http://localhost:3000/api/executive-committee?session=2024-25&isActive=false
```

### 3. Check Frontend Pages

**Executive Committee:** `http://localhost:3000/executive-committee`
- Should display all current members grouped by organization

**Hall of Fame:** `http://localhost:3000/hall-of-fame`
- Should show session selector
- Display past members when session is selected

## Troubleshooting

### Error: "MONGODB_URI is not defined"
**Solution:** Add MongoDB connection string to `.env` file

### Error: "Cannot find module"
**Solution:** Run from project root directory:
```bash
cd c:\Users\USER\Desktop\ieee_ruet_sb
node scripts/migrate-executive-committee.js
```

### Error: "Duplicate key error"
**Solution:** Data already exists. Use `--clear` flag:
```bash
node scripts/migrate-executive-committee.js --clear
```

### No members showing on website
**Possible causes:**
1. Migration didn't run - Check console output
2. API not connected to DB - Check API endpoint directly
3. Wrong session filter - Check admin panel filters

**Debug:**
```bash
# Check if data exists in MongoDB
# Use MongoDB Compass or shell
db.executivecommittees.countDocuments({ isActive: true })
db.executivecommittees.countDocuments({ isActive: false })
```

## Migration Workflow

```
1. [Backup] (Optional) Export existing data if any
                ↓
2. [Preview] Run with --dry-run flag
                ↓
3. [Migrate] Run actual migration
                ↓
4. [Verify] Check admin panel and API
                ↓
5. [Test] Test frontend pages
                ↓
6. [Done] ✅ Ready to use!
```

## Important Notes

- ✅ Migration is **idempotent** - Safe to run multiple times
- ✅ Duplicate detection - Skips existing records
- ✅ Static data **remains** as fallback
- ✅ Can migrate multiple times without breaking
- ⚠️ Use `--clear` carefully - it deletes all existing data

## Support

**Migration fails?**
1. Check MongoDB connection
2. Verify `.env` file has MONGODB_URI
3. Run with `--dry-run` first
4. Check console error messages

**Data incorrect?**
1. Use `--clear` to reset
2. Verify static data files
3. Run migration again

**Need help?**
- Check [scripts/README.md](scripts/README.md) for detailed docs
- Check [BACKEND_EXECUTIVE_COMMITTEE.md](BACKEND_EXECUTIVE_COMMITTEE.md) for API docs
