/**
 * Migration Script: Executive Committee Data
 * 
 * This script migrates static executive committee data from:
 * - data/executiveMembers.js (current committee) -> isActive: true
 * - data/hallOfFameData.js (past committees) -> isActive: false
 * 
 * into the MongoDB database using the ExecutiveCommittee model.
 * 
 * Usage:
 *   node scripts/migrate-executive-committee.js
 * 
 * Options:
 *   --dry-run    : Preview what will be migrated without actually inserting
 *   --clear      : Clear existing data before migration
 *   --session    : Specify current session (default: 2025-26)
 * 
 * Note: Ensure MONGODB_URI is set in your environment or .env file
 */

import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file if exists
try {
  const envPath = join(__dirname, '..', '.env.local');
  const envFile = readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  // .env.local not found, try .env
  try {
    const envPath = join(__dirname, '..', '.env');
    const envFile = readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  } catch (error) {
    console.log('⚠️  No .env file found. Using environment variables only.');
  }
}

// Import model
const ExecutiveCommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  position: { type: String, required: true, maxlength: 100 },
  organization: { 
    type: String, 
    required: true,
    enum: [
      'IEEE RUET SB',
      'IEEE RUET IAS SB Chapter',
      'IEEE RUET RAS SB Chapter',
      'IEEE CS RUET SB Chapter',
      'IEEE RUET WIE SB AG',
      'IEEE RUET SPS SB Chapter',
    ]
  },
  session: { type: String, required: true, index: true },
  designation: String,
  department: String,
  university: { type: String, default: 'Rajshahi University of Engineering & Technology' },
  email: { type: String, lowercase: true },
  phone: String,
  linkedin: String,
  facebook: String,
  website: String,
  image: String,
  displayOrder: { type: Number, default: 0 },
  featured_member: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

ExecutiveCommitteeSchema.index({ session: 1, organization: 1 });
ExecutiveCommitteeSchema.index({ isActive: 1 });

const ExecutiveCommittee = mongoose.models.ExecutiveCommittee || 
  mongoose.model('ExecutiveCommittee', ExecutiveCommitteeSchema);

// Import static data
import { executiveMembers } from '../data/executiveMembers.js';
import { hallOfFameData } from '../data/hallOfFameData.js';

// Configuration
const DEFAULT_CURRENT_SESSION = '2025-26';
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const shouldClear = args.includes('--clear');
const currentSession = args.find(arg => arg.startsWith('--session='))?.split('=')[1] || DEFAULT_CURRENT_SESSION;

// Statistics
let stats = {
  currentMembers: 0,
  hallOfFameMembers: 0,
  errors: 0,
  skipped: 0
};

/**
 * Transform current executive member to database format
 */
function transformCurrentMember(member, displayOrder = 0) {
  // Map fields according to backend schema:
  // - position: role like "Chair", "Secretary", "Advisor" (from member.position)
  // - designation: academic/professional title like "Professor" or student year like "3rd Year"
  //   Priority: member.designation (for faculty) > member.studentYear (for students)
  
  return {
    name: member.name,
    position: member.position,
    organization: member.organization,
    session: currentSession,
    designation: member.designation || member.studentYear || null,
    department: member.department || null,
    university: member.university || 'Rajshahi University of Engineering & Technology',
    email: member.email || null,
    phone: null, // Not available in current data
    linkedin: member.linkedin || null,
    facebook: member.facebook || null,
    website: member.website || null,
    image: member.image || null,
    displayOrder: displayOrder,
    featured_member: member.featured_member || false,
    isActive: true
  };
}

/**
 * Transform hall of fame member to database format
 */
function transformHallOfFameMember(member, session, organization, displayOrder) {
  // Map fields according to backend schema:
  // - Static hall of fame has 'designation' which means the position/role (e.g., "Chair", "Secretary")
  // - This should map to 'position' field in backend (NOT designation field)
  
  return {
    name: member.name,
    position: member.designation, // Hall of fame 'designation' -> backend 'position'
    organization: organization,
    session: session,
    designation: null, // Hall of fame doesn't have academic/professional designation
    department: null,
    university: 'Rajshahi University of Engineering & Technology',
    email: null,
    phone: null,
    linkedin: null,
    facebook: null,
    website: null,
    image: null,
    displayOrder: displayOrder,
    featured_member: false,
    isActive: false
  };
}

/**
 * Connect to MongoDB
 */
async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

/**
 * Clear existing data
 */
async function clearExistingData() {
  try {
    const result = await ExecutiveCommittee.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} existing records`);
  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
    throw error;
  }
}

/**
 * Migrate current executive committee members
 */
async function migrateCurrentMembers() {
  console.log('\n📋 Migrating Current Executive Committee Members...');
  console.log(`   Session: ${currentSession}`);
  
  const membersToInsert = [];
  let orderCounter = 0;

  // Counselor
  if (executiveMembers.counselor) {
    membersToInsert.push(transformCurrentMember(executiveMembers.counselor, orderCounter++));
  }

  // Advisors
  if (executiveMembers.advisors && Array.isArray(executiveMembers.advisors)) {
    executiveMembers.advisors.forEach(advisor => {
      membersToInsert.push(transformCurrentMember(advisor, orderCounter++));
    });
  }

  // SB Executives
  if (executiveMembers.sbExecutives && Array.isArray(executiveMembers.sbExecutives)) {
    executiveMembers.sbExecutives.forEach(member => {
      membersToInsert.push(transformCurrentMember(member, orderCounter++));
    });
  }

  // IAS Chapter
  if (executiveMembers.iasChapter) {
    if (executiveMembers.iasChapter.advisor) {
      membersToInsert.push(transformCurrentMember(executiveMembers.iasChapter.advisor, orderCounter++));
    }
    if (executiveMembers.iasChapter.executives && Array.isArray(executiveMembers.iasChapter.executives)) {
      executiveMembers.iasChapter.executives.forEach(member => {
        membersToInsert.push(transformCurrentMember(member, orderCounter++));
      });
    }
  }

  // RAS Chapter
  if (executiveMembers.rasChapter) {
    if (executiveMembers.rasChapter.advisor) {
      membersToInsert.push(transformCurrentMember(executiveMembers.rasChapter.advisor, orderCounter++));
    }
    if (executiveMembers.rasChapter.executives && Array.isArray(executiveMembers.rasChapter.executives)) {
      executiveMembers.rasChapter.executives.forEach(member => {
        membersToInsert.push(transformCurrentMember(member, orderCounter++));
      });
    }
  }

  // CS Chapter
  if (executiveMembers.csChapter) {
    if (executiveMembers.csChapter.advisor) {
      membersToInsert.push(transformCurrentMember(executiveMembers.csChapter.advisor, orderCounter++));
    }
    if (executiveMembers.csChapter.executives && Array.isArray(executiveMembers.csChapter.executives)) {
      executiveMembers.csChapter.executives.forEach(member => {
        membersToInsert.push(transformCurrentMember(member, orderCounter++));
      });
    }
  }

  // WIE Chapter
  if (executiveMembers.wieChapter) {
    if (executiveMembers.wieChapter.advisor) {
      membersToInsert.push(transformCurrentMember(executiveMembers.wieChapter.advisor, orderCounter++));
    }
    if (executiveMembers.wieChapter.executives && Array.isArray(executiveMembers.wieChapter.executives)) {
      executiveMembers.wieChapter.executives.forEach(member => {
        membersToInsert.push(transformCurrentMember(member, orderCounter++));
      });
    }
  }

  // SPS Chapter
  if (executiveMembers.spsChapter) {
    if (executiveMembers.spsChapter.advisor) {
      membersToInsert.push(transformCurrentMember(executiveMembers.spsChapter.advisor, orderCounter++));
    }
    if (executiveMembers.spsChapter.executives && Array.isArray(executiveMembers.spsChapter.executives)) {
      executiveMembers.spsChapter.executives.forEach(member => {
        membersToInsert.push(transformCurrentMember(member, orderCounter++));
      });
    }
  }

  console.log(`   Found ${membersToInsert.length} current members to migrate`);

  if (isDryRun) {
    console.log('\n   [DRY RUN] Sample records:');
    membersToInsert.slice(0, 3).forEach(member => {
      console.log(`   - ${member.name} (${member.position}) - ${member.organization}`);
    });
    stats.currentMembers = membersToInsert.length;
    return;
  }

  try {
    const result = await ExecutiveCommittee.insertMany(membersToInsert, { ordered: false });
    stats.currentMembers = result.length;
    console.log(`   ✅ Inserted ${result.length} current members`);
  } catch (error) {
    if (error.code === 11000) {
      console.log('   ⚠️  Some duplicate entries were skipped');
      stats.errors++;
    } else {
      console.error('   ❌ Error inserting current members:', error.message);
      stats.errors++;
      throw error;
    }
  }
}

/**
 * Migrate hall of fame data
 */
async function migrateHallOfFame() {
  console.log('\n🏆 Migrating Hall of Fame Data...');

  const orgMapping = {
    'sb': 'IEEE RUET SB',
    'wie': 'IEEE RUET WIE SB AG',
    'ias': 'IEEE RUET IAS SB Chapter',
    'ras': 'IEEE RUET RAS SB Chapter',
    'cs': 'IEEE CS RUET SB Chapter',
    'sps': 'IEEE RUET SPS SB Chapter',
  };

  let totalMembers = 0;

  for (const [session, sessionData] of Object.entries(hallOfFameData)) {
    console.log(`\n   Session: ${session}`);
    const membersToInsert = [];

    for (const [orgKey, members] of Object.entries(sessionData)) {
      const orgName = orgMapping[orgKey];
      if (!orgName) {
        console.log(`   ⚠️  Unknown organization key: ${orgKey}`);
        stats.skipped++;
        continue;
      }

      members.forEach(member => {
        membersToInsert.push(
          transformHallOfFameMember(member, session, orgName, member.no)
        );
      });
    }

    console.log(`   Found ${membersToInsert.length} members for session ${session}`);

    if (isDryRun) {
      console.log('   [DRY RUN] Sample records:');
      membersToInsert.slice(0, 2).forEach(member => {
        console.log(`   - ${member.name} (${member.position}) - ${member.organization}`);
      });
      totalMembers += membersToInsert.length;
      continue;
    }

    try {
      const result = await ExecutiveCommittee.insertMany(membersToInsert, { ordered: false });
      console.log(`   ✅ Inserted ${result.length} members`);
      totalMembers += result.length;
    } catch (error) {
      if (error.code === 11000) {
        console.log('   ⚠️  Some duplicate entries were skipped');
        stats.errors++;
      } else {
        console.error(`   ❌ Error inserting hall of fame for ${session}:`, error.message);
        stats.errors++;
      }
    }
  }

  stats.hallOfFameMembers = totalMembers;
  console.log(`\n   Total hall of fame members processed: ${totalMembers}`);
}

/**
 * Display statistics
 */
function displayStats() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Statistics');
  console.log('='.repeat(60));
  console.log(`Current Members:      ${stats.currentMembers}`);
  console.log(`Hall of Fame Members: ${stats.hallOfFameMembers}`);
  console.log(`Total:                ${stats.currentMembers + stats.hallOfFameMembers}`);
  console.log(`Errors:               ${stats.errors}`);
  console.log(`Skipped:              ${stats.skipped}`);
  console.log('='.repeat(60));
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Executive Committee Data Migration');
  console.log('='.repeat(60));
  
  if (isDryRun) {
    console.log('⚠️  DRY RUN MODE - No data will be inserted');
  }
  
  if (shouldClear && !isDryRun) {
    console.log('⚠️  CLEAR MODE - Existing data will be deleted');
  }

  try {
    // Connect to database
    await connectDB();

    // Clear existing data if requested
    if (shouldClear && !isDryRun) {
      await clearExistingData();
    }

    // Migrate current members
    await migrateCurrentMembers();

    // Migrate hall of fame
    await migrateHallOfFame();

    // Display statistics
    displayStats();

    if (isDryRun) {
      console.log('\n✅ Dry run completed. Run without --dry-run to perform actual migration.');
    } else {
      console.log('\n✅ Migration completed successfully!');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
}

// Run migration
migrate();
