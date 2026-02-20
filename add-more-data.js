const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function addMoreSampleData() {
    const db = await open({ filename: './wasteless.db', driver: sqlite3.Database });
    
    // Add more sample products across all categories
    const moreProducts = [
        // Bakery Items
        {
            sellerId: "Golden Crust Bakery",
            shop: "Golden Crust",
            location: "Westside Mall",
            contact: "555-0201",
            category: "bakery",
            item: "Croissants (6 pack)",
            price: 40,
            deadline: "6 PM"
        },
        {
            sellerId: "Sweet Dreams Bakery",
            shop: "Sweet Dreams",
            location: "Main Street",
            contact: "555-0202",
            category: "bakery",
            item: "Chocolate Cake (half)",
            price: 120,
            deadline: "8 PM"
        },
        {
            sellerId: "Daily Bread",
            shop: "Daily Bread Shop",
            location: "City Center",
            contact: "555-0203",
            category: "bakery",
            item: "Sourdough Bread",
            price: 60,
            deadline: "7 PM"
        },
        
        // Food Items
        {
            sellerId: "Fresh Farm Produce",
            shop: "Farm Fresh",
            location: "Local Market",
            contact: "555-0301",
            category: "food",
            item: "Fresh Apples (2kg)",
            price: 100,
            deadline: "5 PM"
        },
        {
            sellerId: "Ocean Catch",
            shop: "Seafood Market",
            location: "Harbor Area",
            contact: "555-0302",
            category: "food",
            item: "Fresh Fish (1kg)",
            price: 200,
            deadline: "4 PM"
        },
        {
            sellerId: "Green Valley",
            shop: "Organic Store",
            location: "Uptown",
            contact: "555-0303",
            category: "food",
            item: "Mixed Salad Greens",
            price: 45,
            deadline: "6 PM"
        },
        
        // Groceries
        {
            sellerId: "SuperMart",
            shop: "SuperMart Plus",
            location: "Shopping Complex",
            contact: "555-0401",
            category: "groceries",
            item: "Pasta Pack (500g)",
            price: 35,
            deadline: "9 PM"
        },
        {
            sellerId: "Quick Stop",
            shop: "Quick Stop Store",
            location: "Gas Station",
            contact: "555-0402",
            category: "groceries",
            item: "Canned Soup (3 pack)",
            price: 55,
            deadline: "10 PM"
        },
        {
            sellerId: "Value Shop",
            shop: "Value Mart",
            location: "Suburb Center",
            contact: "555-0403",
            category: "groceries",
            item: "Rice Bag (1kg)",
            price: 70,
            deadline: "8 PM"
        },
        
        // Other Products
        {
            sellerId: "Tech Zone",
            shop: "Tech Zone Store",
            location: "Tech Park",
            contact: "555-0501",
            category: "other",
            item: "USB Cable (2m)",
            price: 25,
            deadline: "9 PM"
        },
        {
            sellerId: "Book World",
            shop: "Book World",
            location: "Library Square",
            contact: "555-0502",
            category: "other",
            item: "Novel Collection (3 books)",
            price: 150,
            deadline: "7 PM"
        },
        {
            sellerId: "Home Essentials",
            shop: "Home Store",
            location: "Mall Ground Floor",
            contact: "555-0503",
            category: "other",
            item: "Kitchen Towels (pack)",
            price: 40,
            deadline: "8 PM"
        }
    ];
    
    for (const product of moreProducts) {
        await db.run(
            'INSERT INTO products (sellerId, shop, location, contact, category, item, price, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [product.sellerId, product.shop, product.location, product.contact, product.category, product.item, product.price, product.deadline]
        );
    }
    
    console.log("✅ More sample data added successfully!");
    await db.close();
}

addMoreSampleData().catch(console.error);
