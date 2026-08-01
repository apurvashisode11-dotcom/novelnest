const db = require('./database/db');

async function migrate() {
  try {
    console.log('Running migration: Adding order_id column...');
    await db.execute('ALTER TABLE orders ADD COLUMN order_id VARCHAR(50) UNIQUE AFTER id');
    console.log('Migration successful!');
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('Column order_id already exists.');
    } else {
      console.error('Migration failed:', error);
    }
  } finally {
    process.exit();
  }
}

migrate();
