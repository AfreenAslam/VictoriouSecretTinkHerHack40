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
  const { sellerId } = req.query;
  const active = await db.all("SELECT * FROM products WHERE soldOut = 0 AND sellerId = ? ORDER BY id DESC", [sellerId]);
  res.json(active);
};
