const http = require('http');

// Test the API endpoints
function testAPI() {
    // Test GET /api/items
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/items',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('✅ GET /api/items response:');
            console.log(JSON.parse(data));
        });
    });

    req.on('error', (e) => {
        console.error('❌ Error:', e);
    });

    req.end();
}

testAPI();
