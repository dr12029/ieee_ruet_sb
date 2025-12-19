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
import Gallery from '../models/Gallery.js';

// Import static data
import { galleryData } from '../data/galleryData.js';

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const shouldClear = args.includes('--clear');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

/**
 * Transform gallery data from static format to backend schema
 */
function transformGalleryItem(year, eventSlug, eventData) {
  return {
    year: year.toString(),
    eventSlug: eventSlug,
    eventName: eventData.name,
    images: eventData.images || [],
    displayOrder: 0,
    isPublished: true,
  };
}

/**
 * Migrate all gallery data
 */
async function migrateGallery() {
  try {
    console.log('🚀 Gallery Data Migration');
    console.log('============================================================');
    
    if (isDryRun) {
      console.log('⚠️  DRY RUN MODE - No data will be inserted');
    }
    
    if (shouldClear && !isDryRun) {
      console.log('⚠️  CLEAR MODE - All existing gallery data will be deleted');
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let totalProcessed = 0;
    let totalErrors = 0;

    // Clear existing data if requested
    if (shouldClear && !isDryRun) {
      const deleteResult = await Gallery.deleteMany({});
      console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing gallery items\n`);
    }

    // Process each year
    const years = Object.keys(galleryData).sort((a, b) => b - a);
    
    for (const year of years) {
      const yearData = galleryData[year];
      const events = Object.keys(yearData).sort();
      
      console.log(`\n📅 Processing Year: ${year}`);
      console.log(`   Found ${events.length} events`);

      for (const eventSlug of events) {
        const eventData = yearData[eventSlug];
        const transformed = transformGalleryItem(year, eventSlug, eventData);

        if (isDryRun) {
          console.log(`   [DRY RUN] Would insert: ${transformed.eventName} (${transformed.images.length} images)`);
        } else {
          try {
            await Gallery.create(transformed);
            console.log(`   ✓ Inserted: ${transformed.eventName} (${transformed.images.length} images)`);
          } catch (error) {
            console.error(`   ✗ Error inserting ${transformed.eventName}: ${error.message}`);
            totalErrors++;
          }
        }

        totalProcessed++;
      }
    }

    // Summary
    console.log('\n============================================================');
    console.log('📊 Migration Statistics');
    console.log('============================================================');
    console.log(`Total Items Processed: ${totalProcessed}`);
    console.log(`Errors:                ${totalErrors}`);
    console.log('============================================================\n');

    if (isDryRun) {
      console.log('✅ Dry run completed. Run without --dry-run to perform actual migration.');
    } else {
      console.log('✅ Migration completed successfully!');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
}

// Run migration
migrateGallery();
