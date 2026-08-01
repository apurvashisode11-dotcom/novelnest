const fs = require('fs');
const path = require('path');
const db = require('./database/db'); // assuming run from server directory

const imageMap = {
  'Clean Code': 'https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg',
  'Atomic Habits': 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg',
  'The Pragmatic Programmer': 'https://m.media-amazon.com/images/I/51A8l+FxNNL._SY445_SX342_.jpg',
  'Python Crash Course': 'https://m.media-amazon.com/images/I/51wOOMQ+F3L._SY445_SX342_.jpg',
  'The Alchemist': 'https://m.media-amazon.com/images/I/51Z0nLAfLmL._SY445_SX342_.jpg',
  'Deep Learning': 'https://m.media-amazon.com/images/I/61qJ0IsVN1L._SY445_SX342_.jpg',
  'Artificial Intelligence: A Modern Approach': 'https://m.media-amazon.com/images/I/51wBf2U5pPL._SY445_SX342_.jpg',
  'Rich Dad Poor Dad': 'https://m.media-amazon.com/images/I/51Hfv2MfNGL._SY445_SX342_.jpg',
  'Think and Grow Rich': 'https://m.media-amazon.com/images/I/41+eK8zBwQL._SY445_SX342_.jpg',
  'Zero to One': 'https://m.media-amazon.com/images/I/51z7mZZKRgL._SY445_SX342_.jpg',
  'Clean Architecture': 'https://m.media-amazon.com/images/I/41-sN-mzwKL._SY445_SX342_.jpg',
  'The Psychology of Money': 'https://m.media-amazon.com/images/I/41r6F2LRf8L._SY445_SX342_.jpg',
  'Introduction to Algorithms': 'https://m.media-amazon.com/images/I/41SNoh5ZhOL._SY445_SX342_.jpg',
  'The Lean Startup': 'https://m.media-amazon.com/images/I/51WIKlio9qL._SY445_SX342_.jpg',
  'Harry Potter and the Sorcerers Stone': 'https://m.media-amazon.com/images/I/51UoqNiQsyL._SY445_SX342_.jpg'
};

const oldUrls = {
  'Clean Code': 'https://covers.openlibrary.org/b/id/8259456-L.jpg',
  'Atomic Habits': 'https://covers.openlibrary.org/b/id/10129759-L.jpg',
  'The Pragmatic Programmer': 'https://covers.openlibrary.org/b/id/10202277-L.jpg',
  'Python Crash Course': 'https://covers.openlibrary.org/b/id/10574261-L.jpg',
  'The Alchemist': 'https://covers.openlibrary.org/b/id/8113426-L.jpg',
  'Deep Learning': 'https://covers.openlibrary.org/b/id/8575084-L.jpg',
  'Artificial Intelligence: A Modern Approach': 'https://covers.openlibrary.org/b/id/8251025-L.jpg',
  'Rich Dad Poor Dad': 'https://covers.openlibrary.org/b/id/8261313-L.jpg',
  'Think and Grow Rich': 'https://covers.openlibrary.org/b/id/7946257-L.jpg',
  'Zero to One': 'https://covers.openlibrary.org/b/id/12836261-L.jpg',
  'Clean Architecture': 'https://covers.openlibrary.org/b/id/8259461-L.jpg',
  'The Psychology of Money': 'https://covers.openlibrary.org/b/id/10521360-L.jpg',
  'Introduction to Algorithms': 'https://covers.openlibrary.org/b/id/8118021-L.jpg',
  'The Lean Startup': 'https://covers.openlibrary.org/b/id/8233777-L.jpg',
  'Harry Potter and the Sorcerers Stone': 'https://covers.openlibrary.org/b/id/10521270-L.jpg'
};

async function updateDb() {
  console.log('Updating DB...');
  for (const [title, url] of Object.entries(imageMap)) {
    await db.execute('UPDATE books SET image = ? WHERE title = ?', [url, title]);
  }
  console.log('DB Updated.');
}

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [title, newUrl] of Object.entries(imageMap)) {
    const oldUrl = oldUrls[title];
    if (oldUrl) {
      content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

async function main() {
  await updateDb();
  
  const filesToUpdate = [
    path.join(__dirname, 'database_setup.sql'),
    path.join(__dirname, '../client/src/data/books.js'),
    path.join(__dirname, '../client/src/components/Hero.jsx'),
    path.join(__dirname, '../client/src/pages/Login.jsx')
  ];
  
  for (const f of filesToUpdate) {
    replaceInFile(f);
  }
  
  console.log('All done!');
  process.exit(0);
}

main();
