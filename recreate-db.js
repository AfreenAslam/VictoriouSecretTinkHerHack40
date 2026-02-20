const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function recreateDatabase() {
    const db = await open({ filename: './wasteless.db', driver: sqlite3.Database });
    
    // Drop and recreate the table
    await db.exec("DROP TABLE IF EXISTS products");
    
    await db.exec(`
        CREATE TABLE products (
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
    
    // Add sample products
    const sampleProducts = [
        {
            sellerId: "John's Bakery",
            shop: "Sweet Treats Bakery",
            location: "Downtown",
            contact: "555-0123",
            category: "bakery",
            item: "Fresh Bread",
            price: 50,
            deadline: "8 PM"
        },
        {
            sellerId: "Green Grocer",
            shop: "Fresh Market",
            location: "Uptown",
            contact: "555-0124",
            category: "food",
            item: "Fresh Vegetables",
            price: 80,
            deadline: "7 PM"
        },
        {
            sellerId: "Quick Mart",
            shop: "Convenience Store",
            location: "City Center",
            contact: "555-0125",
            category: "groceries",
            item: "Packaged Snacks",
            price: 30,
            deadline: "9 PM"
        },
        {
            sellerId: "Tech Store",
            shop: "Electronics Plus",
            location: "Mall Area",
            contact: "555-0126",
            category: "other",
            item: "Phone Accessories",
            price: 150,
            deadline: "10 PM"
        }
    ];
    
    for (const product of sampleProducts) {
        await db.run(
            'INSERT INTO products (sellerId, shop, location, contact, category, item, price, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [product.sellerId, product.shop, product.location, product.contact, product.category, product.item, product.price, product.deadline]
        );
    }
    
    console.log("✅ Database recreated with sample data!");
    await db.close();
}

recreateDatabase().catch(console.error);
