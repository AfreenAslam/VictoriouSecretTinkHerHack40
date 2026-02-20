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
  const { id, buyerName, buyerContact, buyerTime } = req.body;
  await db.run(
    'UPDATE products SET soldOut = 1, buyerName = ?, buyerContact = ?, buyerTime = ? WHERE id = ?',
    [buyerName, buyerContact, buyerTime, id]
  );
  res.json({ success: true });
};
