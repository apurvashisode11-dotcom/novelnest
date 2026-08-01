const https = require('https');

const books = [
  'Clean Code Robert C. Martin',
  'Atomic Habits James Clear',
  'The Pragmatic Programmer Andrew Hunt',
  'Python Crash Course Eric Matthes',
  'The Alchemist Paulo Coelho',
  'Deep Learning Ian Goodfellow',
  'Artificial Intelligence A Modern Approach Stuart Russell',
  'Rich Dad Poor Dad Robert T. Kiyosaki',
  'Think and Grow Rich Napoleon Hill',
  'Zero to One Peter Thiel',
  'Clean Architecture Robert C. Martin',
  'The Psychology of Money Morgan Housel',
  'Introduction to Algorithms Thomas H. Cormen',
  'The Lean Startup Eric Ries',
  'Harry Potter and the Sorcerers Stone J.K. Rowling'
];

async function fetchGoogleBooksImage(query) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.items && json.items.length > 0) {
            const vol = json.items[0].volumeInfo;
            if (vol.imageLinks && vol.imageLinks.thumbnail) {
              // Convert http to https and zoom=1 to better resolution if possible
              let imgUrl = vol.imageLinks.thumbnail.replace('http:', 'https:');
              resolve(imgUrl);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (e) => resolve(null));
  });
}

async function main() {
  const results = {};
  for (const book of books) {
    const imgUrl = await fetchGoogleBooksImage(book);
    results[book] = imgUrl;
    console.log(`"${book}": "${imgUrl}"`);
    // sleep briefly
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('DONE');
}

main();
