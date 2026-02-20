const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = open({ filename: './wasteless.db', driver: sqlite3.Database });
  }
  return dbPromise;
}

module.exports = async (req, res) => {
  const db = await getDb();
  const { sellerId, shop, location, contact, category, item, price, deadline } = req.body;
  await db.run(
    'INSERT INTO products (sellerId, shop, location, contact, category, item, price, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [sellerId, shop, location, contact, category, item, price, deadline]
  );
  res.json({ success: true, message: '✅ Listing posted successfully!' });
};
