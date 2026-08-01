const db = require('./database/db');

async function migrateProfile() {
  try {
    console.log('Running migration: Adding address, city, pincode columns to users...');
    await db.execute('ALTER TABLE users ADD COLUMN address VARCHAR(255) AFTER phone, ADD COLUMN city VARCHAR(100) AFTER address, ADD COLUMN pincode VARCHAR(10) AFTER city');
    console.log('Migration successful!');
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error('Migration failed:', error);
    }
  } finally {
    process.exit();
  }
}

migrateProfile();
