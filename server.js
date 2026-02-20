const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

app.use(express.json());
app.use(express.static('public'));

let db;
(async () => {
    db = await open({ filename: './wasteless.db', driver: sqlite3.Database });
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
    console.log("✅ Database initialized");
    
    // Start server after DB is ready
    http.listen(3000, () => console.log('🚀 Server: http://localhost:3000'));
})();

// BUYER: Get available items
app.get('/api/items', async (req, res) => {
    const items = await db.all("SELECT * FROM products WHERE soldOut = 0 ORDER BY id DESC");
    res.json(items);
});

// NEW: Seller active listings
app.get('/api/seller-active/:sellerId', async (req, res) => {
    const active = await db.all("SELECT * FROM products WHERE soldOut = 0 AND sellerId = ? ORDER BY id DESC", [req.params.sellerId]);
    res.json(active);
});

// SELLER: Get claimed items
app.get('/api/seller-orders/:sellerId', async (req, res) => {
    const orders = await db.all("SELECT * FROM products WHERE soldOut = 1 AND sellerId = ?", [req.params.sellerId]);
    res.json(orders);
});

// FIXED: Post new item with notification
app.post('/api/add', async (req, res) => {
    const { sellerId, shop, location, contact, category, item, price, deadline } = req.body;
    await db.run(
        'INSERT INTO products (sellerId, shop, location, contact, category, item, price, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [sellerId, shop, location, contact, category, item, price, deadline]
    );
    io.emit('refresh');
    res.json({ success: true, message: '✅ Listing posted successfully!' });
});

// BUYER: Claim item
app.post('/api/buy/:id', async (req, res) => {
    const { buyerName, buyerContact, buyerTime } = req.body;
    await db.run(
        'UPDATE products SET soldOut = 1, buyerName = ?, buyerContact = ?, buyerTime = ? WHERE id = ?', 
        [buyerName, buyerContact, buyerTime, req.params.id]
    );
    
    const product = await db.get("SELECT * FROM products WHERE id = ?", [req.params.id]);
    io.emit('new-claim', {
        sellerId: product.sellerId,
        item: product.item,
        buyerName: buyerName,
        buyerContact: buyerContact,
        buyerTime: buyerTime
    });
    
    io.emit('refresh');
    res.json({ success: true });
});
