const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = async (req, res) => {
  const db = await open({ filename: './wasteless.db', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sellerId TEXT, 
      shop TEXT,
      location TEXT,
      contact TEXT, 
      category TEXT,
      item TEXT, 
      price REAL, 
      deadline TEXT, 
      buyerName TEXT, 
      buyerContact TEXT, 
      buyerTime TEXT, 
      soldOut INTEGER DEFAULT 0
    )
  `);
  res.json({ success: true, message: '✅ Database initialized' });
};
