const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function addSampleData() {
    const db = await open({ filename: './wasteless.db', driver: sqlite3.Database });
    
    // Clear existing data
    await db.exec("DELETE FROM products");
    
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
    
    console.log("✅ Sample data added successfully!");
    await db.close();
}

addSampleData().catch(console.error);
